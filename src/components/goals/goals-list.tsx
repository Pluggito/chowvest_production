import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Plus, MoreVertical } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const goals = [
  {
    id: 1,
    name: "50kg Bag of Rice",
    target: 45000,
    current: 38250,
    image: "/rice-bag.png",
    category: "Foodstuff",
    deadline: "Jan 15, 2025",
    topUp: 8000,
  },
  {
    id: 2,
    name: "100kg Beans",
    target: 85000,
    current: 72250,
    image: "/beans-sack.jpg",
    category: "Foodstuff",
    deadline: "Feb 1, 2025",
    topUp: 12000,
  },
  {
    id: 3,
    name: "Garri (50kg)",
    target: 35000,
    current: 28000,
    image: "/garri-bag.jpg",
    category: "Foodstuff",
    deadline: "Feb 10, 2025",
    topUp: 7000,
  },
]

export function GoalsList() {
  return (
    <div className="space-y-4">
      {goals.map((goal) => {
        const progress = (goal.current / goal.target) * 100
        const remaining = goal.target - goal.current

        return (
          <Card key={goal.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex flex-col md:flex-row gap-6">
              <img
                src={goal.image || "/placeholder.svg"}
                alt={goal.name}
                className="w-full md:w-32 h-32 rounded-xl object-cover bg-muted"
              />

              <div className="flex-1 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-semibold text-foreground">{goal.name}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {goal.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Target by {goal.deadline}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="text-muted-foreground">
                    <MoreVertical className="w-5 h-5" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-semibold text-foreground">{progress.toFixed(1)}%</span>
                  </div>
                  <Progress value={progress} className="h-3" />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground font-medium">₦{goal.current.toLocaleString()} saved</span>
                    <span className="text-muted-foreground">₦{remaining.toLocaleString()} remaining</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div>
                    <p className="text-xs text-muted-foreground">Regular Top-Up</p>
                    <p className="text-sm font-semibold text-foreground">
                      ₦{goal.topUp.toLocaleString()}
                    </p>
                  </div>
                  <Button size="sm" className="gap-2">
                    <Plus className="w-4 h-4" />
                    Add Funds
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
