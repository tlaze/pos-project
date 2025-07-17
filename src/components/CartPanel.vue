<template>
  <aside class="w-full md:w-1/5 bg-amber-50 p-4 border-l mt-4 md:mt-0">
    <h2 class="text-xl font-bold mb-4">Your Order</h2>
    <ul class="space-y-2">
      <li v-for="item in cart.items" :key="item.id" class="flex justify-between">
        <span>{{ item.name }}</span>
        <span>${{ item.price.toFixed(2) }}</span>
      </li>
    </ul>
    <div class="mt-6 border-t pt-4">
      <div class="flex justify-between font-bold">
        <span>Total:</span>
        <span>${{ cart.total.toFixed(2) }}</span>
      </div>
      <button
        @click="cart.clearCart"
        class="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Clear Cart
      </button>
      <button
        @click="handleCheckout"
        class="w-full mt-4 bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
      >
        Place Order
      </button>
    </div>
  </aside>
</template>

<script setup>
import { useCartStore } from '../stores/cartStore';
import { useRouter } from 'vue-router';

const cart = useCartStore();
const router = useRouter();

function handleCheckout(){
    router.push('/checkout')
}
</script>
