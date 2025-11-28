import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions"; // wherever your next-auth config is

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const body = await req.json();
    const { fullName, email, phoneNumber, location } = body;

    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: { fullName, email, phoneNumber, location },
    });

    return NextResponse.json({ ok: true, user });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
