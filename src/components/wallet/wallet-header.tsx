import { ArrowDownToLine, ArrowUpFromLine } from "lucide-react"
import { Button } from "@/components/ui/button"

export function WalletHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground text-balance">Wallet</h1>
        <p className="text-muted-foreground mt-1">Manage your funds and transactions</p>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="outline" className="gap-2 bg-transparent">
          <ArrowDownToLine className="w-4 h-4" />
          Deposit
        </Button>
      </div>
    </div>
  )
}
