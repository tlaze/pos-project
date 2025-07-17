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

    <!-- Confirmation Section -->
    <section class="md:w-1/2 bg-white rounded-lg p-6 shadow text-center flex flex-col items-center justify-center">
      <h2 class="text-2xl font-bold mb-2">Thank you for your order!</h2>
      <p class="text-gray-600 mb-2">Your meal is being prepared.</p>
      <p class="text-sm text-gray-500">Order #{{ orderId }}</p>
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

</script>
