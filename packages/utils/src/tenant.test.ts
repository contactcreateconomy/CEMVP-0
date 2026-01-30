/**
 * TDD: Tenant Utility Tests
 *
 * Tests for tenant detection and multi-tenancy utilities.
 */

import { describe, it, expect } from "vitest";
import {
  getTenantFromHostname,
  isValidCustomDomain,
  getCanonicalUrl,
} from "./tenant";

describe("getTenantFromHostname", () => {
  it("should return 'marketplace' for createconomy.com", () => {
    expect(getTenantFromHostname("createconomy.com")).toBe("marketplace");
  });

  it("should return 'marketplace' for www.createconomy.com", () => {
    expect(getTenantFromHostname("www.createconomy.com")).toBe("marketplace");
  });

  it("should return 'forum' for discuss.createconomy.com", () => {
    expect(getTenantFromHostname("discuss.createconomy.com")).toBe("forum");
  });

  it("should return 'admin' for console.createconomy.com", () => {
    expect(getTenantFromHostname("console.createconomy.com")).toBe("admin");
  });

  it("should return 'seller' for seller.createconomy.com", () => {
    expect(getTenantFromHostname("seller.createconomy.com")).toBe("seller");
  });

  it("should handle ports in hostname", () => {
    expect(getTenantFromHostname("createconomy.com:3000")).toBe("marketplace");
    expect(getTenantFromHostname("discuss.createconomy.com:3001")).toBe("forum");
  });

  it("should default to marketplace for unknown domains", () => {
    expect(getTenantFromHostname("unknown.com")).toBe("marketplace");
  });

  it("should default to marketplace for localhost", () => {
    expect(getTenantFromHostname("localhost:3000")).toBe("marketplace");
  });
});

describe("isValidCustomDomain", () => {
  it("should return true for valid custom domains", () => {
    expect(isValidCustomDomain("mystore.com")).toBe(true);
    expect(isValidCustomDomain("shop.mybrand.com")).toBe(true);
  });

  it("should return false for localhost", () => {
    expect(isValidCustomDomain("localhost")).toBe(false);
    expect(isValidCustomDomain("localhost:3000")).toBe(false);
  });

  it("should return false for .local domains", () => {
    expect(isValidCustomDomain("mystore.local")).toBe(false);
  });

  it("should return false for createconomy.com subdomains", () => {
    expect(isValidCustomDomain("createconomy.com")).toBe(false);
    expect(isValidCustomDomain("discuss.createconomy.com")).toBe(false);
    expect(isValidCustomDomain("console.createconomy.com")).toBe(false);
    expect(isValidCustomDomain("seller.createconomy.com")).toBe(false);
  });
});

describe("getCanonicalUrl", () => {
  it("should return correct URL for marketplace", () => {
    expect(getCanonicalUrl("marketplace", "/products")).toBe(
      "https://createconomy.com/products"
    );
  });

  it("should return correct URL for forum", () => {
    expect(getCanonicalUrl("forum", "/posts/123")).toBe(
      "https://discuss.createconomy.com/posts/123"
    );
  });

  it("should return correct URL for admin", () => {
    expect(getCanonicalUrl("admin", "/dashboard")).toBe(
      "https://console.createconomy.com/dashboard"
    );
  });

  it("should return correct URL for seller", () => {
    expect(getCanonicalUrl("seller", "/products/new")).toBe(
      "https://seller.createconomy.com/products/new"
    );
  });

  it("should handle empty path", () => {
    expect(getCanonicalUrl("marketplace")).toBe("https://createconomy.com");
  });

  it("should handle root path", () => {
    expect(getCanonicalUrl("forum", "/")).toBe("https://discuss.createconomy.com");
  });
});
