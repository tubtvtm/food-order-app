'use client'
import { createContext, useContext, useState, useEffect } from 'react'
import { useUser } from './UserContext'

interface Order {
  id: string
  items: any[]
  total: number
  createdAt: string
  status: 'กำลังดำเนินการ' | 'จัดส่งแล้ว'
  userEmail: string
}

interface OrderContextType {
  orders: Order[]
  addOrder: (items: any[], total: number) => void
}

const OrderContext = createContext<OrderContextType | undefined>(undefined)

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([])
  const { user } = useUser()

  // Load orders from localStorage when component mounts
  useEffect(() => {
    const savedOrders = localStorage.getItem('orders')
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders))
    }
  }, [])

  // Save orders to localStorage whenever they change
  useEffect(() => {
    if (orders.length > 0) {
      localStorage.setItem('orders', JSON.stringify(orders))
    }
  }, [orders])

  const addOrder = (items: any[], total: number) => {
    if (!user?.email) return

    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9),
      items,
      total,
      createdAt: new Date().toISOString(),
      status: 'กำลังดำเนินการ',
      userEmail: user.email
    }

    setOrders(prevOrders => [...prevOrders, newOrder])
  }

  return (
    <OrderContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrderContext.Provider>
  )
}

export const useOrders = () => {
  const context = useContext(OrderContext)
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider')
  }
  return context
}
