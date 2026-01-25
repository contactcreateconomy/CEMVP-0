"use client";

import { useState } from "react";
import { Button } from "@createconomy/ui";
import { Input } from "@createconomy/ui";
import { Label } from "@createconomy/ui";
import { Separator } from "@createconomy/ui";
import { SocialButton } from "./social-button";
import { Chrome, Facebook, Twitter } from "lucide-react";

interface SignInFormProps {
  onSubmit?: (email: string, password: string) => void;
}

export function SignInForm({ onSubmit }: SignInFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && password.trim()) {
      onSubmit?.(email.trim(), password.trim());
    }
  };

  return (
    <div className="flex w-full flex-col gap-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="email" className="text-white">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-orange-500"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="password" className="text-white">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-orange-500"
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-orange-500 text-white hover:bg-orange-600"
        >
          Sign In
        </Button>
      </form>

      <div className="flex items-center gap-4">
        <Separator className="flex-1 bg-gray-700" />
        <span className="text-sm text-gray-500">or</span>
        <Separator className="flex-1 bg-gray-700" />
      </div>

      <div className="flex flex-col gap-3">
        <SocialButton icon={Chrome} provider="Google" />
        <SocialButton icon={Facebook} provider="Facebook" />
        <SocialButton icon={Twitter} provider="Twitter" />
      </div>

      <p className="text-center text-sm text-gray-400">
        Don't have an account?{" "}
        <a href="/" className="text-orange-400 hover:text-orange-300">
          Sign up
        </a>
      </p>
    </div>
  );
}
