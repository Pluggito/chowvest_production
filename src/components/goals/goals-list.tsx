"use client";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Plus, MoreVertical } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useBasketStore } from "@/store/basket-store";
import { useWalletStore } from "@/store/wallet-store";
import { format } from "date-fns";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

export function GoalsList() {
  const { baskets, updateBasket } = useBasketStore();
  const { balance, updateBalance, addTransaction } = useWalletStore();
  const [selectedBasket, setSelectedBasket] = useState<string | null>(null);
  const [addFundsOpen, setAddFundsOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const activeBaskets = baskets.filter((b) => b.status === "ACTIVE");

  const handleAddFunds = (basketId: string) => {
    setSelectedBasket(basketId);
    setAddFundsOpen(true);
  };

  const confirmAddFunds = async () => {
    if (!selectedBasket || !amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (parseFloat(amount) > balance) {
      toast.error("Insufficient balance");
      return;
    }

    try {
      setIsLoading(true);

      const res = await axios.post(
        `/api/baskets/${selectedBasket}/add-funds`,
        {
          amount: parseFloat(amount),
        }
      );

      // Update local state
      updateBalance(-parseFloat(amount));
      updateBasket(selectedBasket, {
        currentAmount: res.data.basket.currentAmount,
        status: res.data.basket.status,
      });
      addTransaction(res.data.transaction);

      toast.success("Funds added successfully!");
      setAddFundsOpen(false);
      setAmount("");
      setSelectedBasket(null);
    } catch (error) {
      console.error(error);
      toast.error("Failed to add funds");
    } finally {
      setIsLoading(false);
    }
  };

  if (activeBaskets.length === 0) {
    return (
      <Card className="p-12 text-center">
        <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
          <Plus className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">No Goals Yet</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Create your first food goal to start saving
        </p>
      </Card>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {activeBaskets.map((goal) => {
          const progress = (goal.currentAmount / goal.goalAmount) * 100;
          const remaining = goal.goalAmount - goal.currentAmount;

          return (
            <Card key={goal.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row gap-6">
                <img
                  src={goal.image || "/placeholder.svg"}
                  alt={goal.name}
                  width={100}
                  height={100}
                  className="w-full md:w-32 h-32 rounded-xl object-cover bg-muted"
                />

                <div className="flex-1 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-semibold text-foreground">
                          {goal.name}
                        </h3>
                        <Badge variant="secondary" className="text-xs">
                          {goal.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Target by{" "}
                        {goal.targetDate
                          ? format(new Date(goal.targetDate), "MMM d, yyyy")
                          : "No deadline"}
                      </p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground"
                        >
                          <MoreVertical className="w-5 h-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit Goal</DropdownMenuItem>
                        <DropdownMenuItem>Pause Goal</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          Delete Goal
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-semibold text-foreground">
                        {progress.toFixed(1)}%
                      </span>
                    </div>
                    <Progress value={progress} className="h-3" />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-foreground font-medium">
                        ₦{goal.currentAmount.toLocaleString()} saved
                      </span>
                      <span className="text-muted-foreground">
                        ₦{remaining.toLocaleString()} remaining
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <div>
                      <p className="text-xs text-muted-foreground">Regular Top-Up</p>
                      <p className="text-sm font-semibold text-foreground">
                        ₦{goal.regularTopUp?.toLocaleString() || "0"}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      className="gap-2"
                      onClick={() => handleAddFunds(goal.id)}
                    >
                      <Plus className="w-4 h-4" />
                      Add Funds
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Add Funds Dialog */}
      <Dialog open={addFundsOpen} onOpenChange={setAddFundsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Funds to Goal</DialogTitle>
            <DialogDescription>
              Transfer funds from your wallet to this goal
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Amount</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  ₦
                </span>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-8"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[5000, 10000, 20000].map((amt) => (
                <Button
                  key={amt}
                  variant="outline"
                  size="sm"
                  onClick={() => setAmount(amt.toString())}
                  disabled={isLoading}
                >
                  ₦{amt / 1000}k
                </Button>
              ))}
            </div>

            <div className="p-3 rounded-lg bg-muted">
              <p className="text-sm text-muted-foreground">
                Available balance:{" "}
                <span className="font-semibold text-foreground">
                  ₦{balance.toLocaleString()}
                </span>
              </p>
            </div>

            <Button
              onClick={confirmAddFunds}
              disabled={isLoading || !amount || parseFloat(amount) <= 0}
              className="w-full"
            >
              {isLoading ? "Processing..." : "Add Funds"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}