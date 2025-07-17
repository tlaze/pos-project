<template>
  <section class="bg-amber-50 rounded-lg p-6 shadow">
    <h2 class="text-2xl font-bold mb-4">Order Summary</h2>

    <ul class="divide-y divide-gray-200">
        <li
        v-for="cartItem in cart.items"
        :key="cartItem.item.id"
        class="flex justify-between py-2"
        >
        <span>{{ cartItem.item.name }} (x{{ cartItem.quantity }})</span>
        <span>${{ (cartItem.item.price * cartItem.quantity).toFixed(2) }}</span>
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
</template>

<script setup>
import { computed } from 'vue'
import { useCartStore } from '../stores/cartStore'

const cart = useCartStore()

const subtotal = computed(() =>
  cart.items.reduce((sum, cartItem) => sum + cartItem.item.price * cartItem.quantity, 0)
)
const tax = computed(() => subtotal.value * 0.085)
const total = computed(() => subtotal.value + tax.value)
</script>
