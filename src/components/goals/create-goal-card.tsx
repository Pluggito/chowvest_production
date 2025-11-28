"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"

const commodities = [
  { value: "rice", label: "Rice", price: 45000 },
  { value: "beans", label: "Beans", price: 85000 },
  { value: "maize", label: "Maize Seeds", price: 25000 },
  { value: "garri", label: "Garri", price: 35000 },
  { value: "yam", label: "Yam Tubers", price: 55000 },
  { value: "cassava", label: "Cassava", price: 40000 },
]

export function CreateGoalCard() {
  return (
    <Card className="p-6 sticky top-24">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Plus className="w-5 h-5 text-primary" />
        </div>
        <h3 className="text-xl font-semibold text-foreground">Create New Goal</h3>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="commodity">Select Commodity</Label>
          <Select>
            <SelectTrigger id="commodity">
              <SelectValue placeholder="Choose a commodity" />
            </SelectTrigger>
            <SelectContent>
              {commodities.map((commodity) => (
                <SelectItem key={commodity.value} value={commodity.value}>
                  {commodity.label} - ₦{commodity.price.toLocaleString()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="target">Target Amount</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₦</span>
            <Input id="target" type="number" placeholder="0.00" className="pl-8" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="deadline">Target Date</Label>
          <Input id="deadline" type="date" />
        </div>

        <Button className="w-full mt-4">Create Goal</Button>
      </div>

      <div className="mt-6 p-4 rounded-lg bg-accent/30">
        <p className="text-xs text-muted-foreground text-center">
         Set your food goals, save steadily, and grow your Chowvest basket.
        </p>
      </div>
    </Card>
  )
}
