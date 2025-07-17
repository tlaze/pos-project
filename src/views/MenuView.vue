<template>
  <div class="flex flex-col md:flex-row">
    <CategoryFilter />
    <MenuGrid />
    <CartPanel />
  </div>
</template>

<script setup>
import CategoryFilter from '../components/CategoryFilter.vue';
import MenuGrid from '../components/MenuGrid.vue';
import CartPanel from '../components/CartPanel.vue';
</script>