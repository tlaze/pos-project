import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach } from 'vitest'
import { useCartStore } from '/src/stores/cartStore'

describe('Cart Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('adds an item to the cart', () => {
    const cart = useCartStore()
    const sampleItem = { id: 1, name: 'Burger', price: 5 }

    cart.addToCart(sampleItem)

    expect(cart.items.length).toBe(1)
    expect(cart.items[0].item).toEqual(sampleItem)
    expect(cart.items[0].quantity).toBe(1)
  })

  it('increases quantity if item already exists', () => {
    const cart = useCartStore()
    const sampleItem = { id: 1, name: 'Burger', price: 5 }

    cart.addToCart(sampleItem)
    cart.addToCart(sampleItem)

    expect(cart.items.length).toBe(1)
    expect(cart.items[0].quantity).toBe(2)
  })
})
