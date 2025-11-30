"use server";

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { Navigation } from "@/components/navigation";
import { DashboardClient } from "./client-wrapper";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  // Protect the page
  if (!session) {
    redirect("/auth");  // or wherever your login page lives
  }

  return (
    <>
      <Navigation/>
      <DashboardClient/>
    </>
  );
}
