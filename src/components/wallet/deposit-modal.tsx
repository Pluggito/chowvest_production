"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import {
  Building2,
  CreditCard,
  Copy,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { useWalletStore } from "@/store/wallet-store";
import { toast } from "sonner";
import axios from "axios";

interface DepositModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DepositModal({ open, onOpenChange }: DepositModalProps) {
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [depositStep, setDepositStep] = useState<"input" | "processing" | "success">("input");
  const { updateBalance, addTransaction } = useWalletStore();

  const quickAmounts = [5000, 10000, 20000, 50000];

  const handleBankTransfer = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    setDepositStep("processing");
  };

  const confirmBankTransfer = async () => {
    try {
      setIsLoading(true);

      const res = await axios.post("/api/wallet/deposit", {
        amount: parseFloat(amount),
        method: "BANK_TRANSFER",
      });

      // Update local state
      updateBalance(parseFloat(amount));
      addTransaction(res.data.transaction);

      setDepositStep("success");
      toast.success("Deposit successful!");

      // Reset after 2 seconds
      setTimeout(() => {
        onOpenChange(false);
        setDepositStep("input");
        setAmount("");
      }, 2000);
    } catch (error) {
      console.error(error);
      toast.error("Deposit failed");
      setDepositStep("input");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCardPayment = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    try {
      setIsLoading(true);

      const res = await axios.post("/api/wallet/deposit", {
        amount: parseFloat(amount),
        method: "CARD",
      });

      updateBalance(parseFloat(amount));
      addTransaction(res.data.transaction);

      toast.success("Payment successful!");
      onOpenChange(false);
      setAmount("");
    } catch (error) {
      console.error(error);
      toast.error("Payment failed");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const handleClose = () => {
    onOpenChange(false);
    setDepositStep("input");
    setAmount("");
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Deposit Funds</DialogTitle>
          <DialogDescription>
            Add money to your Chowest wallet
          </DialogDescription>
        </DialogHeader>

        {depositStep === "input" && (
          <Tabs defaultValue="bank" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="bank">
                <Building2 className="w-4 h-4 mr-2" />
                Bank Transfer
              </TabsTrigger>
              <TabsTrigger value="card">
                <CreditCard className="w-4 h-4 mr-2" />
                Card Payment
              </TabsTrigger>
            </TabsList>

            {/* Bank Transfer Tab */}
            <TabsContent value="bank" className="space-y-4">
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
                    className="pl-8 text-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {quickAmounts.map((amt) => (
                  <Button
                    key={amt}
                    variant="outline"
                    size="sm"
                    onClick={() => setAmount(amt.toString())}
                  >
                    ₦{amt / 1000}k
                  </Button>
                ))}
              </div>

              <Card className="p-4 bg-muted">
                <p className="text-sm text-muted-foreground mb-2">
                  Transfer to our bank account:
                </p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Bank Name:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">GTBank</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => copyToClipboard("GTBank")}
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Account Number:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">0123456789</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => copyToClipboard("0123456789")}
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Account Name:</span>
                    <span className="font-semibold">Chowest Ltd</span>
                  </div>
                </div>
              </Card>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs text-blue-800">
                  <strong>Note:</strong> After making the transfer, click &quot;I&apos;ve
                  Made the Transfer&quot; below. Your deposit will be confirmed within
                  5-10 minutes.
                </p>
              </div>

              <Button
                onClick={handleBankTransfer}
                disabled={!amount || parseFloat(amount) <= 0}
                className="w-full"
              >
                I&apos;ve Made the Transfer
              </Button>
            </TabsContent>

            {/* Card Payment Tab */}
            <TabsContent value="card" className="space-y-4">
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
                    className="pl-8 text-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {quickAmounts.map((amt) => (
                  <Button
                    key={amt}
                    variant="outline"
                    size="sm"
                    onClick={() => setAmount(amt.toString())}
                  >
                    ₦{amt / 1000}k
                  </Button>
                ))}
              </div>

              <Card className="p-4 bg-muted">
                <p className="text-sm text-muted-foreground mb-3">
                  Instant deposit with your debit card
                </p>
                <div className="flex items-center gap-2">
                  <div className="text-xs font-semibold px-2 py-1 bg-blue-600 text-white rounded">
                    VISA
                  </div>
                  <div className="text-xs font-semibold px-2 py-1 bg-red-600 text-white rounded">
                    MASTERCARD
                  </div>
                  <div className="text-xs font-semibold px-2 py-1 bg-teal-600 text-white rounded">
                    VERVE
                  </div>
                </div>
              </Card>

              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-xs text-green-800">
                  <strong>Secure Payment:</strong> Your payment is processed
                  securely through Paystack. We never store your card details.
                </p>
              </div>

              <Button
                onClick={handleCardPayment}
                disabled={!amount || parseFloat(amount) <= 0 || isLoading}
                className="w-full"
              >
                {isLoading ? "Processing..." : "Pay Now"}
              </Button>
            </TabsContent>
          </Tabs>
        )}

        {depositStep === "processing" && (
          <div className="py-8 space-y-6">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center mb-4">
                <Clock className="w-8 h-8 text-yellow-600 animate-pulse" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Awaiting Confirmation
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                We&apos;re checking for your payment. This usually takes 5-10 minutes.
              </p>

              <Card className="p-4 bg-muted w-full text-left">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Amount:</span>
                    <span className="font-semibold">
                      ₦{parseFloat(amount).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Method:</span>
                    <span className="font-semibold">Bank Transfer</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <span className="text-yellow-600 font-semibold">
                      Pending
                    </span>
                  </div>
                </div>
              </Card>
            </div>

            <div className="space-y-2">
              <Button
                onClick={confirmBankTransfer}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? "Confirming..." : "Confirm Deposit"}
              </Button>
              <Button
                onClick={() => setDepositStep("input")}
                variant="outline"
                className="w-full"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {depositStep === "success" && (
          <div className="py-8">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Deposit Successful!</h3>
              <p className="text-sm text-muted-foreground mb-4">
                ₦{parseFloat(amount).toLocaleString()} has been added to your
                wallet
              </p>

              <Card className="p-4 bg-green-50 border-green-200 w-full">
                <p className="text-sm text-green-800 text-center">
                  Your new balance has been updated
                </p>
              </Card>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}