'use client'

/**
 * hooks/useCart.ts
 * Consume the cart context from CartProvider.
 * Import this in any Client Component that needs cart access.
 *
 * Usage:
 *   const { items, addItem, removeItem, total, count } = useCart()
 */

import { useContext } from 'react'
import { CartContext } from '@/providers/CartProvider'

export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error(
      'useCart must be used inside a <CartProvider>. ' +
      'Check that CartProvider wraps your component in app/layout.tsx.'
    )
  }

  return context
}