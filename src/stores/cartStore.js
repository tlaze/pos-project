import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useCartStore = defineStore('cart', () => {
  const items = ref([]);

  const total = computed(() =>
    items.value.reduce((sum, item) => sum + item.price, 0)
  );

  function addToCart(item) {
    console.log(item.name, "added to cart")
    items.value.push(item);
  }

  function clearCart() {
    console.log("Cart cleared")
    items.value = [];
  }

  return { items, total, addToCart, clearCart };
});
