import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  users: defineTable({
    tenantId: v.string(),
    email: v.string(),
    name: v.string(),
    role: v.union(v.literal('customer'), v.literal('seller'), v.literal('admin')),
    avatarUrl: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
    emailVerified: v.optional(v.boolean()),
  })
    .index('byEmail', ['tenantId', 'email'])
    .index('byTenant', ['tenantId']),

  sessions: defineTable({
    tenantId: v.string(),
    userId: v.id('users'),
    token: v.string(),
    expiresAt: v.number(),
    createdAt: v.number(),
    lastAccessedAt: v.number(),
  })
    .index('byUser', ['tenantId', 'userId'])
    .index('byToken', ['token'])
    .index('byExpiry', ['expiresAt']),

  tenants: defineTable({
    slug: v.string(),
    name: v.string(),
    domain: v.optional(v.string()),
    plan: v.union(
      v.literal('free'),
      v.literal('starter'),
      v.literal('business'),
      v.literal('enterprise')
    ),
    createdAt: v.number(),
    updatedAt: v.number(),
    settings: v.optional(
      v.object({
        allowCustomDomain: v.boolean(),
        maxUsers: v.number(),
        maxStorage: v.number(),
      })
    ),
  })
    .index('bySlug', ['slug']),

  // Placeholder tables for future features
  products: defineTable({
    tenantId: v.string(),
    name: v.string(),
    description: v.optional(v.string()),
    price: v.number(),
    sellerId: v.id('users'),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index('byTenant', ['tenantId'])
    .index('bySeller', ['tenantId', 'sellerId']),

  orders: defineTable({
    tenantId: v.string(),
    customerId: v.id('users'),
    productId: v.id('products'),
    status: v.union(
      v.literal('pending'),
      v.literal('paid'),
      v.literal('completed'),
      v.literal('cancelled')
    ),
    amount: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index('byTenant', ['tenantId'])
    .index('byCustomer', ['tenantId', 'customerId']),

  forumPosts: defineTable({
    tenantId: v.string(),
    authorId: v.id('users'),
    title: v.string(),
    content: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index('byTenant', ['tenantId'])
    .index('byAuthor', ['tenantId', 'authorId']),

  forumComments: defineTable({
    tenantId: v.string(),
    postId: v.id('forumPosts'),
    authorId: v.id('users'),
    content: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index('byPost', ['tenantId', 'postId'])
    .index('byAuthor', ['tenantId', 'authorId']),
});
