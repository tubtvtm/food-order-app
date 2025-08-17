'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Lock, ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'
import Swal from 'sweetalert2'

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [token, setToken] = useState('')
  
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const tokenParam = searchParams.get('token')
    if (!tokenParam) {
      Swal.fire({
        icon: 'error',
        title: 'ลิงก์ไม่ถูกต้อง',
        text: 'กรุณาตรวจสอบลิงก์ในอีเมลของคุณอีกครั้ง',
        confirmButtonText: 'ตกลง',
        confirmButtonColor: '#000000',
      }).then(() => {
        router.push('/forgot-password')
      })
      return
    }
    setToken(tokenParam)
  }, [searchParams, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'รหัสผ่านไม่ตรงกัน',
        text: 'กรุณากรอกรหัสผ่านให้ตรงกันทั้งสองช่อง',
        confirmButtonText: 'ตกลง',
        confirmButtonColor: '#000000',
      })
      return
    }

    setIsLoading(true)

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'ไม่สามารถรีเซ็ตรหัสผ่านได้')
      }

      Swal.fire({
        icon: 'success',
        title: 'รีเซ็ตรหัสผ่านสำเร็จ',
        text: 'กรุณาเข้าสู่ระบบด้วยรหัสผ่านใหม่',
        confirmButtonText: 'เข้าสู่ระบบ',
        confirmButtonColor: '#000000',
      }).then(() => {
        router.push('/login')
      })
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด',
        text: error.message || 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง',
        confirmButtonText: 'ตกลง',
        confirmButtonColor: '#000000',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 via-white to-gray-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white/90 border border-gray-200 rounded-2xl shadow-xl backdrop-blur-sm p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">ตั้งรหัสผ่านใหม่</h2>
            <p className="text-gray-600 text-sm">กรุณากรอกรหัสผ่านใหม่ของคุณ</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                รหัสผ่านใหม่
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full pl-10 pr-3 py-3 bg-white border border-gray-300 text-gray-900 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                ยืนยันรหัสผ่านใหม่
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full pl-10 pr-3 py-3 bg-white border border-gray-300 text-gray-900 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-black hover:bg-gray-800 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center mb-4"
            >
              {isLoading ? (
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
              ) : null}
              {isLoading ? "กำลังบันทึก..." : "บันทึกรหัสผ่านใหม่"}
            </button>

            <button
              type="button"
              onClick={() => router.push('/login')}
              className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-all flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              กลับไปหน้าเข้าสู่ระบบ
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}