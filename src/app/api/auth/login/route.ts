
// src/app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { email, password, rememberMe } = await req.json();
    
    console.log("📧 Login attempt:", { email, hasPassword: !!password, rememberMe });

    if (!email || !password) {
      return NextResponse.json({ error: "กรุณากรอกอีเมลและรหัสผ่าน" }, { status: 400 });
    }

    // ตรวจสอบผู้ใช้ในฐานข้อมูล
    const user = await prisma.user.findUnique({ where: { email } });
    console.log("👤 User found:", !!user, user?.name);
    
    if (!user) {
      return NextResponse.json({ 
        error: "ไม่พบผู้ใช้งาน กรุณาสมัครสมาชิกก่อน" 
      }, { status: 404 });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log("🔐 Password match:", passwordMatch);
    
    if (!passwordMatch) {
      return NextResponse.json({ error: "รหัสผ่านไม่ถูกต้อง" }, { status: 401 });
    }

    console.log("✅ Login successful for:", email);

    const userData = {
      id: user.id,
      email: user.email,
      name: user.name || 'User'
    };

    const response = NextResponse.json({
      success: true,
      message: 'เข้าสู่ระบบสำเร็จ',
      user: userData
    });

    // Set authentication cookie
    response.cookies.set('user', JSON.stringify(userData), {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      maxAge: rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60
    });

    return response;

  } catch (error) {
    console.error("❌ LOGIN ERROR:", error);
    return NextResponse.json({ 
      error: "เกิดข้อผิดพลาดในระบบ" 
    }, { status: 500 });
  }
}

