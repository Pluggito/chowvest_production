"use client";

import { Navigation } from "@/components/navigation";
import { WalletHeader } from "@/components/wallet/wallet-header";
import { WalletBalance } from "@/components/wallet/wallet-balance";
import { TransactionHistory } from "@/components/wallet/transaction-history";
import { QuickTransfer } from "@/components/wallet/quick-transfer";
import { useIsMobile } from "@/hooks/use-mobile";

interface Basket {
  id: string;
  name: string;
  goalAmount: number;
  currentAmount: number;
}

interface WalletPageClientProps {
  baskets: Basket[];
}

export function WalletPageClient({ baskets }: WalletPageClientProps) {
  const isMobile = useIsMobile();

  return (
    <>
      <Navigation />
      <div className="container mx-auto px-4 md:px-6 space-y-6 pt-20 pb-24 md:pb-8">
        <WalletHeader />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {isMobile ? (
            <>
              <div className="lg:col-span-2 space-y-6">
                <WalletBalance />
                <QuickTransfer baskets={baskets} />
              </div>
              <div>
                <TransactionHistory />
              </div>
            </>
          ) : (
            <>
              <div className="lg:col-span-2 space-y-6">
                <WalletBalance />
                <TransactionHistory />
              </div>
              <div>
                <QuickTransfer baskets={baskets} />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}