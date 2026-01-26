import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Users table
  users: defineTable({
    name: v.string(),
    email: v.string(),
    username: v.optional(v.string()),
    password: v.optional(v.string()), // Hashed password for auth
    emailVerified: v.optional(v.boolean()),
    image: v.optional(v.string()),
    bio: v.optional(v.string()),
    role: v.string(), // "customer" | "seller" | "admin"
    tenantId: v.optional(v.id("tenants")),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_email", ["email"])
    .index("by_tenant", ["tenantId"]),

  // Tenants table for multitenancy
  tenants: defineTable({
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
    .index("by_domain", ["domain"]),

  // Products table
  products: defineTable({
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
    .index("by_status", ["status"]),

  // Orders table
  orders: defineTable({
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
    .index("by_status", ["status"]),

  // Forum posts table
  forumPosts: defineTable({
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
    aiSummary: v.optional(v.string()),
    previewImage: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_tenant", ["tenantId"])
    .index("by_author", ["authorId"])
    .index("by_category", ["category"]),

  // Forum comments table
  forumComments: defineTable({
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
    .index("by_parent", ["parentId"]),

  // Stripe prices mapping
  stripePrices: defineTable({
    productId: v.id("products"),
    priceId: v.string(),
    amount: v.number(),
    currency: v.string(),
  })
    .index("by_product", ["productId"])
    .index("by_price_id", ["priceId"]),

  // Sessions table for auth
  sessions: defineTable({
    userId: v.id("users"),
    expiresAt: v.number(),
    ipAddress: v.optional(v.string()),
    userAgent: v.optional(v.string()),
  })
    .index("by_user", ["userId"])
    .index("by_expiration", ["expiresAt"]),
});
