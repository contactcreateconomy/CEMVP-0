import { queryGeneric as query, mutationGeneric as mutation } from "convex/server";
import { v } from "convex/values";

// ============================================
// USERS FUNCTIONS
// ============================================

export const getUsers = query({
  args: {
    tenantId: v.optional(v.id("tenants")),
  },
  handler: async (ctx, args) => {
    if (args.tenantId) {
      return await ctx.db
        .query("users")
        .filter((q) => q.eq(q.field("tenantId"), args.tenantId))
        .collect();
    }
    return await ctx.db.query("users").collect();
  },
});

export const getUserById = query({
  args: { id: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const getUserByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();
    return user;
  },
});

export const createUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    role: v.string(),
    tenantId: v.optional(v.id("tenants")),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const newId = await ctx.db.insert("users", {
      name: args.name,
      email: args.email,
      role: args.role,
      tenantId: args.tenantId,
      createdAt: now,
      updatedAt: now,
    });
    return newId;
  },
});

export const updateUser = mutation({
  args: {
    id: v.id("users"),
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    image: v.optional(v.string()),
    role: v.optional(v.string()),
    tenantId: v.optional(v.id("tenants")),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});

export const deleteUser = mutation({
  args: { id: v.id("users") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// ============================================
// TENANTS FUNCTIONS
// ============================================

export const getTenants = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("tenants").collect();
  },
});

export const getTenantBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const tenant = await ctx.db
      .query("tenants")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
    return tenant;
  },
});

export const getTenantByDomain = query({
  args: { domain: v.string() },
  handler: async (ctx, args) => {
    const tenant = await ctx.db
      .query("tenants")
      .withIndex("by_domain", (q) => q.eq("domain", args.domain))
      .first();
    return tenant;
  },
});

export const createTenant = mutation({
  args: {
    name: v.string(),
    slug: v.string(),
    domain: v.string(),
    settings: v.object({
      siteName: v.string(),
      siteDescription: v.string(),
      primaryColor: v.string(),
      secondaryColor: v.string(),
    }),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const newId = await ctx.db.insert("tenants", {
      name: args.name,
      slug: args.slug,
      domain: args.domain,
      settings: args.settings,
      createdAt: now,
      updatedAt: now,
    });
    return newId;
  },
});

export const updateTenant = mutation({
  args: {
    id: v.id("tenants"),
    name: v.optional(v.string()),
    slug: v.optional(v.string()),
    settings: v.optional(
      v.object({
        siteName: v.string(),
        siteDescription: v.string(),
        logoUrl: v.optional(v.string()),
        faviconUrl: v.optional(v.string()),
        primaryColor: v.string(),
        secondaryColor: v.string(),
        customDomain: v.optional(v.string()),
      })
    ),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});

// ============================================
// PRODUCTS FUNCTIONS
// ============================================

export const getProducts = query({
  args: {
    tenantId: v.optional(v.id("tenants")),
    sellerId: v.optional(v.id("users")),
    status: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let query = ctx.db.query("products");

    if (args.status) {
      query = query.withIndex("by_status", (q) => q.eq("status", args.status));
    }

    const products = await query.collect();

    // Filter by tenantId and sellerId if provided
    let filtered = products;
    if (args.tenantId) {
      filtered = filtered.filter((p) => p.tenantId === args.tenantId);
    }
    if (args.sellerId) {
      filtered = filtered.filter((p) => p.sellerId === args.sellerId);
    }

    return filtered;
  },
});

export const getProductById = query({
  args: { id: v.id("products") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const createProduct = mutation({
  args: {
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
    status: v.string(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const newId = await ctx.db.insert("products", {
      ...args,
      createdAt: now,
      updatedAt: now,
    });
    return newId;
  },
});

export const updateProduct = mutation({
  args: {
    id: v.id("products"),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    price: v.optional(v.number()),
    currency: v.optional(v.string()),
    images: v.optional(v.array(v.string())),
    category: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    stock: v.optional(v.number()),
    status: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});

export const deleteProduct = mutation({
  args: { id: v.id("products") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// ============================================
// ORDERS FUNCTIONS
// ============================================

export const getOrders = query({
  args: {
    tenantId: v.optional(v.id("tenants")),
    customerId: v.optional(v.id("users")),
    status: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let query = ctx.db.query("orders");

    if (args.status) {
      query = query.withIndex("by_status", (q) => q.eq("status", args.status));
    }

    const orders = await query.collect();

    // Filter by tenantId and customerId if provided
    let filtered = orders;
    if (args.tenantId) {
      filtered = filtered.filter((o) => o.tenantId === args.tenantId);
    }
    if (args.customerId) {
      filtered = filtered.filter((o) => o.customerId === args.customerId);
    }

    return filtered;
  },
});

export const getOrderById = query({
  args: { id: v.id("orders") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const createOrder = mutation({
  args: {
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
    stripePaymentIntentId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const newId = await ctx.db.insert("orders", {
      ...args,
      status: "pending",
      createdAt: now,
      updatedAt: now,
    });
    return newId;
  },
});

export const updateOrderStatus = mutation({
  args: {
    id: v.id("orders"),
    status: v.string(),
    stripePaymentIntentId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, status, stripePaymentIntentId } = args;
    await ctx.db.patch(id, {
      status,
      ...(stripePaymentIntentId && { stripePaymentIntentId }),
      updatedAt: Date.now(),
    });
  },
});

// ============================================
// FORUM POSTS FUNCTIONS
// ============================================

export const getForumPosts = query({
  args: {
    tenantId: v.optional(v.id("tenants")),
    authorId: v.optional(v.id("users")),
    category: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let query = ctx.db.query("forumPosts");

    if (args.category) {
      query = query.withIndex("by_category", (q) =>
        q.eq("category", args.category)
      );
    }

    const posts = await query.collect();

    // Filter by tenantId and authorId if provided
    let filtered = posts;
    if (args.tenantId) {
      filtered = filtered.filter((p) => p.tenantId === args.tenantId);
    }
    if (args.authorId) {
      filtered = filtered.filter((p) => p.authorId === args.authorId);
    }

    return filtered;
  },
});

export const getForumPostById = query({
  args: { id: v.id("forumPosts") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const createForumPost = mutation({
  args: {
    tenantId: v.id("tenants"),
    authorId: v.id("users"),
    title: v.string(),
    content: v.string(),
    category: v.string(),
    tags: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const newId = await ctx.db.insert("forumPosts", {
      ...args,
      likes: 0,
      views: 0,
      pinned: false,
      locked: false,
      createdAt: now,
      updatedAt: now,
    });
    return newId;
  },
});

export const updateForumPost = mutation({
  args: {
    id: v.id("forumPosts"),
    title: v.optional(v.string()),
    content: v.optional(v.string()),
    category: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    pinned: v.optional(v.boolean()),
    locked: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});

export const deleteForumPost = mutation({
  args: { id: v.id("forumPosts") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const incrementPostViews = mutation({
  args: { id: v.id("forumPosts") },
  handler: async (ctx, args) => {
    const post = await ctx.db.get(args.id);
    if (post) {
      await ctx.db.patch(args.id, {
        views: post.views + 1,
      });
    }
  },
});

export const togglePostLike = mutation({
  args: { id: v.id("forumPosts"), increment: v.boolean() },
  handler: async (ctx, args) => {
    const post = await ctx.db.get(args.id);
    if (post) {
      await ctx.db.patch(args.id, {
        likes: args.increment ? post.likes + 1 : post.likes - 1,
      });
    }
  },
});

// ============================================
// FORUM COMMENTS FUNCTIONS
// ============================================

export const getCommentsByPostId = query({
  args: { postId: v.id("forumPosts") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("forumComments")
      .withIndex("by_post", (q) => q.eq("postId", args.postId))
      .collect();
  },
});

export const createComment = mutation({
  args: {
    postId: v.id("forumPosts"),
    authorId: v.id("users"),
    content: v.string(),
    parentId: v.optional(v.id("forumComments")),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const newId = await ctx.db.insert("forumComments", {
      ...args,
      likes: 0,
      createdAt: now,
      updatedAt: now,
    });
    return newId;
  },
});

export const updateComment = mutation({
  args: {
    id: v.id("forumComments"),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const { id, content } = args;
    await ctx.db.patch(id, {
      content,
      updatedAt: Date.now(),
    });
  },
});

export const deleteComment = mutation({
  args: { id: v.id("forumComments") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const toggleCommentLike = mutation({
  args: { id: v.id("forumComments"), increment: v.boolean() },
  handler: async (ctx, args) => {
    const comment = await ctx.db.get(args.id);
    if (comment) {
      await ctx.db.patch(args.id, {
        likes: args.increment ? comment.likes + 1 : comment.likes - 1,
      });
    }
  },
});

// ============================================
// ADMIN/STATS FUNCTIONS
// ============================================

export const getStats = query({
  args: { tenantId: v.optional(v.id("tenants")) },
  handler: async (ctx, args) => {
    const users = await ctx.db.query("users").collect();
    const products = await ctx.db.query("products").collect();
    const orders = await ctx.db.query("orders").collect();
    const posts = await ctx.db.query("forumPosts").collect();

    let filteredUsers = users;
    let filteredProducts = products;
    let filteredOrders = orders;
    let filteredPosts = posts;

    if (args.tenantId) {
      filteredUsers = users.filter((u) => u.tenantId === args.tenantId);
      filteredProducts = products.filter((p) => p.tenantId === args.tenantId);
      filteredOrders = orders.filter((o) => o.tenantId === args.tenantId);
      filteredPosts = posts.filter((p) => p.tenantId === args.tenantId);
    }

    return {
      userCount: filteredUsers.length,
      productCount: filteredProducts.length,
      orderCount: filteredOrders.length,
      postCount: filteredPosts.length,
      revenue: filteredOrders.reduce((sum, o) => sum + o.total, 0),
    };
  },
});

// ============================================
// AUTH FUNCTIONS
// ============================================
// Export auth functions from the auth module
export {
  signIn,
  signUp,
  getSession,
  signOut,
  cleanupExpiredSessions,
} from "./convex/auth";
