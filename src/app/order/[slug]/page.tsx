// app/order/[slug]/page.tsx
'use client'

import { useParams } from 'next/navigation'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import menuDetails from './../../menus/index'

export default function OrderPage() {
  const { slug } = useParams()
  const item = menuDetails[slug as keyof typeof menuDetails] // ✅ ดึงข้อมูลจาก slug

  const [user, setUser] = useState<{ email: string } | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleOrder = () => {
    if (!user) {
      Swal.fire({
        icon: 'warning',
        title: 'กรุณาเข้าสู่ระบบก่อนสั่งซื้อ',
        confirmButtonColor: '#000',
      })
      return
    }

    Swal.fire({
      icon: 'success',
      title: 'สั่งซื้อสำเร็จ!',
      text: `ขอบคุณที่สั่ง ${item.name}`,
      confirmButtonColor: '#000',
    })
  }

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center text-red-600 text-xl font-bold">
        ไม่พบเมนูนี้
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          width={500}
          height={300}
          className="w-full h-60 object-cover"
        />
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{item.name}</h1>
          <p className="text-gray-600 mb-4">ราคา: <span className="font-semibold">{item.price} บาท</span></p>
          <button
            onClick={handleOrder}
            className="w-full py-3 px-4 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-all"
          >
            สั่งซื้อเมนูนี้
          </button>
        </div>
      </div>
    </div>
  )
}



