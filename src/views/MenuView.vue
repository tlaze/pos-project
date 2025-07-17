<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-6">Menu</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <MenuCard
        v-for="item in menuItems"
        :key="item.id"
        :item="item"
        @add-to-cart="handleAddToCart"
      />
    </div>
  </div>
</template>

<script setup>
import { menuItems } from '../data/menu';
import MenuCard from '../components/MenuCard.vue';

function handleAddToCart(item) {
  console.log('Add to cart:', item.name);
}
</script>