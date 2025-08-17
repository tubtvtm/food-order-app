import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json()
    
    // For demo, we'll get the old password from localStorage
    const oldPassword = "oldpassword123" // In real app, get from database
    
    if (password === oldPassword) {
      return NextResponse.json(
        { error: "รหัสผ่านใหม่ต้องไม่ซ้ำกับรหัสผ่านเดิม" },
        { status: 400 }
      )
    }
    
    // For demo, we'll simulate success
    return NextResponse.json({ 
      success: true, 
      message: "Password has been reset successfully" 
    })

  } catch (error) {
    return NextResponse.json(
      { error: "Could not reset password" },
      { status: 500 }
    )
  }
}