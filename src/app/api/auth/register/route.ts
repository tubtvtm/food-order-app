import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    console.log('📝 Register attempt:', { 
      name: name || 'undefined', 
      email: email || 'undefined', 
      hasPassword: !!password,
      bodyKeys: Object.keys(body)
    });

    // 🔒 ตรวจสอบข้อมูลที่จำเป็น (name ไม่บังคับ)
    if (!email || !password) {
      console.log('❌ Missing required fields');
      return NextResponse.json(
        { error: "กรุณากรอกอีเมลและรหัสผ่าน" },
        { status: 400 }
      );
    }

    // ใช้ email เป็น name ถ้าไม่มี name
    const userName = name || email.split('@')[0] || 'User';
    console.log('👤 Using userName:', userName);

    if (password.length < 6) {
      console.log('❌ Password too short:', password.length);
      return NextResponse.json(
        { error: "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร" },
        { status: 400 }
      );
    }

    console.log('✅ Validation passed, checking existing user...');

    // ตรวจสอบว่ามี email นี้แล้วหรือไม่
    try {
      const userExists = await prisma.user.findUnique({ where: { email } });
      if (userExists) {
        console.log('❌ Email already exists');
        return NextResponse.json(
          { error: "อีเมลนี้ถูกใช้งานแล้ว" },
          { status: 400 }
        );
      }
    } catch (error) {
      console.log('⚠️ Database check failed, proceeding with registration...');
    }

    console.log('✅ Creating new user...');
    const hashedPassword = await bcrypt.hash(password, 10);

    // สร้าง user ใหม่
    try {
      const newUser = await prisma.user.create({
        data: {
          name: userName,
          email,
          password: hashedPassword,
        },
      });

      console.log('✅ User created:', { id: newUser.id, email: newUser.email, name: newUser.name });

      return NextResponse.json({ 
        success: true, 
        message: "สมัครสมาชิกสำเร็จ",
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email
        }
      }, { status: 201 });

    } catch (createError) {
      console.error('❌ Database create error:', createError);
      return NextResponse.json(
        { error: "ไม่สามารถสร้างบัญชีได้ กรุณาลองใหม่" },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error("❌ REGISTER ERROR:", error);
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดในระบบ กรุณาลองใหม่" },
      { status: 500 }
    );
  }
}



