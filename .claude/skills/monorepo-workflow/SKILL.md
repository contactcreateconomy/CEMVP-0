# Monorepo Workflow for Createconomy

Turborepo patterns, shared packages, cross-package development, and workspace conventions for the Createconomy monorepo.

## Monorepo Structure

### Applications (4 Next.js apps)

| App | Package Name | Port | Purpose |
|-----|--------------|------|---------|
| Marketplace | `@createconomy/marketplace` | 3000 | Main e-commerce site |
| Forum | `@createconomy/forum` | 3001 | Community discussions |
| Admin | `@createconomy/admin` | 3002 | Platform administration |
| Seller | `@createconomy/seller` | 3003 | Seller dashboard |

### Shared Packages (5 packages)

| Package | Purpose | Used By |
|---------|---------|---------|
| `@createconomy/ui` | Shadcn components | All apps |
| `@createconomy/types` | Shared TypeScript definitions | All apps + convex |
| `@createconomy/config` | ESLint/TSConfig base configs | All packages |
| `@createconomy/utils` | Validation, formatting, tenant detection | All apps |
| `@createconomy/convex` | Backend schema & functions | All apps |

## Package Manager

This project uses **pnpm** with workspace protocol:

```bash
pnpm install              # Install all dependencies
pnpm add <package>        # Add to current workspace
pnpm add -D <package>     # Add dev dependency
pnpm add -w <package>     # Add to root workspace
pnpm add --filter @createconomy/ui <package>  # Add to specific package
```

### Workspace Dependencies

Internal packages use `workspace:*` protocol:

```json
{
  "dependencies": {
    "@createconomy/ui": "workspace:*",
    "@createconomy/utils": "workspace:*",
    "@createconomy/convex": "workspace:*"
  }
}
```

## Turborepo Configuration

### Task Definitions (`turbo.json`)

| Task | Depends On | Outputs | Cache |
|------|------------|---------|-------|
| `build` | `^build` | `.next/**`, `dist/**` | Yes |
| `dev` | - | - | No (persistent) |
| `lint` | `^lint` | - | Yes |
| `test` | `^test` | `coverage/**` | Yes |
| `type-check` | `^type-check` | - | Yes |

### Running Tasks

```bash
# Run task across all packages
pnpm build
pnpm lint
pnpm test
pnpm type-check

# Run task for specific package
pnpm --filter @createconomy/marketplace build
pnpm --filter @createconomy/ui lint

# Run task including dependencies
pnpm --filter @createconomy/marketplace... build
```

## Development Commands

### Starting Applications

**All apps simultaneously** (ports 3000-3003):
```bash
pnpm dev
```

**Single app**:
```bash
pnpm --filter @createconomy/marketplace dev
pnpm --filter @createconomy/forum dev
pnpm --filter @createconomy/admin dev
pnpm --filter @createconomy/seller dev
```

### Windows Development

**IMPORTANT**: All apps use `--webpack` flag due to Turbopack Windows compatibility:
```json
{
  "scripts": {
    "dev": "next dev --webpack"
  }
}
```

Do not remove this flag on Windows.

### Convex Development

**Separate terminal**:
```bash
pnpm convex:dev
```

This provides:
- Live schema updates
- Function reloading
- Dashboard access

## Shared Package Development

### Adding UI Components (`packages/ui`)

1. **Check existing**: Look in `packages/ui/src` for similar components
2. **Follow patterns**: Use Shadcn patterns and `cn()` utility
3. **Export**: Add to `packages/ui/src/index.ts`
4. **Use across apps**: Import from `@createconomy/ui`

```tsx
// packages/ui/src/button.tsx
import * as React from "react";
import { cn } from "@createconomy/utils"; // or local cn utility

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "ghost";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md",
          variant === "primary" && "bg-blue-600 text-white",
          className
        )}
        {...props}
      />
    );
  }
);

// Export from index.ts
export { Button, type ButtonProps } from "./button";
```

### Adding Types (`packages/types`)

1. **Define**: Add to `packages/types/src/`
2. **Export**: Add to `packages/types/src/index.ts`
3. **Use**: Import from `@createconomy/types`

```typescript
// packages/types/src/product.ts
export interface Product {
  id: string;
  name: string;
  price: number;
  currency: string;
}

// packages/types/src/index.ts
export * from "./product";
export * from "./user";
```

### Adding Utilities (`packages/utils`)

1. **Define**: Add to `packages/utils/src/`
2. **Export**: Add to `packages/utils/src/index.ts`
3. **Use**: Import from `@createconomy/utils`

```typescript
// packages/utils/src/format.ts
export function formatCurrency(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
}

// packages/utils/src/index.ts
export * from "./format";
export * from "./tenant";
export * from "./validation";
```

### Updating Config (`packages/config`)

Base configs are shared via `packages/config/`:

```json
// packages/config/eslint.ts
export default [
  // Base rules
  {
    rules: {
      // Shared rules
    }
  }
];
```

Usage in apps:
```json
{
  "eslintConfig": {
    "extends": ["@createconomy/config/eslint"]
  }
}
```

## Cross-Package Development

### Import Patterns

```tsx
// Import UI components
import { Button, Card } from "@createconomy/ui";

// Import types
import type { Product, User } from "@createconomy/types";

// Import utilities
import { formatCurrency, getTenantFromHostname } from "@createconomy/utils";

// Import Convex
import { api } from "@createconomy/convex/server";
import { useQuery, useMutation } from "convex/react";
```

### Updating Shared Packages

When updating shared packages:

1. **Make changes** in the shared package
2. **Type-check**: `pnpm type-check`
3. **Build shared**: `pnpm --filter <package> build`
4. **Test consumers**: Run affected apps

### Building Dependencies

Turborepo automatically handles build order:

```bash
# Builds in dependency order: ui, types, utils, convex, then apps
pnpm build
```

## Code Quality Workflow

### Verification Sequence

After any code change, follow this sequence:

```bash
# 1. Type check all packages
pnpm type-check

# 2. Lint all packages
pnpm lint

# 3. Build all packages
pnpm build

# 4. Manual test
# Run affected app and verify changes
```

### Individual Commands

```bash
pnpm type-check          # TypeScript check
pnpm lint                # ESLint
pnpm test                # Vitest (configured, minimal tests)
pnpm format              # Prettier
pnpm clean               # Remove build artifacts
```

## Environment Variables

### Global Environment (`turbo.json`)

```json
{
  "globalEnv": [
    "NODE_ENV",
    "NEXT_PUBLIC_CONVEX_URL"
  ]
}
```

### App-Specific Variables

Each app has its own `.env.local`:

```bash
# Required
NEXT_PUBLIC_CONVEX_URL=https://your-convex-deployment.convex.cloud
CONVEX_ADMIN_KEY=your-admin-key

# Optional (local development)
MARKETPLACE_URL=http://localhost:3000
FORUM_URL=http://localhost:3001
ADMIN_URL=http://localhost:3002
SELLER_URL=http://localhost:3003
```

## Troubleshooting

### Build Failures

1. Run `pnpm clean` to remove build artifacts
2. Run `pnpm install` to ensure dependencies are current
3. Check that workspace dependencies use `workspace:*`

### Hot Module Reloading

1. Ensure `pnpm dev` is running (not individual app)
2. Check workspace packages use `workspace:*` dependencies
3. Restart dev server if HMR stops working

### Type Errors

1. Run `pnpm type-check` to see all errors
2. Regenerate Convex types: restart `pnpm convex:dev`
3. Ensure `packages/convex/convex/_generated/` is committed

### Port Conflicts

1. Find process using the port
2. Kill the process or use different port
3. Verify no other dev servers are running

## CI/CD Pipeline

GitHub Actions (`.github/workflows/ci.yml`) runs:

| Job | Purpose |
|-----|---------|
| Type Check | Verify TypeScript types |
| Lint | ESLint check |
| Test | Run tests + coverage |
| Build | Verify builds succeed |
| Convex Type Check | Verify Convex schema |
| Security Audit | `pnpm audit` |
| Format Check | Verify Prettier formatting |

## Resources

- **Architecture**: `docs/architecture.md`
- **Development**: `docs/development-workflow.md`
- **Convex**: `docs/convex-backend.md`
- **Turborepo**: https://turbo.build/repo/docs
- **pnpm**: https://pnpm.io
