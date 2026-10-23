import { computed } from 'vue'
import type { CartItem } from '~/types/cart'

export const useCart = () => {
  const cartItems = useState<CartItem[]>('cart_items', () => {
    if (import.meta.client) {
      const saved = localStorage.getItem('pempek_cart')
      if (saved) {
        try {
          return JSON.parse(saved)
        } catch {
          // ignore parsing error
        }
      }
    }
    // Initial default items for demonstration if empty
    return [
      {
        id: 'paket-mini',
        productId: 'paket-mini',
        name: 'Paket Pempek Mini',
        variantLabel: '15 pcs Mix + Cuko',
        image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=600&q=80',
        unitPrice: 45000,
        quantity: 1
      }
    ]
  })

  const saveCart = () => {
    if (import.meta.client) {
      localStorage.setItem('pempek_cart', JSON.stringify(cartItems.value))
    }
  }

  const addItem = (item: Omit<CartItem, 'quantity'>, qty = 1) => {
    const existing = cartItems.value.find(i => i.id === item.id)
    if (existing) {
      existing.quantity += qty
    } else {
      cartItems.value.push({ ...item, quantity: qty })
    }
    saveCart()
  }

  const updateQuantity = (id: string, quantity: number) => {
    const item = cartItems.value.find(i => i.id === id)
    if (item) {
      if (quantity <= 0) {
        removeItem(id)
      } else {
        item.quantity = quantity
        saveCart()
      }
    }
  }

  const removeItem = (id: string) => {
    cartItems.value = cartItems.value.filter(i => i.id !== id)
    saveCart()
  }

  const clearCart = () => {
    cartItems.value = []
    saveCart()
  }

  const totalItemsCount = computed(() => {
    return cartItems.value.reduce((sum, item) => sum + item.quantity, 0)
  })

  const subtotalPrice = computed(() => {
    return cartItems.value.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0)
  })

  return {
    cartItems,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    totalItemsCount,
    subtotalPrice
  }
}
