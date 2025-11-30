"use client";

import { useSyncUser } from "@/hooks/use-sync-user";

export function UserSyncProvider({ children }: { children: React.ReactNode }) {
  useSyncUser();
  return <>{children}</>;
}