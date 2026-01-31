"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUp,
  MessageSquare,
  Star,
  MoreHorizontal,
  Bookmark,
  Share2,
  Flag,
} from "lucide-react";

export interface Discussion {
  id: string;
  title: string;
  summary: string;
  author: {
    name: string;
    handle: string;
    avatar: string;
  };
  category: string;
  categoryColor: string;
  upvotes: number;
  comments: number;
  participants: {
    avatar: string;
    name: string;
  }[];
  timeAgo: string;
  image?: string;
  isFavorited?: boolean;
  isUpvoted?: boolean;
}

interface DiscussionCardProps {
  discussion: Discussion;
  index: number;
}

export function DiscussionCard({ discussion, index }: DiscussionCardProps) {
  const [isUpvoted, setIsUpvoted] = useState(discussion.isUpvoted || false);
  const [upvotes, setUpvotes] = useState(discussion.upvotes);
  const [isFavorited, setIsFavorited] = useState(discussion.isFavorited || false);
  const [showMenu, setShowMenu] = useState(false);

  const handleUpvote = () => {
    if (isUpvoted) {
      setUpvotes(upvotes - 1);
    } else {
      setUpvotes(upvotes + 1);
    }
    setIsUpvoted(!isUpvoted);
  };

  const maxVisibleParticipants = 5;
  const extraParticipants = discussion.participants.length - maxVisibleParticipants;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -2 }}
      className="relative p-5 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:glow-border transition-all cursor-pointer group"
    >
      {/* Category Badge */}
      <div className="absolute top-4 right-4">
        <span
          className="px-2.5 py-1 text-xs font-semibold rounded-full"
          style={{
            backgroundColor: `${discussion.categoryColor}20`,
            color: discussion.categoryColor,
          }}
        >
          {discussion.category}
        </span>
      </div>

      {/* Author Info */}
      <div className="flex items-center gap-3 mb-3">
        <img
          src={discussion.author.avatar}
          alt={discussion.author.name}
          width={40}
          height={40}
          className="w-10 h-10 rounded-full ring-2 ring-border shrink-0"
          style={{ width: '40px', height: '40px' }}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-sm truncate">
              {discussion.author.name}
            </span>
            <span className="text-muted-foreground text-sm">
              @{discussion.author.handle}
            </span>
            <span className="text-muted-foreground text-sm">•</span>
            <span className="text-muted-foreground text-sm">
              {discussion.timeAgo}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <h3 className="text-lg font-bold mb-2 pr-20 line-clamp-2 group-hover:text-primary transition-colors">
        {discussion.title}
      </h3>
      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
        {discussion.summary}
      </p>

      {/* Optional Image */}
      {discussion.image && (
        <div className="mb-4 rounded-xl overflow-hidden">
          <img
            src={discussion.image}
            alt=""
            className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}

      {/* Actions Row */}
      <div className="flex items-center gap-4 pt-3 border-t border-border/50">
        {/* Upvote Button */}
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            handleUpvote();
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
            isUpvoted
              ? "bg-primary/10 text-primary"
              : "hover:bg-secondary text-muted-foreground hover:text-foreground"
          }`}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={isUpvoted ? { scale: [1, 1.3, 1] } : { scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowUp
              className={`h-4 w-4 ${isUpvoted ? "fill-primary" : ""}`}
            />
          </motion.div>
          <span className="tabular-nums">{upvotes}</span>
        </motion.button>

        {/* Comments */}
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
          <MessageSquare className="h-4 w-4" />
          <span className="tabular-nums">{discussion.comments}</span>
        </button>

        {/* Participants */}
        <div className="flex items-center -space-x-2 ml-auto">
          {discussion.participants.slice(0, maxVisibleParticipants).map((participant, i) => (
            <motion.img
              key={i}
              src={participant.avatar}
              alt={participant.name}
              title={participant.name}
              width={28}
              height={28}
              className="w-7 h-7 rounded-full ring-2 ring-card shrink-0"
              style={{ zIndex: maxVisibleParticipants - i, width: '28px', height: '28px' }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            />
          ))}
          {extraParticipants > 0 && (
            <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center ring-2 ring-card text-xs font-medium shrink-0" style={{ width: '28px', height: '28px' }}>
              +{extraParticipants}
            </div>
          )}
        </div>

        {/* Favorite */}
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorited(!isFavorited);
          }}
          className={`p-2 rounded-lg transition-colors ${
            isFavorited
              ? "text-amber-500"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary"
          }`}
          whileTap={{ scale: 0.9 }}
        >
          <Star className={`h-4 w-4 ${isFavorited ? "fill-amber-500" : ""}`} />
        </motion.button>

        {/* More Options */}
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(!showMenu);
            }}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>

          {showMenu && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowMenu(false)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                className="absolute right-0 bottom-full mb-2 w-40 bg-card border border-border rounded-xl shadow-xl z-20 overflow-hidden"
              >
                <button className="w-full flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-secondary transition-colors">
                  <Bookmark className="h-4 w-4" />
                  Save
                </button>
                <button className="w-full flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-secondary transition-colors">
                  <Share2 className="h-4 w-4" />
                  Share
                </button>
                <button className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-destructive hover:bg-destructive/10 transition-colors">
                  <Flag className="h-4 w-4" />
                  Report
                </button>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </motion.article>
  );
}

// Loading skeleton
export function DiscussionCardSkeleton() {
  return (
    <div className="p-5 rounded-2xl bg-card border border-border/50">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-muted animate-shimmer" />
        <div className="flex-1">
          <div className="h-4 w-32 bg-muted animate-shimmer rounded mb-1" />
          <div className="h-3 w-24 bg-muted animate-shimmer rounded" />
        </div>
      </div>
      <div className="h-6 w-3/4 bg-muted animate-shimmer rounded mb-2" />
      <div className="h-4 w-full bg-muted animate-shimmer rounded mb-1" />
      <div className="h-4 w-2/3 bg-muted animate-shimmer rounded mb-4" />
      <div className="flex items-center gap-4 pt-3 border-t border-border/50">
        <div className="h-8 w-16 bg-muted animate-shimmer rounded-lg" />
        <div className="h-8 w-16 bg-muted animate-shimmer rounded-lg" />
        <div className="flex-1" />
        <div className="h-8 w-8 bg-muted animate-shimmer rounded-lg" />
      </div>
    </div>
  );
}
