"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface FeaturedPost {
  id: string;
  title: string;
  image: string;
  author: string;
  category: string;
}

const featuredPosts: FeaturedPost[] = [
  {
    id: "1",
    title: "The Future of AI-Powered Content Creation",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
    author: "Sarah Chen",
    category: "News",
  },
  {
    id: "2",
    title: "Top 10 Tools Every Creator Needs in 2024",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop",
    author: "Alex Rivera",
    category: "List",
  },
  {
    id: "3",
    title: "Building Your First AI Agent: Complete Guide",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=400&fit=crop",
    author: "Jordan Lee",
    category: "Tutorial",
  },
  {
    id: "4",
    title: "Community Showcase: Best Projects This Month",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=400&fit=crop",
    author: "Community",
    category: "Showcase",
  },
];

export function FeaturedSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
  };

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = featuredPosts.length - 1;
      if (nextIndex >= featuredPosts.length) nextIndex = 0;
      return nextIndex;
    });
  }, []);

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Auto-play
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      paginate(1);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, paginate]);

  const currentPost = featuredPosts[currentIndex];
  if (!currentPost) return null;

  return (
    <div
      className="relative w-full h-[280px] mb-6"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Main Slider */}
      <div className="relative w-full h-full overflow-hidden rounded-2xl">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute inset-0"
          >
            <div className="relative w-full h-full group cursor-pointer">
              {/* Image */}
              <img
                src={currentPost.image}
                alt={currentPost.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-primary/90 text-white text-xs font-semibold rounded-full backdrop-blur-sm">
                  {currentPost.category}
                </span>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <motion.h3
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-2xl font-bold text-white mb-2"
                >
                  {currentPost.title}
                </motion.h3>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-white/80 text-sm"
                >
                  by {currentPost.author}
                </motion.p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => paginate(-1)}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors opacity-0 group-hover:opacity-100"
          style={{ opacity: isPaused ? 1 : 0 }}
        >
          <ChevronLeft className="h-6 w-6" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => paginate(1)}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
          style={{ opacity: isPaused ? 1 : 0 }}
        >
          <ChevronRight className="h-6 w-6" />
        </motion.button>
      </div>

      {/* Dot Indicators */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {featuredPosts.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "w-6 bg-primary"
                : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </div>
  );
}
