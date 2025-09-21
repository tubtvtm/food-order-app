'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation'
import pizza from './../../menus/pizza'
import CartSidebar from '@/components/CartSidebarNew'

export default function PizzaPage() {
  const [user, setUser] = useState<{ email: string } | null>(null)
  const [selectedCrust, setSelectedCrust] = useState<string | null>(null)
  const [selectedFlavor, setSelectedFlavor] = useState<string | null>(null)
  const [quantity, setQuantity] = useState<number>(1)
  const [notes, setNotes] = useState<string>('')
  const [isCartOpen, setIsCartOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleAddToCart = () => {
    if (!user) {
      Swal.fire({
        icon: 'warning',
        title: 'กรุณาเข้าสู่ระบบก่อนสั่งซื้อ',
        confirmButtonColor: '#000',
      })
      return
    }

    if (!selectedCrust || !selectedFlavor) {
      Swal.fire({
        icon: 'warning',
        title: 'กรุณาเลือกหน้าพิซซ่าและขอบก่อน',
        confirmButtonColor: '#000',
      })
      return
    }

    const cartItem = {
      id: `pizza-${Date.now()}-${Math.random()}`,
      name: pizza.name,
      image: pizza.image,
      price: pizza.price,
      crust: selectedCrust,
      flavor: selectedFlavor,
      quantity,
      notes: notes.trim() || undefined,
    }

    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    cart.push(cartItem)
    localStorage.setItem('cart', JSON.stringify(cart))

    Swal.fire({
      icon: 'success',
      title: 'เพิ่มลงตะกร้าแล้ว!',
      confirmButtonColor: '#000',
    }).then(() => {
      setIsCartOpen(true)
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 px-responsive py-responsive safe-area-top safe-area-bottom">
      <div className="container-responsive">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 transition-colors touch-target"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-responsive-sm">กลับ</span>
          </button>
          <h1 className="text-responsive-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
            สั่งพิซซ่า
          </h1>
          <p className="text-responsive-sm text-gray-600 px-4">เลือกรสชาติและขนาดที่คุณต้องการ</p>
        </div>

        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/20">
          {/* Image Section */}
          {pizza.image && (
            <div className="relative">
              <Image
                src={pizza.image}
                alt={pizza.name}
                width={500}
                height={300}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h2 className="text-2xl font-bold drop-shadow-lg">{pizza.name}</h2>
              </div>
            </div>
          )}

          <div className="p-6 space-y-6">
            {/* Price Section */}
            <div className="text-center bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl p-4">
              <div className="text-sm text-gray-600 mb-1">ราคา</div>
              <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                ฿{pizza.price}
              </div>
            </div>

            {/* Flavor Selection */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold text-gray-800">เลือกหน้า</span>
                <div className="flex-1 h-px bg-gradient-to-r from-orange-200 to-transparent"></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {pizza.flavorOptions.map((flavor) => (
                  <button
                    key={flavor}
                    className={`px-4 py-3 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 ${
                      selectedFlavor === flavor 
                        ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                    }`}
                    onClick={() => setSelectedFlavor(flavor)}
                  >
                    {flavor}
                  </button>
                ))}
              </div>
            </div>

            {/* Crust Selection */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold text-gray-800">เลือกขอบ</span>
                <div className="flex-1 h-px bg-gradient-to-r from-orange-200 to-transparent"></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {pizza.crustOptions.map((crust) => (
                  <button
                    key={crust}
                    className={`px-4 py-3 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 ${
                      selectedCrust === crust 
                        ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                    }`}
                    onClick={() => setSelectedCrust(crust)}
                  >
                    {crust}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selection */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold text-gray-800">จำนวน</span>
                <div className="flex-1 h-px bg-gradient-to-r from-orange-200 to-transparent"></div>
              </div>
              <div className="flex items-center justify-center gap-4 bg-gray-50 rounded-2xl p-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center text-gray-700 hover:from-gray-300 hover:to-gray-400 transition-all transform hover:scale-110"
                >
                  -
                </button>
                <div className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent min-w-[3rem] text-center">
                  {quantity}
                </div>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-400 to-red-400 flex items-center justify-center text-white hover:from-orange-500 hover:to-red-500 transition-all transform hover:scale-110"
                >
                  +
                </button>
              </div>
            </div>

            {/* Notes Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold text-gray-800">หมายเหตุ</span>
                <span className="text-sm text-gray-500">(ไม่บังคับ)</span>
                <div className="flex-1 h-px bg-gradient-to-r from-orange-200 to-transparent"></div>
              </div>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="เช่น ไม่ใส่หัวหอม, เพิ่มชีสพิเศษ, หรือข้อความอื่นๆ..."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition-all placeholder-gray-400"
                rows={3}
                maxLength={200}
              />
              <div className="text-right text-xs text-gray-400">
                {notes.length}/200 ตัวอักษร
              </div>
            </div>

            {/* Total Price */}
            <div className="bg-gradient-to-r from-gray-50 to-orange-50 rounded-2xl p-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">ยอดรวม</span>
                <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  ฿{pizza.price * quantity}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-4 px-6 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl font-semibold hover:from-orange-600 hover:to-red-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <div className="flex items-center justify-center gap-2">
                  เพิ่มลงตะกร้า
                </div>
              </button>
              <button
                onClick={() => setIsCartOpen(true)}
                className="px-6 py-4 bg-white border-2 border-orange-200 text-orange-600 rounded-2xl font-semibold hover:bg-orange-50 hover:border-orange-300 transform hover:scale-105 transition-all duration-300"
              >
                ดูตะกร้า
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />
    </div>
  )
}


