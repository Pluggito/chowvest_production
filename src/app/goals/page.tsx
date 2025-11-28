import { Navigation } from "@/components/navigation"
import { GoalsHeader } from "@/components/goals/goals-header"
import { GoalsList } from "@/components/goals/goals-list"
import { CreateGoalCard } from "@/components/goals/create-goal-card"

export default function GoalsPage() {
  return (
    <>
      <Navigation />
      <div className="container mx-auto px-4 md:px-6 space-y-6 pt-20 pb-24 md:pb-8">
        <GoalsHeader />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <GoalsList />
          </div>
          <div>
            <CreateGoalCard />
          </div>
        </div>
      </div>
    </>
  )
}
