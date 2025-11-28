"use server";

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

import { DashboardHeader } from "@/components/dashboard/header";
import { StatsCards } from "@/components/dashboard/stats-card";
import { ActiveGoals } from "@/components/dashboard/active-goals";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { Navigation } from "@/components/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  // Protect the page
  if (!session) {
    redirect("/signin");  // or wherever your login page lives
  }

  return (
    <>
      <Navigation/>
      <div className="container mx-auto px-4 md:px-6 space-y-6 pt-20 pb-24 md:pb-8">
        <DashboardHeader user={session.user} />
        <StatsCards />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ActiveGoals />
          </div>
          <div>
            <QuickActions />
          </div>
        </div>
      </div>
    </>
  );
}
