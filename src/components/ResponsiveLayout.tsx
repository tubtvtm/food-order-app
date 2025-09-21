'use client'

import { ReactNode } from 'react'

interface ResponsiveLayoutProps {
  children: ReactNode
  className?: string
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  padding?: boolean
  safeArea?: boolean
}

export default function ResponsiveLayout({ 
  children, 
  className = '', 
  maxWidth = 'lg',
  padding = true,
  safeArea = true
}: ResponsiveLayoutProps) {
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    '2xl': 'max-w-6xl',
    full: 'max-w-full'
  }

  return (
    <div className={`min-h-screen ${safeArea ? 'safe-area-top safe-area-bottom' : ''} ${className}`}>
      <div className={`
        ${maxWidthClasses[maxWidth]} 
        mx-auto 
        ${padding ? 'px-responsive py-responsive' : ''}
      `}>
        {children}
      </div>
    </div>
  )
}