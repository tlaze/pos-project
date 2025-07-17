<template>
  <aside class="w-full md:w-1/5 bg-amber-50 p-4 border-l mt-4 md:mt-0">
    <h2 class="text-xl font-bold mb-4">Your Order</h2>
    <ul class="space-y-2">
    <li v-for="cartItem in cart.items" :key="cartItem.item.id" class="flex justify-between items-center">
        <div>
        <p class="font-semibold">{{ cartItem.item.name }}</p>
        <div class="flex items-center gap-2 mt-1">
            <button @click="cart.decrement(cartItem.item.id)" class="px-2 bg-gray-200 rounded">−</button>
            <span>{{ cartItem.quantity }}</span>
            <button @click="cart.increment(cartItem.item.id)" class="px-2 bg-gray-200 rounded">+</button>
        </div>
        </div>
        <span class="font-medium">
        ${{ (cartItem.item.price * cartItem.quantity).toFixed(2) }}
        </span>
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
