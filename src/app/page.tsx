// app/home/page.tsx
"use client"

import Navbar from "@/components/Navbar"
import MenuList from "@/components/MenuList"
import { motion } from "framer-motion"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 text-center">
        <div className="space-y-4">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-gray-800 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-red-100 to-blue-100 rounded-lg blur opacity-40 -z-10"
              animate={{
                background: [
                  "linear-gradient(to right, rgba(255,200,200,0.4), rgba(200,200,255,0.4))",
                  "linear-gradient(to right, rgba(200,200,255,0.4), rgba(255,200,200,0.4))",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
            />
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              อาหารอร่อย
            </motion.span>{" "}
            <motion.span
              className="text-red-500"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              ส่งตรงถึงคุณ
            </motion.span>
          </motion.h1>

          <motion.p 
            className="text-gray-600 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            เลือกเมนูโปรดของคุณจากร้านอาหารชั้นนำ พร้อมบริการจัดส่งที่รวดเร็ว
          </motion.p>
        </div>
      </section>

      {/* Menu Section */}
      <section className="px-4 py-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">เมนูหลัก</h2>
            <div className="w-24 h-1 bg-red-500 mx-auto rounded-full"></div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <MenuList />
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 text-center">
        <p>© 2025 Food Order Web. All rights reserved.</p>
      </footer>
    </div>
  )
}





