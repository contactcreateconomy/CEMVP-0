# Development Workflow

This document covers the common commands, workflows, and procedures for day-to-day development.

## Package Manager

This project uses **pnpm** as the package manager.

```bash
pnpm install              # Install all dependencies
pnpm add <package>        # Add dependency to current workspace
pnpm add -D <package>     # Add dev dependency
pnpm add -w <package>     # Add to root workspace
```

## Running Applications

### All Applications

Run all 4 apps simultaneously on ports 3000-3003:
```bash
pnpm dev
```

This starts: marketplace (3000), forum (3001), admin (3002), seller (3003).

### Single Application

Run a specific app:
```bash
pnpm --filter @createconomy/marketplace dev
pnpm --filter @createconomy/forum dev
pnpm --filter @createconomy/admin dev
pnpm --filter @createconomy/seller dev
```

### Windows Development

All apps use the `--webpack` flag due to a Turbopack Windows compatibility issue. Do not remove this flag.

## Convex Development

### Start Dev Server

Run the Convex dev server in a separate terminal:
```bash
pnpm convex:dev
```

The Convex dev server provides:
- Live schema updates
- Function reloading
- Dashboard at localhost:3000 (or configured port)

### Deploy to Production

```bash
pnpm convex:deploy
```

This deploys schema and functions to your Convex production deployment.

### Type Check

```bash
pnpm convex:typecheck
```

Verifies that your Convex schema and functions are type-safe.

## Build & Quality Commands

### Build

```bash
pnpm build               # Build all packages in dependency order
```

Turborepo handles the build order based on package dependencies.

### Test

```bash
pnpm test                # Run tests (Vitest)
```

**Note**: Tests are configured but not yet written.

### Lint

```bash
pnpm lint                # ESLint all packages
```

Run this before committing to catch code quality issues.

### Type Check

```bash
pnpm type-check          # TypeScript check all packages
```

Verifies type safety across the entire codebase.

### Format

```bash
pnpm format              # Prettier format
```

Auto-formats code according to project style rules (single quotes, semicolons, 100 char width).

### Clean

```bash
pnpm clean               # Remove build artifacts
```

Useful when troubleshooting build issues.

## Verification Steps

After making code changes, follow this verification sequence:

1. **Type Check**: `pnpm type-check`
2. **Lint**: `pnpm lint`
3. **Build**: `pnpm build`
4. **Manual Test**: Run the affected app and verify the changes

If any step fails, fix the issues before proceeding to the next step.

## Environment Setup

### Required Variables

Copy `.env.example` to `.env` and configure:
```bash
NEXT_PUBLIC_CONVEX_URL=https://your-convex-deployment.convex.cloud
CONVEX_ADMIN_KEY=your-admin-key
MARKETPLACE_URL=http://localhost:3000
FORUM_URL=http://localhost:3001
ADMIN_URL=http://localhost:3002
SELLER_URL=http://localhost:3003
```

### Stripe Keys (Optional)

Stripe integration is prepared but not yet implemented:
```bash
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

## Git Workflow

### Commits

Use conventional commit format:
```
type(scope): description

[optional body]

[optional footer]
```

Types: feat, fix, docs, style, refactor, test, chore

### Before Committing

1. Ensure all tests pass: `pnpm test`
2. Check for console.log statements (hooks will warn you)
3. Verify no unnecessary files are staged

### Branch Strategy

- `main` - Production branch
- Feature branches - For new features or bug fixes

## Common Workflows

### Adding a New Feature

1. **Plan**: Design the feature architecture
2. **Test**: Write tests for the new functionality
3. **Implement**: Write code following patterns from existing features
4. **Verify**: Run type-check, lint, build
5. **Commit**: Use conventional commit format

### Fixing a Bug

1. **Investigate**: Read relevant code and logs
2. **Reproduce**: Confirm the bug exists
3. **Fix**: Make minimal changes to fix the issue
4. **Test**: Verify the fix works and doesn't break other features
5. **Commit**: Use conventional commit format

### Working with Convex

1. **Read docs**: Read `docs/convex-backend.md`
2. **Type check**: Run `pnpm convex:typecheck` after schema changes
3. **Test locally**: Use `pnpm convex:dev` during development

### Adding UI Components

1. **Check existing**: Look in `packages/ui/src` for similar components
2. **Follow patterns**: Use Shadcn patterns and `cn()` utility
3. **Export**: Add to `packages/ui/src/index.ts`
4. **Use across apps**: Import from `@createconomy/ui`

### Adding Types

1. **Define**: Add to `packages/types/src/`
2. **Export**: Add to `packages/types/src/index.ts`
3. **Use**: Import from `@createconomy/types`

## Troubleshooting

### Build Failures

1. Run `pnpm clean` to remove build artifacts
2. Run `pnpm install` to ensure dependencies are current
3. Check that all workspace dependencies are using `workspace:*`

### Type Errors

1. Run `pnpm type-check` to see all type errors
2. Regenerate Convex types: `pnpm convex:dev` (restart dev server)
3. Ensure `packages/convex/convex/_generated/` is committed to git

### Hot Module Reloading Not Working

1. Ensure `pnpm dev` is running (not individual app)
2. Check that workspace packages are using `workspace:*` dependencies
3. Restart the dev server

### Port Already in Use

1. Find the process using the port
2. Kill the process or use a different port
3. Verify no other dev servers are running

## Getting Help

- **Documentation**: See `docs/tools-integration.md` for available tools
- **Convex**: See `docs/convex-backend.md` for Convex-specific guidance

