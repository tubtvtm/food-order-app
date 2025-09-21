'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'

type CartItem = {
  name: string
  image: string
  price: number
  quantity: number
  meat?: string
  flavor?: string
  crust?: string
  noodleType?: string
  soup?: string
  spice?: string
  broth?: string
  sides?: string[]
  garnishes?: string[]
  toppings?: string[]
  notes?: string
}

interface CartSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const router = useRouter()

  useEffect(() => {
    if (isOpen) {
      const items = JSON.parse(localStorage.getItem('cart') || '[]')
      setCartItems(items)
    }
  }, [isOpen])

  const updateCart = (newCart: CartItem[]) => {
    setCartItems(newCart)
    localStorage.setItem('cart', JSON.stringify(newCart))
  }

  const increaseQuantity = (index: number) => {
    const newCart = [...cartItems]
    newCart[index].quantity += 1
    updateCart(newCart)
  }

  const decreaseQuantity = (index: number) => {
    const newCart = [...cartItems]
    if (newCart[index].quantity > 1) {
      newCart[index].quantity -= 1
      updateCart(newCart)
    }
  }

  const removeItem = (index: number) => {
    Swal.fire({
      title: 'ลบสินค้า?',
      text: 'คุณต้องการลบสินค้านี้ออกจากตะกร้าหรือไม่?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'ลบ',
      cancelButtonText: 'ยกเลิก',
      background: '#fff',
      customClass: {
        popup: 'rounded-xl'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const newCart = cartItems.filter((_, idx) => idx !== index)
        updateCart(newCart)
      }
    })
  }

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Swal.fire({
        icon: 'info',
        title: 'ตะกร้าว่างเปล่า',
        text: 'กรุณาเลือกสินค้าก่อนทำการสั่งซื้อ',
        confirmButtonColor: '#059669',
        customClass: {
          popup: 'rounded-xl'
        }
      })
      return
    }

    // Show success notification at the top
    Swal.fire({
      icon: 'success',
      title: 'เพิ่มออเดอร์สำเร็จ!',
      text: `เพิ่ม ${cartItems.length} รายการลงในออเดอร์แล้ว`,
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
      position: 'top',
      toast: true,
      background: '#f0fdf4',
      color: '#166534',
      customClass: {
        popup: 'rounded-xl shadow-lg border border-green-200',
        title: 'text-sm font-semibold'
      }
    }).then(() => {
      router.push('/payment')
      onClose()
    })

    // Also immediately redirect after showing notification
    setTimeout(() => {
      router.push('/payment')
      onClose()
    }, 500)
  }

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-gray-900 z-40"
          />
          
          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-80 sm:w-96 bg-white z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white">
              <div>
                <h2 className="text-xl font-bold text-gray-900">ตะกร้าของฉัน</h2>
                <p className="text-sm text-gray-500 mt-0.5">{cartItems.length} รายการ</p>
              </div>
              <button 
                onClick={onClose} 
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center px-6">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5-5M17 18.5a.5.5 0 11-1 0 .5.5 0 011 0zM9 18.5a.5.5 0 11-1 0 .5.5 0 011 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">ตะกร้าว่างเปล่า</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">เลือกอาหารอร่อยๆ ที่คุณชอบ<br/>แล้วมาสั่งกันเถอะ!</p>
                </div>
              ) : (
                <div className="p-6 space-y-4">
                  {cartItems.map((item, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                      <div className="flex gap-4">
                        {/* Product Image */}
                        <div className="w-16 h-16 relative rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          {/* Product Name */}
                          <h3 className="font-medium text-gray-900 text-base mb-2 line-clamp-1">{item.name}</h3>
                          
                          {/* Product Options */}
                          <div className="space-y-1 mb-3">
                            {item.meat && (
                              <span className="inline-block text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full mr-1">
                                {item.meat}
                              </span>
                            )}
                            {item.noodleType && (
                              <span className="inline-block text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full mr-1">
                                {item.noodleType}
                              </span>
                            )}
                            {item.soup && (
                              <span className="inline-block text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full mr-1">
                                {item.soup}
                              </span>
                            )}
                            {item.flavor && (
                              <span className="inline-block text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full mr-1">
                                {item.flavor}
                              </span>
                            )}
                            {item.crust && (
                              <span className="inline-block text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full mr-1">
                                {item.crust}
                              </span>
                            )}
                            {item.notes && (
                              <div className="text-xs text-gray-600 mt-1 italic">
                                หมายเหตุ: {item.notes}
                              </div>
                            )}
                          </div>

                          {/* Quantity Controls & Price */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => decreaseQuantity(index)}
                                className="w-8 h-8 bg-white border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50 transition-colors"
                              >
                                <span className="text-gray-600 font-medium">−</span>
                              </button>
                              <span className="font-medium text-gray-900 min-w-[20px] text-center">{item.quantity}</span>
                              <button
                                onClick={() => increaseQuantity(index)}
                                className="w-8 h-8 bg-gray-900 rounded-md flex items-center justify-center hover:bg-gray-800 transition-colors"
                              >
                                <span className="text-white font-medium">+</span>
                              </button>
                            </div>
                            
                            <div className="text-right">
                              <div className="font-semibold text-gray-900">฿{item.price * item.quantity}</div>
                              <button
                                onClick={() => removeItem(index)}
                                className="text-xs text-gray-400 hover:text-red-500 transition-colors mt-1"
                              >
                                ลบ
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="border-t border-gray-200 bg-white p-6">
                <div className="space-y-4">
                  {/* Total */}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">ยอดรวมทั้งหมด</span>
                    <span className="text-xl font-bold text-gray-900">฿{totalPrice}</span>
                  </div>
                  
                  {/* Checkout Button */}
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-gray-900 text-white py-3.5 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                  >
                    ดำเนินการสั่งซื้อ
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}