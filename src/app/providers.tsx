'use client'

import { UserProvider } from '@/app/context/UserContext'
import { CartProvider } from '@/app/context/CartContext'
import { OrderProvider } from '@/app/context/OrderContext'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <CartProvider>
        <OrderProvider>
          {children}
        </OrderProvider>
      </CartProvider>
    </UserProvider>
  )
}