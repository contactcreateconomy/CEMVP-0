// Convex schema types

export type User = {
  _id: string;
  tenantId: string;
  email: string;
  name: string;
  role: 'customer' | 'seller' | 'admin';
  avatarUrl?: string;
  createdAt: number;
  updatedAt: number;
  emailVerified?: boolean;
};

export type Session = {
  _id: string;
  tenantId: string;
  userId: string;
  token: string;
  expiresAt: number;
  createdAt: number;
  lastAccessedAt: number;
};

export type Tenant = {
  _id: string;
  slug: string;
  name: string;
  createdAt: number;
  updatedAt: number;
};
