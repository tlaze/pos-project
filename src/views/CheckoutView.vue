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
  <div class="w-full max-w-sm text-left space-y-2" v-if="!paymentComplete">
    <label class="block">
      <span class="text-sm font-medium">Card Number</span>
      <input
        type="text"
        placeholder="1234 5678 9012 3456"
        class="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
      />
    </label>

    <div class="flex gap-2">
      <label class="w-1/2">
        <span class="text-sm font-medium">Expiry</span>
        <input
          type="text"
          placeholder="MM/YY"
          class="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
      </label>
      <label class="w-1/2">
        <span class="text-sm font-medium">CVV</span>
        <input
          type="text"
          placeholder="123"
          class="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
      </label>
    </div>

    <button
      @click="mockPayment"
      class="w-full mt-4 bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
    >
      Pay Now
    </button>
  </div>
</section>
  </div>
</template>

<script setup>
import { useCartStore } from '../stores/cartStore'
import { ref, computed } from 'vue'

const cart = useCartStore()

const subtotal = computed(() =>
  cart.items.reduce((sum, item) => sum + item.price, 0)
)
const tax = computed(() => subtotal.value * 0.085)
const total = computed(() => subtotal.value + tax.value)

const orderId = ref(Math.floor(100000 + Math.random() * 900000))

const paymentComplete = ref(false)

function mockPayment() {
  paymentComplete.value = true
}

</script>
