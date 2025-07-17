<template>
  <main class="w-full md:w-3/5 p-4">
    <h1 class="text-3xl font-bold mb-6">Order Now</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <MenuCard
        v-for="item in menu.filteredItems"
        :key="item.id"
        :item="item"
      />
    </div>
  </main>
</template>

<script setup>
import { useMenuStore } from '../stores/menuStore';
import MenuCard from './MenuCard.vue';

const menu = useMenuStore();
</script>
