'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, CheckCircle, Truck, ChefHat, Package, ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useUser } from '@/app/context/UserContext'

interface OrderItem {
  id: string
  name: string
  image: string
  price: number
  quantity: number
  details?: Record<string, unknown>
  notes?: string
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

export default function OrderHistoryPage() {
  const { user } = useUser()
  const [orders, setOrders] = useState<Order[]>([])
  const router = useRouter()

  const [userData, setUser] = useState<typeof user>(user)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }

    // Get orders from localStorage (placed orders only)
    const placedOrders = JSON.parse(localStorage.getItem('placedOrders') || '[]')
    
    // Filter orders for current user only
    const userOrders = placedOrders.filter((order: Record<string, unknown>) => 
      order.customerEmail === userData?.email
    )
    
    // Convert placed orders to proper format
    const convertedPlacedOrders = userOrders.map((order: Record<string, unknown>, index: number) => ({
      id: (order.id as string) || `ORDER-${Date.now()}-${index}`,
      customerEmail: (order.customerEmail as string) || 'ไม่ระบุ',
      customerName: (order.customerName as string) || 'ไม่ระบุ',
      paymentMethod: (order.paymentMethod as string) || '',
      items: (order.items as OrderItem[]) || [],
      total: (order.total as number) || 0,
      status: (order.status as 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'READY' | 'DELIVERED') || 'PENDING',
      createdAt: (order.createdAt as string) || new Date().toISOString(),
      estimatedTime: (order.status === 'PREPARING') ? 15 : undefined,
      completedAt: (order as any).completedAt
    }))

    // Sort orders by creation date (newest first) - แสดงออเดอร์ใหม่ด้านบน
    const sortedOrders = convertedPlacedOrders.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

    // Only show user's orders
    setOrders(sortedOrders)

    // Real-time order updates - refresh every 5 seconds to check for admin updates
    const interval = setInterval(() => {
      const updatedPlacedOrders = JSON.parse(localStorage.getItem('placedOrders') || '[]')
      
      // Filter orders for current user only
      const updatedUserOrders = updatedPlacedOrders.filter((order: Record<string, unknown>) => 
        order.customerEmail === userData?.email
      )
      
      const updatedConvertedOrders = updatedUserOrders.map((order: Record<string, unknown>, index: number) => ({
        id: (order.id as string) || `ORDER-${Date.now()}-${index}`,
        customerEmail: (order.customerEmail as string) || 'ไม่ระบุ',
        customerName: (order.customerName as string) || 'ไม่ระบุ',
        paymentMethod: (order.paymentMethod as string) || '',
        items: (order.items as OrderItem[]) || [],
        total: (order.total as number) || 0,
        status: (order.status as 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'READY' | 'DELIVERED') || 'PENDING',
        createdAt: (order.createdAt as string) || new Date().toISOString(),
        estimatedTime: (order.status === 'PREPARING') ? 15 : undefined
      }))
      
      // Sort updated orders by creation date (newest first) - แสดงออเดอร์ใหม่ด้านบน
      const sortedUpdatedOrders = updatedConvertedOrders.sort((a: any, b: any) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      
      // Only show user's orders
      setOrders(sortedUpdatedOrders)
    }, 5000)

    return () => clearInterval(interval)
  }, [userData?.email])

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



  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">กรุณาเข้าสู่ระบบ</h2>
          <p className="text-gray-600">เพื่อดูประวัติคำสั่งซื้อ</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 px-4 bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="mb-6">
            <button
              onClick={() => router.push('/')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
              <span className="font-medium">กลับหน้าหลัก</span>
            </button>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">ประวัติคำสั่งซื้อ</h1>
          <p className="text-gray-600">ติดตามสถานะและรายละเอียดคำสั่งซื้อของคุณ</p>
        </motion.div>

        <AnimatePresence>
          {orders.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-6xl mb-4">🍽️</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">ยังไม่มีคำสั่งซื้อ</h3>
              <p className="text-gray-500">เริ่มสั่งอาหารเลยสิ!</p>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {orders.map((order, index) => {
                const config = statusConfig[order.status] || statusConfig.PENDING
                const StatusIcon = config.icon
                
                return (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border-2 ${config.border} overflow-hidden`}
                  >
                    {/* Header */}
                    <div className={`${config.bg} px-6 py-4 border-b border-gray-100`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
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
                            <StatusIcon className={`w-6 h-6 ${config.color}`} />
                          </motion.div>
                          <div>
                            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                              คำสั่งซื้อ #{order.id}
                              {(order.status === 'PREPARING' || order.status === 'CONFIRMED') && <LoadingDots />}
                            </h3>
                            <p className={`text-sm ${config.color}`}>{config.label}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg text-gray-800">฿{order.total}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(order.createdAt).toLocaleDateString('th-TH', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>
                      

                    </div>

                    {/* Items */}
                    <div className="p-6">
                      <div className="space-y-4">
                        {(order.items || []).map((item) => (
                          <motion.div
                            key={item.id}
                            className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl"
                            whileHover={{ scale: 1.02 }}
                          >
                            <div className="w-16 h-16 relative rounded-lg overflow-hidden">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-800">{item.name}</h4>
                              {item.details && (
                                <div className="flex flex-wrap gap-2 mt-1">
                                  {Object.entries(item.details).map(([key, value]) => (
                                    <span
                                      key={key}
                                      className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded"
                                    >
                                      {String(value)}
                                    </span>
                                  ))}
                                </div>
                              )}
                              {item.notes && (
                                <div className="mt-2 p-2 bg-gray-100 rounded-lg">
                                  <p className="text-xs text-gray-600 font-medium">หมายเหตุ:</p>
                                  <p className="text-sm text-gray-700">{item.notes}</p>
                                </div>
                              )}
                              <p className="text-sm text-gray-600 mt-1">จำนวน: {item.quantity}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-gray-800">฿{item.price * item.quantity}</p>
                              <p className="text-sm text-gray-500">฿{item.price} x {item.quantity}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Progress Bar for active orders */}
                    {(order.status === 'PREPARING' || order.status === 'CONFIRMED') && (
                      <div className="px-6 pb-4">
                        <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-orange-400 to-orange-600"
                            initial={{ width: '0%' }}
                            animate={{ 
                              width: order.status === 'CONFIRMED' ? '40%' : '70%' 
                            }}
                            transition={{ duration: 1 }}
                          />
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>ได้รับออเดอร์</span>
                          <span>กำลังทำ</span>
                          <span>พร้อมเสิร์ฟ</span>
                        </div>
                      </div>
                    )}

                    {/* Thank you message for completed orders */}
                    {order.status === 'DELIVERED' && (
                      <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-base font-semibold text-green-800">
                              ขอบคุณที่ใช้บริการ
                            </p>
                            <p className="text-sm text-green-600">
                              การสั่งซื้อเสร็จสมบูรณ์แล้ว
                            </p>
                            {(order as any).completedAt && (
                              <p className="text-xs text-green-500 mt-1">
                                เสร็จสิ้นเมื่อ: {new Date((order as any).completedAt).toLocaleString('th-TH')}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="space-y-3">
                      {order.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={60}
                            height={60}
                            className="rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{item.name}</h4>
                            {item.meat && (
                              <p className="text-sm text-gray-600">เนื้อ: {item.meat}</p>
                            )}
                            {item.noodleType && (
                              <p className="text-sm text-gray-600">เส้น: {item.noodleType}</p>
                            )}
                            {item.soup && (
                              <p className="text-sm text-gray-600">น้ำซุป: {item.soup}</p>
                            )}
                            {item.flavor && (
                              <p className="text-sm text-gray-600">รสชาติ: {item.flavor}</p>
                            )}
                            {item.crust && (
                              <p className="text-sm text-gray-600">แป้ง: {item.crust}</p>
                            )}
                            {item.notes && (
                              <p className="text-sm text-gray-500 italic">หมายเหตุ: {item.notes}</p>
                            )}
                            <div className="flex justify-between items-center mt-2">
                              <span className="text-sm text-gray-600">จำนวน: {item.quantity}</span>
                              <span className="font-semibold text-gray-900">฿{item.price * item.quantity}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

