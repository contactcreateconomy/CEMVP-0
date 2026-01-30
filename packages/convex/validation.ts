/**
 * Convex Validation Schemas
 *
 * Common validation schemas for Convex functions.
 * Provides type-safe unions for enum-like values.
 */

import { v } from "convex/values";

// ============================================
// USER ROLE VALIDATION
// ============================================

/**
 * Valid user roles in the system
 */
export const roleSchema = v.union([
  v.literal("customer"),
  v.literal("seller"),
  v.literal("admin"),
]);

export type UserRole = "customer" | "seller" | "admin";

// ============================================
// PRODUCT STATUS VALIDATION
// ============================================

/**
 * Valid product statuses
 */
export const productStatusSchema = v.union([
  v.literal("draft"),
  v.literal("active"),
  v.literal("archived"),
]);

export type ProductStatus = "draft" | "active" | "archived";

// ============================================
// ORDER STATUS VALIDATION
// ============================================

/**
 * Valid order statuses
 */
export const orderStatusSchema = v.union([
  v.literal("pending"),
  v.literal("processing"),
  v.literal("shipped"),
  v.literal("delivered"),
  v.literal("cancelled"),
  v.literal("refunded"),
]);

export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded";

// ============================================
// CURRENCY VALIDATION
// ============================================

/**
 * Supported currencies
 */
export const currencySchema = v.union([
  v.literal("USD"),
  v.literal("EUR"),
  v.literal("GBP"),
  v.literal("CAD"),
  v.literal("AUD"),
  v.literal("JPY"),
]);

export type Currency = "USD" | "EUR" | "GBP" | "CAD" | "AUD" | "JPY";

// ============================================
// FORUM POST CATEGORY VALIDATION
// ============================================

/**
 * Common forum post categories
 */
export const forumCategorySchema = v.union([
  v.literal("general"),
  v.literal("announcements"),
  v.literal("support"),
  v.literal("feature-requests"),
  v.literal("bugs"),
  v.literal("showcase"),
  v.literal("off-topic"),
]);

export type ForumCategory = "general" | "announcements" | "support" | "feature-requests" | "bugs" | "showcase" | "off-topic";

// ============================================
// DOMAIN/TENANT VALIDATION
// ============================================

/**
 * Valid tenant domains
 */
export const domainSchema = v.union([
  v.literal("marketplace"),
  v.literal("forum"),
  v.literal("admin"),
  v.literal("seller"),
]);

export type Domain = "marketplace" | "forum" | "admin" | "seller";

// ============================================
// PAGINATION VALIDATION
// ============================================

/**
 * Pagination parameters with validation
 */
export const paginationArgs = {
  page: v.optional(v.number()),
  limit: v.optional(v.number()),
};

export const paginationDefaults = {
  page: 1,
  limit: 20,
};

/**
 * Validate and sanitize pagination parameters
 */
export function sanitizePagination(params: {
  page?: number;
  limit?: number;
}): { page: number; limit: number } {
  const page = Math.max(1, Math.floor(params.page || paginationDefaults.page));
  const limit = Math.min(
    100,
    Math.max(1, Math.floor(params.limit || paginationDefaults.limit))
  );

  return { page, limit };
}

// ============================================
// EMAIL VALIDATION
// ============================================

/**
 * Email validation with regex pattern
 */
export const emailSchema = v.string();

/**
 * Validate email format (basic validation)
 * For production, consider using a more robust validator
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// ============================================
// PASSWORD VALIDATION
// ============================================

/**
 * Password strength requirements
 */
export const passwordSchema = v.string();

/**
 * Password validation requirements
 * - Minimum 8 characters
 * - At least one lowercase letter
 * - At least one uppercase letter
 * - At least one number
 * - At least one special character
 */
export function isValidPassword(password: string): boolean {
  if (password.length < 8) {
    return false;
  }

  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

  return hasLowercase && hasUppercase && hasNumber && hasSpecial;
}

/**
 * Get password strength score (0-4)
 */
export function getPasswordStrength(password: string): number {
  let strength = 0;

  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) strength++;

  return strength;
}

// ============================================
// AMOUNT/MONEY VALIDATION
// ============================================

/**
 * Positive amount validation (for prices, payments, etc.)
 */
export const positiveAmountSchema = v.number();

/**
 * Validate that an amount is positive and within reasonable bounds
 */
export function isValidAmount(amount: number): boolean {
  return amount > 0 && amount < 1000000 && Number.isFinite(amount);
}

/**
 * Validate stock quantity
 */
export function isValidStockQuantity(quantity: number): boolean {
  return Number.isInteger(quantity) && quantity >= 0 && quantity < 1000000;
}

// ============================================
// URL/SLUG VALIDATION
// ============================================

/**
 * URL validation
 */
export const urlSchema = v.string();

/**
 * Slug validation (for URLs, product identifiers, etc.)
 */
export const slugSchema = v.string();

/**
 * Validate slug format (lowercase alphanumeric with hyphens)
 */
export function isValidSlug(slug: string): boolean {
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugRegex.test(slug) && slug.length >= 2 && slug.length <= 100;
}

// ============================================
// PHONE VALIDATION
// ============================================

/**
 * Phone number validation (international format)
 */
export const phoneSchema = v.string();

/**
 * Basic phone number validation
 * Accepts formats like: +1234567890, +1 234 567 8901, (234) 567-8901
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
  const digitsOnly = phone.replace(/\D/g, "");
  return phoneRegex.test(phone) && digitsOnly.length >= 10 && digitsOnly.length <= 15;
}

// ============================================
// DATE VALIDATION
// ============================================

/**
 * Date range validation for searches/filters
 */
export const dateRangeSchema = v.object({
  from: v.optional(v.number()), // Unix timestamp
  to: v.optional(v.number()),   // Unix timestamp
});

/**
 * Validate date range
 */
export function isValidDateRange(range: { from?: number; to?: number }): boolean {
  const now = Date.now();

  if (range.from && range.to) {
    return range.from < range.to && range.to <= now;
  }

  if (range.from) {
    return range.from <= now;
  }

  if (range.to) {
    return range.to <= now;
  }

  return true;
}

// ============================================
// SEARCH QUERY VALIDATION
// ============================================

/**
 * Search query validation
 */
export const searchQuerySchema = v.string();

/**
 * Validate and sanitize search query
 */
export function sanitizeSearchQuery(query: string): string {
  return query.trim().slice(0, 200); // Max 200 characters
}

/**
 * Validate search query is not empty after sanitization
 */
export function isValidSearchQuery(query: string): boolean {
  const sanitized = sanitizeSearchQuery(query);
  return sanitized.length >= 2;
}
