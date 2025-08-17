'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

const menuItems = [
  {
    name: 'เบอร์เกอร์',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
    color: 'from-yellow-400 to-yellow-600',
    slug: 'burger',
  },
  {
    name: 'พิซซ่า',
    image: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Pizza-3007395.jpg',
    color: 'from-red-500 to-red-700',
    slug: 'pizza',
  },
  {
    name: 'ก๋วยเตี๋ยว',
    image: 'https://static.naewna.com/uploads/userfiles/images/image009(9).jpg',
    color: 'from-green-400 to-green-600',
    slug: 'noodle',
  },
]

export default function MenuList() {
  const router = useRouter()

  const handleClick = (slug: string) => {
    router.push(`/order/${slug}`)
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 px-4 py-12">
      {menuItems.map((item, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: index * 0.15 }}
          className={`relative rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br ${item.color}`}
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />

          <div className="absolute bottom-0 w-full p-4 z-20 flex flex-col items-center">
            <h3 className="text-white text-xl font-bold drop-shadow-md mb-2">
              {item.name}
            </h3>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleClick(item.slug)}
              className="px-5 py-2 text-white bg-white/10 backdrop-blur-md rounded-full border border-white/30 shadow-md hover:bg-white/20 transition-all"
            >
              เลือกเมนู
            </motion.button>
          </div>
        </motion.div>
      ))}
    </div>
  )
}







  