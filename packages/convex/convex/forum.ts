import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

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
    let posts;

    if (args.category) {
      posts = await ctx.db
        .query("forumPosts")
        .withIndex("by_category", (q) => q.eq("category", args.category!))
        .collect();
    } else {
      posts = await ctx.db.query("forumPosts").collect();
    }

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
// FORUM CATEGORIES FUNCTIONS
// ============================================

export const getForumCategories = query({
  args: { tenantId: v.id("tenants") },
  handler: async (ctx, args) => {
    const categories = await ctx.db
      .query("forumCategories")
      .withIndex("by_tenant", (q) => q.eq("tenantId", args.tenantId))
      .collect();

    // Get post counts for each category
    const categoriesWithCounts = await Promise.all(
      categories.map(async (category) => {
        const posts = await ctx.db
          .query("forumPosts")
          .filter((q) => q.eq(q.field("tenantId"), args.tenantId))
          .collect();
        const categoryPosts = posts.filter(
          (p) => p.category === category.name
        );

        return {
          ...category,
          postCount: categoryPosts.length,
        };
      })
    );

    // Sort by order
    return categoriesWithCounts.sort((a, b) => a.order - b.order);
  },
});

export const getForumCategoryBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const category = await ctx.db
      .query("forumCategories")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
    return category;
  },
});

// ============================================
// FORUM POSTS ENHANCED FUNCTIONS
// ============================================

export const getForumPostsPaginated = query({
  args: {
    tenantId: v.id("tenants"),
    categoryId: v.optional(v.string()),
    searchQuery: v.optional(v.string()),
    sort: v.optional(v.string()), // "hot" | "new" | "top"
    page: v.optional(v.number()),
    pageSize: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const {
      tenantId,
      categoryId,
      searchQuery,
      sort = "hot",
      page = 1,
      pageSize = 10,
    } = args;

    let posts = await ctx.db
      .query("forumPosts")
      .filter((q) => q.eq(q.field("tenantId"), tenantId))
      .collect();

    // Filter by category
    if (categoryId) {
      posts = posts.filter((p) => p.category === categoryId);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      posts = posts.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.content.toLowerCase().includes(query)
      );
    }

    // Sort posts
    posts = posts.sort((a, b) => {
      if (sort === "new") {
        return b.createdAt - a.createdAt;
      } else if (sort === "top") {
        return b.likes - a.likes;
      } else {
        // Hot: combination of likes and recency
        const scoreA = a.likes + Math.floor(a.createdAt / 10000000);
        const scoreB = b.likes + Math.floor(b.createdAt / 10000000);
        return scoreB - scoreA;
      }
    });

    // Pagination
    const total = posts.length;
    const totalPages = Math.ceil(total / pageSize);
    const startIndex = (page - 1) * pageSize;
    const paginatedPosts = posts.slice(startIndex, startIndex + pageSize);

    // Enhance posts with author info and comment counts
    const enhancedPosts = await Promise.all(
      paginatedPosts.map(async (post) => {
        const author = await ctx.db.get(post.authorId);
        const comments = await ctx.db
          .query("forumComments")
          .withIndex("by_post", (q) => q.eq("postId", post._id))
          .collect();

        return {
          ...post,
          author,
          commentCount: comments.length,
        };
      })
    );

    return {
      posts: enhancedPosts,
      total,
      page,
      pageSize,
      totalPages,
      hasMore: page < totalPages,
    };
  },
});

export const getCommentCount = query({
  args: { postId: v.id("forumPosts") },
  handler: async (ctx, args) => {
    const comments = await ctx.db
      .query("forumComments")
      .withIndex("by_post", (q) => q.eq("postId", args.postId))
      .collect();
    return comments.length;
  },
});

// ============================================
// BOOKMARK FUNCTIONS
// ============================================

export const toggleBookmark = mutation({
  args: { userId: v.id("users"), postId: v.id("forumPosts") },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("forumBookmarks")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .filter((q) => q.eq(q.field("postId"), args.postId))
      .first();

    if (existing) {
      await ctx.db.delete(existing._id);
      return { bookmarked: false };
    } else {
      await ctx.db.insert("forumBookmarks", {
        userId: args.userId,
        postId: args.postId,
        createdAt: Date.now(),
      });
      return { bookmarked: true };
    }
  },
});

export const isPostBookmarked = query({
  args: { userId: v.id("users"), postId: v.id("forumPosts") },
  handler: async (ctx, args) => {
    const bookmark = await ctx.db
      .query("forumBookmarks")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .filter((q) => q.eq(q.field("postId"), args.postId))
      .first();
    return !!bookmark;
  },
});

export const getUserBookmarks = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const bookmarks = await ctx.db
      .query("forumBookmarks")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    const posts = await Promise.all(
      bookmarks.map(async (bookmark) => {
        const post = await ctx.db.get(bookmark.postId);
        return post;
      })
    );

    return posts.filter((p) => p !== null);
  },
});

// ============================================
// LIKE FUNCTIONS (ENHANCED)
// ============================================

export const isPostLikedByUser = query({
  args: { userId: v.id("users"), postId: v.id("forumPosts") },
  handler: async (ctx, args) => {
    const like = await ctx.db
      .query("forumPostLikes")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .filter((q) => q.eq(q.field("postId"), args.postId))
      .first();
    return !!like;
  },
});

export const togglePostLikeEnhanced = mutation({
  args: { userId: v.id("users"), postId: v.id("forumPosts") },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("forumPostLikes")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .filter((q) => q.eq(q.field("postId"), args.postId))
      .first();

    const post = await ctx.db.get(args.postId);
    if (!post) {
      throw new Error("Post not found");
    }

    if (existing) {
      await ctx.db.delete(existing._id);
      await ctx.db.patch(args.postId, {
        likes: Math.max(0, post.likes - 1),
      });
      return { liked: false, likes: Math.max(0, post.likes - 1) };
    } else {
      await ctx.db.insert("forumPostLikes", {
        userId: args.userId,
        postId: args.postId,
        createdAt: Date.now(),
      });
      await ctx.db.patch(args.postId, {
        likes: post.likes + 1,
      });
      return { liked: true, likes: post.likes + 1 };
    }
  },
});

// ============================================
// LEADERBOARD & STATS FUNCTIONS
// ============================================

export const getLeaderboard = query({
  args: {
    tenantId: v.id("tenants"),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 10;

    const reputations = await ctx.db
      .query("userReputation")
      .withIndex("by_tenant", (q) => q.eq("tenantId", args.tenantId))
      .collect();

    // Sort by points descending
    const sorted = reputations
      .sort((a, b) => b.points - a.points)
      .slice(0, limit);

    // Get user info for each entry
    const leaderboard = await Promise.all(
      sorted.map(async (rep) => {
        const user = await ctx.db.get(rep.userId);
        return {
          ...rep,
          user,
        };
      })
    );

    return leaderboard;
  },
});

export const getForumStats = query({
  args: { tenantId: v.id("tenants") },
  handler: async (ctx, args) => {
    const users = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("tenantId"), args.tenantId))
      .collect();

    const posts = await ctx.db
      .query("forumPosts")
      .filter((q) => q.eq(q.field("tenantId"), args.tenantId))
      .collect();

    const comments = await ctx.db
      .query("forumComments")
      .collect();

    // Count comments for posts in this tenant
    let tenantCommentCount = 0;
    for (const comment of comments) {
      const post = await ctx.db.get(comment.postId);
      if (post && post.tenantId === args.tenantId) {
        tenantCommentCount++;
      }
    }

    return {
      members: users.length,
      discussions: posts.length,
      comments: tenantCommentCount,
    };
  },
});

// ============================================
// CAMPAIGN FUNCTIONS
// ============================================

export const getActiveCampaigns = query({
  args: { tenantId: v.id("tenants") },
  handler: async (ctx, args) => {
    const now = Date.now();
    const campaigns = await ctx.db
      .query("forumCampaigns")
      .withIndex("by_tenant", (q) => q.eq("tenantId", args.tenantId))
      .filter((q) =>
        q.and(q.eq(q.field("isActive"), true), q.lt(q.field("startDate"), now))
      )
      .collect();

    // Filter by end date (ongoing campaigns)
    const activeCampaigns = campaigns.filter((c) => c.endDate > now);

    return activeCampaigns;
  },
});

export const toggleCampaignParticipation = mutation({
  args: { userId: v.id("users"), campaignId: v.id("forumCampaigns") },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("campaignParticipants")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .filter((q) => q.eq(q.field("campaignId"), args.campaignId))
      .first();

    if (existing) {
      await ctx.db.delete(existing._id);
      return { joined: false };
    } else {
      await ctx.db.insert("campaignParticipants", {
        userId: args.userId,
        campaignId: args.campaignId,
        joinedAt: Date.now(),
      });
      return { joined: true };
    }
  },
});

export const hasUserJoinedCampaign = query({
  args: { userId: v.id("users"), campaignId: v.id("forumCampaigns") },
  handler: async (ctx, args) => {
    const participation = await ctx.db
      .query("campaignParticipants")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .filter((q) => q.eq(q.field("campaignId"), args.campaignId))
      .first();
    return !!participation;
  },
});
