<template>
  <div class="flex flex-col md:flex-row">
    <!-- Sidebar Categories -->
    <aside class="w-full md:w-1/5 bg-amber-50 p-4 border-r">
      <h2 class="text-xl font-bold mb-4">Categories</h2>
      <ul class="space-y-2">
        <li v-for="cat in categories" :key="cat">
          <button
            @click="selectedCategory = cat"
            class="w-full text-left px-2 py-1 rounded hover:font-semibold"
            :class="selectedCategory === cat ? 'bg-orange-200 font-bold' : ''"
          >
          {{ cat }}
        </button>
      </li>
      </ul>
    </aside>

    <!-- Menu Grid -->
    <main class="w-full md:w-3/5 p-4">
      <h1 class="text-3xl font-bold mb-6">Order Now</h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <MenuCard
        v-for="item in filteredItems"
        :key="item.id"
        :item="item"
        @add-to-cart="handleAddToCart"
      />
      </div>
    </main>

    <!-- Cart Sidebar -->
    <aside class="w-full md:w-1/5 bg-amber-50 p-4 border-l mt-4 md:mt-0">
      <h2 class="text-xl font-bold mb-4">Your Order</h2>
      <ul class="space-y-2">
        <li v-for="item in cart" :key="item.id" class="flex justify-between">
          <span>{{ item.name }}</span>
          <span>${{ item.price.toFixed(2) }}</span>
        </li>
      </ul>
      <div class="mt-6 border-t pt-4">
        <div class="flex justify-between font-bold">
          <span>Total:</span>
          <span>${{ total.toFixed(2) }}</span>
        </div>
        <button
          @click="clearCart"
          class="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Clear Cart
        </button>
        <button
          class="w-full mt-4 bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
        >
          Place Order
        </button>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { menuItems } from '../data/menu';
import MenuCard from '../components/MenuCard.vue';

const cart = ref([]);
const selectedCategory = ref('All');

const categories = ['All', 'Burgers', 'Sides', 'Drinks', 'Desserts'];

function handleAddToCart(item) {
  console.log(item.name + " added to cart")
  cart.value.push(item);
}

function clearCart() {
  cart.value = [];
}

const filteredItems = computed(() => {
  if (selectedCategory.value === 'All') return menuItems;
  return menuItems.filter(item => item.category === selectedCategory.value);
});

const total = computed(() =>
  cart.value.reduce((sum, item) => sum + item.price, 0)
);
</script>