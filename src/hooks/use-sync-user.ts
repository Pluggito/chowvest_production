"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useUserStore } from "@/store/user-store";

export function useSyncUser() {
  const { data: session, status } = useSession();
  const setUser = useUserStore((state) => state.setUser);
  const resetUser = useUserStore((state) => state.resetUser);

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      setUser({
        id: session.user.id,
        fullName: session.user.name,
        email: session.user.email,
        phoneNumber: session.user.phoneNumber || "",
        location: session.user.location || "",
        createdAt: session.user.createdAt,
      });
    } else if (status === "unauthenticated") {
      resetUser();
    }
  }, [session, status, setUser, resetUser]);
}