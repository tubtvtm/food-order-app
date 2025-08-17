import { NextResponse } from 'next/server'
import { sendResetPasswordEmail } from '@/utils/email'

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    // Generate a reset token (in production, use a more secure method)
    const resetToken = Math.random().toString(36).substring(2, 15);
    
    // Save token to database (mock for now)
    // In production, you would save: { email, resetToken, expiresAt: new Date() + 1hr }
    
    // Send reset email
    await sendResetPasswordEmail(email, resetToken);
    
    return NextResponse.json({ 
      success: true, 
      message: "ส่งอีเมลรีเซ็ตรหัสผ่านแล้ว กรุณาตรวจสอบกล่องจดหมายของคุณ" 
    })

  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}