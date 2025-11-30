"use client";
import { Card } from "@/components/ui/card";
import { Target, TrendingUp, Award, Calendar } from "lucide-react";
import { useUserStore } from "@/store/user-store";

export function ProfileStats() {
  const user = useUserStore((state) => state);

  if (!user) return null;

  const stats = [
    {
      label: "Harvests Completed",
      value: "12",
      icon: Target,
    },
    {
      label: "Total Saved",
      value: "₦450,000",
      icon: TrendingUp,
    },
    {
      label: "Member Since",
      value: user?.createdAt
        ? new Date(user.createdAt).toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
          })
        : "—",
      icon: Calendar,
    },
    {
      label: "Achievements",
      value: "8",
      icon: Award,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label} className="p-4 text-center">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <Icon className="w-6 h-6 text-primary" />
            </div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
          </Card>
        );
      })}
    </div>
  );
}