import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import { WalletPageClient } from "./client-wrapper";
import { WalletSync } from "@/hooks/wallet-sync";

export default async function WalletPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/auth");
  }

  // Get or create wallet
  let wallet = await prisma.wallet.findUnique({
    where: { userId: session.user.id },
    include: {
      transactions: {
        orderBy: { createdAt: "desc" },
        take: 20,
      },
    },
  });

  if (!wallet) {
    wallet = await prisma.wallet.create({
      data: { userId: session.user.id },
      include: { transactions: true },
    });
  }

  // Get user's baskets
  const baskets = await prisma.basket.findMany({
    where: { userId: session.user.id },
    select: {
      id: true,
      name: true,
      goalAmount: true,
      currentAmount: true,
    },
  });

  // Serialize wallet data for client
  const serializedWallet = {
    balance: wallet.balance,
    totalDeposits: wallet.totalDeposits,
    totalSpent: wallet.totalSpent,
    transactions: wallet.transactions.map((t) => ({
      id: t.id,
      type: t.type,
      amount: t.amount,
      description: t.description,
      status: t.status,
      createdAt: t.createdAt.toISOString(),
      basketId: t.basketId,
    })),
  };

  return (
    <>
      <WalletSync wallet={serializedWallet} />
      <WalletPageClient baskets={baskets} />
    </>
  );
}