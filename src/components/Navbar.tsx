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
import CartSidebar from '@/components/CartSidebarNew'

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
      <nav className="w-full px-responsive py-3 sm:py-4 flex justify-between items-center bg-gray-100 shadow-md fixed top-0 left-0 z-10 safe-area-top">
        {/* โลโก้ */}
        <div
          className="flex items-center gap-2 text-responsive-base font-extrabold text-gray-800 cursor-pointer touch-target"
          onClick={() => router.push('/')}
        >
          <UtensilsCrossed className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
          <span className="hidden sm:inline">FOOD-ORDER-WEB</span>
          <span className="sm:hidden">FOOD</span>
        </div>

        {user ? (
          <div className="flex items-center gap-6 relative">
            {/* ปุ่มตะกร้า */}
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={() => router.push('/orders')}
                className="bg-white hover:bg-gray-100 border border-gray-300 px-2 sm:px-3 py-2 rounded-lg flex items-center gap-1 sm:gap-2 shadow transition touch-target"
              >
                <ClipboardList className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                <span className="text-xs sm:text-sm font-medium text-gray-700 hidden sm:inline">ประวัติสั่งซื้อ</span>
                <span className="text-xs font-medium text-gray-700 sm:hidden">ประวัติ</span>
              </button>

              <button
                onClick={() => setIsCartOpen(true)}
                className="relative bg-white hover:bg-gray-100 border border-gray-300 px-2 sm:px-3 py-2 rounded-lg flex items-center gap-1 sm:gap-2 shadow transition touch-target"
              >
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                <span className="text-xs sm:text-sm font-medium text-gray-700 hidden sm:inline">ตะกร้า</span>
                <span className="text-xs font-medium text-gray-700 sm:hidden">🛒</span>
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-red-600 text-white text-xs font-bold px-1 sm:px-1.5 py-0.5 rounded-full min-w-[18px] sm:min-w-[20px] h-[18px] sm:h-[20px] flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </button>
            </div>

            {/* เมนูบัญชี */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 bg-white border border-gray-300 rounded-lg shadow hover:bg-gray-100 transition touch-target"
              >
                <UserCircle className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                <span className="text-xs sm:text-sm font-medium text-gray-700 max-w-[80px] sm:max-w-none truncate">
                  {user.email}
                </span>
                <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 sm:w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-responsive-sm text-red-600 hover:bg-red-100 touch-target"
                  >
                    ออกจากระบบ
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex gap-3">
            {/* Login Button */}
            <button
              onClick={() => router.push('/login')}
              className="group relative px-6 py-2.5 font-medium text-gray-700 hover:text-emerald-600 transition-all duration-300 overflow-hidden"
            >
              <div className="flex items-center gap-2 relative z-10">
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                เข้าสู่ระบบ
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300"></div>
            </button>

            {/* Register Button */}
            <button
              onClick={() => router.push('/register')}
              className="group relative px-6 py-2.5 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white rounded-xl font-semibold overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <div className="relative z-10 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                สมัครสมาชิก
                <div className="ml-1 w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
              
              {/* Animated background overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-pink-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Sparkle effects */}
              <div className="absolute top-1 right-2 w-2 h-2 bg-white/40 rounded-full animate-pulse"></div>
              <div className="absolute bottom-2 left-3 w-1.5 h-1.5 bg-white/30 rounded-full animate-pulse delay-300"></div>
              <div className="absolute top-1/2 right-1 w-1 h-1 bg-white/50 rounded-full animate-pulse delay-700"></div>
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





