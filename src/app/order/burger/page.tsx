'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation'
import burger from './../../menus/burger'
import CartSidebar from '@/components/CartSidebarNew'



export default function BurgerPage() {
    const [user, setUser] = useState<{ email: string } | null>(null)
    const [selectedMeat, setSelectedMeat] = useState<string | null>(null)
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
  
      if (!selectedMeat) {
        Swal.fire({
          icon: 'warning',
          title: 'กรุณาเลือกประเภทเนื้อก่อน',
          confirmButtonColor: '#000',
        })
        return
      }
  
      const cartItem = {
        id: `burger-${Date.now()}-${Math.random()}`,
        name: burger.name,
        image: burger.image,
        price: burger.price,
        meat: selectedMeat,
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
      <div className="min-h-screen py-responsive px-responsive bg-gradient-to-br from-yellow-50 via-white to-orange-50 safe-area-top safe-area-bottom">
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
            <h1 className="text-responsive-xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-2">
              สั่งเบอร์เกอร์
            </h1>
            <p className="text-responsive-sm text-gray-600 px-4">เลือกประเภทเนื้อและจำนวนที่คุณต้องการ</p>
          </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden border border-yellow-100">
          <div className="relative h-48 sm:h-64 lg:h-72">
            <Image
              src={selectedMeat 
                ? burger.meatOptions.find(m => m.name === selectedMeat)?.image || burger.image
                : burger.image}
              alt={burger.name}
              fill
              className="object-cover transition-all duration-300"
            />
            {selectedMeat && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 text-white">
                  <p className="text-responsive-base font-bold">{selectedMeat}</p>
                  <p className="text-responsive-xs opacity-90">
                    {burger.meatOptions.find(m => m.name === selectedMeat)?.description}
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="p-4 sm:p-6">
            <h1 className="text-responsive-lg font-bold text-gray-800 mb-2">{burger.name}</h1>
            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
              <div className="text-center">
                <span className="text-responsive-xs text-gray-600 block">ราคา</span>
                <span className="text-responsive-xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                  ฿{burger.price}
                </span>
              </div>
            </div>
  
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <span className="text-responsive-base font-semibold text-gray-800">เลือกประเภทเนื้อ</span>
                <div className="flex-1 h-px bg-gradient-to-r from-yellow-200 to-transparent"></div>
              </div>
              <div className="space-y-3 sm:space-y-4">
                {burger.meatOptions.map((meat) => (
                  <button
                    key={meat.id}
                    className={`group w-full p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 transition-all touch-target ${
                      selectedMeat === meat.name 
                        ? 'border-yellow-400 bg-gradient-to-r from-yellow-50 to-orange-50 shadow-lg' 
                        : 'border-gray-200 hover:border-yellow-200 hover:bg-yellow-50 hover:shadow-md'
                    }`}
                    onClick={() => setSelectedMeat(meat.name)}
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 relative rounded-lg sm:rounded-xl overflow-hidden shadow-md group-hover:shadow-lg flex-shrink-0">
                        <Image
                          src={meat.image}
                          alt={meat.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 text-left min-w-0">
                        <p className="text-responsive-base font-bold text-gray-800 mb-1 truncate">{meat.name}</p>
                        <p className="text-responsive-xs text-gray-600 line-clamp-2">{meat.description}</p>
                      </div>
                      {selectedMeat === meat.name && (
                        <div className="text-yellow-500 text-xl sm:text-2xl flex-shrink-0">✓</div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
  
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-responsive-base font-semibold text-gray-800">จำนวน</span>
                <div className="flex-1 h-px bg-gradient-to-r from-yellow-200 to-transparent"></div>
              </div>
              <div className="flex items-center justify-center gap-4 bg-gray-50 rounded-2xl p-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center text-gray-700 hover:from-gray-300 hover:to-gray-400 transition-all transform hover:scale-110 touch-target"
                >
                  <span className="text-lg font-bold">−</span>
                </button>
                <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent min-w-[3rem] text-center">
                  {quantity}
                </div>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 flex items-center justify-center text-white hover:from-yellow-500 hover:to-orange-500 transition-all transform hover:scale-110 touch-target"
                >
                  <span className="text-lg font-bold">+</span>
                </button>
              </div>
            </div>

            {/* Notes Section */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-responsive-base font-semibold text-gray-800">หมายเหตุ</span>
                <span className="text-responsive-xs text-gray-500">(ไม่บังคับ)</span>
                <div className="flex-1 h-px bg-gradient-to-r from-yellow-200 to-transparent"></div>
              </div>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="เช่น ไม่ใส่หัวหอม, เพิ่มชีสพิเศษ, หรือข้อความอื่นๆ..."
                className="w-full px-4 py-3 text-responsive-sm bg-gray-50 border border-gray-200 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent transition-all placeholder-gray-400"
                rows={3}
                maxLength={200}
              />
              <div className="text-right text-responsive-xs text-gray-400 mt-1">
                {notes.length}/200 ตัวอักษร
              </div>
            </div>
  
            {/* Total Price */}
            <div className="bg-gradient-to-r from-gray-50 to-yellow-50 rounded-2xl p-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-responsive-base text-gray-600">ยอดรวม</span>
                <span className="text-responsive-xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                  ฿{burger.price * quantity}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3 sm:py-4 px-4 sm:px-6 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-2xl font-semibold hover:from-yellow-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl touch-target"
              >
                <div className="flex items-center justify-center gap-2">
                  <span className="text-responsive-base">เพิ่มลงตะกร้า</span>
                </div>
              </button>
              <button
                onClick={() => setIsCartOpen(true)}
                className="sm:flex-initial py-3 sm:py-4 px-4 sm:px-6 bg-white border-2 border-yellow-200 text-yellow-600 rounded-2xl font-semibold hover:bg-yellow-50 hover:border-yellow-300 transform hover:scale-105 transition-all duration-300 touch-target"
              >
                <span className="text-responsive-base">ดูตะกร้า</span>
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
