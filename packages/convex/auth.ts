/**
 * Authentication and Authorization Utilities for Convex
 *
 * Provides helper functions for securing Convex functions with
 * authentication and authorization checks.
 */

import { QueryCtx } from "./_generated/functions";
import { Id } from "./_generated/dataModel";

/**
 * Valid user roles in the system
 */
export type UserRole = "customer" | "seller" | "admin";

/**
 * Error types for authentication/authorization failures
 */
export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthError";
  }
}

export class AuthorizationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthorizationError";
  }
}

/**
 * Type guard to check if a string is a valid UserRole
 */
function isValidRole(role: string): role is UserRole {
  return ["customer", "seller", "admin"].includes(role);
}

/**
 * Get the current authenticated user's identity
 * @throws AuthError if not authenticated
 */
export async function requireAuth(ctx: QueryCtx) {
  const identity = await ctx.auth.getUserIdentity();

  if (!identity) {
    throw new AuthError("Authentication required. Please sign in.");
  }

  return identity;
}

/**
 * Get the current user's identity (returns null if not authenticated)
 * @param ctx - The Convex query context
 * @returns The user identity or null if not authenticated
 */
export async function getCurrentUser(ctx: QueryCtx) {
  return await ctx.auth.getUserIdentity();
}

/**
 * Get user record from database by their identity
 * @param ctx - The Convex query context
 * @throws AuthError if not authenticated
 * @throws AuthorizationError if user not found in database
 * @returns The user record from the database
 */
export async function requireUser(ctx: QueryCtx) {
  const identity = await requireAuth(ctx);

  // Get user by email (from identity)
  const email = identity.email;
  if (!email) {
    throw new AuthError("Identity must have an email address");
  }

  const user = await ctx.db
    .query("users")
    .withIndex("by_email", (q) => q.eq("email", email))
    .first();

  if (!user) {
    throw new AuthorizationError(
      "User not found in database. Please complete registration."
    );
  }

  return user;
}

/**
 * Check if user has a specific role
 * @throws AuthError if not authenticated
 * @throws AuthorizationError if user lacks required role
 */
export async function requireRole(
  ctx: QueryCtx,
  allowedRoles: UserRole[]
) {
  const user = await requireUser(ctx);

  // Validate role is a valid UserRole
  if (!isValidRole(user.role)) {
    throw new AuthorizationError(
      `Invalid user role: ${user.role}`
    );
  }

  if (!allowedRoles.includes(user.role)) {
    throw new AuthorizationError(
      `Access denied. Required role: ${allowedRoles.join(" or ")}`
    );
  }

  return user;
}

/**
 * Check if user is an admin
 * @throws AuthError if not authenticated
 * @throws AuthorizationError if user is not an admin
 */
export async function requireAdmin(ctx: QueryCtx) {
  return requireRole(ctx, ["admin"]);
}

/**
 * Check if user can access a specific tenant
 * @param ctx - The Convex query context
 * @param tenantId - The tenant ID to check access for
 * @throws AuthError if not authenticated
 * @throws AuthorizationError if user cannot access the tenant
 * @returns The authenticated user with verified access
 */
export async function requireTenantAccess(
  ctx: QueryCtx,
  tenantId: Id<"tenants">
) {
  const user = await requireUser(ctx);

  // Admins can access any tenant
  if (user.role === "admin") {
    return user;
  }

  // Non-admins can only access their own tenant
  if (user.tenantId !== tenantId) {
    throw new AuthorizationError(
      "Access denied. You do not have permission to access this tenant."
    );
  }

  return user;
}

/**
 * Check if user owns a specific resource
 * @param ctx - The Convex query context
 * @param resourceOwnerId - The ID of the resource owner to check against
 * @throws AuthError if not authenticated
 * @throws AuthorizationError if user does not own the resource
 * @returns The authenticated user with verified ownership
 */
export async function requireOwnership(
  ctx: QueryCtx,
  resourceOwnerId: Id<"users">
) {
  const user = await requireUser(ctx);

  // Admins can access any resource
  if (user.role === "admin") {
    return user;
  }

  // Check if user owns the resource
  if (user._id !== resourceOwnerId) {
    throw new AuthorizationError(
      "Access denied. You do not have permission to access this resource."
    );
  }

  return user;
}

/**
 * Check if user can edit a product
 * (Admins or the seller who owns the product)
 * @param ctx - The Convex query context
 * @param product - The product object containing sellerId and tenantId
 * @throws AuthError if not authenticated
 * @throws AuthorizationError if user cannot edit the product
 * @returns The authenticated user with verified product access
 */
export async function requireProductAccess(
  ctx: QueryCtx,
  product: { sellerId: Id<"users">; tenantId: Id<"tenants"> }
) {
  const user = await requireUser(ctx);

  // Admins can edit any product
  if (user.role === "admin") {
    return user;
  }

  // Sellers can only edit their own products
  if (user.role === "seller" && user._id === product.sellerId) {
    return user;
  }

  throw new AuthorizationError(
    "Access denied. You do not have permission to modify this product."
  );
}

/**
 * Check if user can access a forum post
 * (Authors, admins, or users from the same tenant)
 * @param ctx - The Convex query context
 * @param post - The forum post object containing authorId and tenantId
 * @throws AuthError if not authenticated
 * @throws AuthorizationError if user cannot access the post
 * @returns The authenticated user with verified post access
 */
export async function requirePostAccess(
  ctx: QueryCtx,
  post: { authorId: Id<"users">; tenantId: Id<"tenants"> }
) {
  const user = await requireUser(ctx);

  // Admins can access any post
  if (user.role === "admin") {
    return user;
  }

  // Authors can access their own posts
  if (user._id === post.authorId) {
    return user;
  }

  // Users from the same tenant can read posts
  if (user.tenantId === post.tenantId) {
    return user;
  }

  throw new AuthorizationError(
    "Access denied. You do not have permission to access this post."
  );
}

/**
 * Helper function to check if a user is an admin
 * @param user - The user object to check (can be null)
 * @returns true if the user is an admin, false otherwise
 */
export function isAdmin(user: { role: string } | null): boolean {
  return user?.role === "admin";
}

/**
 * Helper function to check if a user is a seller
 * @param user - The user object to check (can be null)
 * @returns true if the user is a seller, false otherwise
 */
export function isSeller(user: { role: string } | null): boolean {
  return user?.role === "seller";
}

/**
 * Helper function to check if a user is a customer
 * @param user - The user object to check (can be null)
 * @returns true if the user is a customer, false otherwise
 */
export function isCustomer(user: { role: string } | null): boolean {
  return user?.role === "customer";
}
