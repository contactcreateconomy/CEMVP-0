export type Domain = "marketplace" | "forum" | "admin" | "seller";

/**
 * Get the tenant/domain from the current hostname
 */
export function getTenantFromHostname(hostname: string): Domain {
  // Remove port if present
  const cleanHostname = hostname.split(":")[0] || hostname;

  // Check for subdomains
  const subdomainParts = cleanHostname.split(".");

  // discuss.createconomy.com -> forum
  if (subdomainParts[0] === "discuss") return "forum";
  // console.createconomy.com -> admin
  if (subdomainParts[0] === "console") return "admin";
  // seller.createconomy.com -> seller
  if (subdomainParts[0] === "seller") return "seller";

  // createconomy.com -> marketplace
  const len = subdomainParts.length;
  if (len >= 2 && subdomainParts[len - 2] === "createconomy" && subdomainParts[len - 1] === "com") {
    return "marketplace";
  }

  // Default to marketplace for unknown domains
  return "marketplace";
}

/**
 * Check if a hostname is a valid custom domain
 */
export function isValidCustomDomain(hostname: string): boolean {
  // Exclude development domains
  if (hostname.includes("localhost") || hostname.includes(".local")) {
    return false;
  }

  // Exclude createconomy.com subdomains (these are primary domains)
  const parts = hostname.split(".");
  const len = parts.length;
  const isCreateconomySubdomain =
    len >= 2 && parts[len - 2] === "createconomy" && parts[len - 1] === "com";
  if (isCreateconomySubdomain) {
    return false;
  }

  return true;
}

/**
 * Get the canonical URL for a given tenant
 */
export function getCanonicalUrl(domain: Domain, path: string = ""): string {
  const domainMap: Record<Domain, string> = {
    marketplace: "https://createconomy.com",
    forum: "https://discuss.createconomy.com",
    admin: "https://console.createconomy.com",
    seller: "https://seller.createconomy.com",
  };

  const baseUrl = domainMap[domain];
  return `${baseUrl}${path}`;
}
