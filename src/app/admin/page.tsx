'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, CheckCircle, Truck, ChefHat, Package, Settings, Bell } from 'lucide-react'
import Image from 'next/image'
import Swal from 'sweetalert2'

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
    border: 'border-yellow-200',
    nextStatus: 'CONFIRMED' as const,
    nextLabel: 'ยืนยันออเดอร์'
  },
  CONFIRMED: {
    icon: CheckCircle,
    label: 'ยืนยันแล้ว',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    nextStatus: 'PREPARING' as const,
    nextLabel: 'เริ่มทำอาหาร'
  },
  PREPARING: {
    icon: ChefHat,
    label: 'กำลังทำอาหาร',
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    nextStatus: 'READY' as const,
    nextLabel: 'อาหารพร้อม'
  },
  READY: {
    icon: Package,
    label: 'พร้อมเสิร์ฟ',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    nextStatus: 'DELIVERED' as const,
    nextLabel: 'จัดส่งแล้ว'
  },
  DELIVERED: {
    icon: Truck,
    label: 'เสร็จสิ้น',
    color: 'text-green-600',
    bg: 'bg-green-50',
    border: 'border-green-200',
    nextStatus: null,
    nextLabel: null
  }
}

export default function AdminPanel() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isAdmin, setIsAdmin] = useState(false)
  const [adminPassword, setAdminPassword] = useState('')

  useEffect(() => {
    // Check if admin is already logged in
    const adminStatus = localStorage.getItem('isAdmin')
    if (adminStatus === 'true') {
      setIsAdmin(true)
      loadOrders()
      
      // Auto-refresh orders every 3 seconds to get new orders
      const interval = setInterval(() => {
        loadOrders()
      }, 3000)
      
      return () => clearInterval(interval)
    }
  }, [])

  const loadOrders = () => {
    const placedOrders = JSON.parse(localStorage.getItem('placedOrders') || '[]')
    const formattedOrders = placedOrders.map((order: Record<string, unknown>) => ({
      id: (order.id as string) || '',
      customerEmail: (order.customerEmail as string) || 'ไม่ระบุ',
      customerName: (order.customerName as string) || 'ไม่ระบุ',
      paymentMethod: (order.paymentMethod as string) || '',
      items: (order.items as OrderItem[]) || [],
      total: (order.total as number) || 0,
      status: (order.status === 'กำลังดำเนินการ' ? 'PENDING' : order.status) as 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'READY' | 'DELIVERED',
      createdAt: (order.createdAt as string) || new Date().toISOString(),
      estimatedTime: ((order.status === 'PREPARING') ? 15 : undefined) as number | undefined
    }))
        // Sort orders by creation date (newest first) - แสดงออเดอร์ใหม่ด้านบน
    const sortedOrders = sortOrdersByNewest(formattedOrders)

    setOrders(sortedOrders)
  }

  const handleAdminLogin = () => {
    // Simple password check (in production, use proper authentication)
    if (adminPassword === 'admin123') {
      setIsAdmin(true)
      localStorage.setItem('isAdmin', 'true')
      loadOrders()
      Swal.fire({
        icon: 'success',
        title: 'เข้าสู่ระบบแอดมินสำเร็จ',
        timer: 1500,
        showConfirmButton: false
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'รหัสผ่านไม่ถูกต้อง',
        confirmButtonColor: '#000'
      })
    }
  }

    const [filterDate, setFilterDate] = useState<string>('TODAY')

  // Helper function to sort orders by newest first
  const sortOrdersByNewest = (orderList: any[]) => {
    return orderList.sort((a: any, b: any) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  }

  // Helper function to filter orders by date
  const filterOrdersByDate = (orderList: Order[]) => {
    const today = new Date()
    const todayStr = today.toISOString().split('T')[0] // YYYY-MM-DD format
    
    return orderList.filter(order => {
      const orderDate = new Date(order.createdAt).toISOString().split('T')[0]
      
      switch (filterDate) {
        case 'TODAY':
          return orderDate === todayStr
        case 'ALL':
          // Show all orders from past to present (no future orders)
          return new Date(order.createdAt) <= today
        default:
          return orderDate === todayStr
      }
    })
  }

  const updateOrderStatus = (orderId: string, newStatus: 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'READY' | 'DELIVERED') => {
    const updatedOrders = orders.map(order => 
      order.id === orderId 
        ? { 
            ...order, 
            status: newStatus as 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'READY' | 'DELIVERED', 
            ...order, 
            status: newStatus,
            estimatedTime: newStatus === 'PREPARING' ? 15 : undefined,
            completedAt: newStatus === 'DELIVERED' ? new Date().toISOString() : (order as any).completedAt 
          }
        : order
    )
    
    // Sort orders after update (newest first) - แสดงออเดอร์ใหม่ด้านบน
    const sortedUpdatedOrders = sortOrdersByNewest(updatedOrders)
    
    setOrders(sortedUpdatedOrders)
    
    // Update localStorage with sorted orders
    localStorage.setItem('placedOrders', JSON.stringify(sortedUpdatedOrders))
    
    // Show success message
    const statusLabel = statusConfig[newStatus as keyof typeof statusConfig]?.label
    Swal.fire({
      icon: 'success',
      title: `อัพเดทสถานะเป็น "${statusLabel}" แล้ว`,
      timer: 1500,
      showConfirmButton: false
    })

    // Play notification sound (optional)
    try {
      const audio = new Audio('/notification.mp3')
      audio.play().catch(() => {}) // Ignore if audio fails
    } catch {
      // Ignore audio errors
    }
  }

  const getPendingOrdersCount = () => {
    return orders.filter(order => order.status === 'PENDING').length
  }

  const getActiveOrdersCount = () => {
    return orders.filter(order => ['PENDING', 'CONFIRMED', 'PREPARING'].includes(order.status)).length
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full"
        >
          <div className="text-center mb-6">
            <Settings className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Food-Order-Web</h2>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">แอดมินแพนเนล</h3>
            <p className="text-gray-600">กรุณาใส่รหัสผ่านเพื่อเข้าใช้งาน</p>
          </div>
          
          <div className="space-y-4">
            <input
              type="password"
              placeholder="รหัสผ่านแอดมิน"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleAdminLogin()
                }
              }}
            />
            <button
              onClick={handleAdminLogin}
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              เข้าสู่ระบบ
            </button>
          </div>
          
          <div className="mt-4 text-xs text-gray-500 text-center">
            รหัสผ่านทดสอบ: admin123
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 px-4 bg-gradient-to-br from-blue-50 via-white to-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">แอดมินแพนเนล</h1>
              <p className="text-gray-600">จัดการออเดอร์และสถานะต่างๆ</p>
            </div>
            <button
              onClick={() => {
                setIsAdmin(false)
                localStorage.removeItem('isAdmin')
              }}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              ออกจากระบบ
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <Bell className="w-8 h-8 text-yellow-600" />
                <div>
                  <p className="text-sm text-yellow-600 font-medium">รออนุมัติ</p>
                  <p className="text-2xl font-bold text-yellow-700">{getPendingOrdersCount()}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <ChefHat className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="text-sm text-blue-600 font-medium">ออเดอร์ที่ทำงานอยู่</p>
                  <p className="text-2xl font-bold text-blue-700">{getActiveOrdersCount()}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <Truck className="w-8 h-8 text-green-600" />
                <div>
                  <p className="text-sm text-green-600 font-medium">ออเดอร์ทั้งหมด</p>
                  <p className="text-2xl font-bold text-green-700">{orders.length}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filter Controls */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">กรองออเดอร์</h3>
              <div className="flex flex-wrap gap-3">
                {/* Date Filter */}
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-gray-600">วันที่:</label>
                  <select
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="TODAY">วันนี้</option>
                    <option value="ALL">ทั้งหมด (อดีต-ปัจจุบัน)</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="text-right">
              <p className="text-sm text-gray-500">ออเดอร์ที่แสดง</p>
              <p className="text-2xl font-bold text-gray-800">{filterOrdersByDate(orders).length}</p>
              <p className="text-sm text-green-600">฿{filterOrdersByDate(orders).reduce((sum, order) => sum + order.total, 0)}</p>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <AnimatePresence>
          {filterOrdersByDate(orders).length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">ยังไม่มีออเดอร์</h3>
              <p className="text-gray-500">รอออเดอร์จากลูกค้า</p>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {filterOrdersByDate(orders).map((order, index) => {
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
                          <StatusIcon className={`w-6 h-6 ${config.color}`} />
                          <div>
                            <h3 className="font-semibold text-gray-800">
                              ออเดอร์ #{order.id.slice(-8)}
                            </h3>
                            <p className={`text-sm ${config.color}`}>{config.label}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-gray-600">ลูกค้า:</span>
                              <span className="text-xs font-medium text-gray-800">{order.customerEmail || 'ไม่ระบุ'}</span>
                              {order.paymentMethod && (
                                <>
                                  <span className="text-xs text-gray-400">•</span>
                                  <span className="text-xs text-gray-600">
                                    {order.paymentMethod === 'promptpay' ? 'พร้อมเพย์' : 'เก็บเงินปลายทาง'}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="font-bold text-lg text-gray-800">฿{order.total}</p>
                            <p className="text-sm text-gray-500">
                              {new Date(order.createdAt).toLocaleDateString('th-TH', {
                                day: 'numeric',
                                month: 'short',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                          
                          {/* Action Button */}
                          {config.nextStatus && (
                            <button
                              onClick={() => updateOrderStatus(order.id, config.nextStatus!)}
                              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                order.status === 'PENDING' 
                                  ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                                  : order.status === 'CONFIRMED'
                                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                  : order.status === 'PREPARING'
                                  ? 'bg-orange-600 hover:bg-orange-700 text-white'
                                  : 'bg-purple-600 hover:bg-purple-700 text-white'
                              }`}
                            >
                              {config.nextLabel}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="p-6">
                      <div className="space-y-3">
                        {(order.items || []).map((item) => (
                          <div key={item.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                            <div className="w-12 h-12 relative rounded-lg overflow-hidden flex-shrink-0">
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
                                <div className="flex flex-wrap gap-1 mt-1">
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
                                <div className="mt-2 p-2 bg-yellow-50 border-l-4 border-yellow-300 rounded">
                                  <p className="text-xs text-yellow-800 font-medium">หมายเหตุ:</p>
                                  <p className="text-sm text-yellow-700">{item.notes}</p>
                                </div>
                              )}
                              <p className="text-sm text-gray-600 mt-1">จำนวน: {item.quantity}</p>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <p className="font-semibold text-gray-800">฿{item.price * item.quantity}</p>
                            </div>
                          </div>
                        ))}
                      </div>
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