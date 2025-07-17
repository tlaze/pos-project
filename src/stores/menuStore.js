import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { menuItems } from '../data/menu';

export const useMenuStore = defineStore('menu', () => {
  const selectedCategory = ref('All');
  const categories = ['All', 'Burgers', 'Sides', 'Drinks', 'Desserts'];

  const filteredItems = computed(() => {
    if (selectedCategory.value === 'All') return menuItems;
    return menuItems.filter(item => item.category === selectedCategory.value);
  });

  return {
    selectedCategory,
    categories,
    filteredItems
  };
});
