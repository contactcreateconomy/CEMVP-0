"use client";

import { motion } from "framer-motion";
import { Flame, Sparkles, Clock, Star } from "lucide-react";

interface Tab {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const tabs: Tab[] = [
  { id: "top", label: "Top", icon: <Sparkles className="h-4 w-4" /> },
  { id: "hot", label: "Hot", icon: <Flame className="h-4 w-4" /> },
  { id: "new", label: "New", icon: <Clock className="h-4 w-4" /> },
  { id: "fav", label: "Fav", icon: <Star className="h-4 w-4" /> },
];

interface FeedTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function FeedTabs({ activeTab, onTabChange }: FeedTabsProps) {
  return (
    <div className="flex items-center gap-1 p-1 bg-secondary/50 rounded-xl mb-6">
      {tabs.map((tab) => (
        <motion.button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`relative flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            activeTab === tab.id
              ? "text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
          whileHover={{ scale: activeTab === tab.id ? 1 : 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {activeTab === tab.id && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-primary rounded-lg glow-sm"
              initial={false}
              transition={{ type: "spring", stiffness: 500, damping: 35 }}
            />
          )}
          <span className="relative z-10">{tab.icon}</span>
          <span className="relative z-10">{tab.label}</span>
        </motion.button>
      ))}
    </div>
  );
}
