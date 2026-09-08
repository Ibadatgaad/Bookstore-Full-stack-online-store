import React, { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext(null)
const CART_STORAGE_KEY = 'bookstore_cart'

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems))
  }, [cartItems])

  // Add a book — if already in cart, increase qty
  const addToCart = (book) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === book.id)
      if (existing) {
        return prev.map((i) =>
          i.id === book.id ? { ...i, qty: i.qty + 1 } : i
        )
      }
      return [...prev, { ...book, qty: 1 }]
    })
  }

  const removeFromCart = (id) =>
    setCartItems((prev) => prev.filter((i) => i.id !== id))

  const updateQty = (id, qty) => {
    if (qty < 1) return
    setCartItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty } : i))
    )
  }

  const clearCart = () => setCartItems([])

  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0)
  const subtotal  = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0)

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQty, clearCart, cartCount, subtotal }}
    >
      {children}
    </CartContext.Provider>
  )
}

// Custom hook for easy access
export const useCart = () => useContext(CartContext)