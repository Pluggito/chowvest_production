import prisma from "@/lib/db";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, email, password, phoneNumber } = body;

    if (!fullName || !email || !password || !phoneNumber) {
      return NextResponse.json(
        { error: "Missing credentials" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const userExist = await prisma.user.findUnique({ where: { email } });
    if (userExist) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashed = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        fullName,
        email,
        password: hashed,
        phoneNumber,
      },
    });

    console.log("New user created:", newUser.id);
    
    return NextResponse.json(
      { ok: true, userId: newUser.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}