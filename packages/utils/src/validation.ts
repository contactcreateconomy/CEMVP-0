import { z } from "zod";

// Email validation
export const emailSchema = z.string().email("Invalid email address");

// Password validation (min 8 chars, 1 uppercase, 1 lowercase, 1 number)
export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number");

// URL validation
export const urlSchema = z.string().url("Invalid URL");

// Product validation schemas
export const productSchema = z.object({
  name: z.string().min(1, "Product name is required").max(200, "Product name too long"),
  description: z.string().min(10, "Description too short").max(5000, "Description too long"),
  price: z.number().positive("Price must be positive"),
  currency: z.string().length(3, "Invalid currency code"),
  images: z.array(z.string().url("Invalid image URL")).min(1, "At least one image required"),
  category: z.string().min(1, "Category is required"),
  tags: z.array(z.string()).default([]),
  stock: z.number().int().min(0, "Stock cannot be negative"),
});

// Forum post validation schemas
export const forumPostSchema = z.object({
  title: z.string().min(5, "Title too short").max(200, "Title too long"),
  content: z.string().min(20, "Content too short").max(10000, "Content too long"),
  category: z.string().min(1, "Category is required"),
  tags: z.array(z.string()).max(10, "Too many tags").default([]),
});

// Comment validation schema
export const commentSchema = z.object({
  content: z.string().min(1, "Comment cannot be empty").max(5000, "Comment too long"),
});

// Pagination validation
export const paginationSchema = z.object({
  page: z.number().int().positive().default(1),
  pageSize: z.number().int().positive().max(100).default(20),
});

// Export validation helpers
export const validateEmail = (email: string) => emailSchema.safeParse(email);
export const validatePassword = (password: string) => passwordSchema.safeParse(password);
export const validateUrl = (url: string) => urlSchema.safeParse(url);
