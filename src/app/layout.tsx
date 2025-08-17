import type { Metadata } from 'next'
import { Mitr } from 'next/font/google'
import '../styles/globals.css'
import { Providers } from './providers'

const mitr = Mitr({ subsets: ['thai'], weight: ['400', '600', '700'] })

export const metadata: Metadata = {
  title: 'FOOD ORDER WEB',
  description: 'ระบบสั่งอาหารออนไลน์สุดคูล 🍔🍜🍕',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={mitr.className}>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}



