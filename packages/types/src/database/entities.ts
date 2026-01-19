// Database entity types

export interface Product {
  tenantId: string;
  name: string;
  description?: string;
  price: number;
  sellerId: string;
  createdAt: number;
  updatedAt: number;
}

export interface Order {
  tenantId: string;
  customerId: string;
  productId: string;
  status: 'pending' | 'paid' | 'completed' | 'cancelled';
  amount: number;
  createdAt: number;
  updatedAt: number;
}

export interface ForumPost {
  tenantId: string;
  authorId: string;
  title: string;
  content: string;
  createdAt: number;
  updatedAt: number;
}

export interface ForumComment {
  tenantId: string;
  postId: string;
  authorId: string;
  content: string;
  createdAt: number;
  updatedAt: number;
}
