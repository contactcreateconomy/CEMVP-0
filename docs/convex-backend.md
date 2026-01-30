# Convex Backend

This document covers Convex development patterns, available functions, and best practices specific to this project.

## Schema

The Convex schema is defined in `packages/convex/schema.ts` with 8 tables:

| Table | Purpose | Key Fields |
|-------|---------|------------|
| `users` | User accounts | `email`, `name`, `role`, `tenantId` |
| `tenants` | Tenant configuration | `slug`, `domain`, `name` |
| `products` | Product catalog | `slug`, `name`, `price`, `status`, `tenantId` |
| `orders` | Order management | `userId`, `status`, `total`, `tenantId` |
| `forumPosts` | Forum posts | `slug`, `title`, `authorId`, `views`, `likes` |
| `forumComments` | Post comments | `postId`, `authorId`, `likes` |
| `stripePrices` | Stripe pricing (prepared) | `priceId`, `productId`, `amount` |
| `sessions` | Session management | `userId`, `expiresAt` |

**All tables include `tenantId` for multi-tenancy data segregation.**

## Using Convex Functions

### Client-Side (React Components)

```tsx
import { useQuery, useMutation } from "convex/react";
import { api } from "@createconomy/convex/server";

function ProductList() {
  const products = useQuery(api.products.getProducts, { status: "active" });
  const createProduct = useMutation(api.products.createProduct);

  if (!products) return <div>Loading...</div>;
  return <div>{/* render products */}</div>;
}
```

### Server-Side (Server Components)

```tsx
import { fetchQuery } from "convex/nextjs";
import { api } from "@createconomy/convex/server";

export default async function Page() {
  const products = await fetchQuery(api.products.getProducts, { status: "active" });
  return <div>{/* render products */}</div>;
}
```

## Available Functions

See `packages/convex/README.md` for the complete function reference with parameters and return types.

### Users

- `getUsers` - List users with filtering
- `getUserById` - Get user by ID
- `getUserByEmail` - Get user by email
- `createUser` - Create new user
- `updateUser` - Update user profile
- `deleteUser` - Delete user

### Tenants

- `getTenants` - List tenants
- `getTenantBySlug` - Get tenant by slug
- `getTenantByDomain` - Get tenant by domain
- `createTenant` - Create tenant
- `updateTenant` - Update tenant config

### Products

- `getProducts` - List products with filtering
- `getProductById` - Get product by ID
- `createProduct` - Create product
- `updateProduct` - Update product
- `deleteProduct` - Delete product

### Orders

- `getOrders` - List orders with filtering
- `getOrderById` - Get order by ID
- `createOrder` - Create order
- `updateOrderStatus` - Update order status

### Forum

- `getForumPosts` - List forum posts
- `createForumPost` - Create forum post
- `updateForumPost` - Update forum post
- `deleteForumPost` - Delete forum post
- `incrementPostViews` - Increment view count
- `togglePostLike` - Toggle like status

### Comments

- `getCommentsByPostId` - Get comments for a post
- `createComment` - Create comment
- `updateComment` - Update comment
- `deleteComment` - Delete comment
- `toggleCommentLike` - Toggle like status

### Admin

- `getStats` - Get platform statistics (userCount, productCount, orderCount, postCount, revenue)

## Development Workflow

### Start Convex Dev Server

```bash
pnpm convex:dev
```

Keep this running in a separate terminal during development.

### Make Schema Changes

1. Edit `packages/convex/schema.ts`
2. The dev server will automatically regenerate types
3. Run `pnpm convex:typecheck` to verify

### Add/Modify Functions

1. Edit files in `packages/convex/convex/`
2. Functions are automatically reloaded
3. Use the `/convex-development` skill for guidance

### Deploy to Production

```bash
pnpm convex:deploy
```

This deploys schema and functions to your Convex deployment.

## Best Practices

### Multi-Tenancy

Always include `tenantId` in queries and mutations:
```tsx
// Good: Uses tenantId for data isolation
useQuery(api.products.getProducts, { tenantId: currentTenant });

// Bad: Returns data from all tenants
useQuery(api.products.getProducts);
```

### Error Handling

Use Convex's built-in error handling:
```tsx
const result = await mutation({ id: productId });
if (result.error) {
  // Handle error
}
```

### Performance

- Use indexes for frequently queried fields
- Paginate large result sets
- Use `fetchQuery` in Server Components when possible
- Avoid N+1 queries by using relationships

### Security

- Never expose admin keys to client code
- Validate all inputs in mutations
- Use Convex's auth system for user authentication
- Check tenantId ownership before allowing mutations

## When to Use /convex-development Skill

Invoke the `/convex-development` skill when:

- **Writing schema** - Designing new tables or modifying existing ones
- **Creating functions** - Writing queries, mutations, or actions
- **Implementing auth** - Setting up authentication or authorization
- **File storage** - Using Convex file storage
- **Debugging** - Troubleshooting Convex functions
- **Optimizing** - Improving query performance or reducing costs
- **Migrations** - Managing schema changes

## Important Notes

- The `packages/convex/convex/_generated/` directory **MUST be committed to git** for type-checking and CI/CD
- After schema changes, restart the dev server to regenerate types
- Use `fetchQuery` in Server Components for better performance
- Always test functions in dev before deploying to production

## Resources

- **Official Docs**: https://docs.convex.dev
- **Function Reference**: `packages/convex/README.md`
- **Schema Location**: `packages/convex/schema.ts`
- **Tenant Utilities**: `packages/utils/src/tenant.ts`
