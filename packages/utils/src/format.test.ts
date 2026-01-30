/**
 * TDD: Format Utility Tests
 *
 * Tests for formatting utilities.
 */

import { describe, it, expect } from "vitest";
import {
  formatCurrency,
  formatNumber,
  formatDate,
  formatRelativeTime,
  slugify,
} from "./format";

describe("Currency Formatting", () => {
  it("should format USD currency correctly", () => {
    expect(formatCurrency(1234.56, "USD")).toBe("$1,234.56");
  });

  it("should format EUR currency correctly", () => {
    expect(formatCurrency(1234.56, "EUR")).toBe("€1,234.56");
  });

  it("should format GBP currency correctly", () => {
    expect(formatCurrency(1234.56, "GBP")).toBe("£1,234.56");
  });

  it("should handle zero values", () => {
    expect(formatCurrency(0, "USD")).toBe("$0.00");
  });

  it("should handle negative values", () => {
    expect(formatCurrency(-100, "USD")).toBe("-$100.00");
  });

  it("should round to 2 decimal places", () => {
    expect(formatCurrency(99.999, "USD")).toBe("$100.00");
  });
});

describe("Number Formatting", () => {
  it("should format numbers with commas", () => {
    expect(formatNumber(1000000)).toBe("1,000,000");
  });

  it("should handle decimal places", () => {
    // formatNumber uses Intl.NumberFormat which handles decimals automatically
    expect(formatNumber(1234.5678)).toBe("1,234.568");
  });

  it("should handle zero", () => {
    expect(formatNumber(0)).toBe("0");
  });

  it("should format negative numbers", () => {
    expect(formatNumber(-5000)).toBe("-5,000");
  });
});

describe("Date Formatting", () => {
  it("should format dates with default locale", () => {
    const date = new Date("2024-01-15T10:30:00Z");
    const result = formatDate(date);
    expect(result).toContain("January");
    expect(result).toContain("15");
    expect(result).toContain("2024");
  });

  it("should format dates with custom locale", () => {
    const date = new Date("2024-01-15T10:30:00Z");
    const result = formatDate(date, "en-GB");
    expect(result).toBeDefined();
  });
});

describe("Relative Time Formatting", () => {
  it("should show 'just now' for recent timestamps", () => {
    const now = Date.now();
    expect(formatRelativeTime(now)).toBe("just now");
  });

  it("should show minutes for recent timestamps", () => {
    const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
    expect(formatRelativeTime(fiveMinutesAgo)).toBe("5 minutes ago");
  });

  it("should show hours for older timestamps", () => {
    const twoHoursAgo = Date.now() - 2 * 60 * 60 * 1000;
    expect(formatRelativeTime(twoHoursAgo)).toBe("2 hours ago");
  });

  it("should show days for older timestamps", () => {
    const threeDaysAgo = Date.now() - 3 * 24 * 60 * 60 * 1000;
    expect(formatRelativeTime(threeDaysAgo)).toBe("3 days ago");
  });
});

describe("Slugify", () => {
  it("should convert spaces to hyphens", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });

  it("should remove special characters", () => {
    expect(slugify("Hello, World!")).toBe("hello-world");
  });

  it("should convert to lowercase", () => {
    expect(slugify("HELLO WORLD")).toBe("hello-world");
  });

  it("should handle multiple spaces", () => {
    expect(slugify("Hello    World")).toBe("hello-world");
  });

  it("should handle empty strings", () => {
    expect(slugify("")).toBe("");
  });

  it("should handle leading/trailing spaces", () => {
    expect(slugify("  Hello World  ")).toBe("hello-world");
  });
});
