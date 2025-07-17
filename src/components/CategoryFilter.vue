<template>
  <aside class="w-full md:w-1/5 bg-amber-50 p-4 border-r">
    <h2 class="text-xl font-bold mb-4">Categories</h2>
    <ul class="space-y-2">
      <li v-for="cat in menu.categories" :key="cat">
        <button
          @click="menu.selectedCategory = cat"
          class="w-full text-left px-2 py-1 rounded hover:font-semibold"
          :class="menu.selectedCategory === cat ? 'bg-orange-200 font-bold' : ''"
        >
          {{ cat }}
        </button>
      </li>
    </ul>
  </aside>
</template>

<script setup>
import { useMenuStore } from '../stores/menuStore';
const menu = useMenuStore();
</script>
