# Convex Best Practices for Createconomy

Project-specific Convex patterns, multi-tenancy design, schema conventions, and function development guidelines.

## Multi-Tenancy Architecture

### Tenant Detection

**All apps use hostname-based tenant detection** via `getTenantFromHostname()` in `packages/utils/src/tenant.ts`:

| Hostname | Domain | App |
|----------|--------|-----|
| `createconomy.com` | `marketplace` | apps/marketplace |
| `discuss.createconomy.com` | `forum` | apps/forum |
| `console.createconomy.com` | `admin` | apps/admin |
| `seller.createconomy.com` | `seller` | apps/seller |

### Data Segregation Rules

**CRITICAL**: All user data MUST be segregated by `tenantId`. Never return data across tenants.

```tsx
// ✅ GOOD: Always filter by tenantId
const products = useQuery(api.products.getProducts, { tenantId: currentTenant.id });

// ❌ BAD: Returns data from ALL tenants
const products = useQuery(api.products.getProducts);
```

### Tenant Context

Each request should resolve tenant context before any data access:

```tsx
// Server Component pattern
import { fetchQuery } from "convex/nextjs";
import { getTenantFromHostname } from "@createconomy/utils/tenant";
import { api } from "@createconomy/convex/server";

export default async function Page() {
  const domain = getTenantFromHostname(headers().get("host") ?? "");
  const tenant = await fetchQuery(api.tenants.getTenantByDomain, { domain });

  if (!tenant) return notFound();

  const products = await fetchQuery(api.products.getProducts, {
    tenantId: tenant._id,
  });
  // ...
}
```

## Schema Design Patterns

### Standard Field Patterns

All tables follow these conventions:

```typescript
// Standard timestamp pattern
export const exampleTable = defineTable({
  // ... fields
  createdAt: v.number(), // Unix timestamp in ms
  updatedAt: v.number(), // Unix timestamp in ms
})
  .index("by_tenant", ["tenantId"]); // Always index tenantId
```

### Index Strategy

| Index Pattern | When to Use |
|---------------|-------------|
| `by_tenant` | ALL tables - for data isolation |
| `by_email` | User lookups |
| `by_slug` | SEO-friendly URLs |
| `by_status` | Filtering by workflow state |
| `by_<foreign>` | Foreign key relationships |

### Schema File Organization

- **Location**: `packages/convex/schema.ts`
- **8 Tables**: users, tenants, products, orders, forumPosts, forumComments, stripePrices, sessions
- **Generated types**: `packages/convex/convex/_generated/` MUST be committed to git

## Function Conventions

### Query Patterns

**Always accept tenantId as a parameter**:

```typescript
// packages/convex/convex/products.ts
import { query } from "./_generated/server";
import { v } from "convex/values";

export const getProducts = query({
  args: {
    tenantId: v.id("tenants"),
    status: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    // Always filter by tenantId first
    const products = await ctx.db
      .query("products")
      .withIndex("by_tenant", (q) => q.eq("tenantId", args.tenantId))
      .filter((q) =>
        args.status ? q.eq(q.field("status"), args.status) : q
      )
      .take(args.limit ?? 50);

    return products;
  },
});
```

### Mutation Patterns

**Verify tenant ownership before mutations**:

```typescript
export const updateProduct = mutation({
  args: {
    productId: v.id("products"),
    tenantId: v.id("tenants"), // For ownership verification
    ...updateFields,
  },
  handler: async (ctx, args) => {
    const product = await ctx.db.get(args.productId);

    // Security: Verify tenant ownership
    if (!product || product.tenantId !== args.tenantId) {
      throw new Error("Product not found or access denied");
    }

    // Update allowed
    await ctx.db.patch(args.productId, { ...updateFields });
  },
});
```

### Naming Conventions

| Function Type | Pattern | Example |
|---------------|---------|---------|
| List items | `get<Plural>` | `getProducts`, `getUsers` |
| Single item | `<Resource>ById` | `getProductById`, `getUserById` |
| By unique field | `<Resource>By<Field>` | `getUserByEmail`, `getTenantBySlug` |
| Create | `create<Resource>` | `createProduct`, `createUser` |
| Update | `update<Resource>` | `updateProduct`, `updateUser` |
| Delete | `delete<Resource>` | `deleteProduct`, `deleteUser` |
| Toggle state | `toggle<Property>` | `togglePostLike`, `toggleCommentLike` |
| Increment | `increment<Property>` | `incrementPostViews` |

## File Organization

### Convex Package Structure

```
packages/convex/
├── schema.ts           # Database schema (8 tables)
├── server.ts           # Function exports
├── client.ts           # React client utilities
├── convex.config.ts    # Convex configuration
└── convex/
    ├── _generated/     # Auto-generated types (COMMIT TO GIT)
    ├── users.ts        # User functions
    ├── tenants.ts      # Tenant functions
    ├── products.ts     # Product functions
    ├── orders.ts       # Order functions
    ├── forumPosts.ts   # Forum post functions
    ├── forumComments.ts # Comment functions
    └── admin.ts        # Admin/stats functions
```

## Development Workflow

### Commands

| Command | Purpose |
|---------|---------|
| `pnpm convex:dev` | Start Convex dev server (separate terminal) |
| `pnpm convex:deploy` | Deploy schema and functions to production |
| `pnpm convex:typecheck` | Verify Convex types are valid |

### Schema Changes

1. Edit `packages/convex/schema.ts`
2. Dev server auto-regenerates types
3. Run `pnpm convex:typecheck` to verify
4. Commit `convex/_generated/` to git

### Adding Functions

1. Create/edit file in `packages/convex/convex/`
2. Export from `server.ts`
3. Functions auto-reload in dev
4. Test before deploying

## Usage Patterns

### Client-Side (React Components)

```tsx
import { useQuery, useMutation } from "convex/react";
import { api } from "@createconomy/convex/server";

function ProductList() {
  const products = useQuery(api.products.getProducts, {
    tenantId: currentTenant.id,
    status: "active"
  });
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
  const products = await fetchQuery(api.products.getProducts, {
    tenantId: tenant._id,
    status: "active"
  });
  return <div>{/* render products */}</div>;
}
```

## Best Practices Summary

### Security

- Never expose `CONVEX_ADMIN_KEY` to client code
- Validate all inputs in mutations using `v.<type>()`
- Verify `tenantId` ownership before allowing mutations
- Use Convex auth for user authentication

### Performance

- Use indexes for frequently queried fields
- Paginate large result sets with `limit` parameter
- Prefer `fetchQuery` in Server Components when possible
- Avoid N+1 queries by batching relationship lookups

### Testing

- Test functions in dev before deploying to production
- Use the Convex dashboard to inspect data and run functions
- Verify tenant isolation in all queries/mutations

## Resources

- **Docs**: `docs/convex-backend.md`
- **Schema**: `packages/convex/schema.ts`
- **Functions**: `packages/convex/README.md`
- **Tenant utils**: `packages/utils/src/tenant.ts`
- **Official**: https://docs.convex.dev
