import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useCartStore = defineStore('cart', () => {
  const items = ref([]);

  const total = computed(() =>
    items.value.reduce((sum, i) => sum + i.item.price * i.quantity, 0)
  );

  function addToCart(item) {
    const existing = items.value.find(i => i.item.id === item.id);
    if (existing) {
      existing.quantity++;
    } else {
      items.value.push({ item, quantity: 1 });
    }
  }

  function increment(itemId) {
    const found = items.value.find(i => i.item.id === itemId);
    if (found) found.quantity++;
  }

  function decrement(itemId) {
    const found = items.value.find(i => i.item.id === itemId);
    if (found) {
      found.quantity--;
      if (found.quantity === 0) {
        items.value = items.value.filter(i => i.item.id !== itemId);
      }
    }
  }

  function clearCart() {
    items.value = [];
  }

  return { items, total, addToCart, increment, decrement, clearCart };
}, {
    persist:true
});
