<template>
  <div class="flex flex-col md:flex-row p-4 gap-6">
    <router-link
      to="/"
      class="inline-block bg-blue-200 text-gray-800 px-4 py-2 rounded hover:bg-blue-300 transition self-start"
    >
      Back to Menu
    </router-link>
    <!-- Order Summary -->
  <section class="md:w-1/2 bg-amber-50 rounded-lg p-6 shadow">
    <h2 class="text-2xl font-bold mb-4">Order Summary</h2>

    <ul class="divide-y divide-gray-200">
      <li
        v-for="item in cart.items"
        :key="item.id"
        class="flex justify-between py-2"
      >
        <span>{{ item.name }}</span>
        <span>${{ item.price.toFixed(2) }}</span>
      </li>
    </ul>

    <div class="mt-6 space-y-2 border-t pt-4 text-sm">
      <div class="flex justify-between">
        <span>Subtotal:</span>
        <span>${{ subtotal.toFixed(2) }}</span>
      </div>
      <div class="flex justify-between">
        <span>Tax (8.5%):</span>
        <span>${{ tax.toFixed(2) }}</span>
      </div>
      <div class="flex justify-between font-semibold text-lg border-t pt-2">
        <span>Total:</span>
        <span>${{ total.toFixed(2) }}</span>
      </div>
    </div>
  </section>

  <!-- Confirmation + Mock Payment -->
<section class="md:w-1/2 bg-white rounded-lg p-6 shadow text-center flex flex-col items-center justify-center space-y-4">
  <h2 class="text-2xl font-bold">
    {{ paymentComplete ? 'Thank you for your order!' : 'Please pay to complete your order' }}
  </h2>
  <p class="text-gray-600" v-if="paymentComplete">Your meal is being prepared.</p>
  <p class="text-sm text-gray-500" v-if="paymentComplete">Order #{{ orderId }}</p>

  <!-- Mock Payment Form -->
  <!-- Mock Payment Form -->
<div class="w-full max-w-sm text-left space-y-2" v-if="!paymentComplete">
  <label class="block">
    <span class="text-sm font-medium">Card Number</span>
    <input
      v-model="cardNumber"
      type="text"
      placeholder="1234 5678 9012 3456"
      class="mt-1 w-full border rounded px-3 py-2 focus:outline-none"
    />
    <p v-if="errors.cardNumber" class="text-red-600 text-sm mt-1">{{ errors.cardNumber }}</p>
  </label>

  <div class="flex gap-2">
    <label class="w-1/2">
      <span class="text-sm font-medium">Expiry</span>
      <input
        v-model="expiry"
        type="text"
        placeholder="MM/YY"
        class="mt-1 w-full border rounded px-3 py-2 focus:outline-none"
      />
      <p v-if="errors.expiry" class="text-red-600 text-sm mt-1">{{ errors.expiry }}</p>
    </label>

    <label class="w-1/2">
      <span class="text-sm font-medium">CVV</span>
      <input
        v-model="cvv"
        type="text"
        placeholder="123"
        class="mt-1 w-full border rounded px-3 py-2 focus:outline-none"
      />
      <p v-if="errors.cvv" class="text-red-600 text-sm mt-1">{{ errors.cvv }}</p>
    </label>
  </div>

  <button
    @click="mockPayment"
    class="w-full mt-4 bg-green-500 text-white py-2 rounded hover:bg-green-600"
  >
    Pay Now
  </button>
</div>
</section>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useCartStore } from '../stores/cartStore'

const cart = useCartStore()
const orderId = ref(Math.floor(100000 + Math.random() * 900000))
const paymentComplete = ref(false)

const subtotal = computed(() =>
  cart.items.reduce((sum, item) => sum + item.price, 0)
)

const tax = computed(() =>
  (subtotal.value * 0.085)
)

const total = computed(() =>
  subtotal.value + tax.value
)

// Form inputs
const cardNumber = ref('')
const expiry = ref('')
const cvv = ref('')

// Validation errors
const errors = ref({
  cardNumber: '',
  expiry: '',
  cvv: ''
})

function validateInputs() {
  let isValid = true
  errors.value = { cardNumber: '', expiry: '', cvv: '' }

  if (!/^\d{16}$/.test(cardNumber.value.replace(/\s/g, ''))) {
    errors.value.cardNumber = 'Enter a valid 16-digit card number'
    isValid = false
  }

  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry.value)) {
    errors.value.expiry = 'Enter expiry as MM/YY'
    isValid = false
  }

  if (!/^\d{3}$/.test(cvv.value)) {
    errors.value.cvv = 'Enter a valid 3-digit CVV'
    isValid = false
  }

  return isValid
}

function mockPayment() {
  if (validateInputs()) {
    paymentComplete.value = true
    cart.clearCart()
  }
}

</script>
