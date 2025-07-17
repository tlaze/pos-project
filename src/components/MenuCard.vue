<template>
  <div class="rounded-xl shadow p-4 bg-white h-full flex flex-col justify-between">
    <!-- Image Container -->
    <div class="h-40 flex justify-center items-center mb-4">
      <img
        :src="item.image"
        :alt="item.name"
        class="h-full object-contain"
      />
    </div>

    <h2 class="text-xl font-bold">{{ item.name }}</h2>
    <p class="text-sm text-gray-600">{{ item.description }}</p>
    <div class="mt-2 font-semibold">${{ item.price.toFixed(2) }}</div>
    <button
      @click="$emit('add-to-cart', item)"
      class="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
    >
      Add to Cart
    </button>
  </div>
</template>

<script setup>
defineProps(['item']);
defineEmits(['add-to-cart']);
</script>