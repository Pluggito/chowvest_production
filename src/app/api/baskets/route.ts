import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/db";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const baskets = await prisma.basket.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ baskets }, { status: 200 });
  } catch (error) {
    console.error("Fetch baskets error:", error);
    return NextResponse.json(
      { error: "Failed to fetch baskets" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, commodityType, image, goalAmount, targetDate, regularTopUp, description } =
      await req.json();

    if (!name || !goalAmount || goalAmount <= 0) {
      return NextResponse.json(
        { error: "Invalid basket data" },
        { status: 400 }
      );
    }

    const basket = await prisma.basket.create({
      data: {
        userId: session.user.id,
        name,
        commodityType,
        image,
        goalAmount,
        targetDate: targetDate ? new Date(targetDate) : null,
        regularTopUp,
        description,
      },
    });

    return NextResponse.json({ basket }, { status: 201 });
  } catch (error) {
    console.error("Create basket error:", error);
    return NextResponse.json(
      { error: "Failed to create basket" },
      { status: 500 }
    );
  }
}