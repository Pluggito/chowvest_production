"use server";

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

import { Navigation } from "@/components/navigation";
import { ProfileHeader } from "@/components/profile/profile-header";
import { ProfileStats } from "@/components/profile/profile-stats";
import { ProfileSettings } from "@/components/profile/profile-settings";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  // Protect the page
  if (!session) {
    redirect("/signin");  // or wherever your login page lives
  }

  return (
    <>
      <Navigation />
      <div className="container mx-auto px-4 md:px-6 space-y-6 pt-20 pb-24 md:pb-8">
        <ProfileHeader user={session.user}/>
        <ProfileStats user={session.user}/>
        <ProfileSettings user={session.user}/>
      </div>
    </>
  );
}
