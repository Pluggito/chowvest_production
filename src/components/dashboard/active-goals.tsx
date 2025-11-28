import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

const goals = [
  {
    name: "50kg Bag of Rice",
    target: 45000,
    current: 38250,
    image: "/rice-bag.png",
  },
  {
    name: "100kg Beans",
    target: 85000,
    current: 72250,
    image: "/beans-sack.jpg",
  },
  {
    name: "Garri (50kg)",
    target: 35000,
    current: 28000,
    image: "/garri-bag.jpg",
  },
]

export function ActiveGoals() {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-foreground">Your Food Basket Goals</h3>
          <p className="text-sm text-muted-foreground mt-1">Track your progress toward your targets</p>
        </div>
        <Button size="sm" className="gap-2">
          <Plus className="w-4 h-4" />
          New Goal
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {goals.map((goal) => {
          const progress = (goal.current / goal.target) * 100
          return (
            <Card key={goal.name} className="p-4 bg-accent/30 border-border/50">
              <div className="flex gap-4">
                <img
                  src={goal.image || "/placeholder.svg"}
                  alt={goal.name}
                  className="w-20 h-20 rounded-lg object-cover bg-muted"
                />
                <div className="flex-1 space-y-2">
                  <h4 className="font-semibold text-foreground">{goal.name}</h4>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium text-foreground">
                        ₦{goal.current.toLocaleString()} / ₦{goal.target.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    <p className="text-xs text-primary font-medium">{progress.toFixed(0)}% complete</p>
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </Card>
  )
}
