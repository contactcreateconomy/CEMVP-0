"use client";

import { useState } from "react";
import { Button } from "@createconomy/ui";
import { Input } from "@createconomy/ui";
import { Label } from "@createconomy/ui";
import { Separator } from "@createconomy/ui";
import { SocialButton } from "./social-button";
import { Chrome, Facebook, Twitter } from "lucide-react";

interface UsernameFormProps {
  onSubmit?: (username: string) => void;
}

export function UsernameForm({ onSubmit }: UsernameFormProps) {
  const [username, setUsername] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onSubmit?.(username.trim());
    }
  };

  return (
    <div className="flex w-full flex-col gap-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="username" className="text-white">
            Choose a username
          </Label>
          <Input
            id="username"
            type="text"
            placeholder="e.g. Hipnode123"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-orange-500"
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-orange-500 text-white hover:bg-orange-600"
        >
          Next
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
        Already have an account?{" "}
        <a href="/auth/signin" className="text-orange-400 hover:text-orange-300">
          Sign in
        </a>
      </p>
    </div>
  );
}
