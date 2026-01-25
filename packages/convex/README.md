# @createconomy/convex

Shared Convex backend functions and schema for the Createconomy monorepo.

## Structure

```
packages/convex/
├── schema.ts           # Database schema definitions
├── server.ts           # Backend functions (queries, mutations)
├── client.ts           # Shared React client utilities
├── convex.config.ts    # Convex configuration
└── _generated/         # Auto-generated types
```

## Available Functions

### Users
- `getUsers` - List all users (optionally filtered by tenant)
- `getUserById` - Get a user by ID
- `getUserByEmail` - Get a user by email
- `createUser` - Create a new user
- `updateUser` - Update user details
- `deleteUser` - Delete a user

### Tenants
- `getTenants` - List all tenants
- `getTenantBySlug` - Get tenant by slug
- `getTenantByDomain` - Get tenant by domain
- `createTenant` - Create a new tenant
- `updateTenant` - Update tenant details

### Products
- `getProducts` - List products (with filters)
- `getProductById` - Get product by ID
- `createProduct` - Create a new product
- `updateProduct` - Update product details
- `deleteProduct` - Delete a product

### Orders
- `getOrders` - List orders (with filters)
- `getOrderById` - Get order by ID
- `createOrder` - Create a new order
- `updateOrderStatus` - Update order status

### Forum Posts
- `getForumPosts` - List forum posts (with filters)
- `getForumPostById` - Get post by ID
- `createForumPost` - Create a new post
- `updateForumPost` - Update post details
- `deleteForumPost` - Delete a post
- `incrementPostViews` - Increment post view count
- `togglePostLike` - Toggle like on post

### Forum Comments
- `getCommentsByPostId` - Get comments for a post
- `createComment` - Create a new comment
- `updateComment` - Update comment
- `deleteComment` - Delete comment
- `toggleCommentLike` - Toggle like on comment

### Admin
- `getStats` - Get platform statistics

## Usage in Apps

### Client-side (React Components)

```tsx
import { useQuery, useMutation } from "convex/react";
import { api } from "@createconomy/convex/server";

function MyComponent() {
  const products = useQuery(api.products.getProducts, { status: "active" });
  const createProduct = useMutation(api.products.createProduct);

  return (
    <div>
      {products?.map((product) => (
        <div key={product._id}>{product.name}</div>
      ))}
    </div>
  );
}
```

### Server-side (Next.js Server Components)

```tsx
import { preloadedQuery, fetchQuery } from "convex/nextjs";
import { api } from "@createconomy/convex/server";

export default async function Page() {
  const products = await fetchQuery(api.products.getProducts, {
    status: "active",
  });

  return (
    <div>
      {products.map((product) => (
        <div key={product._id}>{product.name}</div>
      ))}
    </div>
  );
}
```

## Development

### Start Convex Dev Server

```bash
pnpm convex:dev
```

This will start the Convex development server and watch for changes.

### Deploy to Production

```bash
pnpm convex:deploy
```

### Type Checking

```bash
pnpm convex:typecheck
```

## Environment Variables

Copy `.env.example` to your app root and configure:

```bash
NEXT_PUBLIC_CONVEX_URL=your-convex-deployment-url
CONVEX_ADMIN_KEY=your-convex-admin-key
```
