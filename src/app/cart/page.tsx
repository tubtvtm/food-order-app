'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Swal from 'sweetalert2'
import { useOrders } from '@/app/context/OrderContext' // ✅ ใช้ context เพิ่มออเดอร์

export default function CartPage() {
  const [cartItems, setCartItems] = useState<any[]>([])
  const { addOrder } = useOrders()

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    setCartItems(cart)
  }, [])

  const updateCart = (newCart: any[]) => {
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
      title: 'คุณแน่ใจหรือไม่?',
      text: 'คุณต้องการลบสินค้านี้ออกจากตะกร้าใช่ไหม',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#b91c1c',
      cancelButtonColor: '#9ca3af',
      confirmButtonText: 'ใช่, ลบเลย',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        const newCart = [...cartItems]
        newCart.splice(index, 1)
        updateCart(newCart)

        Swal.fire({
          icon: 'success',
          title: 'ลบสินค้าแล้ว',
          timer: 1500,
          showConfirmButton: false,
        })
      }
    })
  }

  const handleCheckout = () => {
    if (cartItems.length === 0) return

    const newOrder = {
      id: Date.now(),
      items: cartItems,
      total: totalPrice,
      status: 'กำลังดำเนินการ',
      createdAt: new Date().toISOString(),
    }

    addOrder(newOrder) // ✅ เพิ่มเข้า order context

    Swal.fire({
      icon: 'success',
      title: 'ดำเนินการสั่งซื้อสำเร็จ 🎉',
      text: 'ขอบคุณที่ใช้บริการ!',
      confirmButtonColor: '#b91c1c',
    })

    setCartItems([])
    localStorage.removeItem('cart')
  }

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 to-white px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center text-rose-700 mb-10"
        >
          🛒 ตะกร้าของคุณ
        </motion.h1>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">ไม่มีสินค้าในตะกร้า</p>
        ) : (
          <>
            <div className="space-y-6">
              {cartItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-white rounded-2xl shadow-md p-4 flex gap-4"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={100}
                    height={100}
                    className="rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-800">{item.name}</h2>

                    {/* ก๋วยเตี๋ยว */}
                    {item.noodleType && (
                      <p className="text-sm text-gray-500 mt-1">ประเภทเส้น: {item.noodleType}</p>
                    )}
                    {item.toppings && item.toppings.length > 0 && (
                      <p className="text-sm text-gray-500 mt-1">
                        เครื่องเคียง: {item.toppings.join(', ')}
                      </p>
                    )}

                    {/* เบอร์เกอร์ */}
                    {item.burgerType && (
                      <p className="text-sm text-gray-500 mt-1">ประเภทเบอร์เกอร์: {item.burgerType}</p>
                    )}
                    {item.cheese && (
                      <p className="text-sm text-gray-500 mt-1">ชีส: {item.cheese}</p>
                    )}
                    {item.extraSauce && (
                      <p className="text-sm text-gray-500 mt-1">ซอสเพิ่มเติม: {item.extraSauce}</p>
                    )}

                    {/* พิซซ่า */}
                    {item.flavor && (
                      <p className="text-sm text-gray-500 mt-1">หน้า: {item.flavor}</p>
                    )}
                    {item.crust && (
                      <p className="text-sm text-gray-500">ขอบ: {item.crust}</p>
                    )}
                    {item.meat && (
                      <p className="text-sm text-gray-500 mt-1">ประเภทเนื้อ: {item.meat}</p>
                    )}

                    <div className="flex items-center gap-3 mt-3">
                      <button
                        onClick={() => decreaseQuantity(index)}
                        className="px-2.5 py-1 bg-gray-200 rounded-lg text-lg font-bold hover:bg-gray-300 transition"
                      >
                        −
                      </button>
                      <span className="text-lg font-medium">{item.quantity}</span>
                      <button
                        onClick={() => increaseQuantity(index)}
                        className="px-2.5 py-1 bg-gray-200 rounded-lg text-lg font-bold hover:bg-gray-300 transition"
                      >
                        ＋
                      </button>
                    </div>

                    <p className="mt-3 text-rose-600 font-semibold">
                      รวม: {item.price * item.quantity} บาท
                    </p>

                    <button
                      onClick={() => removeItem(index)}
                      className="text-sm mt-2 text-red-500 hover:underline"
                    >
                      ลบสินค้า
                    </button>
                  </div>
                </motion.div>
              ))}

              <div className="flex justify-between items-center border-t pt-6 mt-8">
                <p className="text-xl font-semibold text-gray-700">รวมทั้งหมด</p>
                <p className="text-2xl font-bold text-rose-700">{totalPrice} บาท</p>
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                className="w-full bg-rose-600 text-white text-lg py-3 rounded-xl mt-6 font-semibold hover:bg-rose-700 transition"
                onClick={handleCheckout}
              >
                ดำเนินการสั่งซื้อ 🧾
              </motion.button>
            </div>
          </>
        )}
      </div>
    </main>
  )
}






