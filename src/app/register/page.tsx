"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Mail, Lock, Eye, EyeOff, UserPlus, LogIn } from "lucide-react"
import Swal from "sweetalert2"
import { motion } from "framer-motion"

export default function RegisterPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "เกิดข้อผิดพลาดในการสมัครสมาชิก")

      await Swal.fire({
        icon: "success",
        title: "สมัครสมาชิกสำเร็จ!",
        text: "กำลังพาคุณไปหน้าเข้าสู่ระบบ...",
        timer: 1500,
        showConfirmButton: false,
      })

      router.push("/login")
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: error.message || "ไม่สามารถสมัครสมาชิกได้ กรุณาลองใหม่",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#000000",
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
            <p className="text-gray-600 text-sm">สมัครสมาชิกเพื่อเริ่มต้นใช้งาน</p>
          </div>

          <form onSubmit={handleSubmit} className="px-8 pb-8">
            {/* Email */}
            <div className="mb-5">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                อีเมล์
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-3 py-3 bg-white border border-gray-300 text-gray-900 placeholder-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:shadow-md"
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-6">
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

            {/* Submit */}
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
                <LogIn className="-ml-1 mr-2 h-5 w-5" />
              )}
              {isLoading ? "กำลังสมัคร..." : "สมัครสมาชิก"}
            </button>
          </form>

          {/* Footer */}
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









