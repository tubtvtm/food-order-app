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
      title: 'ต้องการลบสินค้า?',
      text: 'คุณแน่ใจหรือไม่ที่จะลบสินค้านี้?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#000',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'ลบ',
      cancelButtonText: 'ยกเลิก'
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
        icon: 'warning',
        title: 'ตะกร้าว่าง',
        text: 'กรุณาเลือกสินค้าก่อนชำระเงิน',
        confirmButtonColor: '#000',
      })
      return
    }

    router.push('/payment')
    onClose()
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
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-40"
          />
          
          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween' }}
            className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl z-50 overflow-y-auto"
          >
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">🛒 ตะกร้าสินค้า</h2>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                  ✕
                </button>
              </div>

              {cartItems.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">🛒 ไม่มีสินค้าในตะกร้า</p>
                  <p className="text-sm text-gray-400">กรุณาเลือกสินค้าที่ต้องการสั่งซื้อ</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    {cartItems.map((item, index) => (
                      <div key={index} className="flex gap-3 border-b pb-4">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold">{item.name}</h3>
                          {item.meat && (
                            <p className="text-sm text-gray-600">เนื้อ: {item.meat}</p>
                          )}
                          {item.noodleType && (
                            <p className="text-sm text-gray-600">เส้น: {item.noodleType}</p>
                          )}
                          {item.soup && (
                            <p className="text-sm text-gray-600">น้ำซุป: {item.soup}</p>
                          )}
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => decreaseQuantity(index)}
                              className="px-2 py-0.5 bg-gray-100 rounded text-gray-600 hover:bg-gray-200"
                            >
                              -
                            </button>
                            <span className="text-sm">{item.quantity}</span>
                            <button
                              onClick={() => increaseQuantity(index)}
                              className="px-2 py-0.5 bg-gray-100 rounded text-gray-600 hover:bg-gray-200"
                            >
                              +
                            </button>
                          </div>
                          <p className="text-rose-600 mt-1">{item.price * item.quantity} บาท</p>
                          <button
                            onClick={() => removeItem(index)}
                            className="text-xs text-red-500 hover:underline mt-1"
                          >
                            ลบ
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 border-t pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-semibold">รวมทั้งหมด</span>
                      <span className="font-bold text-rose-600">{totalPrice} บาท</span>
                    </div>

                    <button
                      onClick={handleCheckout}
                      className="w-full py-3 px-4 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-all"
                    >
                      ไปชำระเงิน 💳
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}