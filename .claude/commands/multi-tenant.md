---
description: Multi-tenant setup and architecture guidance
---

You are working with multi-tenant architecture in Createconomy.

## Architecture Overview

This monorepo serves 4 applications from a single Convex deployment:

| App | Domain | Port | Tenant |
|-----|--------|------|--------|
| marketplace | createconomy.com | 3000 | marketplace |
| forum | discuss.createconomy.com | 3001 | forum |
| admin | console.createconomy.com | 3002 | admin |
| seller | seller.createconomy.com | 3003 | seller |

## Tenant Detection

Tenant detection happens automatically via `getTenantFromHostname()` in `packages/utils/src/tenant.ts`:

- `createconomy.com` → marketplace tenant
- `discuss.createconomy.com` → forum tenant
- `console.createconomy.com` → admin tenant
- `seller.createconomy.com` → seller tenant

## Custom Domain Support

Custom tenant domains are supported:

```tsx
import { isValidCustomDomain, getCanonicalUrl } from "@createconomy/utils";

// Validate custom domain
if (isValidCustomDomain(hostname)) {
  // Use canonical URL for consistent links
  const url = getCanonicalUrl(domain, path);
}
```

## Data Segregation

All Convex tables include a `tenantId` field. This ensures complete data isolation between applications.

### Query Pattern

```tsx
// Always filter by tenant
const products = useQuery(api.products.getProducts, {
  tenantId: currentTenant
});

// Never query without tenant filter
const products = useQuery(api.products.getProducts); // BAD
```

### Convex Schema

All 8 tables have `tenantId`:
- users
- tenants
- products
- orders
- forumPosts
- forumComments
- stripePrices
- sessions

## Common Patterns

### Get Current Tenant

```tsx
import { useQuery } from "convex/react";
import { api } from "@createconomy/convex/server";

const tenant = useQuery(api.tenants.getTenantByDomain, {
  domain: hostname
});
```

### Filter by Tenant

```tsx
import { useQuery } from "convex/react";
import { api } from "@createconomy/convex/server";

const products = useQuery(api.products.getProducts, {
  tenantId: tenant?._id
});
```

### Create with Tenant

```tsx
import { useMutation } from "convex/react";
import { api } from "@createconomy/convex/server";

const createProduct = useMutation(api.products.createProduct);

await createProduct({
  name: "Product Name",
  price: 100,
  tenantId: currentTenant // Always include tenantId
});
```

## Important Notes

- Never bypass tenant filtering
- All mutations must include `tenantId`
- Custom domains are validated via `isValidCustomDomain()`
- Use `getCanonicalUrl()` for cross-app links
