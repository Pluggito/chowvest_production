import { Target } from "lucide-react"

export function GoalsHeader() {
  return (
    <div className="flex items-center gap-4">
      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
        <Target className="w-7 h-7 text-primary" />
      </div>
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground text-balance">My Chow Targets</h1>
        <p className="text-muted-foreground mt-1">Save, grow, and secure your future meals</p>
      </div>
    </div>
  )
}
