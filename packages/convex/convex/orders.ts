import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getOrders = query({
  args: {
    tenantId: v.optional(v.id("tenants")),
    customerId: v.optional(v.id("users")),
    status: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let orders;

    if (args.status) {
      orders = await ctx.db
        .query("orders")
        .withIndex("by_status", (q) => q.eq("status", args.status!))
        .collect();
    } else {
      orders = await ctx.db.query("orders").collect();
    }

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
