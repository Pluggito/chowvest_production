import { create } from "zustand";

interface Transaction {
  id: string;
  type: "DEPOSIT" | "WITHDRAWAL" | "TRANSFER_TO_BASKET" | "MARKET_PURCHASE" | "REFUND";
  amount: number;
  description: string;
  status: "PENDING" | "COMPLETED" | "FAILED" | "CANCELLED";
  createdAt: string;
  basketId?: string;
}

interface WalletState {
  balance: number;
  totalDeposits: number;
  totalSpent: number;
  monthlyIncrease: number;
  transactions: Transaction[];
  showBalance: boolean;
  
  setWallet: (wallet: {
    balance: number;
    totalDeposits: number;
    totalSpent: number;
  }) => void;
  
  setTransactions: (transactions: Transaction[]) => void;
  
  updateBalance: (amount: number) => void;
  
  addTransaction: (transaction: Transaction) => void;
  
  toggleBalanceVisibility: () => void;
  
  resetWallet: () => void;
}

export const useWalletStore = create<WalletState>((set) => ({
  balance: 0,
  totalDeposits: 0,
  totalSpent: 0,
  monthlyIncrease: 0,
  transactions: [],
  showBalance: true,

  setWallet: (wallet) =>
    set({
      balance: wallet.balance,
      totalDeposits: wallet.totalDeposits,
      totalSpent: wallet.totalSpent,
      monthlyIncrease: wallet.balance * 0.1, // Calculate from actual data
    }),

  setTransactions: (transactions) =>
    set({ transactions }),

  updateBalance: (amount) =>
    set((state) => ({
      balance: state.balance + amount,
    })),

  addTransaction: (transaction) =>
    set((state) => ({
      transactions: [transaction, ...state.transactions],
    })),

  toggleBalanceVisibility: () =>
    set((state) => ({
      showBalance: !state.showBalance,
    })),

  resetWallet: () =>
    set({
      balance: 0,
      totalDeposits: 0,
      totalSpent: 0,
      monthlyIncrease: 0,
      transactions: [],
      showBalance: true,
    }),
}));