'use client'

import { Suspense } from 'react'
import ResetPasswordForm from './ResetPasswordForm'

export default function ResetPasswordWrapper() {
  return (
    <Suspense 
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin h-8 w-8 border-4 border-black border-t-transparent rounded-full"></div>
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  )
}