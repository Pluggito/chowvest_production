"use server";

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

import { Navigation } from "@/components/navigation";
import { ProfileClient } from "./client-wrapper";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  // Protect the page
  if (!session) {
    redirect("/auth/register");  // or wherever your login page lives
  }

  return (
    <>
      <Navigation />
     <ProfileClient/>
    </>
  );
}
