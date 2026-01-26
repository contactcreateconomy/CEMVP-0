import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

/**
 * Sign in a user with email and password
 * @param email - User's email address
 * @param password - User's password
 * @param tenantDomain - Domain for tenant detection
 * @returns Session info and user data on success
 */
export const signIn = mutation({
  args: {
    email: v.string(),
    password: v.string(),
    tenantDomain: v.string(),
  },
  handler: async (ctx, args) => {
    // Find user by email
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (!user) {
      throw new Error("Invalid email or password");
    }

    // TODO: Verify password hash
    // For now, we'll skip password verification since we haven't implemented hashing yet
    // In production, use bcrypt or similar:
    // const isValidPassword = await bcrypt.compare(args.password, user.password);
    // if (!isValidPassword) {
    //   throw new Error("Invalid email or password");
    // }

    // Get tenant by domain
    const tenant = await ctx.db
      .query("tenants")
      .withIndex("by_domain", (q) => q.eq("domain", args.tenantDomain))
      .first();

    if (!tenant) {
      throw new Error("Invalid tenant");
    }

    // Create session (7 days expiry)
    const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000;
    const sessionId = await ctx.db.insert("sessions", {
      userId: user._id,
      expiresAt,
    });

    return {
      success: true,
      userId: user._id,
      sessionId,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        image: user.image,
      },
    };
  },
});

/**
 * Sign up a new user
 * @param name - User's display name
 * @param email - User's email address
 * @param password - User's password
 * @param tenantDomain - Domain for tenant detection
 * @returns Session info and user data on success
 */
export const signUp = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    password: v.string(),
    tenantDomain: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if user already exists
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existingUser) {
      throw new Error("User already exists");
    }

    // Get tenant by domain
    const tenant = await ctx.db
      .query("tenants")
      .withIndex("by_domain", (q) => q.eq("domain", args.tenantDomain))
      .first();

    if (!tenant) {
      throw new Error("Invalid tenant");
    }

    // TODO: Hash password before storing
    // In production, use bcrypt:
    // const hashedPassword = await bcrypt.hash(args.password, 10);

    // Create user
    const userId = await ctx.db.insert("users", {
      name: args.name,
      email: args.email,
      password: args.password, // Store hashed password in production
      role: "customer", // Default role
      tenantId: tenant._id,
      emailVerified: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    // Create session (7 days expiry)
    const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000;
    const sessionId = await ctx.db.insert("sessions", {
      userId,
      expiresAt,
    });

    return {
      success: true,
      userId,
      sessionId,
      user: {
        id: userId,
        name: args.name,
        email: args.email,
        role: "customer",
      },
    };
  },
});

/**
 * Get current session by ID
 * @param sessionId - Session ID to look up
 * @returns Session data or null if invalid/expired
 */
export const getSession = query({
  args: {
    sessionId: v.id("sessions"),
  },
  handler: async (ctx, args) => {
    const session = await ctx.db.get(args.sessionId);

    if (!session || session.expiresAt < Date.now()) {
      return null;
    }

    // Get user data
    const user = await ctx.db.get(session.userId);

    if (!user) {
      return null;
    }

    return {
      session,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        image: user.image,
      },
    };
  },
});

/**
 * Sign out by deleting the session
 * @param sessionId - Session ID to delete
 */
export const signOut = mutation({
  args: {
    sessionId: v.id("sessions"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.sessionId);
    return { success: true };
  },
});

/**
 * Clean up expired sessions
 * This should be called periodically (e.g., via a cron job)
 */
export const cleanupExpiredSessions = mutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    const expiredSessions = await ctx.db
      .query("sessions")
      .withIndex("by_expiration", (q) => q.lt("expiresAt", now))
      .collect();

    for (const session of expiredSessions) {
      await ctx.db.delete(session._id);
    }

    return {
      deleted: expiredSessions.length,
    };
  },
});
