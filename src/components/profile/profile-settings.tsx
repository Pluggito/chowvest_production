"use client";

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import React, { useState } from "react";
import axios from "axios";

interface UserProps {
  id: string;
  name: string;
  email: string;

}
export function ProfileSettings({ user }: { user: UserProps }) {
  const [updateFullName, setUpdateFullName] = useState("");
  const [updateEmail, setUpdateEmail] = useState("");
  const [updatePhone, setUpdatePhone] = useState("");
  const [updateLocation, setUpdateLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpdates = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      const res = await axios.put(`/api/auth/current`, {
        fullName: updateFullName || user.name,
        email: updateEmail || user.email,
        phoneNumber: updatePhone,
        location: updateLocation,
      });

      console.log("UPDATED", res.data);
    } catch (error: unknown) {
      console.error(error);
      let errorMessage = "Registration failed";

      if (axios.isAxiosError(error)) {
        const data = error.response?.data as { error?: string } | undefined;
        errorMessage = data?.error || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="p-6">
        <h3 className="text-xl font-semibold text-foreground mb-6">
          Personal Information
        </h3>
        {error && (
          <div className="p-3 rounded-md bg-red-50 border border-red-200">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullname">Full Name</Label>
            <Input
              id="fullname"
              name="name"
              placeholder={user.name}
              value={updateFullName}
              onChange={(e) => setUpdateFullName(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder={user.email}
              value={updateEmail}
              onChange={(e) => setUpdateEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              name="phoneNumber"
              placeholder="+234 801 234 5678"
              value={updatePhone}
              onChange={(e) => setUpdatePhone(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              placeholder="Lagos, Nigeria"
              value={updateLocation}
              onChange={(e) => setUpdateLocation(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <Button className="w-full" onClick={handleUpdates}>
            Save Changes
          </Button>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-xl font-semibold text-foreground mb-6">
          Preferences
        </h3>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive updates via email
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>SMS Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Get SMS for transactions
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Goal Reminders</Label>
              <p className="text-sm text-muted-foreground">
                Remind me about my goals
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Market Updates</Label>
              <p className="text-sm text-muted-foreground">
                Price changes and deals
              </p>
            </div>
            <Switch />
          </div>
        </div>
      </Card>
    </div>
  );
}
