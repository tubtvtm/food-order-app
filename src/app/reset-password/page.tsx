'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'
import ResetPasswordForm from '@/components/ResetPasswordForm'

export default function ResetPasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

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

  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-black border-t-transparent rounded-full"></div>
      </div>
    }>
      <ResetPasswordForm token={tokenParam} />
    </Suspense>
  )
}