# Architecture

This document describes the system architecture, design decisions, and structural organization of the Createconomy monorepo.

## Monorepo Structure

The project uses a pnpm workspace with Turborepo for build orchestration.

```
apps/
├── marketplace/    → createconomy.com      (port 3000)
├── forum/          → discuss.createconomy.com (port 3001)
├── admin/          → console.createconomy.com (port 3002)
└── seller/         → seller.createconomy.com (port 3003)

packages/
├── ui/             # Shadcn components
├── types/          # Shared TypeScript definitions
├── config/         # ESLint/TSConfig/base configs
├── utils/          # Validation, formatting, tenant detection
└── convex/         # Convex schema & backend functions
```

## Multi-Tenancy Model

All data is segregated by tenant. This architecture allows a single Convex deployment to serve multiple applications while maintaining complete data isolation.

### Tenant Detection

Tenant detection happens via `getTenantFromHostname()` in `packages/utils/src/tenant.ts`.

**Hostname Mapping:**
- `createconomy.com` → marketplace tenant
- `discuss.createconomy.com` → forum tenant
- `console.createconomy.com` → admin tenant
- `seller.createconomy.com` → seller tenant

### Custom Domain Support

Custom tenant domains are supported through `isValidCustomDomain()` in the same utility file. Use `getCanonicalUrl(domain, path)` for consistent URL generation across apps.

### Data Segregation

All Convex tables include a `tenantId` field. Queries must pass the tenant ID or use helper utilities to ensure data isolation.

## Application Architecture

All four applications follow the same architectural pattern:

### Technology Stack

- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS with CSS custom properties
- **Components**: Shadcn UI from `@createconomy/ui`
- **Backend**: Convex for database, auth, file storage, and server functions
- **TypeScript**: Strict mode with additional safety checks

### Component Architecture

Each app uses:
- `app/providers.tsx` - Wraps with `ConvexProvider`
- `app/layout.tsx` - Root layout with theme provider
- `app.css` - Global styles with CSS custom properties

### Theming System

CSS custom properties define the design system:
- `--background`, `--foreground` - Base colors
- `--primary`, `--secondary` - Action colors
- `--accent`, `--destructive` - Semantic colors
- `--border`, `--input`, `--ring` - Border and focus colors

Light/dark mode is handled via the `.dark` class on the document.

## Data Layer

### Convex Schema

The Convex backend defines 8 tables in `packages/convex/schema.ts`:
- `users` - User accounts and profiles
- `tenants` - Tenant configuration
- `products` - Product catalog
- `orders` - Order management
- `forumPosts` - Forum posts
- `forumComments` - Post comments
- `stripePrices` - Stripe pricing data (prepared)
- `sessions` - Session management

See `packages/convex/README.md` for the complete function reference.

### Client-Side Data Access

Components use `useQuery` and `useMutation` hooks from `convex/react`:
```tsx
import { useQuery, useMutation } from "convex/react";
import { api } from "@createconomy/convex/server";

const products = useQuery(api.products.getProducts, { status: "active" });
```

### Server-Side Data Access

Server Components use `fetchQuery` from `convex/nextjs`:
```tsx
import { fetchQuery } from "convex/nextjs";
import { api } from "@createconomy/convex/server";

const products = await fetchQuery(api.products.getProducts, { status: "active" });
```

## Shared Packages

### @createconomy/ui

Shadcn UI components shared across all apps. Import components like:
```tsx
import { Button, Card, Dialog } from "@createconomy/ui";
```

Uses the `cn()` utility for conditional class merging.

### @createconomy/types

Single source of truth for data shapes. Exported types include:
- `User`, `Tenant`, `Product`, `Order`, `Domain`
- Forum types: `ForumPost`, `ForumComment`
- Utility types for pagination and filtering

### @createconomy/utils

Common utilities organized by purpose:

**Validation** (`validation.ts`): Zod schemas for email, password, products, forum posts, pagination

**Formatting** (`format.ts`): Currency, numbers, dates, relative time, slugify

**Tenant** (`tenant.ts`): Tenant detection, custom domain validation, canonical URLs

**Logger** (`logger.ts`): Environment-aware logging (verbose in dev, errors only in prod)

**Errors** (`errors.ts`): Custom error classes (`ValidationError`, `NotFoundError`, `UnauthorizedError`, etc.)

### @createconomy/config

Shared configuration:
- Site configuration per app
- Feature flags
- Pagination defaults (20, max 100)
- File upload limits (10MB max, 5MB for images)

## Build System

### Turborepo

Turborepo orchestrates builds with dependency management. The `pipeline` in `turbo.json` defines:
- Build dependencies between packages
- Cache keys for incremental builds
- Parallel execution where possible

**Windows Note**: All apps use the `--webpack` flag due to a Turbopack Windows panic issue.

### Package Builds

Workspace packages use tsup for building:
- ESM output with TypeScript declarations
- Sourcemaps enabled
- External dependencies not bundled
- `workspace:*` protocol for inter-package dependencies

### Hot Module Reloading

When running `pnpm dev`, changes to workspace packages are hot-reloaded across all dependent apps.

## Deployment Model

### Applications

Each app deploys to a separate domain:
- `apps/marketplace` → createconomy.com
- `apps/forum` → discuss.createconomy.com
- `apps/admin` → console.createconomy.com
- `apps/seller` → seller.createconomy.com

### Backend

All apps share a single Convex deployment. The multi-tenancy model ensures data isolation through `tenantId`.

### Environment Variables

Required in `.env`:
- `NEXT_PUBLIC_CONVEX_URL` - Convex deployment URL
- `CONVEX_ADMIN_KEY` - Convex admin key
- `MARKETPLACE_URL`, `FORUM_URL`, `ADMIN_URL`, `SELLER_URL` - Local dev URLs
- Stripe keys (prepared but not yet implemented)

See `.env.example` for the complete list.

## Important Files

| File | Purpose |
|------|---------|
| `packages/convex/schema.ts` | Database schema definition |
| `packages/utils/src/tenant.ts` | Tenant detection and utilities |
| `packages/types/src/index.ts` | Shared type definitions |
| `apps/*/app/providers.tsx` | Convex provider setup |
| `.claude/settings.json` | Plugin configuration |
