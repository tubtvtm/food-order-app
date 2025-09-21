'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'
import ResetPasswordWrapper from '@/components/ResetPasswordWrapper'

export default function ResetPasswordPage() {
  return <ResetPasswordWrapper />
}