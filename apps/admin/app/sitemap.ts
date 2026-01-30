import { MetadataRoute } from "next";

/**
 * Sitemap for Admin Console
 * https://console.createconomy.com
 *
 * Note: Admin console typically doesn't need a sitemap as it's
 * protected and not meant for public indexing.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  // Return empty array for admin console
  return [];
}
