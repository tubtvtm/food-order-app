'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  UtensilsCrossed,
  ShoppingCart,
  UserCircle,
  ChevronDown,
  ClipboardList
} from 'lucide-react'
import { useCart } from '@/app/context/CartContext'
import { useUser } from '@/app/context/UserContext'
import Swal from 'sweetalert2'
import CartSidebar from './CartSidebar'

export default function Navbar() {
  const router = useRouter()
  const { cart } = useCart()
  const { user, login, logout } = useUser()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    Swal.fire({
      icon: 'success',
      title: 'ออกจากระบบแล้ว',
      showConfirmButton: false,
      timer: 1200,
    }).then(() => {
      logout()
      router.push('/')
    })
  }

  return (
    <>
      <nav className="w-full px-6 py-4 flex justify-between items-center bg-gray-100 shadow-md fixed top-0 left-0 z-10">
        {/* โลโก้ */}
        <div
          className="flex items-center gap-2 text-xl font-extrabold text-gray-800 cursor-pointer"
          onClick={() => router.push('/')}
        >
          <UtensilsCrossed className="w-6 h-6 text-red-500" />
          <span>FOOD-ORDER-WEB</span>
        </div>

        {user ? (
          <div className="flex items-center gap-6 relative">
            {/* ปุ่มตะกร้า */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/orders')}
                className="bg-white hover:bg-gray-100 border border-gray-300 px-3 py-2 rounded-lg flex items-center gap-2 shadow transition"
              >
                <ClipboardList className="w-5 h-5 text-gray-700" />
                <span className="text-sm font-medium text-gray-700">ประวัติสั่งซื้อ</span>
              </button>

              <button
                onClick={() => setIsCartOpen(true)}
                className="relative bg-white hover:bg-gray-100 border border-gray-300 px-3 py-2 rounded-lg flex items-center gap-2 shadow transition"
              >
                <ShoppingCart className="w-5 h-5 text-gray-700" />
                <span className="text-sm font-medium text-gray-700">ตะกร้า</span>
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                    {cart.length}
                  </span>
                )}
              </button>
            </div>

            {/* เมนูบัญชี */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow hover:bg-gray-100 transition"
              >
                <UserCircle className="w-5 h-5 text-gray-700" />
                <span className="text-sm font-medium text-gray-700">{user.email}</span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
                  >
                    ออกจากระบบ
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex gap-4">
            <button
              onClick={() => router.push('/login')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold"
            >
              เข้าสู่ระบบ
            </button>
            <button
              onClick={() => router.push('/register')}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-semibold"
            >
              สมัครสมาชิก
            </button>
          </div>
        )}
      </nav>

      <CartSidebar 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </>
  )
}





