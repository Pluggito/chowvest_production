"use client";

import { useEffect } from "react";
import { useWalletStore } from "@/store/wallet-store";

interface WalletData {
  balance: number;
  totalDeposits: number;
  totalSpent: number;
  transactions: any[];
}

export function WalletSync({ wallet }: { wallet: WalletData }) {
  const setWallet = useWalletStore((state) => state.setWallet);
  const setTransactions = useWalletStore((state) => state.setTransactions);

  useEffect(() => {
    if (wallet) {
      setWallet({
        balance: wallet.balance,
        totalDeposits: wallet.totalDeposits,
        totalSpent: wallet.totalSpent,
      });
      setTransactions(wallet.transactions);
    }
  }, [wallet, setWallet, setTransactions]);

  return null;
}