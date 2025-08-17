
// src/app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "อีเมลไม่ถูกต้อง" }, { status: 400 });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json({ error: "รหัสผ่านไม่ถูกต้อง" }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        balance: user.balance,
      },
    });
  } catch (err) {
    console.error("❌ LOGIN ERROR:", err);
    return NextResponse.json({ error: "เกิดข้อผิดพลาดบางอย่าง" }, { status: 500 });
  }
}

