"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Bell,
  Sun,
  Moon,
  User,
  Settings,
  LogOut,
  X,
  MessageSquare,
  Heart,
  AtSign,
} from "lucide-react";

interface Notification {
  id: string;
  type: "mention" | "reply" | "like" | "follow";
  user: string;
  avatar: string;
  message: string;
  time: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "mention",
    user: "Sarah Chen",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    message: "mentioned you in a discussion",
    time: "2m ago",
    read: false,
  },
  {
    id: "2",
    type: "reply",
    user: "Alex Rivera",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
    message: "replied to your post",
    time: "15m ago",
    read: false,
  },
  {
    id: "3",
    type: "like",
    user: "Jordan Lee",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jordan",
    message: "upvoted your discussion",
    time: "1h ago",
    read: true,
  },
];

export function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isLoggedIn] = useState(true);
  const unreadCount = mockNotifications.filter((n) => !n.read).length;

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setDarkMode(isDark);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "mention":
        return <AtSign className="h-4 w-4 text-indigo-500" />;
      case "reply":
        return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case "like":
        return <Heart className="h-4 w-4 text-red-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 glass gradient-border">
      <div className="h-full max-w-[1800px] mx-auto px-4 lg:px-6 flex items-center justify-between gap-4">
        {/* Logo */}
        <motion.div
          className="flex items-center gap-3 cursor-pointer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">C</span>
          </div>
          <span className="text-xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent hidden sm:block">
            Createconomy
          </span>
        </motion.div>

        {/* Right side actions */}
        <div className="flex items-center gap-2 lg:gap-3">
          {/* Search */}
          <div className="relative">
            <AnimatePresence mode="wait">
              {searchOpen ? (
                <motion.div
                  key="search-input"
                  initial={{ width: 40, opacity: 0 }}
                  animate={{ width: 280, opacity: 1 }}
                  exit={{ width: 40, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="relative"
                >
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search discussions..."
                    className="w-full h-10 pl-10 pr-10 rounded-xl bg-secondary/80 border border-border focus:border-primary focus:glow-sm outline-none transition-all text-sm"
                    autoFocus
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <button
                    onClick={() => {
                      setSearchOpen(false);
                      setSearchQuery("");
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </motion.div>
              ) : (
                <motion.button
                  key="search-icon"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSearchOpen(true)}
                  className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-secondary/80 hover:glow-sm transition-all group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Search className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Dark Mode Toggle */}
          <motion.button
            onClick={toggleDarkMode}
            className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-secondary/80 hover:glow-sm transition-all relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {darkMode ? (
                <motion.div
                  key="moon"
                  initial={{ rotate: -90, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  exit={{ rotate: 90, scale: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Moon className="h-5 w-5 text-indigo-400" />
                </motion.div>
              ) : (
                <motion.div
                  key="sun"
                  initial={{ rotate: 90, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  exit={{ rotate: -90, scale: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Sun className="h-5 w-5 text-amber-500" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Notifications */}
          <div className="relative">
            <motion.button
              onClick={() => {
                setNotificationsOpen(!notificationsOpen);
                setProfileOpen(false);
              }}
              className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-secondary/80 hover:glow-sm transition-all relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bell className="h-5 w-5 text-muted-foreground" />
              {unreadCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 text-white text-xs font-semibold rounded-full flex items-center justify-center"
                >
                  {unreadCount}
                </motion.span>
              )}
            </motion.button>

            <AnimatePresence>
              {notificationsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute right-0 top-full mt-2 w-80 bg-card border border-border rounded-2xl shadow-xl overflow-hidden"
                >
                  <div className="p-4 border-b border-border flex items-center justify-between">
                    <h3 className="font-semibold">Notifications</h3>
                    <button className="text-xs text-primary hover:underline">
                      Mark all read
                    </button>
                  </div>
                  <div className="max-h-80 overflow-y-auto scrollbar-thin">
                    {mockNotifications.map((notification) => (
                      <motion.div
                        key={notification.id}
                        whileHover={{ backgroundColor: "hsl(var(--secondary) / 0.5)" }}
                        className={`p-4 flex gap-3 cursor-pointer transition-colors ${
                          !notification.read ? "bg-primary/5" : ""
                        }`}
                      >
                        <img
                          src={notification.avatar}
                          alt={notification.user}
                          width={40}
                          height={40}
                          className="w-10 h-10 rounded-full shrink-0"
                          style={{ width: '40px', height: '40px' }}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            {getNotificationIcon(notification.type)}
                            <span className="font-medium text-sm truncate">
                              {notification.user}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground truncate">
                            {notification.message}
                          </p>
                          <span className="text-xs text-muted-foreground">
                            {notification.time}
                          </span>
                        </div>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                        )}
                      </motion.div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-border">
                    <button className="w-full text-center text-sm text-primary hover:underline">
                      View all notifications
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile / Login */}
          {isLoggedIn ? (
            <div className="relative">
              <motion.button
                onClick={() => {
                  setProfileOpen(!profileOpen);
                  setNotificationsOpen(false);
                }}
                className="w-10 h-10 rounded-xl overflow-hidden border-2 border-transparent hover:border-primary/50 hover:glow-sm transition-all shrink-0"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ width: '40px', height: '40px' }}
              >
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=currentuser"
                  alt="Profile"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                  style={{ width: '40px', height: '40px' }}
                />
              </motion.button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute right-0 top-full mt-2 w-56 bg-card border border-border rounded-2xl shadow-xl overflow-hidden"
                  >
                    <div className="p-4 border-b border-border">
                      <div className="flex items-center gap-3">
                        <img
                          src="https://api.dicebear.com/7.x/avataaars/svg?seed=currentuser"
                          alt="Profile"
                          width={40}
                          height={40}
                          className="w-10 h-10 rounded-full shrink-0"
                          style={{ width: '40px', height: '40px' }}
                        />
                        <div>
                          <p className="font-medium">John Doe</p>
                          <p className="text-sm text-muted-foreground">@johndoe</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-2">
                      <motion.button
                        whileHover={{ backgroundColor: "hsl(var(--secondary))" }}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors"
                      >
                        <User className="h-4 w-4" />
                        Profile
                      </motion.button>
                      <motion.button
                        whileHover={{ backgroundColor: "hsl(var(--secondary))" }}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors"
                      >
                        <Settings className="h-4 w-4" />
                        Settings
                      </motion.button>
                      <div className="my-2 border-t border-border" />
                      <motion.button
                        whileHover={{ backgroundColor: "hsl(var(--destructive) / 0.1)" }}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-destructive transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign out
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <motion.button
              className="h-10 px-5 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:glow-md transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Login
            </motion.button>
          )}
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {(notificationsOpen || profileOpen) && (
        <div
          className="fixed inset-0 z-[-1]"
          onClick={() => {
            setNotificationsOpen(false);
            setProfileOpen(false);
          }}
        />
      )}
    </header>
  );
}
