// Domain types for multitenancy
export type Domain = "marketplace" | "forum" | "admin" | "seller";

// User types
export interface User {
  _id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string;
  role: UserRole;
  tenantId?: string;
  createdAt: number;
  updatedAt: number;
}

export type UserRole = "customer" | "seller" | "admin";

// Tenant types for multitenancy
export interface Tenant {
  _id: string;
  name: string;
  slug: string;
  domain: Domain;
  stripeAccountId?: string;
  settings: TenantSettings;
  createdAt: number;
  updatedAt: number;
}

export interface TenantSettings {
  siteName: string;
  siteDescription: string;
  logoUrl?: string;
  faviconUrl?: string;
  primaryColor: string;
  secondaryColor: string;
  customDomain?: string;
}

// Marketplace types
export interface Product {
  _id: string;
  tenantId: string;
  sellerId: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  images: string[];
  category: string;
  tags: string[];
  stock: number;
  status: "draft" | "active" | "archived";
  metadata: Record<string, unknown>;
  createdAt: number;
  updatedAt: number;
}

export interface Order {
  _id: string;
  tenantId: string;
  customerId: string;
  items: OrderItem[];
  total: number;
  currency: string;
  status: OrderStatus;
  stripePaymentIntentId?: string;
  createdAt: number;
  updatedAt: number;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

// Forum types
export interface ForumPost {
  _id: string;
  tenantId: string;
  authorId: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  likes: number;
  views: number;
  pinned: boolean;
  locked: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface ForumComment {
  _id: string;
  postId: string;
  authorId: string;
  content: string;
  likes: number;
  parentId?: string;
  createdAt: number;
  updatedAt: number;
}

// Stripe types
export interface StripePrice {
  id: string;
  productId: string;
  priceId: string;
  amount: number;
  currency: string;
}

// Session types
export interface Session {
  _id: string;
  userId: string;
  expiresAt: number;
  ipAddress?: string;
  userAgent?: string;
}

// API response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

// Pagination types
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}
