/**
 * TDD: Validation Tests
 *
 * Tests for validation utilities using Zod schemas.
 */

import { describe, it, expect } from "vitest";
import {
  emailSchema,
  passwordSchema,
  productSchema,
  forumPostSchema,
  paginationSchema,
} from "./validation";

describe("Email Validation", () => {
  it("should accept valid email addresses", () => {
    const validEmails = [
      "test@example.com",
      "user.name@example.com",
      "user+tag@example.co.uk",
    ];

    validEmails.forEach((email) => {
      const result = emailSchema.safeParse(email);
      expect(result.success).toBe(true);
    });
  });

  it("should reject invalid email addresses", () => {
    const invalidEmails = [
      "",
      "invalid",
      "@example.com",
      "user@",
      "user @example.com",
    ];

    invalidEmails.forEach((email) => {
      const result = emailSchema.safeParse(email);
      expect(result.success).toBe(false);
    });
  });

  it("should reject null or undefined", () => {
    expect(emailSchema.safeParse(null).success).toBe(false);
    expect(emailSchema.safeParse(undefined).success).toBe(false);
  });
});

describe("Password Validation", () => {
  it("should accept strong passwords", () => {
    const strongPasswords = [
      "SecurePass123!",
      "MyP@ssw0rd",
      "Str0ng!Pass",
    ];

    strongPasswords.forEach((password) => {
      const result = passwordSchema.safeParse(password);
      expect(result.success).toBe(true);
    });
  });

  it("should reject weak passwords", () => {
    const weakPasswords = [
      "",
      "weak",
      "password",
      "12345678",
      "nocapitals123!",
      "NOLOWERS123!",
      "NoNumbers!",
      "NoSymbols123",
    ];

    weakPasswords.forEach((password) => {
      const result = passwordSchema.safeParse(password);
      expect(result.success).toBe(false);
    });
  });

  it("should require minimum length of 8 characters", () => {
    const result = passwordSchema.safeParse("Short1!");
    expect(result.success).toBe(false);
  });
});

describe("Product Validation", () => {
  it("should accept valid product data", () => {
    const validProduct = {
      name: "Digital Product",
      description: "A great digital product",
      price: 29.99,
      currency: "USD",
      images: ["image1.jpg", "image2.jpg"],
      category: "templates",
      tags: ["design", "web"],
      stock: 100,
      status: "active",
    };

    const result = productSchema.safeParse(validProduct);
    expect(result.success).toBe(true);
  });

  it("should reject products with invalid prices", () => {
    const invalidProduct = {
      name: "Product",
      description: "Description",
      price: -10,
      currency: "USD",
      images: [],
      category: "templates",
      tags: [],
      stock: 0,
      status: "active",
    };

    const result = productSchema.safeParse(invalidProduct);
    expect(result.success).toBe(false);
  });

  it("should reject empty product names", () => {
    const invalidProduct = {
      name: "",
      description: "Description",
      price: 10,
      currency: "USD",
      images: [],
      category: "templates",
      tags: [],
      stock: 0,
      status: "active",
    };

    const result = productSchema.safeParse(invalidProduct);
    expect(result.success).toBe(false);
  });
});

describe("Forum Post Validation", () => {
  it("should accept valid forum posts", () => {
    const validPost = {
      title: "Welcome to the forum",
      content: "This is a great community!",
      category: "general",
      tags: ["welcome", "introduction"],
    };

    const result = forumPostSchema.safeParse(validPost);
    expect(result.success).toBe(true);
  });

  it("should reject posts with empty titles", () => {
    const invalidPost = {
      title: "",
      content: "Content here",
      category: "general",
      tags: [],
    };

    const result = forumPostSchema.safeParse(invalidPost);
    expect(result.success).toBe(false);
  });

  it("should reject posts with empty content", () => {
    const invalidPost = {
      title: "Title",
      content: "",
      category: "general",
      tags: [],
    };

    const result = forumPostSchema.safeParse(invalidPost);
    expect(result.success).toBe(false);
  });
});

describe("Pagination Validation", () => {
  it("should accept valid pagination params", () => {
    const validPagination = {
      page: 1,
      limit: 20,
    };

    const result = paginationSchema.safeParse(validPagination);
    expect(result.success).toBe(true);
  });

  it("should use default values when not provided", () => {
    const result = paginationSchema.safeParse({});
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.page).toBe(1);
      expect(result.data.pageSize).toBe(20);
    }
  });

  it("should reject negative page numbers", () => {
    const invalidPagination = {
      page: -1,
      limit: 20,
    };

    const result = paginationSchema.safeParse(invalidPagination);
    expect(result.success).toBe(false);
  });

  it("should enforce maximum limit of 100", () => {
    const invalidPagination = {
      page: 1,
      limit: 101,
    };

    const result = paginationSchema.safeParse(invalidPagination);
    expect(result.success).toBe(false);
  });
});
