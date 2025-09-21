"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Mail, Lock, Eye, EyeOff, UserPlus } from "lucide-react"
import Swal from "sweetalert2"
import { motion } from "framer-motion"

export default function RegisterPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [starPositions, setStarPositions] = useState<Array<{left: string, top: string}>>([])
  const router = useRouter()

  useEffect(() => {
    // Generate star positions only on client side
    const positions = Array.from({ length: 8 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }))
    setStarPositions(positions)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "รหัสผ่านไม่ตรงกัน",
        text: "กรุณากรอกรหัสผ่านให้ตรงกัน",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#000000",
      })
      setIsLoading(false)
      return
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      if (!res.ok) throw new Error("การสมัครสมาชิกไม่สำเร็จ")

      Swal.fire({
        icon: "success",
        title: "สมัครสมาชิกสำเร็จ! 🎉",
        text: "ยินดีต้อนรับเข้าสู่ครอบครัว",
        timer: 1500,
        showConfirmButton: false,
      })

      router.push("/login")
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: error.message || "บางอย่างผิดพลาด กรุณาลองใหม่อีกครั้ง",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#000000",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-100">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100 via-green-100 to-purple-100 opacity-40 animate-gradient" />
        <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-white opacity-60" />
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-10 animate-float" />
        <div className="absolute -inset-x-40 -inset-y-40 bg-[radial-gradient(circle,rgba(255,255,255,0.8),transparent_80%)] animate-pulse" />
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-white/90 border border-gray-200 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] backdrop-blur-sm overflow-hidden">
          <div className="text-center px-8 pt-10 pb-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-inner border border-gray-300"
            >
              <UserPlus className="h-7 w-7 text-gray-700" />
            </motion.div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">สร้างบัญชีใหม่</h2>
            <p className="text-gray-600 text-sm">กรอกข้อมูลเพื่อสมัครสมาชิก</p>
          </div>

          <form onSubmit={handleSubmit} className="px-8 pb-8">
            {/* อีเมล */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                อีเมล
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-3 py-3 bg-white border border-gray-300 text-gray-900 placeholder-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:shadow-md"
                />
              </div>
            </div>

            {/* รหัสผ่าน */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                รหัสผ่าน
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-10 py-3 bg-white border border-gray-300 text-gray-900 placeholder-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:shadow-md"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* ยืนยันรหัสผ่าน */}
            <div className="mb-6">
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-2">
                ยืนยันรหัสผ่าน
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-10 py-3 bg-white border border-gray-300 text-gray-900 placeholder-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:shadow-md"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* ปุ่มสมัครสมาชิก */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-black hover:bg-gray-800 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
            >
              {isLoading ? (
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
              ) : (
                <UserPlus className="-ml-1 mr-2 h-5 w-5" />
              )}
              {isLoading ? "กำลังสมัครสมาชิก..." : "สมัครสมาชิก"}
            </button>
          </form>

          {/* ลิงก์ไปหน้าเข้าสู่ระบบ */}
          <div className="px-8 pb-8 text-center text-sm text-gray-600">
            มีบัญชีอยู่แล้ว?{" "}
            <button
              onClick={() => router.push("/login")}
              className="font-medium text-black hover:underline"
            >
              เข้าสู่ระบบ
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}









