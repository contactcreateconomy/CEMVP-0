"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@createconomy/convex/client";
import { ArrowBigUp, MessageCircle, Bookmark, Sparkles } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@createconomy/ui";
import { Badge } from "@createconomy/ui";
import { cn, formatRelativeTime } from "@createconomy/utils";
import { useMockUser } from "@/hooks";
import type { ForumPostEnhanced } from "@createconomy/types";

interface DiscussionCardProps {
  discussion: ForumPostEnhanced;
  index: number;
}

export function DiscussionCard({
  discussion,
  index,
}: DiscussionCardProps) {
  const { userId } = useMockUser();

  // Check if post is liked by user
  const isLikedByUser = useQuery(
    // @ts-expect-error - api object pattern causes type mismatch, runtime works correctly
    api.forum.isPostLikedByUser,
    { userId, postId: discussion._id }
  );

  // Check if post is bookmarked by user
  const isBookmarkedByUser = useQuery(
    // @ts-expect-error - api object pattern causes type mismatch, runtime works correctly
    api.forum.isPostBookmarked,
    { userId, postId: discussion._id }
  );

  // Mutations
  const toggleLike = useMutation(
    // @ts-expect-error - api object pattern causes type mismatch, runtime works correctly
    api.forum.togglePostLikeEnhanced
  );
  const toggleBookmark = useMutation(
    // @ts-expect-error - api object pattern causes type mismatch, runtime works correctly
    api.forum.toggleBookmark
  );

  // Local state for optimistic updates
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [upvotes, setUpvotes] = useState(discussion.likes);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Sync local state with server state
  useEffect(() => {
    if (isLikedByUser !== undefined) {
      setIsUpvoted(isLikedByUser);
    }
  }, [isLikedByUser]);

  useEffect(() => {
    if (isBookmarkedByUser !== undefined) {
      setIsBookmarked(isBookmarkedByUser);
    }
  }, [isBookmarkedByUser]);

  const handleUpvote = async () => {
    // Optimistic update
    setUpvotes((prev: number) => isUpvoted ? prev - 1 : prev + 1);
    setIsUpvoted((prev) => !prev);

    try {
      const result = await toggleLike({ userId, postId: discussion._id });
      // Sync with actual result
      setIsUpvoted(result.liked);
      setUpvotes(result.likes);
    } catch (error) {
      // Revert on error
      setUpvotes((prev: number) => isUpvoted ? prev + 1 : prev - 1);
      setIsUpvoted((prev) => !prev);
      console.error("Failed to toggle like:", error);
    }
  };

  const handleBookmark = async () => {
    // Optimistic update
    setIsBookmarked((prev: boolean) => !prev);

    try {
      const result = await toggleBookmark({ userId, postId: discussion._id });
      setIsBookmarked(result.bookmarked);
    } catch (error) {
      // Revert on error
      setIsBookmarked((prev: boolean) => !prev);
      console.error("Failed to toggle bookmark:", error);
    }
  };

  // Get category color based on category name
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "Programming": "bg-blue-500 text-white hover:bg-blue-600",
      "Design": "bg-pink-500 text-white hover:bg-pink-600",
      "Startups": "bg-orange-500 text-white hover:bg-orange-600",
      "AI & ML": "bg-violet-500 text-white hover:bg-violet-600",
      "Gaming": "bg-green-500 text-white hover:bg-green-600",
      "Learning": "bg-cyan-500 text-white hover:bg-cyan-600",
    };
    return colors[category] || "bg-gray-500 text-white hover:bg-gray-600";
  };

  const categoryColor = getCategoryColor(discussion.category);
  const timestamp = formatRelativeTime(discussion.createdAt);
  const comments = discussion.commentCount ?? 0;

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-lg border border-border bg-card p-4 shadow-sm transition-all duration-300",
        isHovered && "border-primary/30 shadow-md"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        animation: `fadeInUp 0.5s ease-out ${index * 100}ms both`,
      }}
    >
      {/* Category Badge */}
      <Badge
        className={cn(
          "mb-3 transition-transform duration-200",
          categoryColor,
          isHovered && "scale-105"
        )}
      >
        {discussion.category}
      </Badge>

      {/* Title */}
      <h3 className="mb-2 line-clamp-2 text-lg font-bold text-foreground transition-colors duration-200 group-hover:text-primary">
        {discussion.title}
      </h3>

      {/* Author info */}
      <div className="mb-3 flex items-center gap-2">
        <Avatar className="h-6 w-6">
          <AvatarImage src={discussion.author?.image || "/placeholder.svg"} />
          <AvatarFallback>{discussion.author?.name[0] ?? "?"}</AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium text-foreground">
          {discussion.author?.name ?? "Unknown"}
        </span>
        <span className="text-sm text-muted-foreground">
          @{discussion.author?.username ?? discussion.author?.name.toLowerCase().replace(/\s/g, "") ?? "unknown"}
        </span>
        <span className="text-muted-foreground">·</span>
        <span className="text-sm text-muted-foreground">
          {timestamp}
        </span>
      </div>

      {/* AI Summary */}
      {discussion.aiSummary && (
        <div className="mb-4 flex items-start gap-2 rounded-lg bg-muted/50 p-3">
          <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {discussion.aiSummary}
          </p>
        </div>
      )}

      {/* Preview Image */}
      {discussion.previewImage && (
        <div className="mb-4 overflow-hidden rounded-lg">
          <img
            src={discussion.previewImage || "/placeholder.svg"}
            alt=""
            className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-4">
        {/* Upvote */}
        <button
          type="button"
          onClick={handleUpvote}
          className={cn(
            "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-200",
            isUpvoted
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-accent hover:text-foreground"
          )}
        >
          <ArrowBigUp
            className={cn(
              "h-5 w-5 transition-transform duration-300",
              isUpvoted && "fill-primary scale-110"
            )}
          />
          <span
            className={cn(
              "transition-all duration-200",
              isUpvoted && "font-bold"
            )}
          >
            {upvotes}
          </span>
        </button>

        {/* Comments */}
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-accent hover:text-foreground"
        >
          <MessageCircle className="h-4 w-4" />
          <span>{comments}</span>
        </button>

        {/* Bookmark */}
        <button
          type="button"
          onClick={handleBookmark}
          className={cn(
            "ml-auto rounded-lg p-1.5 transition-all duration-200",
            isBookmarked
              ? "text-primary"
              : "text-muted-foreground hover:bg-accent hover:text-foreground"
          )}
        >
          <Bookmark
            className={cn(
              "h-5 w-5 transition-all duration-300",
              isBookmarked && "fill-primary scale-110"
            )}
          />
        </button>
      </div>

      {/* Hover glow effect */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 rounded-lg transition-opacity duration-500",
          isHovered ? "opacity-100" : "opacity-0"
        )}
        style={{
          background:
            "radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(99, 102, 241, 0.06), transparent 40%)",
        }}
      />
    </article>
  );
}
