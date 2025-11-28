import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, ArrowUpRight, Repeat, Package } from "lucide-react"

const actions = [
  {
    label: "Add Money",
    icon: Plus,
    variant: "default" as const,
  },
  {
    label: "Request Delivery",
    icon: Package,
    variant: "outline" as const,
  },
]

export function QuickActions() {
  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h3>
      <div className="space-y-3">
        {actions.map((action) => {
          const Icon = action.icon
          return (
            <Button key={action.label} variant={action.variant} className="w-full justify-start gap-3 h-12">
              <Icon className="w-5 h-5" />
              {action.label}
            </Button>
          )
        })}
      </div>
    </Card>
  )
}
