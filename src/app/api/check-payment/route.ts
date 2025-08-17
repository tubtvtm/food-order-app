import { NextResponse } from 'next/server'
import { bankApi } from '@/services/bankApi'

export async function POST(req: Request) {
  try {
    const { amount, bank } = await req.json()

    let success = false

    switch (bank) {
      case 'scb':
        success = await bankApi.checkSCBPayment(amount)
        break
      case 'kbank':
        success = await bankApi.checkKBankPayment(amount)
        break
      case 'bangkok':
        success = await bankApi.checkBangkokBankPayment(amount)
        break
      default:
        throw new Error('Unsupported bank')
    }

    return NextResponse.json({ success })
  } catch (error) {
    console.error('Error checking payment:', error)
    return NextResponse.json({ success: false, error: 'Failed to check payment' })
  }
}