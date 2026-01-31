"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  Trophy,
  Crown,
  Medal,
  Award,
  ArrowUpRight,
  Gift,
  Clock,
  Sparkles,
} from "lucide-react";

// Whats Vibing Data
interface TrendingTopic {
  id: string;
  title: string;
  engagement: number;
  change: number;
  category: string;
}

const trendingTopics: TrendingTopic[] = [
  {
    id: "1",
    title: "Claude 4 Release Discussion",
    engagement: 2847,
    change: 156,
    category: "News",
  },
  {
    id: "2",
    title: "Best AI Art Generators 2024",
    engagement: 1923,
    change: 89,
    category: "List",
  },
  {
    id: "3",
    title: "Prompt Engineering Techniques",
    engagement: 1654,
    change: 67,
    category: "Tutorial",
  },
];

// Leaderboard Data
interface LeaderboardUser {
  rank: number;
  name: string;
  handle: string;
  avatar: string;
  points: number;
  trend: number[];
}

const leaderboardUsers: LeaderboardUser[] = [
  {
    rank: 1,
    name: "Sarah Chen",
    handle: "sarahchen",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    points: 12450,
    trend: [30, 45, 55, 60, 75, 85, 95],
  },
  {
    rank: 2,
    name: "Alex Rivera",
    handle: "alexr",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
    points: 11230,
    trend: [40, 50, 45, 55, 60, 70, 80],
  },
  {
    rank: 3,
    name: "Jordan Lee",
    handle: "jordanl",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jordan",
    points: 10890,
    trend: [35, 40, 50, 55, 50, 65, 75],
  },
];

function WhatsVibing() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % trendingTopics.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const currentTopic = trendingTopics[activeIndex];

  return (
    <div className="bg-card rounded-2xl border border-border/50 p-4 mb-4 overflow-hidden">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="h-5 w-5 text-primary" />
        <h3 className="font-semibold">What&apos;s Vibing</h3>
      </div>

      {/* Morphing Card Stack */}
      <div className="relative h-[140px]">
        <AnimatePresence mode="wait">
          {currentTopic && (
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <div className="h-full p-4 rounded-xl bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/20">
                <span className="text-xs font-semibold text-primary px-2 py-1 rounded-full bg-primary/10">
                  {currentTopic.category}
                </span>
                <h4 className="font-bold mt-3 mb-2 line-clamp-2">
                  {currentTopic.title}
                </h4>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-muted-foreground">
                    {currentTopic.engagement.toLocaleString()} engaged
                  </span>
                  <span className="flex items-center gap-1 text-green-500">
                    <ArrowUpRight className="h-3 w-3" />+{currentTopic.change}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Background cards for stack effect */}
        <div className="absolute inset-x-2 bottom-[-8px] h-full rounded-xl bg-card/50 border border-border/30 -z-10 scale-[0.96]" />
        <div className="absolute inset-x-4 bottom-[-16px] h-full rounded-xl bg-card/30 border border-border/20 -z-20 scale-[0.92]" />
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {trendingTopics.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === activeIndex ? "w-4 bg-primary" : "bg-muted-foreground/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function MiniTrendChart({ data }: { data: number[] }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data
    .map((value, i) => {
      const x = (i / (data.length - 1)) * 60;
      const y = 20 - ((value - min) / range) * 20;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg width="60" height="24" className="overflow-visible">
      <defs>
        <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline
        points={points}
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polygon
        points={`0,20 ${points} 60,20`}
        fill="url(#chartGradient)"
      />
    </svg>
  );
}

function Leaderboard() {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-amber-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Award className="h-5 w-5 text-amber-700" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-card rounded-2xl border border-border/50 p-4 mb-4">
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="h-5 w-5 text-amber-500" />
        <h3 className="font-semibold">Weekly Top Creators</h3>
      </div>

      <div className="space-y-3">
        {leaderboardUsers.map((user, i) => (
          <motion.div
            key={user.handle}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ backgroundColor: "hsl(var(--secondary) / 0.5)" }}
            className="flex items-center gap-3 p-2 -mx-2 rounded-xl cursor-pointer transition-colors"
          >
            <div className="w-8 h-8 flex items-center justify-center">
              {getRankIcon(user.rank)}
            </div>
            <img
              src={user.avatar}
              alt={user.name}
              className="w-10 h-10 rounded-full ring-2 ring-border"
            />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground">
                {user.points.toLocaleString()} pts
              </p>
            </div>
            <MiniTrendChart data={user.trend} />
          </motion.div>
        ))}
      </div>

      <motion.button
        className="w-full mt-4 py-2 text-center text-sm text-primary hover:underline"
        whileHover={{ x: 4 }}
      >
        View Full Leaderboard →
      </motion.button>
    </div>
  );
}

function ActiveCampaignWidget() {
  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-500 via-indigo-500 to-purple-600 p-5 text-white"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40">
        <Sparkles className="absolute top-0 right-0 w-4 h-4 text-white/40 animate-pulse" />
        <Sparkles className="absolute bottom-4 left-4 w-3 h-3 text-white/30 animate-pulse" style={{ animationDelay: "0.5s" }} />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <Gift className="h-5 w-5" />
          <span className="text-xs font-semibold uppercase tracking-wider opacity-90">
            Featured Campaign
          </span>
        </div>

        <h4 className="text-xl font-bold mb-1">Win Claude Pro</h4>
        <p className="text-sm opacity-90 mb-4">Annual Subscription + Merch Pack</p>

        <div className="flex items-center gap-2 mb-4">
          <Clock className="h-4 w-4 opacity-90" />
          <span className="text-sm font-medium">12 days remaining</span>
        </div>

        {/* Progress */}
        <div className="mb-5">
          <div className="flex justify-between text-xs mb-1.5 opacity-90">
            <span>2,847 entries</span>
            <span>Goal: 5,000</span>
          </div>
          <div className="h-2.5 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-white rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "57%" }}
              transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
            />
          </div>
        </div>

        <motion.button
          className="w-full h-11 bg-white text-indigo-600 rounded-xl font-bold text-sm hover:bg-white/90 transition-colors animate-pulse-glow"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Enter Campaign
        </motion.button>
      </div>
    </motion.div>
  );
}

export function RightSidebar() {
  return (
    <aside className="hidden xl:block w-[320px] h-[calc(100vh-64px)] sticky top-16 p-4 overflow-y-auto scrollbar-thin">
      <WhatsVibing />
      <Leaderboard />
      <ActiveCampaignWidget />
    </aside>
  );
}
