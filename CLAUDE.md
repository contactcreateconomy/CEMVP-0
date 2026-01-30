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

```bash
pnpm convex:dev          # Start Convex dev server (run in separate terminal)
pnpm convex:deploy       # Deploy to Convex production
pnpm convex:typecheck    # Type check Convex schema
```

**Available Skill:** Use `/convex-development` skill when working with Convex backend - it provides specialized guidance for schema design, queries, mutations, actions, and Convex best practices.

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

**Custom Domain Support:** `isValidCustomDomain()` validates custom tenant domains. Use `getCanonicalUrl(domain, path)` for consistent URL generation across apps.

### App Architecture

All apps follow the same structure:
- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS + Shadcn UI components from `@createconomy/ui`
- **Backend**: Convex (via `@createconomy/convex`)
- **Provider**: `app/providers.tsx` wraps with `ConvexProvider`
- **Types**: Import from `@createconomy/types`

**Styling Pattern:** `app.css` uses CSS custom properties for theming (--background, --foreground, --primary, --secondary, --accent, --destructive, --border, --input, --ring). Light/dark mode via `.dark` class.

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

#### Available Convex Functions

- **Users**: `getUsers`, `getUserById`, `getUserByEmail`, `createUser`, `updateUser`, `deleteUser`
- **Tenants**: `getTenants`, `getTenantBySlug`, `getTenantByDomain`, `createTenant`, `updateTenant`
- **Products**: `getProducts`, `getProductById`, `createProduct`, `updateProduct`, `deleteProduct`
- **Orders**: `getOrders`, `getOrderById`, `createOrder`, `updateOrderStatus`
- **Forum**: `getForumPosts`, `createForumPost`, `updateForumPost`, `deleteForumPost`, `incrementPostViews`, `togglePostLike`
- **Comments**: `getCommentsByPostId`, `createComment`, `updateComment`, `deleteComment`, `toggleCommentLike`
- **Admin**: `getStats` - Returns userCount, productCount, orderCount, postCount, revenue

Full list in `packages/convex/README.md`.

**Schema:** 8 tables (users, tenants, products, orders, forumPosts, forumComments, stripePrices, sessions) in `packages/convex/schema.ts`.

### Shared Packages

- **`@createconomy/ui`**: Import components like `import { Button } from "@createconomy/ui"`. Uses `cn()` utility for class merging.
- **`@createconomy/types`**: Single source of truth for data shapes. Import types like `User`, `Product`, `Order`, `Domain`.
- **`@createconomy/utils`**:
  - `validation.ts` - Zod schemas for email, password, products, forum posts, pagination
  - `format.ts` - Currency, numbers, dates, relative time, slugify
  - `tenant.ts` - Tenant detection, custom domain validation, canonical URLs
  - `logger.ts` - Environment-aware logging (verbose in dev, errors only in prod)
  - `errors.ts` - Custom error classes (ValidationError, NotFoundError, UnauthorizedError, etc.)
- **`@createconomy/config`**:
  - Site configuration, feature flags per app
  - Pagination defaults (20, max 100)
  - File upload limits (10MB max, 5MB for images)

## Code Style

- **TypeScript**: Strict mode enabled with additional checks (noUnusedLocals, noUncheckedIndexedAccess, noImplicitReturns, etc.)
- **Prettier**: Single quotes, semicolons, 100 char print width, LF line endings (not CRLF)
- **ESLint**: Extends `next/core-web-vitals`, no-unused-vars (error, ignores `_` prefix), no-explicit-any (warn)
- **Naming**: camelCase for tables/functions, `@createconomy/*` for packages

## Build System

**Turborepo** orchestrates builds with dependency management. All apps use `--webpack` flag due to Windows Turbopack compatibility issue.

**Package builds** use tsup: ESM output with declarations, sourcemaps enabled, external dependencies not bundled.

## Environment Variables

Required in `.env` (see `.env.example`):
- `NEXT_PUBLIC_CONVEX_URL` - Convex deployment URL
- `CONVEX_ADMIN_KEY` - Convex admin key
- `MARKETPLACE_URL`, `FORUM_URL`, `ADMIN_URL`, `SELLER_URL` - Local dev URLs
- Stripe keys (prepared but not yet implemented)

## Package Dependencies

All apps depend on workspace packages using the `workspace:*` protocol. When modifying shared packages, the `pnpm dev` command will hot-reload changes across apps.

## Important Notes

**Windows Development:** All apps use `--webpack` flag in dev scripts due to a Turbopack Windows panic (see git history).

**Convex Schema:** The `packages/convex/convex/_generated/` directory MUST be committed to git for type-checking and CI/CD.

**Testing Status:** Vitest is configured in `packages/utils` but no test files exist yet. Tests should be added before significant feature work.

## Available Skills

The following skills are available to assist with development in this project:

### `/convex-development` - Convex Backend Development
**Use when:** Working with any Convex backend code including:
- Writing or modifying schema definitions
- Creating queries, mutations, or actions
- Implementing auth or file storage
- Debugging Convex functions
- Optimizing database queries

### `/plan` - Implementation Planning
**Use when:** Implementing new features or significant refactoring
- Creates step-by-step implementation plans
- Identifies critical files and architectural trade-offs
- Wait for confirmation before touching code

### `/tdd` - Test-Driven Development
**Use when:** Writing new features, fixing bugs, or refactoring
- Enforces writing tests first
- Ensures 80%+ test coverage
- Guides unit, integration, and E2E test setup

### `/e2e` - End-to-End Testing
**Use when:** Testing user flows across applications
- Generates Playwright tests
- Captures screenshots/videos/traces
- Tests critical user journeys

### `/commit` - Git Commits
**Use when:** Committing changes to git
- Creates properly formatted commits
- Stages appropriate files
- Includes co-authorship attribution

### `/react-best-practices` - React & Next.js Performance
**Use when:** Writing, reviewing, or refactoring React/Next.js code
- 57 performance rules across 8 categories
- Bundle optimization, data fetching, component patterns

### `/web-design-guidelines` - UI/UX & Accessibility
**Use when:** Reviewing UI code for design compliance
- 100+ web interface guidelines
- Accessibility, UX patterns, design system checks

### `/react-native-skills` - React Native Best Practices
**Use when:** Building React Native or Expo mobile apps
- 16 rules across performance, animations, UI patterns

### `/composition-patterns` - React Component Composition
**Use when:** Refactoring components with boolean prop proliferation
- Compound components, render props, context providers

### `/vercel-deploy` - Deploy to Vercel
**Use when:** Deploying applications to Vercel
- Auto-detects framework, returns preview URL

## Auto-Triggered Behaviors

This project uses the **everything-claude-code** plugin (submodule at `.claude/everything-claude-code/`), which provides:

- **Hooks**: Auto-format TypeScript files after edits, warn about console.log statements, suggest context compaction
- **Agents**: Code reviewer, build error resolver, security reviewer, TDD guide (trigger automatically on relevant conditions)
- **Skills**: Backend patterns, frontend patterns, security review, coding standards (available via Skill tool)

- **Skills**: Backend patterns, frontend patterns, security review, coding standards, React/Next.js best practices, web design guidelines, React Native, composition patterns, Vercel deployment (24 total skills available via Skill tool)

All skills, hooks, and agents from the plugin are auto-discovered via `.claude/settings.json` - no manual registration needed.
