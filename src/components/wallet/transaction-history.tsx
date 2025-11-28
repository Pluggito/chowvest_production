import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowDownToLine, ArrowUpFromLine, Repeat, ShoppingBag } from "lucide-react"

const transactions = [
  {
    id: 1,
    type: "deposit",
    description: "Bank Transfer",
    amount: 15000,
    date: "Today, 2:30 PM",
    status: "completed",
  },
  {
    id: 2,
    type: "transfer",
    description: "Transfer to Rice Goal",
    amount: -8000,
    date: "Yesterday, 4:15 PM",
    status: "completed",
  },
  {
    id: 3,
    type: "withdrawal",
    description: "Withdrawal to Bank",
    amount: -25000,
    date: "Dec 28, 10:20 AM",
    status: "completed",
  },
  {
    id: 4,
    type: "purchase",
    description: "Purchased 50kg Beans",
    amount: -42000,
    date: "Dec 25, 3:45 PM",
    status: "completed",
  },
  {
    id: 5,
    type: "deposit",
    description: "Card Payment",
    amount: 30000,
    date: "Dec 22, 11:30 AM",
    status: "completed",
  },
  {
    id: 6,
    type: "transfer",
    description: "Transfer to Maize Goal",
    amount: -5000,
    date: "Dec 20, 9:15 AM",
    status: "completed",
  },
]

const iconMap = {
  deposit: ArrowDownToLine,
  withdrawal: ArrowUpFromLine,
  transfer: Repeat,
  purchase: ShoppingBag,
}

export function TransactionHistory() {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-foreground">Transaction History</h3>
          <p className="text-sm text-muted-foreground mt-1">Your recent wallet activity</p>
        </div>
        <Badge variant="outline">Last 30 days</Badge>
      </div>

      <div className="space-y-3">
        {transactions.map((transaction) => {
          const Icon = iconMap[transaction.type as keyof typeof iconMap]
          const isPositive = transaction.amount > 0

          return (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 rounded-lg bg-accent/30 hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    isPositive ? "bg-primary/10" : "bg-muted"
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isPositive ? "text-primary" : "text-muted-foreground"}`} />
                </div>
                <div>
                  <p className="font-medium text-foreground">{transaction.description}</p>
                  <p className="text-sm text-muted-foreground">{transaction.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-semibold ${isPositive ? "text-primary" : "text-foreground"}`}>
                  {isPositive ? "+" : ""}₦{Math.abs(transaction.amount).toLocaleString()}
                </p>
                <Badge variant="secondary" className="text-xs mt-1">
                  {transaction.status}
                </Badge>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
