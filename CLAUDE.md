# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a multi-domain e-commerce monorepo for a digital marketplace. It consists of 4 Next.js applications sharing a single Convex backend and workspace packages. Each app serves a different user role and is deployed to a separate domain.

## Monorepo Structure

```
apps/
├── marketplace/    → createconomy.com      (port 3000)
├── forum/          → discuss.createconomy.com (port 3001)
├── admin/          → console.createconomy.com (port 3002)
└── seller/         → seller.createconomy.com (port 3003)

packages/
├── ui/             # Shadcn components (Button, Card, Dialog, etc.)
├── types/          # Shared TypeScript definitions (Domain, User, Product, Order, etc.)
├── config/         # ESLint/TSConfig/base configs, site config
├── utils/          # Validation (Zod), formatting, tenant detection
└── convex/         # Convex schema & backend functions
```

## Common Commands

### Development

```bash
pnpm dev                 # Run all 4 apps simultaneously
pnpm --filter @createconomy/marketplace dev    # Run single app
pnpm --filter @createconomy/forum dev
pnpm --filter @createconomy/admin dev
pnpm --filter @createconomy/seller dev
```

### Convex Backend

**CRITICAL: Use ONLY Development Environment**

For ALL development and testing, use the Convex dev deployment. NEVER deploy to production during development.

```bash
# From packages/convex directory
npx convex dev           # Start dev server and sync functions (recommended)
npx convex dev --once    # Sync functions once without watching
npx convex dev --typecheck=disable  # Skip type checking during dev

# NEVER use these in development:
# npx convex deploy      # This deploys to PRODUCTION - DO NOT USE
```

**Dev vs Production:**
- Dev deployment: `mellow-scorpion-788` (set in CONVEX_DEPLOYMENT)
- Prod deployment: `festive-pika-658` (NEVER deploy during development)

The apps will automatically connect to the correct deployment based on `NEXT_PUBLIC_CONVEX_URL` environment variable.

### Build & Quality

```bash
pnpm build               # Build all packages in dependency order
pnpm test                # Run tests (Vitest - currently no tests exist)
pnpm lint                # ESLint all packages
pnpm type-check          # TypeScript check all packages
pnpm format              # Prettier format
pnpm clean               # Remove build artifacts
```

## Architecture

### Multi-Tenancy

All data is segregated by tenant. Tenant detection happens via `getTenantFromHostname()` in `packages/utils/src/tenant.ts`:

- `createconomy.com` → marketplace tenant
- `discuss.createconomy.com` → forum tenant
- `console.createconomy.com` → admin tenant
- `seller.createconomy.com` → seller tenant

All Convex tables have a `tenantId` field. When querying, pass the tenant ID or use the helper utilities.

### App Architecture

All apps follow the same structure:
- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS + Shadcn UI components from `@createconomy/ui`
- **Backend**: Convex (via `@createconomy/convex`)
- **Provider**: `app/providers.tsx` wraps with `ConvexProvider`
- **Types**: Import from `@createconomy/types`

### Convex Functions Usage

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

### Available Convex Functions

- **Users**: `getUsers`, `getUserById`, `getUserByEmail`, `createUser`, `updateUser`, `deleteUser`
- **Products**: `getProducts`, `getProductById`, `createProduct`, `updateProduct`, `deleteProduct`
- **Orders**: `getOrders`, `getOrderById`, `createOrder`, `updateOrderStatus`
- **Forum**: `getForumPosts`, `createForumPost`, `updateForumPost`, `deleteForumPost`, `incrementPostViews`, `togglePostLike`
- **Comments**: `getCommentsByPostId`, `createComment`, `updateComment`, `deleteComment`, `toggleCommentLike`
- **Admin**: `getStats`

Full list in `packages/convex/README.md`.

### Shared Packages

- **`@createconomy/ui`**: Import components like `import { Button } from "@createconomy/ui"`. Uses `cn()` utility for class merging.
- **`@createconomy/types`**: Single source of truth for data shapes. Import types like `User`, `Product`, `Order`, `Domain`.
- **`@createconomy/utils`**: Validation schemas (`validation.ts`), formatting (`format.ts`), tenant detection (`tenant.ts`).

## Code Style

- **TypeScript**: Strict mode enabled with additional checks (noUnusedLocals, noUncheckedIndexedAccess, etc.)
- **Prettier**: Single quotes, semicolons, 100 char print width, LF line endings
- **ESLint**: Extends `next/core-web-vitals`

## Environment Variables

Required in `.env` (see `.env.example`):
- `NEXT_PUBLIC_CONVEX_URL` - Convex deployment URL
- `CONVEX_ADMIN_KEY` - Convex admin key
- Stripe keys (prepared but not yet implemented)

## Package Dependencies

All apps depend on workspace packages using the `workspace:*` protocol. When modifying shared packages, the `pnpm dev` command will hot-reload changes across apps.

## Testing

Vitest is configured in `packages/utils` but no test files exist yet. Tests should be added before significant feature work.
