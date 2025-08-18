// app/home/page.tsx
"use client"

import Navbar from "@/components/Navbar"
import MenuList from "@/components/MenuList"
import { motion } from "framer-motion"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      <Navbar />
      
      {/* Main Content */}
      <main className="flex-grow">
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
      </main>

      {/* Enhanced Footer */}
      <motion.footer 
        className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white mt-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Company Info */}
            <div className="text-center md:text-left">
              <motion.div 
              className="flex items-center justify-center md:justify-start mb-4"
              whileHover={{ scale: 1.05 }}
            >
              {/* Logo Icon */}
              <motion.div 
                className="relative mr-3"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                  <motion.span 
                    className="text-white text-lg font-bold"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    🍜
                  </motion.span>
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-orange-500 rounded-full blur-md opacity-30 -z-10"></div>
              </motion.div>
              
              {/* Brand Text */}
              <motion.h3 
                className="text-2xl font-bold text-white"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-red-400">Tad</span>
                <span className="text-orange-400">-</span>
                <span className="text-white">Food</span>
              </motion.h3>
            </motion.div>
              <p className="text-gray-300 mb-4">
                อาหารอร่อยในราคาที่จับต้องได้
                <br />
                บริการจัดส่งที่รวดเร็วและน่าเชื่อถือ
              </p>
              <div className="flex justify-center md:justify-start space-x-4">
                <motion.div 
                  className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center cursor-pointer"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  📱
                </motion.div>
                <motion.div 
                  className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  📧
                </motion.div>
                <motion.div 
                  className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center cursor-pointer"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  📞
                </motion.div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4 text-red-400">เมนูด่วน</h3>
              <ul className="space-y-2">
                {['เมนูยอดนิยม', 'โปรโมชั่น', 'เมนูใหม่', 'ติดต่อเรา'].map((item, index) => (
                  <motion.li 
                    key={item}
                    className="text-gray-300 hover:text-white cursor-pointer transition-colors duration-200"
                    whileHover={{ x: 5 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + index * 0.1 }}
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="text-center md:text-right">
              <h3 className="text-xl font-bold mb-4 text-red-400">ติดต่อเรา</h3>
              <div className="space-y-2 text-gray-300">
                <p>📍 กรุงเทพฯ, ประเทศไทย</p>
                <p>📞 02-xxx-xxxx</p>
                <p>📧 contact@tad-food.com</p>
                <p>🕒 เปิดทุกวัน 08:00 - 22:00</p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <motion.div 
            className="border-t border-gray-700 mt-8 pt-8"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <div className="flex flex-col md:flex-row justify-between items-center">
              <motion.p 
                className="text-gray-400 mb-4 md:mb-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
              >
                © 2025 Tad-Food. สงวนลิขสิทธิ์ทุกประการ
              </motion.p>
              
              <motion.div 
                className="flex space-x-6 text-sm text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 }}
              >
                <span className="hover:text-white cursor-pointer transition-colors">นโยบายความเป็นส่วนตัว</span>
                <span className="hover:text-white cursor-pointer transition-colors">เงื่อนไขการใช้งาน</span>
                <span className="hover:text-white cursor-pointer transition-colors">คำถามที่พบบ่อย</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Decorative Wave */}
        <div className="relative">
          <svg 
            className="w-full h-4 text-gray-900" 
            viewBox="0 0 1200 120" 
            fill="currentColor"
          >
            <path d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1200,160,1248,128,1296,112L1344,96V192H1296C1248,192,1152,192,1056,192C960,192,864,192,768,192C672,192,576,192,480,192C384,192,288,192,192,192C96,192,48,192,24,192H0V96Z"></path>
          </svg>
        </div>
      </motion.footer>
    </div>
  )
}




