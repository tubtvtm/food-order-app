import type { Metadata } from 'next'
import { Mitr } from 'next/font/google'
import '../styles/globals.css'
import { Providers } from './providers'

const mitr = Mitr({ subsets: ['thai'], weight: ['400', '600', '700'] })

export const metadata: Metadata = {
  title: 'Food Order App',
  description: 'Order your favorite food online',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
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



