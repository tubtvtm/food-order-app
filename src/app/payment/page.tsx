'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Swal from 'sweetalert2'
import PromptPayQR from '@/components/PromptPayQR'

export default function PaymentPage() {
  const [totalAmount, setTotalAmount] = useState(0)
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null)
  const [timeLeft, setTimeLeft] = useState(15 * 60) // 15 minutes in seconds
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'success' | 'failed'>('pending')
  const router = useRouter()

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]')
    const total = cartItems.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0)
    setTotalAmount(total)

    // Start countdown timer
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          Swal.fire({
            icon: 'error',
            title: 'หมดเวลาชำระเงิน',
            text: 'คำสั่งซื้อถูกยกเลิกเนื่องจากไม่ได้ชำระเงินภายใน 15 นาที',
            confirmButtonColor: '#000',
          }).then(() => {
            localStorage.removeItem('cart')
            router.push('/')
          })
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const paymentMethods = [
    {
      id: 'promptpay',
      name: 'พร้อมเพย์',
      icon: '💳',
      description: 'จ่ายด้วย QR Code พร้อมเพย์',
      
    },

    {
      id: 'cod',
      name: 'เก็บเงินปลายทาง',
      icon: '🚚',
      description: 'ชำระเงินเมื่อได้รับสินค้า',
    },
  ]

  const handlePayment = async () => {
    if (!selectedMethod) {
      Swal.fire({
        icon: 'warning',
        title: 'กรุณาเลือกวิธีชำระเงิน',
        confirmButtonColor: '#000',
      })
      return
    }

    setIsVerifying(true)

    if (selectedMethod === 'cod') {
      // สำหรับเก็บเงินปลายทาง รอ 30 วินาทีแล้วเปลี่ยนสถานะเป็นสำเร็จ
      await new Promise(resolve => setTimeout(resolve, 30000))
      setVerificationStatus('success')
    } else if (selectedMethod === 'promptpay') {
      try {
        const response = await fetch('/api/check-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: totalAmount,
            timestamp: Date.now(),
          }),
        })

        const data = await response.json()
        
        if (!data.success) {
          setIsVerifying(false)
          setVerificationStatus('failed')
          Swal.fire({
            icon: 'error',
            title: 'ไม่พบรายการโอนเงิน',
            text: 'กรุณาตรวจสอบการโอนเงินและลองใหม่อีกครั้ง',
            confirmButtonColor: '#000',
          })
          return
        }

        setVerificationStatus('success')
      } catch (error) {
        setIsVerifying(false)
        Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: 'ไม่สามารถตรวจสอบการชำระเงินได้ กรุณาลองใหม่อีกครั้ง',
          confirmButtonColor: '#000',
        })
        return
      }
    }

    // เมื่อการชำระเงินสำเร็จ
    setIsVerifying(false)
    Swal.fire({
      icon: 'success',
      title: 'ชำระเงินสำเร็จ! 🎉',
      text: selectedMethod === 'cod' ? 'คำสั่งซื้อของคุณจะถูกจัดส่งเร็วๆ นี้' : 'ขอบคุณที่ใช้บริการ',
      confirmButtonColor: '#000',
    }).then(() => {
      localStorage.removeItem('cart')
      router.push('/orders')
    })
  }

  return (
    
    
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">ชำระเงิน</h1>
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600">
              ยอดชำระทั้งหมด: <span className="font-bold text-xl">{totalAmount} บาท</span>
            </p>
            <p className="text-sm text-rose-600">
              เวลาที่เหลือ: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </p>
          </div>
          <p className="text-sm text-gray-500 mb-6">* กรุณาชำระเงินภายใน 15 นาที มิฉะนั้นคำสั่งซื้อจะถูกยกเลิก</p>

          <div className="space-y-3 mb-6">
            <p className="font-semibold">เลือกวิธีชำระเงิน:</p>
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`w-full p-4 rounded-xl border-2 transition-all ${
                  selectedMethod === method.id
                    ? 'border-black bg-black text-white'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{method.icon}</span>
                  <div className="text-left">
                    <p className="font-semibold">{method.name}</p>
                    <p className="text-sm opacity-75">{method.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {selectedMethod === 'promptpay' && (
            <div className="mb-6">
              <PromptPayQR amount={totalAmount} />
              <p className="text-sm text-gray-500 mt-4 text-center">
                * กรุณาสแกนจ่ายเงินก่อนกดปุ่มยืนยันการชำระเงิน
              </p>
            </div>
          )}

          <button
            onClick={handlePayment}
            disabled={isVerifying}
            className={`w-full py-3 px-4 rounded-lg font-semibold transition-all ${
              isVerifying 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-black text-white hover:bg-gray-800'
            }`}
          >
            {isVerifying ? (
              <>
                {selectedMethod === 'cod' 
                  ? 'กำลังดำเนินการ (30 วินาที)...'
                  : 'กำลังตรวจสอบการชำระเงิน...'}
              </>
            ) : (
              'ยืนยันการชำระเงิน'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}