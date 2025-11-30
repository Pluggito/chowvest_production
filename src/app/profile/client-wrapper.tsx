"use client"

import { useSession } from "next-auth/react"
import { ProfileHeader } from "@/components/profile/profile-header"
import { ProfileStats } from "@/components/profile/profile-stats"
import { ProfileSettings } from "@/components/profile/profile-settings"

export function ProfileClient(){
    const {data: session} = useSession()

    if (!session || !session.user) {
        return null; // or a loading state
    }

    return(
         <div className="container mx-auto px-4 md:px-6 space-y-6 pt-20 pb-24 md:pb-8">
        <ProfileHeader />
        <ProfileStats />
        <ProfileSettings user={session.user}/>
      </div>
    )
}