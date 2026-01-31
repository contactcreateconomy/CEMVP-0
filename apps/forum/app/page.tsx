"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Navbar,
  LeftSidebar,
  FeaturedSlider,
  FeedTabs,
  DiscussionCard,
  DiscussionCardSkeleton,
  RightSidebar,
  type Discussion,
} from "./components";

// Mock data for discussions
const mockDiscussions: Discussion[] = [
  {
    id: "1",
    title: "The Complete Guide to Building AI Agents with Claude",
    summary: "A comprehensive walkthrough of creating autonomous AI agents using Claude API, including memory management, tool use, and multi-step reasoning patterns.",
    author: {
      name: "Sarah Chen",
      handle: "sarahchen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    },
    category: "Tutorial",
    categoryColor: "#10b981",
    upvotes: 342,
    comments: 89,
    participants: [
      { avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex", name: "Alex Rivera" },
      { avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jordan", name: "Jordan Lee" },
      { avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=morgan", name: "Morgan Taylor" },
      { avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=casey", name: "Casey Brown" },
      { avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=drew", name: "Drew Wilson" },
      { avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jamie", name: "Jamie Smith" },
    ],
    timeAgo: "2h ago",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
    isUpvoted: true,
  },
  {
    id: "2",
    title: "Claude Opus 4.5 vs GPT-4 Turbo: Real-World Performance Comparison",
    summary: "I've tested both models extensively for coding, creative writing, and analysis tasks. Here are my findings with benchmarks and examples.",
    author: {
      name: "Alex Rivera",
      handle: "alexr",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
    },
    category: "Compare",
    categoryColor: "#f59e0b",
    upvotes: 567,
    comments: 234,
    participants: [
      { avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah", name: "Sarah Chen" },
      { avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=morgan", name: "Morgan Taylor" },
      { avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=taylor", name: "Taylor Green" },
    ],
    timeAgo: "4h ago",
  },
  {
    id: "3",
    title: "My AI Art Workflow: From Concept to Final Piece in 30 Minutes",
    summary: "Sharing my complete workflow using Midjourney, DALL-E 3, and manual touch-ups. Includes prompts, settings, and post-processing tips.",
    author: {
      name: "Jordan Lee",
      handle: "jordanl",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jordan",
    },
    category: "Showcase",
    categoryColor: "#8b5cf6",
    upvotes: 234,
    comments: 56,
    participants: [
      { avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=casey", name: "Casey Brown" },
      { avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=drew", name: "Drew Wilson" },
    ],
    timeAgo: "6h ago",
    image: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=800&h=400&fit=crop",
    isFavorited: true,
  },
  {
    id: "4",
    title: "Help: Best Practices for Handling Long Context Windows?",
    summary: "I'm working on a document analysis project and struggling with context window limits. Looking for strategies to efficiently process large documents.",
    author: {
      name: "Morgan Taylor",
      handle: "morgant",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=morgan",
    },
    category: "Help",
    categoryColor: "#ef4444",
    upvotes: 89,
    comments: 45,
    participants: [
      { avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah", name: "Sarah Chen" },
      { avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex", name: "Alex Rivera" },
      { avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jordan", name: "Jordan Lee" },
      { avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=casey", name: "Casey Brown" },
    ],
    timeAgo: "8h ago",
  },
  {
    id: "5",
    title: "Anthropic Announces Extended Thinking Mode for Claude",
    summary: "Major update: Claude can now show its reasoning process step by step. This changes everything for complex problem-solving tasks.",
    author: {
      name: "Casey Brown",
      handle: "caseyb",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=casey",
    },
    category: "News",
    categoryColor: "#3b82f6",
    upvotes: 892,
    comments: 312,
    participants: [
      { avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah", name: "Sarah Chen" },
      { avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex", name: "Alex Rivera" },
      { avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jordan", name: "Jordan Lee" },
      { avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=morgan", name: "Morgan Taylor" },
      { avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=drew", name: "Drew Wilson" },
      { avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jamie", name: "Jamie Smith" },
      { avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=taylor", name: "Taylor Green" },
    ],
    timeAgo: "12h ago",
  },
  {
    id: "6",
    title: "Top 10 MCP Servers Every Developer Should Know",
    summary: "From GitHub integration to filesystem access, these Model Context Protocol servers will supercharge your Claude Code experience.",
    author: {
      name: "Drew Wilson",
      handle: "dreww",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=drew",
    },
    category: "List",
    categoryColor: "#06b6d4",
    upvotes: 456,
    comments: 123,
    participants: [
      { avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah", name: "Sarah Chen" },
      { avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=morgan", name: "Morgan Taylor" },
    ],
    timeAgo: "1d ago",
  },
  {
    id: "7",
    title: "Review: Claude Code vs Cursor vs GitHub Copilot",
    summary: "After 3 months of using all three AI coding assistants daily, here's my honest review of each tool's strengths and weaknesses.",
    author: {
      name: "Jamie Smith",
      handle: "jamies",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jamie",
    },
    category: "Review",
    categoryColor: "#f97316",
    upvotes: 678,
    comments: 245,
    participants: [
      { avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex", name: "Alex Rivera" },
      { avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jordan", name: "Jordan Lee" },
      { avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=casey", name: "Casey Brown" },
      { avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=drew", name: "Drew Wilson" },
    ],
    timeAgo: "1d ago",
    isUpvoted: true,
    isFavorited: true,
  },
];

// Generate more mock data for infinite scroll
function generateMoreDiscussions(startId: number): Discussion[] {
  const names = ["Taylor Green", "Quinn Adams", "River Stone", "Sky Blue", "Phoenix Rise"];
  const handles = ["taylorg", "quinna", "rivers", "skyb", "phoenixr"];
  const categories = ["News", "Tutorial", "Showcase", "Help", "Compare"];
  const colors = ["#3b82f6", "#10b981", "#8b5cf6", "#ef4444", "#f59e0b"];

  return Array.from({ length: 5 }, (_, i) => ({
    id: `${startId + i}`,
    title: `Discussion Post #${startId + i} - Exploring AI Frontiers`,
    summary: "An interesting discussion about the latest developments in AI technology and its implications for creators.",
    author: {
      name: names[i % 5] ?? "Unknown User",
      handle: handles[i % 5] ?? "unknown",
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=user${startId + i}`,
    },
    category: categories[i % 5] ?? "General",
    categoryColor: colors[i % 5] ?? "#6366f1",
    upvotes: Math.floor(Math.random() * 500) + 50,
    comments: Math.floor(Math.random() * 100) + 10,
    participants: Array.from({ length: Math.floor(Math.random() * 5) + 1 }, (_, j) => ({
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=participant${startId}${j}`,
      name: `User ${j + 1}`,
    })),
    timeAgo: `${Math.floor(Math.random() * 48) + 1}h ago`,
  }));
}

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("top");
  const [discussions, setDiscussions] = useState<Discussion[]>(mockDiscussions);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement>(null);

  // Infinite scroll
  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const newDiscussions = generateMoreDiscussions(discussions.length + 1);
      setDiscussions((prev) => [...prev, ...newDiscussions]);
      setIsLoading(false);
      if (discussions.length >= 30) {
        setHasMore(false);
      }
    }, 1000);
  }, [isLoading, hasMore, discussions.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [loadMore]);

  // Sort discussions based on active tab
  const sortedDiscussions = [...discussions].sort((a, b) => {
    switch (activeTab) {
      case "top":
        return b.upvotes - a.upvotes;
      case "hot":
        return b.comments - a.comments;
      case "new":
        return 0; // Keep original order (already sorted by time)
      case "fav":
        return (b.isFavorited ? 1 : 0) - (a.isFavorited ? 1 : 0);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-background relative">
      {/* Dot Pattern Background */}
      <div className="fixed inset-0 bg-dot-pattern mask-radial-faded pointer-events-none" />

      {/* Navbar */}
      <Navbar />

      {/* Main Layout */}
      <div className="pt-16 flex max-w-[1800px] mx-auto">
        {/* Left Sidebar */}
        <LeftSidebar />

        {/* Main Feed */}
        <main className="flex-1 min-w-0 p-4 lg:p-6">
          {/* Featured Slider */}
          <FeaturedSlider />

          {/* Feed Tabs */}
          <FeedTabs activeTab={activeTab} onTabChange={setActiveTab} />

          {/* Discussion Cards */}
          <div className="space-y-4">
            {sortedDiscussions.map((discussion, index) => (
              <DiscussionCard
                key={discussion.id}
                discussion={discussion}
                index={index}
              />
            ))}

            {/* Loading skeletons */}
            {isLoading && (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <DiscussionCardSkeleton key={`skeleton-${i}`} />
                ))}
              </div>
            )}

            {/* Infinite scroll trigger */}
            {hasMore && <div ref={loaderRef} className="h-10" />}

            {/* End of feed */}
            {!hasMore && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8 text-muted-foreground"
              >
                <p>You&apos;ve reached the end! 🎉</p>
                <p className="text-sm mt-1">Check back later for new discussions</p>
              </motion.div>
            )}
          </div>
        </main>

        {/* Right Sidebar */}
        <RightSidebar />
      </div>
    </div>
  );
}
