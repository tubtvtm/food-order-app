'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, CheckCircle, Truck, ChefHat, Package, X, ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import { useOrders } from '@/app/context/OrderContext'
import { useUser } from '@/app/context/UserContext'

interface OrderItem {
  id: string
  name: string
  image: string
  price: number
  quantity: number
  details?: any
}

interface Order {
  id: string
  customerEmail?: string
  customerName?: string
  paymentMethod?: string
  items: OrderItem[]
  total: number
  status: 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'READY' | 'DELIVERED'
  createdAt: string
  estimatedTime?: number
}

interface OrderSidebarProps {
  isOpen: boolean
  onClose: () => void
}

const statusConfig = {
  PENDING: {
    icon: Clock,
    label: 'รอยืนยัน',
    color: 'text-yellow-600',
    bg: 'bg-yellow-50',
    border: 'border-yellow-200'
  },
  CONFIRMED: {
    icon: CheckCircle,
    label: 'ยืนยันแล้ว',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200'
  },
  PREPARING: {
    icon: ChefHat,
    label: 'กำลังทำอาหาร',
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    border: 'border-orange-200'
  },
  READY: {
    icon: Package,
    label: 'พร้อมเสิร์ฟ',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-200'
  },
  DELIVERED: {
    icon: Truck,
    label: 'เสร็จสิ้น',
    color: 'text-green-600',
    bg: 'bg-green-50',
    border: 'border-green-200'
  }
}

export default function OrderSidebar({ isOpen, onClose }: OrderSidebarProps) {
  const { orders: contextOrders } = useOrders()
  const { user } = useUser()
  const [orders, setOrders] = useState<Order[]>([])

  // Convert context orders to proper format
  const convertOrderStatus = useCallback((status: string): 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'READY' | 'DELIVERED' => {
    switch (status) {
      case 'กำลังดำเนินการ':
        return 'PREPARING'
      case 'จัดส่งแล้ว':
        return 'DELIVERED'
      default:
        return 'PENDING'
    }
  }, [])

  useEffect(() => {
    // Get orders from localStorage (placed orders)
    const placedOrders = JSON.parse(localStorage.getItem('placedOrders') || '[]')
    
    // Convert context orders to proper format
    const convertedOrders = contextOrders.map(order => ({
      ...order,
      status: convertOrderStatus(order.status),
      items: Array.isArray(order.items) ? order.items : []
    }))

    // Convert placed orders to proper format
    const convertedPlacedOrders = placedOrders.map((order: any, index: number) => ({
      id: order.id || `ORDER-${Date.now()}-${index}`,
      items: order.items || [],
      total: order.total || 0,
      status: 'PREPARING' as const,
      createdAt: order.createdAt || new Date().toISOString(),
      estimatedTime: 15
    }))

    // Combine context orders with placed orders
    const allOrders = [...convertedOrders, ...convertedPlacedOrders]
    setOrders(allOrders)

    // Simulate order status updates
    const interval = setInterval(() => {
      setOrders(prevOrders => 
        prevOrders.map(order => {
          if (order.status === 'PREPARING' && Math.random() > 0.7) {
            return { ...order, status: 'READY' as const }
          }
          if (order.status === 'PENDING' && Math.random() > 0.8) {
            return { ...order, status: 'CONFIRMED' as const }
          }
          return order
        })
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [contextOrders, convertOrderStatus])

  const LoadingDots = () => (
    <div className="flex space-x-1">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 bg-current rounded-full"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            delay: i * 0.2 
          }}
        />
      ))}
    </div>
  )

  const CountdownTimer = ({ estimatedTime }: { estimatedTime: number }) => {
    const [timeLeft, setTimeLeft] = useState(estimatedTime * 60)

    useEffect(() => {
      const timer = setInterval(() => {
        setTimeLeft((prev) => Math.max(0, prev - 1))
      }, 1000)

      return () => clearInterval(timer)
    }, [])

    const minutes = Math.floor(timeLeft / 60)
    const seconds = timeLeft % 60

    return (
      <motion.div 
        className="text-xs font-mono bg-orange-100 px-2 py-1 rounded"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        เหลือ {minutes}:{seconds.toString().padStart(2, '0')}
      </motion.div>
    )
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />
          
          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">ประวัติการสั่งซื้อ</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4">
              {!user ? (
                <div className="text-center py-8">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">กรุณาเข้าสู่ระบบ</h3>
                  <p className="text-gray-500 text-sm">เพื่อดูประวัติคำสั่งซื้อ</p>
                </div>
              ) : orders.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-3">🍽️</div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">ยังไม่มีคำสั่งซื้อ</h3>
                  <p className="text-gray-500 text-sm">เริ่มสั่งอาหารเลยสิ!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order, index) => {
                    const config = statusConfig[order.status] || statusConfig.PENDING
                    const StatusIcon = config.icon
                    
                    return (
                      <motion.div
                        key={order.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`bg-white border-2 ${config.border} rounded-xl shadow-sm overflow-hidden`}
                      >
                        {/* Header */}
                        <div className={`${config.bg} px-4 py-3`}>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <motion.div
                                animate={{ 
                                  rotate: order.status === 'PREPARING' ? [0, 360] : 0,
                                  scale: order.status === 'PREPARING' ? [1, 1.1, 1] : 1
                                }}
                                transition={{ 
                                  duration: order.status === 'PREPARING' ? 2 : 0,
                                  repeat: order.status === 'PREPARING' ? Infinity : 0
                                }}
                              >
                                <StatusIcon className={`w-4 h-4 ${config.color}`} />
                              </motion.div>
                              <div>
                                <h3 className="font-semibold text-sm text-gray-800 flex items-center gap-1">
                                  #{order.id.slice(-6)}
                                  {(order.status === 'PREPARING' || order.status === 'CONFIRMED') && <LoadingDots />}
                                </h3>
                                <p className={`text-xs ${config.color}`}>{config.label}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-sm text-gray-800">฿{order.total}</p>
                            </div>
                          </div>
                          
                          {order.status === 'PREPARING' && order.estimatedTime && (
                            <div className="mt-2 flex items-center gap-1">
                              <span className="text-xs text-gray-600">เวลา:</span>
                              <CountdownTimer estimatedTime={order.estimatedTime} />
                            </div>
                          )}
                        </div>

                        {/* Items */}
                        <div className="p-3">
                          <div className="space-y-2">
                            {(order.items || []).slice(0, 2).map((item) => (
                              <div key={item.id} className="flex items-center gap-2">
                                <div className="w-10 h-10 relative rounded overflow-hidden flex-shrink-0">
                                  <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-medium text-sm text-gray-800 truncate">{item.name}</h4>
                                  <p className="text-xs text-gray-500">จำนวน: {item.quantity}</p>
                                </div>
                                <div className="text-right flex-shrink-0">
                                  <p className="font-semibold text-sm text-gray-800">฿{item.price * item.quantity}</p>
                                </div>
                              </div>
                            ))}
                            {order.items && order.items.length > 2 && (
                              <p className="text-xs text-gray-500 text-center">และอีก {order.items.length - 2} รายการ</p>
                            )}
                          </div>
                        </div>

                        {/* Progress Bar for active orders */}
                        {(order.status === 'PREPARING' || order.status === 'CONFIRMED') && (
                          <div className="px-3 pb-3">
                            <div className="bg-gray-200 rounded-full h-1 overflow-hidden">
                              <motion.div
                                className="h-full bg-gradient-to-r from-orange-400 to-orange-600"
                                initial={{ width: '0%' }}
                                animate={{ 
                                  width: order.status === 'CONFIRMED' ? '40%' : '70%' 
                                }}
                                transition={{ duration: 1 }}
                              />
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )
                  })}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}