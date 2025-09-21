'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation'
import noodle from './../../menus/noodle'
import CartSidebar from '@/components/CartSidebarNew'

export default function NoodlePage() {
    const [user, setUser] = useState<{ email: string } | null>(null)
    const [isCartOpen, setIsCartOpen] = useState(false)
  
    // Single choice states
    const [selectedNoodleType, setSelectedNoodleType] = useState<string | null>(null)
    const [selectedSoup, setSelectedSoup] = useState<string | null>(null)
    const [selectedMeat, setSelectedMeat] = useState<string | null>(null)
    const [selectedSpice, setSelectedSpice] = useState<string | null>(null)
    const [selectedBroth, setSelectedBroth] = useState<string | null>(null)
  
    // Multiple choice states
    const [selectedSides, setSelectedSides] = useState<string[]>([])
    const [selectedGarnishes, setSelectedGarnishes] = useState<string[]>([])
    const [selectedToppings, setSelectedToppings] = useState<string[]>([])
    const [notes, setNotes] = useState<string>('')
  
    const [quantity, setQuantity] = useState<number>(1)
    const router = useRouter()
  
    useEffect(() => {
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
    }, [])
  
    // Toggle multiple choice
    const toggleSelection = (item: string, selectedArray: string[], setSelectedArray: React.Dispatch<React.SetStateAction<string[]>>) => {
      if (selectedArray.includes(item)) {
        setSelectedArray(selectedArray.filter(i => i !== item))
      } else {
        setSelectedArray([...selectedArray, item])
      }
    }
  
    const handleAddToCart = () => {
      if (!user) {
        Swal.fire({
          icon: 'warning',
          title: 'กรุณาเข้าสู่ระบบก่อนสั่งซื้อ',
          confirmButtonColor: '#000',
        })
        return
      }
  
      if (!selectedNoodleType) {
        Swal.fire({
          icon: 'warning',
          title: 'กรุณาเลือกประเภทเส้นก่อน',
          confirmButtonColor: '#000',
        })
        return
      }
  
      if (!selectedSoup) {
        Swal.fire({
          icon: 'warning',
          title: 'กรุณาเลือกน้ำซุปก่อน',
          confirmButtonColor: '#000',
        })
        return
      }
  
      if (!selectedMeat) {
        Swal.fire({
          icon: 'warning',
          title: 'กรุณาเลือกเนื้อสัตว์ก่อน',
          confirmButtonColor: '#000',
        })
        return
      }
  
      if (!selectedSpice) {
        Swal.fire({
          icon: 'warning',
          title: 'กรุณาเลือกระดับความเผ็ดก่อน',
          confirmButtonColor: '#000',
        })
        return
      }
  
      if (!selectedBroth) {
        Swal.fire({
          icon: 'warning',
          title: 'กรุณาเลือกน้ำซุปเสริมก่อน',
          confirmButtonColor: '#000',
        })
        return
      }
  
      const cartItem = {
        id: `noodle-${Date.now()}-${Math.random()}`,
        name: noodle.name,
        image: noodle.image,
        price: noodle.price,
        noodleType: selectedNoodleType,
        soup: selectedSoup,
        meat: selectedMeat,
        spice: selectedSpice,
        broth: selectedBroth,
        sides: selectedSides,
        garnishes: selectedGarnishes,
        toppings: selectedToppings,
        quantity,
        notes: notes.trim() || undefined,
      }
  
      const cart = JSON.parse(localStorage.getItem('cart') || '[]')
      cart.push(cartItem)
      localStorage.setItem('cart', JSON.stringify(cart))
  
      Swal.fire({
        icon: 'success',
        title: 'เพิ่มลงตะกร้าแล้ว!',
        confirmButtonColor: '#000',
      }).then(() => {
        setIsCartOpen(true)
      })
    }
  
    return (
      <div className="min-h-screen py-8 px-4 bg-gradient-to-br from-orange-50 via-white to-red-50">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => router.back()}
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                กลับ
              </button>
              
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
              สั่งก๋วยเตี๋ยว
            </h1>
            <p className="text-gray-600">เลือกเส้น น้ำซุป และท็อปปิ้งที่คุณต้องการ</p>
          </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-orange-100">
          {noodle.image && (
            <Image
              src={noodle.image}
              alt={noodle.name}
              width={500}
              height={300}
              className="w-full h-60 object-cover"
            />
          )}
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{noodle.name}</h1>
            <p className="text-gray-600 mb-4">ราคา: <span className="font-semibold">{noodle.price} บาท</span></p>
  
            {/* เลือกเส้น */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg font-semibold text-gray-800">เลือกประเภทเส้น</span>
                <div className="flex-1 h-px bg-gradient-to-r from-orange-200 to-transparent"></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {noodle.noodleTypes.map(type => (
                  <button
                    key={type}
                    className={`px-4 py-3 rounded-xl border-2 transition-all hover:scale-105 ${
                      selectedNoodleType === type 
                        ? 'border-orange-400 bg-orange-500 text-white shadow-lg' 
                        : 'border-gray-200 hover:border-orange-200 hover:bg-orange-50'
                    }`}
                    onClick={() => setSelectedNoodleType(type)}
                  >
                    <span className="font-medium">{type}</span>
                  </button>
                ))}
              </div>
            </div>
  
            {/* เลือกน้ำซุป */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg font-semibold text-gray-800">เลือกน้ำซุป</span>
                <div className="flex-1 h-px bg-gradient-to-r from-red-200 to-transparent"></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {noodle.soupOptions.map(soup => (
                  <button
                    key={soup}
                    className={`px-4 py-3 rounded-xl border-2 transition-all hover:scale-105 ${
                      selectedSoup === soup 
                        ? 'border-red-400 bg-red-500 text-white shadow-lg' 
                        : 'border-gray-200 hover:border-red-200 hover:bg-red-50'
                    }`}
                    onClick={() => setSelectedSoup(soup)}
                  >
                    <span className="font-medium">{soup}</span>
                  </button>
                ))}
              </div>
            </div>
  
            {/* เลือกเนื้อสัตว์ */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg font-semibold text-gray-800">เลือกเนื้อสัตว์</span>
                <div className="flex-1 h-px bg-gradient-to-r from-yellow-200 to-transparent"></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {noodle.meatOptions.map((meat) => (
                  <button
                    key={meat.id}
                    className={`p-4 rounded-xl border-2 transition-all hover:scale-105 ${
                      selectedMeat === meat.name 
                        ? 'border-yellow-400 bg-yellow-500 text-white shadow-lg' 
                        : 'border-gray-200 hover:border-yellow-200 hover:bg-yellow-50'
                    }`}
                    onClick={() => setSelectedMeat(meat.name)}
                  >
                    <p className="font-semibold mb-1">{meat.name}</p>
                    <p className="text-sm opacity-90">{meat.description}</p>
                  </button>
                ))}
              </div>
            </div>
  
            {/* เลือกระดับความเผ็ด */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg font-semibold text-gray-800">ระดับความเผ็ด</span>
                <div className="flex-1 h-px bg-gradient-to-r from-red-300 to-transparent"></div>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {noodle.spiceOptions.map(spice => (
                  <button
                    key={spice}
                    className={`px-4 py-3 rounded-xl border-2 transition-all hover:scale-105 ${
                      selectedSpice === spice 
                        ? 'border-red-400 bg-red-500 text-white shadow-lg' 
                        : 'border-gray-200 hover:border-red-200 hover:bg-red-50'
                    }`}
                    onClick={() => setSelectedSpice(spice)}
                  >
                    <span className="font-medium">{spice}</span>
                  </button>
                ))}
              </div>
            </div>
  
            {/* เลือกน้ำซุปเสริม */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg font-semibold text-gray-800">เลือกน้ำซุปเสริม</span>
                <div className="flex-1 h-px bg-gradient-to-r from-blue-200 to-transparent"></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {noodle.brothOptions.map(broth => (
                  <button
                    key={broth}
                    className={`px-4 py-3 rounded-xl border-2 transition-all hover:scale-105 ${
                      selectedBroth === broth 
                        ? 'border-blue-400 bg-blue-500 text-white shadow-lg' 
                        : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50'
                    }`}
                    onClick={() => setSelectedBroth(broth)}
                  >
                    <span className="font-medium">{broth}</span>
                  </button>
                ))}
              </div>
            </div>
  
            {/* เลือกเครื่องเคียง (multiple) */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg font-semibold text-gray-800">เลือกเครื่องเคียง</span>
                <span className="text-sm text-gray-500">(เลือกได้หลายอย่าง)</span>
                <div className="flex-1 h-px bg-gradient-to-r from-green-200 to-transparent"></div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {noodle.sideOptions.map(side => (
                  <button
                    key={side}
                    className={`px-3 py-2 rounded-xl border-2 transition-all text-sm ${
                      selectedSides.includes(side) 
                        ? 'border-green-400 bg-green-500 text-white shadow-md' 
                        : 'border-gray-200 hover:border-green-200 hover:bg-green-50'
                    }`}
                    onClick={() => toggleSelection(side, selectedSides, setSelectedSides)}
                  >
                    {side}
                  </button>
                ))}
              </div>
            </div>
  
            {/* เลือกเครื่องปรุง (multiple) */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg font-semibold text-gray-800">เลือกเครื่องปรุง</span>
                <span className="text-sm text-gray-500">(เลือกได้หลายอย่าง)</span>
                <div className="flex-1 h-px bg-gradient-to-r from-purple-200 to-transparent"></div>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {noodle.garnishOptions.map(garnish => (
                  <button
                    key={garnish}
                    className={`px-3 py-2 rounded-xl border-2 transition-all text-sm ${
                      selectedGarnishes.includes(garnish) 
                        ? 'border-purple-400 bg-purple-500 text-white shadow-md' 
                        : 'border-gray-200 hover:border-purple-200 hover:bg-purple-50'
                    }`}
                    onClick={() => toggleSelection(garnish, selectedGarnishes, setSelectedGarnishes)}
                  >
                    {garnish}
                  </button>
                ))}
              </div>
            </div>
  
            {/* เลือกท็อปปิ้ง (multiple) */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg font-semibold text-gray-800">เลือกท็อปปิ้ง</span>
                <span className="text-sm text-gray-500">(เลือกได้หลายอย่าง)</span>
                <div className="flex-1 h-px bg-gradient-to-r from-indigo-200 to-transparent"></div>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {noodle.toppingsOptions.map(topping => (
                  <button
                    key={topping}
                    className={`px-3 py-2 rounded-xl border-2 transition-all text-sm ${
                      selectedToppings.includes(topping) 
                        ? 'border-indigo-400 bg-indigo-500 text-white shadow-md' 
                        : 'border-gray-200 hover:border-indigo-200 hover:bg-indigo-50'
                    }`}
                    onClick={() => toggleSelection(topping, selectedToppings, setSelectedToppings)}
                  >
                    {topping}
                  </button>
                ))}
              </div>
            </div>
  
            {/* จำนวน */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg font-semibold text-gray-800">จำนวน</span>
                <div className="flex-1 h-px bg-gradient-to-r from-orange-200 to-transparent"></div>
              </div>
              <div className="flex items-center justify-center gap-4 bg-gray-50 rounded-2xl p-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center text-gray-700 hover:from-gray-300 hover:to-gray-400 transition-all transform hover:scale-110"
                >
                  -
                </button>
                <div className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent min-w-[3rem] text-center">
                  {quantity}
                </div>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-400 to-red-400 flex items-center justify-center text-white hover:from-orange-500 hover:to-red-500 transition-all transform hover:scale-110"
                >
                  +
                </button>
              </div>
            </div>

            {/* Notes Section */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg font-semibold text-gray-800">หมายเหตุ</span>
                <span className="text-sm text-gray-500">(ไม่บังคับ)</span>
                <div className="flex-1 h-px bg-gradient-to-r from-orange-200 to-transparent"></div>
              </div>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="เช่น ไม่ใส่ผักกาด, เพิ่มเส้นหมี่, หรือข้อความอื่นๆ..."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition-all placeholder-gray-400"
                rows={3}
                maxLength={200}
              />
              <div className="text-right text-xs text-gray-400 mt-1">
                {notes.length}/200 ตัวอักษร
              </div>
            </div>
  
            {/* Total Price */}
            <div className="bg-gradient-to-r from-gray-50 to-orange-50 rounded-2xl p-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">ยอดรวม</span>
                <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  ฿{noodle.price * quantity}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-4 px-6 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl font-semibold hover:from-orange-600 hover:to-red-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <div className="flex items-center justify-center gap-2">
                  เพิ่มลงตะกร้า
                </div>
              </button>
              <button
                onClick={() => setIsCartOpen(true)}
                className="px-6 py-4 bg-white border-2 border-orange-200 text-orange-600 rounded-2xl font-semibold hover:bg-orange-50 hover:border-orange-300 transform hover:scale-105 transition-all duration-300"
              >
                ดูตะกร้า
              </button>
            </div>
          </div>
        </div>
      </div>

        <CartSidebar 
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
        />
      </div>
    )
    }
