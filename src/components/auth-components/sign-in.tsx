"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserStore } from "@/store/user-store";
import { getSession } from "next-auth/react";

interface SignInProps {
  onToggle: () => void;
}

export function SignIn({ onToggle }: SignInProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { setUser } = useUserStore()


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setIsLoading(false);

    if (res?.error) {
      setErrorMsg("Invalid email or password.");
      return;
    }

      const session = await getSession();
   
    if(session?.user){
      setUser({
        id: session.user.id,
        fullName: session.user.name,
        email: session.user.email,
        phoneNumber: session.user.phoneNumber ?? "",
        location: session.user.location ?? "",
        createdAt: session.user.createdAt
      })
    }    

    // Successful login → redirect
    router.push("/dashboard");
  };

  return (
    <div className="w-full max-w-md">
      <div className="space-y-2 text-center md:text-left">
        <h2 className="text-3xl font-bold text-foreground">Welcome Back</h2>
        <p className="text-muted-foreground">Sign in to your Chowvest account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {errorMsg && (
          <p className="text-red-500 text-sm font-medium">{errorMsg}</p>
        )}

        <div className="space-y-2">
          <Label htmlFor="email" className="text-foreground">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-background border-border text-foreground placeholder:text-muted-foreground w-full"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-foreground">
              Password
            </Label>
            <button
              type="button"
              className="text-sm text-primary hover:underline font-medium"
            >
              Forgot?
            </button>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-background border-border text-foreground placeholder:text-muted-foreground"
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2 h-10"
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>
      </form>

      <div className="relative mt-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-background text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4">
        <Button
          type="button"
          variant="outline"
          className="border-border text-foreground hover:bg-muted bg-transparent"
        >
          Google
        </Button>
        <Button
          type="button"
          variant="outline"
          className="border-border text-foreground hover:bg-muted bg-transparent"
        >
          Apple
        </Button>
      </div>

      <div className="text-center text-sm mt-4">
        <span className="text-muted-foreground">Don`t have an account? </span>
        <button
          type="button"
          onClick={onToggle}
          className="text-primary hover:underline font-semibold"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
