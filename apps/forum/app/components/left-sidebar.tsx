"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Newspaper,
  Star,
  Scale,
  List,
  HelpCircle,
  Palette,
  BookOpen,
  MessageSquare,
  Rocket,
  Sparkles,
  Gift,
  Clock,
} from "lucide-react";

interface Category {
  id: string;
  label: string;
  icon: React.ReactNode;
  count: number;
  section: "discover" | "premium";
  pointsRequired?: number;
}

const categories: Category[] = [
  { id: "news", label: "News", icon: <Newspaper className="h-5 w-5" />, count: 234, section: "discover" },
  { id: "review", label: "Review", icon: <Star className="h-5 w-5" />, count: 156, section: "discover" },
  { id: "compare", label: "Compare", icon: <Scale className="h-5 w-5" />, count: 89, section: "discover" },
  { id: "list", label: "List", icon: <List className="h-5 w-5" />, count: 312, section: "discover" },
  { id: "help", label: "Help", icon: <HelpCircle className="h-5 w-5" />, count: 567, section: "discover" },
  { id: "showcase", label: "Showcase", icon: <Palette className="h-5 w-5" />, count: 445, section: "discover" },
  { id: "tutorial", label: "Tutorial", icon: <BookOpen className="h-5 w-5" />, count: 198, section: "discover" },
  { id: "debate", label: "Debate", icon: <MessageSquare className="h-5 w-5" />, count: 78, section: "premium", pointsRequired: 500 },
  { id: "launch", label: "Launch", icon: <Rocket className="h-5 w-5" />, count: 45, section: "premium", pointsRequired: 1000 },
];

export function LeftSidebar() {
  const [activeCategory, setActiveCategory] = useState("news");

  const discoverCategories = categories.filter((c) => c.section === "discover");
  const premiumCategories = categories.filter((c) => c.section === "premium");

  return (
    <aside className="hidden lg:flex flex-col w-[250px] h-[calc(100vh-64px)] sticky top-16 p-4 border-r border-border/50 overflow-y-auto scrollbar-thin">
      {/* Start Discussion Button */}
      <motion.button
        className="w-full h-12 flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:glow-lg transition-all mb-6"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Plus className="h-5 w-5" />
        Start Discussion
      </motion.button>

      {/* Discover Section */}
      <div className="mb-6">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-3">
          Discover
        </h3>
        <nav className="space-y-1">
          {discoverCategories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all relative overflow-hidden ${
                activeCategory === category.id
                  ? "bg-primary/10 text-primary glow-sm"
                  : "hover:bg-secondary text-foreground/80 hover:text-foreground"
              }`}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              {activeCategory === category.id && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
              <span className={activeCategory === category.id ? "text-primary" : "text-muted-foreground"}>
                {category.icon}
              </span>
              <span className="flex-1 text-left">{category.label}</span>
              <span className="text-xs text-muted-foreground tabular-nums">
                {category.count}
              </span>
            </motion.button>
          ))}
        </nav>
      </div>

      {/* Premium Section */}
      <div className="mb-6">
        <div className="flex items-center gap-2 px-3 mb-3">
          <Sparkles className="h-4 w-4 text-amber-500" />
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Premium
          </h3>
        </div>
        <nav className="space-y-1">
          {premiumCategories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all relative overflow-hidden ${
                activeCategory === category.id
                  ? "bg-primary/10 text-primary glow-sm"
                  : "hover:bg-secondary text-foreground/80 hover:text-foreground"
              }`}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              {activeCategory === category.id && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
              <span className={activeCategory === category.id ? "text-primary" : "text-muted-foreground"}>
                {category.icon}
              </span>
              <span className="flex-1 text-left">{category.label}</span>
              <span className="text-xs px-1.5 py-0.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 font-medium">
                {category.pointsRequired}pts
              </span>
            </motion.button>
          ))}
        </nav>
      </div>

      {/* Active Campaign Card */}
      <div className="mt-auto">
        <motion.div
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4 text-white"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <Gift className="h-5 w-5" />
              <span className="text-xs font-semibold uppercase tracking-wider opacity-90">
                Active Campaign
              </span>
            </div>

            <h4 className="text-lg font-bold mb-1">Win Claude Pro</h4>
            <p className="text-sm opacity-90 mb-3">Annual subscription</p>

            <div className="flex items-center gap-2 text-sm mb-4">
              <Clock className="h-4 w-4" />
              <span className="font-medium">12 days left</span>
            </div>

            {/* Progress bar */}
            <div className="mb-4">
              <div className="flex justify-between text-xs mb-1 opacity-90">
                <span>2,847 entries</span>
                <span>5,000 goal</span>
              </div>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-white rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "57%" }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
            </div>

            <motion.button
              className="w-full h-10 bg-white text-indigo-600 rounded-xl font-semibold text-sm hover:bg-white/90 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Enter Now
            </motion.button>
          </div>
        </motion.div>
      </div>
    </aside>
  );
}
