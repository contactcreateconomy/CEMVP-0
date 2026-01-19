# Quickstart Guide: Project Initialization

**Feature**: Project Initialization
**Date**: 2026-01-18
**Version**: 1.0.0

## Overview

This guide walks through setting up the CreateEconomy Digital AI Workflow Marketplace development environment from scratch. Follow these steps to initialize the monorepo, configure all tools, and get the development server running.

## Prerequisites

Before you begin, ensure you have the following installed:

### Required Software

1. **Node.js** (20.10.0 or higher, LTS recommended)
   ```bash
   node --version  # Should be v20.10.0 or later
   ```
   Install from: https://nodejs.org/

2. **pnpm** (9.0.0 or higher)
   ```bash
   npm install -g pnpm
   pnpm --version  # Should be 9.0.0 or later
   ```

3. **Git** (2.40.0 or higher)
   ```bash
   git --version  # Should be 2.40.0 or later
   ```
   Install from: https://git-scm.com/

4. **VS Code** or Cursor IDE (recommended for MCP tool integration)
   - Download: https://code.visualstudio.com/ or use Cursor IDE

5. **Browser**: Chrome, Firefox, or Edge for development tools and testing

### System Requirements

- **Network**: 100 Mbps or higher for initial dependency installation
- **Storage**: SSD with at least 10 GB free space
- **RAM**: 8 GB minimum (16 GB recommended)

### Optional but Recommended

1. **Turbo CLI** (for local development)
   ```bash
   npm install -g turbo
   turbo --version
   ```

2. **Convex CLI** (for local development)
   ```bash
   npm install -g convex
   convex --version
   ```

## Setup Instructions

### Step 1: Clone Repository

Clone the CreateEconomy repository and navigate to the project directory:

```bash
git clone https://github.com/your-org/createconomy.git
cd createconomy
```

### Step 2: Install Dependencies

Install all dependencies using pnpm workspace:

```bash
pnpm install
```

This will:
- Install root dependencies (Turborepo, ESLint, Prettier, TypeScript)
- Install shared packages dependencies
- Install application dependencies
- Set up workspace links between packages and apps

**Expected time**: 2-5 minutes (depending on internet speed)

### Step 3: Configure Environment Variables

Copy example environment files and fill in your values:

```bash
# Root-level environment variables
cp .env.example .env.local

# Application-specific environment variables
cp apps/marketplace/.env.example apps/marketplace/.env.local
cp apps/forum/.env.example apps/forum/.env.local
cp apps/admin/.env.example apps/admin/.env.local
cp apps/seller/.env.example apps/seller/.env.local

# Convex environment variables
cp convex/.env.example convex/.env.local
```

**Fill in the required values** (see `.env.example` files for details):

**Root `.env.local`**:
```bash
# Convex Configuration
NEXT_PUBLIC_CONVEX_URL=https://your-convex-deployment.convex.cloud
NEXT_PUBLIC_CONVEX_SITE_ID=your-site-id

# Vercel Configuration (if deploying to Vercel)
VERCEL_PROJECT_ID=your-project-id
VERCEL_ORG_ID=your-org-id
```

**Convex `.env.local`**:
```bash
# Convex Deployment Key (get from Convex dashboard)
CONVEX_DEPLOY_KEY=your-deployment-key
```

**Note**: Do NOT commit `.env.local` files to git. They are already in `.gitignore`.

### Step 4: Initialize Convex

Initialize Convex backend and start development server:

```bash
npx convex dev
```

This will:
- Create Convex project (if not exists)
- Sync database schema from `convex/schema.ts`
- Start Convex development server
- Provide dashboard URL

**First-time setup**:
```bash
# Follow the prompts to create or connect to Convex project
# Choose "Create a new project"
# Select the desired region (e.g., US East)
# Confirm project creation
```

**Expected output**:
```
✓ Connected to Convex!
✓ Schema: convex/schema.ts
✓ Functions: convex/functions/
🔗 Dashboard: https://dashboard.convex.dev/...
```

**Keep this terminal open** (run in background if using tmux or similar)

### Step 5: Initialize shadcn/ui

Initialize shadcn/ui component library for shared UI package:

```bash
cd packages/ui
npx shadcn@latest init
```

**Configuration options**:
```
? Which style would you like to use? › Default
? Which color would you like to use? › Slate
? Do you want to use CSS variables for colors? › yes
```

This will:
- Create `components.json` configuration
- Install required dependencies
- Set up Tailwind CSS integration
- Create `src/components/ui` directory

**Keep the defaults** unless you have specific preferences.

### Step 6: Build Shared Packages

Build shared packages to ensure they compile correctly:

```bash
pnpm build --filter=@createconomy/ui
pnpm build --filter=@createconomy/types
pnpm build --filter=@createconomy/utils
pnpm build --filter=@createconomy/config
```

**Or build all shared packages at once**:
```bash
pnpm build --filter=./packages/*
```

**Expected output**:
```
➜ packages/ui:build: $ tsc
➜ packages/ui:build: ✓ 0.0s
➜ packages/types:build: $ tsc
➜ packages/types:build: ✓ 0.0s
➜ packages/utils:build: $ tsc
➜ packages/utils:build: ✓ 0.0s
➜ packages/config:build: ✓ 0.0s
```

### Step 7: Start Development Servers

You can run all four applications simultaneously or individually:

**Option A: Run all applications** (recommended)
```bash
pnpm dev
```

This will:
- Start all four applications on different ports
- Marketplace: http://localhost:3000
- Forum: http://localhost:3001
- Admin: http://localhost:3002
- Seller: http://localhost:3003

**Option B: Run specific application**
```bash
# Marketplace
pnpm dev --filter=@createconomy/marketplace

# Forum
pnpm dev --filter=@createconomy/forum

# Admin
pnpm dev --filter=@createconomy/admin

# Seller
pnpm dev --filter=@createconomy/seller
```

**Expected output** (for each app):
```
✓ Ready in 2.3s
○ Local:        http://localhost:3000
```

**Open in browser**: Navigate to any of the localhost URLs above.

### Step 8: Verify Setup

Verify that all components are working correctly:

#### 1. Check Convex Dashboard

Open the Convex dashboard URL from Step 4 and verify:
- Schema is displayed (users, sessions, tenants, etc.)
- No errors in the console
- Functions are listed

#### 2. Check Application Pages

Open each application in a browser and verify:
- Default Next.js page renders
- No console errors
- Page loads quickly (< 3 seconds)

#### 3. Check Shared Components

Create a test component in the shared UI package:

```bash
cd packages/ui/src/components
echo 'export function TestButton() { return <button>Test</button> }' > test-button.tsx
```

Import and use it in an app:

```tsx
// apps/marketplace/app/page.tsx
import { TestButton } from "@createconomy/ui";

export default function Home() {
  return (
    <main>
      <h1>Marketplace</h1>
      <TestButton />
    </main>
  );
}
```

**Verify**: The component renders without errors.

#### 4. Check Environment Variables

Create a test page to verify environment variables:

```tsx
// apps/marketplace/app/test-env/page.tsx
export default function TestEnv() {
  return (
    <div>
      <h1>Environment Variables Test</h1>
      <pre>
        {JSON.stringify({
          convexUrl: process.env.NEXT_PUBLIC_CONVEX_URL,
          nodeId: process.env.NEXT_PUBLIC_CONVEX_SITE_ID,
        }, null, 2)}
      </pre>
    </div>
  );
}
```

**Verify**: Navigate to `http://localhost:3000/test-env` and see your values.

### Step 9: Run Quality Checks

Run ESLint and Prettier to verify code quality setup:

```bash
# Check for linting errors
pnpm lint

# Format code with Prettier
pnpm format

# Run TypeScript type checking
pnpm type-check
```

**Expected output**: No errors (warnings are acceptable for now)

### Step 10: Commit Initial Setup

Commit the initial project setup to git:

```bash
git add .
git commit -m "chore: initialize project with monorepo and development environment

- Set up Turborepo monorepo with pnpm workspace
- Create four Next.js applications (marketplace, forum, admin, seller)
- Initialize shared packages (ui, types, utils, config)
- Configure Convex backend with schema
- Set up shadcn/ui with Tailwind CSS
- Configure ESLint, Prettier, TypeScript strict mode
- Add environment variable templates
- Create initial documentation

Closes #1"
```

## Development Workflow

### Daily Development

1. **Start Convex** (if not already running):
   ```bash
   npx convex dev
   ```

2. **Start development servers**:
   ```bash
   pnpm dev  # Or filter by app
   ```

3. **Make changes** in apps/packages

4. **Run quality checks** before committing:
   ```bash
   pnpm lint
   pnpm format
   pnpm type-check
   ```

5. **Test changes** in browser

6. **Commit with conventional message**:
   ```bash
   git add .
   git commit -m "feat: add user registration page"
   ```

### Working on Specific Features

When implementing a feature:

1. Create feature branch:
   ```bash
   git checkout -b feature/user-registration
   ```

2. Update schema in `convex/schema.ts`

3. Add Convex functions in `convex/functions/`

4. Add API contracts in `apps/your-app/app/api/v1/`

5. Add UI components in apps or shared packages

6. Test thoroughly

7. Run quality checks:
   ```bash
   pnpm lint
   pnpm format
   pnpm type-check
   ```

8. Commit and push:
   ```bash
   git push origin feature/user-registration
   ```

9. Create pull request on GitHub

## Common Tasks

### Adding a New Shared Component

1. Add component to shared UI package:
   ```bash
   cd packages/ui
   npx shadcn@latest add button  # Example: Add button component
   ```

2. Export from index:
   ```tsx
   // packages/ui/src/index.ts
   export * from './components/ui/button';
   ```

3. Import in app:
   ```tsx
   import { Button } from "@createconomy/ui";
   ```

### Adding a New Shared Type

1. Add type to shared types package:
   ```typescript
   // packages/types/src/database/user.ts
   export interface User {
     _id: string;
     email: string;
     name: string;
   }
   ```

2. Export from index:
   ```typescript
   // packages/types/src/index.ts
   export * from './database/user';
   ```

3. Import in app or Convex function:
   ```typescript
   import { User } from "@createconomy/types";
   ```

### Adding a New Shared Utility

1. Add utility to shared utils package:
   ```typescript
   // packages/utils/src/format/currency.ts
   export function formatCurrency(cents: number): string {
     return (cents / 100).toFixed(2);
   }
   ```

2. Export from index:
   ```typescript
   // packages/utils/src/index.ts
   export * from './format/currency';
   ```

3. Import in app:
   ```typescript
   import { formatCurrency } from "@createconomy/utils";
   ```

### Adding a New API Endpoint

1. Create Convex function:
   ```typescript
   // convex/functions/http/endpointName.ts
   import { httpEndpoint } from "./_generated/api";
   import { v } from "convex/values";

   export const endpointName = httpEndpoint({
     method: "POST",
     args: { message: v.string() },

     handler: async (ctx, { message }) => {
       // Handle request
       return { success: true, data: message };
     }
   });
   ```

2. Access from Next.js:
   ```tsx
   // apps/marketplace/app/api/v1/endpointName/route.ts
   import { fetchAction } from "convex/_generated/server";

   export async function POST(request: Request) {
     const body = await request.json();
     return await fetchAction(api.endpointName, body);
   }
   ```

3. Call from frontend:
   ```tsx
   const response = await fetch('/api/v1/endpointName', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ message: 'Hello' }),
   });
   ```

## Troubleshooting

### Dependencies Won't Install

**Problem**: `pnpm install` fails or hangs

**Solution**:
```bash
# Clear pnpm cache
pnpm store prune

# Clear node_modules
rm -rf node_modules apps/*/node_modules packages/*/node_modules

# Reinstall
pnpm install
```

### Convex Won't Connect

**Problem**: `npx convex dev` fails to connect

**Solution**:
1. Check `NEXT_PUBLIC_CONVEX_URL` and `NEXT_PUBLIC_CONVEX_SITE_ID` in `.env.local`
2. Verify Convex project exists in dashboard
3. Check internet connection
4. Try with `CONVEX_DEPLOY_KEY` environment variable

### Application Won't Start

**Problem**: `pnpm dev` fails to start

**Solution**:
1. Check if port is already in use:
   ```bash
   lsof -i :3000  # Replace with your port
   ```

2. Clear Next.js cache:
   ```bash
   rm -rf apps/*/node_modules/.next
   ```

3. Check environment variables are set

4. Rebuild shared packages:
   ```bash
   pnpm build --filter=./packages/*
   ```

### TypeScript Errors

**Problem**: Type errors in code

**Solution**:
1. Run type check:
   ```bash
   pnpm type-check
   ```

2. Check TypeScript configuration:
   ```bash
   cat tsconfig.json
   ```

3. Verify shared packages are built:
   ```bash
   pnpm build --filter=./packages/*
   ```

### ESLint Errors

**Problem**: ESLint reports errors

**Solution**:
1. Run ESLint:
   ```bash
   pnpm lint
   ```

2. Auto-fix if possible:
   ```bash
   pnpm lint --fix
   ```

3. Check ESLint configuration:
   ```bash
   cat eslint.config.mjs
   ```

## Performance Tips

### Faster Builds

1. Use Turborepo caching (already configured in `turbo.json`)
2. Build only what you need:
   ```bash
   pnpm build --filter=@createconomy/marketplace
   ```

### Faster Development

1. Use `--turbo` flag for cached builds:
   ```bash
   pnpm dev --turbo
   ```

2. Run only the apps you're working on:
   ```bash
   pnpm dev --filter=@createconomy/marketplace
   ```

### Reduce Bundle Size

1. Use dynamic imports for large components:
   ```tsx
   const HeavyComponent = dynamic(() => import('./HeavyComponent'));
   ```

2. Use `next/image` for all images:
   ```tsx
   import Image from 'next/image';
   ```

3. Use code splitting:
   ```tsx
   import dynamic from 'next/dynamic';
   ```

## Next Steps

After completing this quickstart:

1. **Explore the codebase**:
   - Read through [`plan.md`](plan.md) for architecture details
   - Review [`data-model.md`](data-model.md) for database schema
   - Check [`contracts/README.md`](contracts/README.md) for API documentation

2. **Create your first feature**:
   - Follow the feature development workflow in the constitution
   - Use `/speckit.spec` to create feature specification
   - Use `/speckit.plan` to create implementation plan
   - Use `/speckit.tasks` to generate task list

3. **Join the community**:
   - Ask questions in discussions
   - Report bugs in issues
   - Contribute improvements via pull requests

## Getting Help

### Documentation

- **Constitution**: [`.specify/memory/constitution.md`](../../.specify/memory/constitution.md)
- **Plan**: [`plan.md`](plan.md)
- **Data Model**: [`data-model.md`](data-model.md)
- **API Contracts**: [`contracts/README.md`](contracts/README.md)
- **Project Context**: [`../../.cursor/project-context.md`](../../.cursor/project-context.md)

### External Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Convex Documentation](https://docs.convex.dev)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

### MCP Tools

Use these MCP tools for assistance:
- **Context7**: For documentation and code examples
- **ESLint**: For code linting
- **Next DevTools**: For debugging and optimization
- **Convex MCP**: For database operations
- **shadcn MCP**: For UI component integration

## Summary

Congratulations! You've successfully initialized the CreateEconomy development environment. You now have:

- ✅ Turborepo monorepo with four Next.js applications
- ✅ Shared packages for UI, types, utils, and config
- ✅ Convex backend with multi-tenant schema
- ✅ shadcn/ui component library with Tailwind CSS
- ✅ ESLint, Prettier, and TypeScript strict mode
- ✅ Development servers running on localhost:3000-3003
- ✅ Quality checks configured and passing

You're ready to start building features! Check out the [plan.md](plan.md) for architecture details and follow the constitution's feature development workflow.

---

**Version**: 1.0.0
**Last Updated**: 2026-01-18
**Status**: Ready for use
