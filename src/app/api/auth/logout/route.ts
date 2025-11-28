import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { email, password } = body;
    if (!email || !password) {
      return NextResponse.json(
        {
          error: "Missing credentials",
        },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (
      !user ||
      !user.password ||
      !(await bcrypt.compare(password, user.password))
    ) {
      return NextResponse.json(
        {
          error: "Email or Password not valid",
        },
        { status: 401 }
      );
    }
  } catch (error) {}
}
