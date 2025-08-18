'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
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
        {/* โลโก้ Tad-Food */}
        <div
          className="flex items-center gap-3 text-xl font-extrabold text-gray-800 cursor-pointer hover:scale-105 transition-transform duration-200"
          onClick={() => router.push('/')}
        >
          {/* Logo Icon */}
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg transform rotate-12 hover:rotate-6 transition-transform duration-300">
              <span className="text-white text-xl font-bold -rotate-12">🍜</span>
            </div>
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl blur-lg opacity-20 -z-10 transform rotate-12"></div>
          </div>
          
          {/* Brand Text */}
          <div className="flex items-baseline">
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              Tad
            </span>
            <span className="text-gray-600 mx-1">-</span>
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Food
            </span>
          </div>
        </div>

        {user ? (
          <div className="flex items-center gap-6 relative">
            {/* ปุ่มตะกร้า */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/orders')}
                className="bg-white hover:bg-gray-100 border border-gray-300 px-3 py-2 rounded-lg flex items-center gap-2 shadow transition hover:shadow-md"
              >
                <ClipboardList className="w-5 h-5 text-gray-700" />
                <span className="text-sm font-medium text-gray-700">ประวัติสั่งซื้อ</span>
              </button>

              <button
                onClick={() => setIsCartOpen(true)}
                className="relative bg-white hover:bg-gray-100 border border-gray-300 px-3 py-2 rounded-lg flex items-center gap-2 shadow transition hover:shadow-md"
              >
                <ShoppingCart className="w-5 h-5 text-gray-700" />
                <span className="text-sm font-medium text-gray-700">ตะกร้า</span>
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full animate-pulse shadow-lg">
                    {cart.length}
                  </span>
                )}
              </button>
            </div>

            {/* เมนูบัญชี */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow hover:bg-gray-100 transition hover:shadow-md"
              >
                <UserCircle className="w-5 h-5 text-gray-700" />
                <span className="text-sm font-medium text-gray-700">{user.email}</span>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-20 animate-in fade-in-0 zoom-in-95 duration-100">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-150"
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
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              เข้าสู่ระบบ
            </button>
            <button
              onClick={() => router.push('/register')}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
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





