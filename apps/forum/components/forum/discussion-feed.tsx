"use client";

import { useState } from "react";
import { Flame, Clock, TrendingUp, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@createconomy/convex/client";
import { Button } from "@createconomy/ui";
import { DiscussionCard } from "./discussion-card";
import { cn } from "@createconomy/utils";
import { useForumTenant } from "@/hooks";

const tabs = [
  { id: "hot", label: "Hot", icon: Flame },
  { id: "new", label: "New", icon: Clock },
  { id: "top", label: "Top", icon: TrendingUp },
];

interface DiscussionFeedProps {
  className?: string;
  categoryName?: string;
  searchQuery?: string;
}

export function DiscussionFeed({ className, categoryName, searchQuery }: DiscussionFeedProps) {
  const [activeTab, setActiveTab] = useState("hot");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Get forum tenant
  const { tenantId } = useForumTenant();

  // Fetch posts from Convex
  const result = useQuery(
    // @ts-expect-error - api object pattern causes type mismatch, runtime works correctly
    api.forum.getForumPostsPaginated,
    tenantId && (categoryName || searchQuery || activeTab)
      ? {
          tenantId,
          categoryId: categoryName,
          searchQuery,
          sort: activeTab as "hot" | "new" | "top",
          page: currentPage,
          pageSize,
        }
      : "skip"
  );

  const isLoading = result === undefined;
  const posts = result?.posts ?? [];
  const totalPages = result?.totalPages ?? 1;
  const hasMore = result?.hasMore ?? false;

  // Reset to page 1 when filters change
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setCurrentPage(1);
  };

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {/* Tabs */}
      <div className="flex items-center gap-1 rounded-lg bg-muted p-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabChange(tab.id)}
              className={cn(
                "relative flex flex-1 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all duration-300",
                isActive
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon
                className={cn(
                  "h-4 w-4 transition-all duration-300",
                  isActive && "text-primary"
                )}
              />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex min-h-[400px] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {/* Empty State */}
      {!isLoading && posts.length === 0 && (
        <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-border bg-muted/20 p-8">
          <p className="text-lg font-medium text-muted-foreground">
            {searchQuery
              ? `No discussions found matching "${searchQuery}"`
              : categoryName
                ? `No discussions in "${categoryName}" yet`
                : "No discussions yet"}
          </p>
          <p className="text-sm text-muted-foreground">
            Be the first to start a conversation!
          </p>
        </div>
      )}

      {/* Discussion Cards */}
      {!isLoading && posts.length > 0 && (
        <div className="flex flex-col gap-4">
          {posts.map((post: any, index: number) => (
            <DiscussionCard key={post._id} discussion={post} index={index} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {!isLoading && totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 py-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="transition-all duration-200 hover:scale-105"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="icon"
              onClick={() => setCurrentPage(page)}
              className={cn(
                "transition-all duration-200 hover:scale-105",
                currentPage === page && "pointer-events-none"
              )}
            >
              {page}
            </Button>
          ))}

          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages || !hasMore}
            className="transition-all duration-200 hover:scale-105"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
