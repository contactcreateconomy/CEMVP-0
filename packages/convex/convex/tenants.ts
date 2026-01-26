import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

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
