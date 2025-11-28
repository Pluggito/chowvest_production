"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function QuickTransfer() {
  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold text-foreground mb-6">Quick Transfer</h3>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="goal">Transfer to Basket</Label>
          <Select>
            <SelectTrigger id="goal">
              <SelectValue placeholder="Select a basket" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rice">50kg Bag of Rice</SelectItem>
              <SelectItem value="beans">100kg Beans</SelectItem>
              <SelectItem value="maize">Maize Seeds (10kg)</SelectItem>
              <SelectItem value="garri">Garri (50kg)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="amount">Amount</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₦</span>
            <Input id="amount" type="number" placeholder="0.00" className="pl-8" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {[5000, 10000, 20000].map((amount) => (
            <Button key={amount} variant="outline" size="sm" className="text-xs bg-transparent">
              ₦{amount / 1000}k
            </Button>
          ))}
        </div>

        <Button className="w-full mt-4">Transfer Now</Button>

        <div className="pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            Available balance: <span className="font-semibold text-foreground">₦45,200</span>
          </p>
        </div>
      </div>
    </Card>
  )
}
