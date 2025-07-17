<template>
  <div class="w-full max-w-sm text-left space-y-2">
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
      @click="submitPayment"
      class="w-full mt-4 bg-green-500 text-white py-2 rounded hover:bg-green-600"
    >
      Pay Now
    </button>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import { socket } from '../socket'
import { useCartStore } from '../stores/cartStore'

const props = defineProps({
  orderId: Number
})
const cart = useCartStore()
const emit = defineEmits(['payment-complete'])

const cardNumber = ref('')
const expiry = ref('')
const cvv = ref('')

const errors = ref({
  cardNumber: '',
  expiry: '',
  cvv: ''
})

function validate() {
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

function submitPayment() {
  if (validate()) {
    // Build order payload
    const order = {
      id: props.orderId,
      items: cart.items.map((i) => `${i.item.name} x${i.quantity}`),
      status: 'pending',
      createdAt: new Date().toISOString()
    }

    // Send to server
    socket.emit('new-order', order)

    // Clear cart
    cart.clearCart()

    // Emit to parent
    emit('payment-complete')
  }
}
</script>
