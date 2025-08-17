'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation'
import pizza from './../../menus/pizza'
import CartSidebar from '@/components/CartSidebar'

export default function PizzaPage() {
  const [user, setUser] = useState<{ email: string } | null>(null)
  const [selectedCrust, setSelectedCrust] = useState<string | null>(null)
  const [selectedFlavor, setSelectedFlavor] = useState<string | null>(null)
  const [quantity, setQuantity] = useState<number>(1)
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
      name: pizza.name,
      image: pizza.image,
      price: pizza.price,
      crust: selectedCrust,
      flavor: selectedFlavor,
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
        {pizza.image && (
          <Image
            src={pizza.image}
            alt={pizza.name}
            width={500}
            height={300}
            className="w-full h-60 object-cover"
          />
        )}
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{pizza.name}</h1>
          <p className="text-gray-600 mb-4">ราคา: <span className="font-semibold">{pizza.price} บาท</span></p>

          <div className="mb-4">
            <p className="font-semibold mb-1">เลือกหน้า:</p>
            <div className="grid grid-cols-2 gap-2">
              {pizza.flavorOptions.map((flavor) => (
                <button
                  key={flavor}
                  className={`px-3 py-2 rounded border ${selectedFlavor === flavor ? 'bg-black text-white' : 'bg-white text-gray-800'}`}
                  onClick={() => setSelectedFlavor(flavor)}
                >
                  {flavor}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <p className="font-semibold mb-1">เลือกขอบ:</p>
            <div className="grid grid-cols-2 gap-2">
              {pizza.crustOptions.map((crust) => (
                <button
                  key={crust}
                  className={`px-3 py-2 rounded border ${selectedCrust === crust ? 'bg-black text-white' : 'bg-white text-gray-800'}`}
                  onClick={() => setSelectedCrust(crust)}
                >
                  {crust}
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


