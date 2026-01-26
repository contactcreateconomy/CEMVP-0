// Domain types for multitenancy
export type Domain = "marketplace" | "forum" | "admin" | "seller";

// User types
export interface User {
  _id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string;
  role: UserRole;
  username?: string;
  tenantId?: string;
  createdAt: number;
  updatedAt: number;
}

export type UserRole = "customer" | "seller" | "admin";

// Tenant types for multitenancy
export interface Tenant {
  _id: string;
  name: string;
  slug: string;
  domain: Domain;
  stripeAccountId?: string;
  settings: TenantSettings;
  createdAt: number;
  updatedAt: number;
}

export interface TenantSettings {
  siteName: string;
  siteDescription: string;
  logoUrl?: string;
  faviconUrl?: string;
  primaryColor: string;
  secondaryColor: string;
  customDomain?: string;
}

// Marketplace types
export interface Product {
  _id: string;
  tenantId: string;
  sellerId: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  images: string[];
  category: string;
  tags: string[];
  stock: number;
  status: "draft" | "active" | "archived";
  metadata: Record<string, unknown>;
  createdAt: number;
  updatedAt: number;
}

export interface Order {
  _id: string;
  tenantId: string;
  customerId: string;
  items: OrderItem[];
  total: number;
  currency: string;
  status: OrderStatus;
  stripePaymentIntentId?: string;
  createdAt: number;
  updatedAt: number;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

// Forum types
export interface ForumPost {
  _id: string;
  tenantId: string;
  authorId: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  likes: number;
  views: number;
  pinned: boolean;
  locked: boolean;
  aiSummary?: string; // AI-generated summary
  previewImage?: string; // Optional preview image URL
  createdAt: number;
  updatedAt: number;
}

export interface ForumComment {
  _id: string;
  postId: string;
  authorId: string;
  content: string;
  likes: number;
  parentId?: string;
  createdAt: number;
  updatedAt: number;
}

// Forum category with icon and color
export interface ForumCategory {
  _id: string;
  tenantId: string;
  name: string;
  slug: string;
  description?: string;
  icon: string; // lucide-react icon name: "Code", "Palette", "Rocket", etc.
  color: string; // Tailwind color class: "bg-blue-500", "bg-pink-500", etc.
  order: number;
  createdAt: number;
  updatedAt: number;
}

// Forum bookmark
export interface ForumBookmark {
  _id: string;
  userId: string;
  postId: string;
  createdAt: number;
}

// User reputation for leaderboard
export interface UserReputation {
  _id: string;
  userId: string;
  tenantId: string;
  points: number;
  level: "bronze" | "silver" | "gold" | "platinum";
  postsCreated: number;
  commentsCreated: number;
  likesReceived: number;
  createdAt: number;
  updatedAt: number;
}

// Gamification campaign
export interface ForumCampaign {
  _id: string;
  tenantId: string;
  title: string;
  description: string;
  prize: string;
  targetPoints: number;
  currentProgress: number;
  startDate: number;
  endDate: number;
  isActive: boolean;
  createdAt: number;
  updatedAt: number;
}

// Campaign participant
export interface CampaignParticipant {
  _id: string;
  userId: string;
  campaignId: string;
  joinedAt: number;
}

// Leaderboard entry
export interface LeaderboardEntry {
  _id: string;
  userId: string;
  tenantId: string;
  points: number;
  level: "bronze" | "silver" | "gold" | "platinum";
  postsCreated: number;
  commentsCreated: number;
  likesReceived: number;
  user?: User; // Populated user info
}

// Enhanced forum post with related data
export interface ForumPostEnhanced extends ForumPost {
  author?: User; // Populated author info
  commentCount?: number; // Populated comment count
  isLiked?: boolean; // Whether current user liked this post
  isBookmarked?: boolean; // Whether current user bookmarked this post
}

// Stripe types
export interface StripePrice {
  id: string;
  productId: string;
  priceId: string;
  amount: number;
  currency: string;
}

// Session types
export interface Session {
  _id: string;
  userId: string;
  expiresAt: number;
  ipAddress?: string;
  userAgent?: string;
}

// API response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

// Pagination types
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}
