import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// Users table
export const users = defineTable({
  name: v.string(),
  email: v.string(),
  emailVerified: v.optional(v.boolean()),
  image: v.optional(v.string()),
  role: v.string(), // "customer" | "seller" | "admin"
  username: v.optional(v.string()), // @username handle
  bio: v.optional(v.string()), // User bio
  tenantId: v.optional(v.id("tenants")),
  createdAt: v.number(),
  updatedAt: v.number(),
})
  .index("by_email", ["email"])
  .index("by_username", ["username"])
  .index("by_tenant", ["tenantId"]);

// Tenants table for multitenancy
export const tenants = defineTable({
  name: v.string(),
  slug: v.string(),
  domain: v.string(), // "marketplace" | "forum" | "admin" | "seller"
  stripeAccountId: v.optional(v.string()),
  settings: v.object({
    siteName: v.string(),
    siteDescription: v.string(),
    logoUrl: v.optional(v.string()),
    faviconUrl: v.optional(v.string()),
    primaryColor: v.string(),
    secondaryColor: v.string(),
    customDomain: v.optional(v.string()),
  }),
  createdAt: v.number(),
  updatedAt: v.number(),
})
  .index("by_slug", ["slug"])
  .index("by_domain", ["domain"]);

// Products table
export const products = defineTable({
  tenantId: v.id("tenants"),
  sellerId: v.id("users"),
  name: v.string(),
  description: v.string(),
  price: v.number(),
  currency: v.string(),
  images: v.array(v.string()),
  category: v.string(),
  tags: v.array(v.string()),
  stock: v.number(),
  status: v.string(), // "draft" | "active" | "archived"
  metadata: v.optional(v.any()),
  createdAt: v.number(),
  updatedAt: v.number(),
})
  .index("by_tenant", ["tenantId"])
  .index("by_seller", ["sellerId"])
  .index("by_status", ["status"]);

// Orders table
export const orders = defineTable({
  tenantId: v.id("tenants"),
  customerId: v.id("users"),
  items: v.array(
    v.object({
      productId: v.id("products"),
      name: v.string(),
      price: v.number(),
      quantity: v.number(),
    })
  ),
  total: v.number(),
  currency: v.string(),
  status: v.string(), // "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  stripePaymentIntentId: v.optional(v.string()),
  createdAt: v.number(),
  updatedAt: v.number(),
})
  .index("by_tenant", ["tenantId"])
  .index("by_customer", ["customerId"])
  .index("by_status", ["status"]);

// Forum posts table
export const forumPosts = defineTable({
  tenantId: v.id("tenants"),
  authorId: v.id("users"),
  title: v.string(),
  content: v.string(),
  category: v.string(),
  tags: v.array(v.string()),
  likes: v.number(),
  views: v.number(),
  pinned: v.boolean(),
  locked: v.boolean(),
  aiSummary: v.optional(v.string()), // AI-generated summary
  previewImage: v.optional(v.string()), // Optional preview image URL
  createdAt: v.number(),
  updatedAt: v.number(),
})
  .index("by_tenant", ["tenantId"])
  .index("by_author", ["authorId"])
  .index("by_category", ["category"]);

// Forum comments table
export const forumComments = defineTable({
  postId: v.id("forumPosts"),
  authorId: v.id("users"),
  content: v.string(),
  likes: v.number(),
  parentId: v.optional(v.id("forumComments")),
  createdAt: v.number(),
  updatedAt: v.number(),
})
  .index("by_post", ["postId"])
  .index("by_author", ["authorId"])
  .index("by_parent", ["parentId"]);

// Forum categories with icons and colors for left sidebar
export const forumCategories = defineTable({
  tenantId: v.id("tenants"),
  name: v.string(),
  slug: v.string(),
  description: v.optional(v.string()),
  icon: v.string(), // lucide-react icon name: "Code", "Palette", "Rocket", etc.
  color: v.string(), // Tailwind color class: "bg-blue-500", "bg-pink-500", etc.
  order: v.number(),
  createdAt: v.number(),
  updatedAt: v.number(),
})
  .index("by_tenant", ["tenantId"])
  .index("by_slug", ["slug"]);

// User bookmarks for posts
export const forumBookmarks = defineTable({
  userId: v.id("users"),
  postId: v.id("forumPosts"),
  createdAt: v.number(),
})
  .index("by_user", ["userId"])
  .index("by_post", ["postId"]);

// Track individual likes (replaces simple counter)
export const forumPostLikes = defineTable({
  userId: v.id("users"),
  postId: v.id("forumPosts"),
  createdAt: v.number(),
})
  .index("by_user", ["userId"])
  .index("by_post", ["postId"]);

// User reputation for leaderboard
export const userReputation = defineTable({
  userId: v.id("users"),
  tenantId: v.id("tenants"),
  points: v.number(),
  level: v.string(), // "bronze", "silver", "gold", "platinum"
  postsCreated: v.number(),
  commentsCreated: v.number(),
  likesReceived: v.number(),
  createdAt: v.number(),
  updatedAt: v.number(),
})
  .index("by_user", ["userId"])
  .index("by_tenant", ["tenantId"])
  .index("by_points", ["points"]);

// Gamification campaigns
export const forumCampaigns = defineTable({
  tenantId: v.id("tenants"),
  title: v.string(),
  description: v.string(),
  prize: v.string(),
  targetPoints: v.number(),
  currentProgress: v.number(),
  startDate: v.number(),
  endDate: v.number(),
  isActive: v.boolean(),
  createdAt: v.number(),
  updatedAt: v.number(),
})
  .index("by_tenant", ["tenantId"])
  .index("by_active", ["isActive"]);

// Campaign participants
export const campaignParticipants = defineTable({
  userId: v.id("users"),
  campaignId: v.id("forumCampaigns"),
  joinedAt: v.number(),
})
  .index("by_user", ["userId"])
  .index("by_campaign", ["campaignId"]);

// Stripe prices mapping
export const stripePrices = defineTable({
  productId: v.id("products"),
  priceId: v.string(),
  amount: v.number(),
  currency: v.string(),
})
  .index("by_product", ["productId"])
  .index("by_price_id", ["priceId"]);

// Sessions table for auth
export const sessions = defineTable({
  userId: v.id("users"),
  expiresAt: v.number(),
  ipAddress: v.optional(v.string()),
  userAgent: v.optional(v.string()),
})
  .index("by_user", ["userId"])
  .index("by_expiration", ["expiresAt"]);

// Default export for Convex v2
export default defineSchema({
  users,
  tenants,
  products,
  orders,
  forumPosts,
  forumComments,
  forumCategories,
  forumBookmarks,
  forumPostLikes,
  userReputation,
  forumCampaigns,
  campaignParticipants,
  stripePrices,
  sessions,
});
