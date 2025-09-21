import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    console.log('📝 Register attempt:', { name, email, hasPassword: !!password });

    // 🔒 ตรวจสอบข้อมูลทั้งหมด
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "กรุณากรอกข้อมูลให้ครบถ้วน" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร" },
        { status: 400 }
      );
    }

    // ตรวจสอบว่ามี email นี้แล้วหรือไม่
    try {
      const userExists = await prisma.user.findUnique({ where: { email } });
      if (userExists) {
        return NextResponse.json(
          { error: "อีเมลนี้ถูกใช้งานแล้ว" },
          { status: 400 }
        );
      }
    } catch (dbError) {
      console.log('⚠️ Database check failed, proceeding with registration...');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // สร้าง user ใหม่
    try {
      const newUser = await prisma.user.create({
        data: {
          name,
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



