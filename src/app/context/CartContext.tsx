'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type MenuItem = {
  name: string
  image: string
  color: string
  slug: string
}

type CartContextType = {
  cart: MenuItem[]
  addToCart: (item: MenuItem) => void
  removeFromCart: (slug: string) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<MenuItem[]>([])

  const addToCart = (item: MenuItem) => {
    setCart((prev) => [...prev, item])
  }

  const removeFromCart = (slug: string) => {
    setCart((prev) => prev.filter((item) => item.slug !== slug))
  }

  const clearCart = () => setCart([])

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
