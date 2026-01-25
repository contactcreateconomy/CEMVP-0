import { type LucideIcon } from "lucide-react";
import { cn } from "@createconomy/ui";

interface SocialButtonProps {
  icon: LucideIcon;
  provider: "Google" | "Facebook" | "Twitter";
  onClick?: () => void;
}

const providerColors = {
  Google: "text-white",
  Facebook: "text-blue-500",
  Twitter: "text-blue-400",
};

export function SocialButton({ icon: Icon, provider, onClick }: SocialButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full items-center justify-center gap-3 rounded-md border border-gray-700 bg-gray-800 px-4 py-3 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-700",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
      )}
    >
      <Icon className={cn("h-5 w-5", providerColors[provider])} />
      <span>Sign Up With {provider}</span>
    </button>
  );
}
