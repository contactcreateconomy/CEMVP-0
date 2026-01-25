// Site configuration
export const sites = {
  marketplace: {
    name: "Createconomy",
    domain: "createconomy.com",
    description: "Digital marketplace for creators",
  },
  forum: {
    name: "Createconomy Forum",
    domain: "discuss.createconomy.com",
    description: "Community discussions",
  },
  admin: {
    name: "Createconomy Admin",
    domain: "console.createconomy.com",
    description: "Admin console",
  },
  seller: {
    name: "Createconomy Seller Portal",
    domain: "seller.createconomy.com",
    description: "Seller dashboard",
  },
} as const;

export type Site = keyof typeof sites;

// Feature flags
export const features = {
  marketplace: {
    products: true,
    cart: true,
    checkout: true,
    reviews: true,
  },
  forum: {
    posts: true,
    comments: true,
    likes: true,
    categories: true,
  },
  admin: {
    analytics: true,
    users: true,
    products: true,
    orders: true,
  },
  seller: {
    products: true,
    orders: true,
    analytics: true,
    payouts: true,
  },
} as const;

// Currency configuration
export const currencies = {
  USD: { symbol: "$", decimals: 2 },
  EUR: { symbol: "€", decimals: 2 },
  GBP: { symbol: "£", decimals: 2 },
} as const;

export type Currency = keyof typeof currencies;

// Pagination defaults
export const pagination = {
  defaultPageSize: 20,
  maxPageSize: 100,
} as const;

// File upload limits
export const upload = {
  maxFileSize: 10 * 1024 * 1024, // 10MB
  allowedImageTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
  maxImageSize: 5 * 1024 * 1024, // 5MB
} as const;
