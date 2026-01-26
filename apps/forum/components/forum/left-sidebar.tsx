"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@createconomy/convex/client";
import { Plus, Activity, LucideIcon } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { Button } from "@createconomy/ui";
import { cn } from "@createconomy/utils";
import { useForumTenant } from "@/hooks";

interface LeftSidebarProps {
  className?: string;
  selectedCategoryName?: string | null;
  onCategoryChange?: (categoryName: string | null) => void;
}

// Map icon string names to Lucide icon components
const iconMap: Record<string, LucideIcon> = {
  Code: LucideIcons.Code,
  Palette: LucideIcons.Palette,
  Rocket: LucideIcons.Rocket,
  Brain: LucideIcons.Brain,
  Gamepad2: LucideIcons.Gamepad2,
  BookOpen: LucideIcons.BookOpen,
  MessageSquare: LucideIcons.MessageSquare,
  Hash: LucideIcons.Hash,
  Star: LucideIcons.Star,
  Zap: LucideIcons.Zap,
};

function getCategoryIcon(iconName: string): LucideIcon {
  return iconMap[iconName] || LucideIcons.Hash;
}

export function LeftSidebar({ className, selectedCategoryName, onCategoryChange }: LeftSidebarProps) {
  const { tenantId } = useForumTenant();
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  // Fetch categories from Convex
  const categories = useQuery(
    // @ts-expect-error - api object pattern causes type mismatch, runtime works correctly
    api.forum.getForumCategories,
    tenantId ? { tenantId } : "skip"
  );

  const handleCategoryClick = (categoryName: string | null) => {
    const newSelection = selectedCategoryName === categoryName ? null : categoryName;
    onCategoryChange?.(newSelection);
  };

  return (
    <aside className={cn("flex flex-col gap-4 p-4", className)}>
      {/* New Discussion Button */}
      <Button
        className="group w-full gap-2 bg-primary font-semibold shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
      >
        <Plus className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90" />
        New Discussion
      </Button>

      {/* Categories */}
      <div className="mt-2">
        <h3 className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Categories
        </h3>
        <div className="space-y-1">
          {categories?.map((category: any, index: number) => {
            const Icon = getCategoryIcon(category.icon);
            const isSelected = selectedCategoryName === category.name;
            const isHovered = hoveredCategory === category.name;
            const categoryName = category.name as string;

            return (
              <button
                key={category._id}
                type="button"
                onClick={() => handleCategoryClick(categoryName)}
                onMouseEnter={() => setHoveredCategory(categoryName)}
                onMouseLeave={() => setHoveredCategory(null)}
                className={cn(
                  "group relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-all duration-200",
                  isSelected
                    ? "bg-primary/10 text-primary"
                    : "text-foreground hover:bg-accent"
                )}
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-300",
                    category.color,
                    isSelected || isHovered ? "scale-110 shadow-md" : ""
                  )}
                >
                  <Icon className="h-4 w-4 text-white" />
                </div>
                <span className="flex-1 text-sm font-medium">{category.name}</span>
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-xs font-medium transition-all duration-200",
                    isSelected
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {category.postCount?.toLocaleString() || 0}
                </span>

                {/* Selection indicator */}
                <div
                  className={cn(
                    "absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-primary transition-all duration-300",
                    isSelected ? "opacity-100" : "opacity-0"
                  )}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* My Activity */}
      <div className="mt-auto border-t border-border pt-4">
        <button
          type="button"
          className="group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-all duration-200 hover:bg-accent"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
            <Activity className="h-4 w-4" />
          </div>
          <span className="text-sm font-medium text-foreground">My Activity</span>
        </button>
      </div>
    </aside>
  );
}
