'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Swal from 'sweetalert2'
import burger from './../../menus/burger'
import CartSidebar from '@/components/CartSidebar'



export default function BurgerPage() {
    const [user, setUser] = useState<{ email: string } | null>(null)
    const [selectedMeat, setSelectedMeat] = useState<string | null>(null)
    const [quantity, setQuantity] = useState<number>(1)
    const [isCartOpen, setIsCartOpen] = useState(false)
    
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
        name: burger.name,
        image: burger.image,
        price: burger.price,
        meat: selectedMeat,
        quantity,
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
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="relative h-72">
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
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-lg font-bold">{selectedMeat}</p>
                  <p className="text-sm opacity-90">
                    {burger.meatOptions.find(m => m.name === selectedMeat)?.description}
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{burger.name}</h1>
            <p className="text-gray-600 mb-4">
              ราคา: <span className="font-semibold">{burger.price} บาท</span>
            </p>
  
            <div className="mb-4">
              <p className="font-semibold mb-1">เลือกประเภทเนื้อ:</p>
              <div className="grid grid-cols-2 gap-4">
                {burger.meatOptions.map((meat) => (
                  <button
                    key={meat.id}
                    className={`group p-3 rounded-xl border-2 transition-all transform hover:scale-[1.02] ${
                      selectedMeat === meat.name 
                        ? 'border-black ring-2 ring-black ring-offset-2 shadow-lg' 
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                    }`}
                    onClick={() => setSelectedMeat(meat.name)}
                  >
                    <div className="aspect-square relative mb-3 rounded-xl overflow-hidden shadow-sm group-hover:shadow">
                      <Image
                        src={meat.image}
                        alt={meat.name}
                        fill
                        className="object-cover transform transition-transform group-hover:scale-110"
                      />
                    </div>
                    <p className="font-semibold text-gray-800 mb-1">{meat.name}</p>
                    <p className="text-sm text-gray-500 line-clamp-2">{meat.description}</p>
                  </button>
                ))}
              </div>
            </div>
  
            <div className="mb-6">
              <p className="font-semibold mb-1">จำนวน:</p>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
                className="w-full px-3 py-2 border rounded"
                min={1}
              />
            </div>
  
            <div className="flex gap-2">
              <button
                onClick={handleAddToCart}
                className="w-full py-3 px-4 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-all"
              >
                เพิ่มลงตะกร้า 🛒
              </button>
              <button
                onClick={() => setIsCartOpen(true)}
                className="w-full py-3 px-4 bg-white border text-black rounded-lg font-semibold hover:bg-gray-100 transition-all"
              >
                ดูตะกร้า
              </button>
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
