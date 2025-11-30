import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import { Navigation } from "@/components/navigation";
import { CreateGoalCard } from "@/components/goals/create-goal-card";
import { GoalsList } from "@/components/goals/goals-list";
import { BasketSync } from "@/hooks/basket-sync";
import { Target } from "lucide-react";

export default async function GoalsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/auth");
  }

  const baskets = await prisma.basket.findMany({
    where: {
      userId: session.user.id,
      status: "ACTIVE",
    },
    orderBy: { createdAt: "desc" },
  });

  const serializedBaskets = baskets.map((basket) => ({
    id: basket.id,
    name: basket.name,
    commodityType: basket.commodityType,
    image: basket.image,
    goalAmount: basket.goalAmount,
    currentAmount: basket.currentAmount,
    description: basket.description,
    targetDate: basket.targetDate?.toISOString() || null,
    regularTopUp: basket.regularTopUp,
    category: basket.category,
    status: basket.status,
    createdAt: basket.createdAt.toISOString(),
  }));

  return (
    <>
      <Navigation />
      <BasketSync baskets={serializedBaskets} />
      <div className="container mx-auto px-4 md:px-6 space-y-6 pt-20 pb-24 md:pb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Target className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">My Chow Targets</h1>
            <p className="text-muted-foreground mt-1">
              Save, grow, and secure your future meals
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <GoalsList />
          </div>
          <div>
            <CreateGoalCard />
          </div>
        </div>
      </div>
    </>
  );
}