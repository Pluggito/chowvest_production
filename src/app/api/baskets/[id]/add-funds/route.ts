import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/db";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Await params in Next.js 15
    const { id } = await context.params;

    const { amount } = await req.json();

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: "Invalid amount" },
        { status: 400 }
      );
    }

    // Get wallet
    const wallet = await prisma.wallet.findUnique({
      where: { userId: session.user.id },
    });

    if (!wallet || wallet.balance < amount) {
      return NextResponse.json(
        { error: "Insufficient balance" },
        { status: 400 }
      );
    }

    // Get basket
    const basket = await prisma.basket.findFirst({
      where: {
        id: id,
        userId: session.user.id,
      },
    });

    if (!basket) {
      return NextResponse.json(
        { error: "Basket not found" },
        { status: 404 }
      );
    }

    // Perform transfer
    const result = await prisma.$transaction(async (tx) => {
      // Update wallet
      const updatedWallet = await tx.wallet.update({
        where: { id: wallet.id },
        data: {
          balance: { decrement: amount },
        },
      });

      // Calculate new amount and check if goal is reached
      const newAmount = basket.currentAmount + amount;
      const isGoalReached = newAmount >= basket.goalAmount;

      // Update basket
      const updatedBasket = await tx.basket.update({
        where: { id: id },
        data: {
          currentAmount: { increment: amount },
          status: isGoalReached ? "COMPLETED" : basket.status,
          completedAt: isGoalReached ? new Date() : basket.completedAt,
        },
      });

      // Create transaction
      const transaction = await tx.transaction.create({
        data: {
          userId: session.user.id,
          walletId: wallet.id,
          basketId: id,
          type: "TRANSFER_TO_BASKET",
          amount,
          description: `Transfer to ${basket.name}`,
          status: "COMPLETED",
        },
      });

      return { wallet: updatedWallet, basket: updatedBasket, transaction };
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Add funds error:", error);
    return NextResponse.json(
      { error: "Failed to add funds" },
      { status: 500 }
    );
  }
}