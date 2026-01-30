---
description: Work with Convex backend in this monorepo
---

You are working with the Convex backend for Createconomy.

## Key Context

- **Schema location**: `packages/convex/schema.ts` (8 tables with tenantId)
- **Functions reference**: `packages/convex/README.md`
- **Tenant utilities**: `packages/utils/src/tenant.ts`

## Important: Multi-Tenancy

All Convex tables have a `tenantId` field. Always include tenant filtering:

```tsx
// Good: Uses tenantId for data isolation
useQuery(api.products.getProducts, { tenantId: currentTenant });

// Bad: Returns data from all tenants
useQuery(api.products.getProducts);
```

## Common Commands

```bash
# Start Convex dev server (run in separate terminal)
pnpm convex:dev

# Deploy to production
pnpm convex:deploy

# Type check schema
pnpm convex:typecheck
```

## Available Functions

- **Users**: getUsers, getUserById, getUserByEmail, createUser, updateUser, deleteUser
- **Tenants**: getTenants, getTenantBySlug, getTenantByDomain, createTenant, updateTenant
- **Products**: getProducts, getProductById, createProduct, updateProduct, deleteProduct
- **Orders**: getOrders, getOrderById, createOrder, updateOrderStatus
- **Forum**: getForumPosts, createForumPost, updateForumPost, deleteForumPost, incrementPostViews, togglePostLike
- **Comments**: getCommentsByPostId, createComment, updateComment, deleteComment, toggleCommentLike
- **Admin**: getStats - Returns platform statistics

## Usage Patterns

**Client-side (React components):**
```tsx
import { useQuery, useMutation } from "convex/react";
import { api } from "@createconomy/convex/server";

const products = useQuery(api.products.getProducts, { status: "active" });
```

**Server-side (Server Components):**
```tsx
import { fetchQuery } from "convex/nextjs";
import { api } from "@createconomy/convex/server";

const products = await fetchQuery(api.products.getProducts, { status: "active" });
```

## Best Practices

1. Always include `tenantId` in queries and mutations
2. Use `fetchQuery` in Server Components for better performance
3. After schema changes, restart the dev server to regenerate types
4. The `packages/convex/convex/_generated/` directory MUST be committed to git
