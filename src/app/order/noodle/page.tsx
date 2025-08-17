'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation'
import noodle from './../../menus/noodle'
import CartSidebar from '@/components/CartSidebar'

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
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg overflow-hidden">
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
            <div className="mb-4">
              <p className="font-semibold mb-1">เลือกประเภทเส้น:</p>
              <div className="grid grid-cols-4 gap-2">
                {noodle.noodleTypes.map(type => (
                  <button
                    key={type}
                    className={`px-3 py-2 rounded border ${selectedNoodleType === type ? 'bg-black text-white' : 'bg-white text-gray-800'}`}
                    onClick={() => setSelectedNoodleType(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
  
            {/* เลือกน้ำซุป */}
            <div className="mb-4">
              <p className="font-semibold mb-1">เลือกน้ำซุป:</p>
              <div className="grid grid-cols-4 gap-2">
                {noodle.soupOptions.map(soup => (
                  <button
                    key={soup}
                    className={`px-3 py-2 rounded border ${selectedSoup === soup ? 'bg-black text-white' : 'bg-white text-gray-800'}`}
                    onClick={() => setSelectedSoup(soup)}
                  >
                    {soup}
                  </button>
                ))}
              </div>
            </div>
  
            {/* เลือกเนื้อสัตว์ */}
            <div className="mb-4">
              <p className="font-semibold mb-1">เลือกเนื้อสัตว์:</p>
              <div className="grid grid-cols-2 gap-3">
                {noodle.meatOptions.map((meat) => (
                  <button
                    key={meat.id}
                    className={`p-4 rounded-xl border-2 transition-all hover:scale-105 ${
                      selectedMeat === meat.name 
                        ? 'border-black bg-black text-white' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedMeat(meat.name)}
                  >
                    <div className="text-4xl mb-2">{meat.icon}</div>
                    <p className="font-semibold text-gray-800 mb-1">{meat.name}</p>
                    <p className="text-sm text-gray-500 line-clamp-2">{meat.description}</p>
                  </button>
                ))}
              </div>
            </div>
  
            {/* เลือกระดับความเผ็ด */}
            <div className="mb-4">
              <p className="font-semibold mb-1">ระดับความเผ็ด:</p>
              <div className="grid grid-cols-4 gap-2">
                {noodle.spiceOptions.map(spice => (
                  <button
                    key={spice}
                    className={`px-3 py-2 rounded border ${selectedSpice === spice ? 'bg-black text-white' : 'bg-white text-gray-800'}`}
                    onClick={() => setSelectedSpice(spice)}
                  >
                    {spice}
                  </button>
                ))}
              </div>
            </div>
  
            {/* เลือกน้ำซุปเสริม */}
            <div className="mb-4">
              <p className="font-semibold mb-1">เลือกน้ำซุปเสริม:</p>
              <div className="grid grid-cols-4 gap-2">
                {noodle.brothOptions.map(broth => (
                  <button
                    key={broth}
                    className={`px-3 py-2 rounded border ${selectedBroth === broth ? 'bg-black text-white' : 'bg-white text-gray-800'}`}
                    onClick={() => setSelectedBroth(broth)}
                  >
                    {broth}
                  </button>
                ))}
              </div>
            </div>
  
            {/* เลือกเครื่องเคียง (multiple) */}
            <div className="mb-4">
              <p className="font-semibold mb-1">เลือกเครื่องเคียง (เลือกได้หลายอย่าง):</p>
              <div className="grid grid-cols-4 gap-2">
                {noodle.sideOptions.map(side => (
                  <button
                    key={side}
                    className={`px-3 py-2 rounded border ${selectedSides.includes(side) ? 'bg-black text-white' : 'bg-white text-gray-800'}`}
                    onClick={() => toggleSelection(side, selectedSides, setSelectedSides)}
                  >
                    {side}
                  </button>
                ))}
              </div>
            </div>
  
            {/* เลือกเครื่องปรุง (multiple) */}
            <div className="mb-4">
              <p className="font-semibold mb-1">เลือกเครื่องปรุง (เลือกได้หลายอย่าง):</p>
              <div className="grid grid-cols-4 gap-2">
                {noodle.garnishOptions.map(garnish => (
                  <button
                    key={garnish}
                    className={`px-3 py-2 rounded border ${selectedGarnishes.includes(garnish) ? 'bg-black text-white' : 'bg-white text-gray-800'}`}
                    onClick={() => toggleSelection(garnish, selectedGarnishes, setSelectedGarnishes)}
                  >
                    {garnish}
                  </button>
                ))}
              </div>
            </div>
  
            {/* เลือกท็อปปิ้ง (multiple) */}
            <div className="mb-6">
              <p className="font-semibold mb-1">เลือกท็อปปิ้ง (เลือกได้หลายอย่าง):</p>
              <div className="grid grid-cols-4 gap-2">
                {noodle.toppingsOptions.map(topping => (
                  <button
                    key={topping}
                    className={`px-3 py-2 rounded border ${selectedToppings.includes(topping) ? 'bg-black text-white' : 'bg-white text-gray-800'}`}
                    onClick={() => toggleSelection(topping, selectedToppings, setSelectedToppings)}
                  >
                    {topping}
                  </button>
                ))}
              </div>
            </div>
  
            {/* จำนวน */}
            <div className="mb-6">
              <p className="font-semibold mb-1">จำนวน:</p>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
                className="w-full px-3 py-2 border rounded"
                min={1}
              />
            </div>
  
            <div className="flex gap-2">
              <button
                onClick={handleAddToCart}
                className="w-full py-3 px-4 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-all"
              >
                เพิ่มลงตะกร้า 🛒
              </button>
              <button
                onClick={() => setIsCartOpen(true)}
                className="w-full py-3 px-4 bg-white border text-black rounded-lg font-semibold hover:bg-gray-100 transition-all"   
                >
                ดูตะกร้า
                </button>
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
