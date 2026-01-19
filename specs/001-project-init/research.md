# Research: Project Initialization

**Feature**: Project Initialization
**Date**: 2026-01-18
**Status**: Complete

## Executive Summary

This research document consolidates technical decisions and best practices for initializing the CreateEconomy Digital AI Workflow Marketplace monorepo. All technical choices align with the constitution's Technology Stack Standards and Core Principles. Research covers monorepo architecture, Next.js setup, shared package structure, Convex integration, development tooling, and deployment configuration.

## Research Topics & Decisions

### 1. Turborepo Monorepo Architecture

**Decision**: Use Turborepo 2.x with pnpm workspace for monorepo management

**Rationale**:
- Turborepo provides intelligent build caching and task orchestration
- Excellent Next.js integration with pre-built configurations
- Supports selective builds (only changed packages)
- pnpm workspace provides efficient dependency management with strict peer dependency resolution
- Both tools are officially recommended by Vercel for Next.js monorepos
- Community adoption and tooling maturity ensure long-term viability

**Alternatives Considered**:
- **Nx**: More powerful but higher complexity and steeper learning curve; overkill for 4 apps
- **Lerna**: Legacy tool; maintenance concerns and less Next.js integration
- **pnpm only**: No build caching or task orchestration; would need custom scripts

**Best Practices**:
- Use `turbo.json` for build pipeline configuration
- Configure `pipeline` for cache keys on each app/package
- Use `outputs` glob pattern for Next.js (`.next/**`, `!.next/cache/**`)
- Set up `dependsOn` for shared packages before applications
- Use `filter` flag for selective builds: `pnpm build --filter @createconomy/marketplace`

**References**:
- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Vercel Monorepo Guide](https://vercel.com/guides/monorepos)
- [pnpm Workspace Documentation](https://pnpm.io/workspaces)

---

### 2. Next.js App Router Configuration

**Decision**: Use Next.js 15+ with App Router for all four applications

**Rationale**:
- App Router is the recommended approach by Next.js team
- Better server components and streaming support
- Improved performance with nested layouts
- Built-in routing and code splitting
- Stronger TypeScript integration
- Future-proof (Pages Router is in maintenance mode)

**Alternatives Considered**:
- **Next.js Pages Router**: Legacy approach; lacks server components and modern features
- **Remix**: Alternative with file-based routing but less ecosystem support

**Best Practices**:
- Use `app/` directory with route groups for organization
- Implement server components by default for performance
- Use client components only for interactivity with `'use client'` directive
- Leverage `layout.tsx` for shared UI across routes
- Use `loading.tsx` and `error.tsx` for loading/error states
- Implement dynamic routes with `[slug]` pattern
- Use parallel routes `(.)` and intercepting routes `(..)` for advanced UX
- Configure `next.config.mjs` with proper `images` and `experimental` settings

**References**:
- [Next.js App Router Documentation](https://nextjs.org/docs/app)
- [Server Components Guide](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [Routing Fundamentals](https://nextjs.org/docs/app/building-your-application/routing)

---

### 3. shadcn/ui Component Library Setup

**Decision**: Use shadcn/ui as the component library with Tailwind CSS styling

**Rationale**:
- shadcn/ui provides accessible, customizable components built on Radix UI primitives
- Components are copied into project (full ownership and customization)
- Excellent TypeScript support
- Built-in Tailwind CSS integration
- Active community and regular updates
- Aligns with constitution's Component Reusability principle
- Reduces development time for common UI patterns
- **React 19.2.0 required**: Next.js 15.5.8 internally depends on React 19.x. React 18.x causes peer dependency conflicts in Next.js 15+ ecosystem

**Alternatives Considered**:
- **MUI**: Heavy bundle size, less customization flexibility
- **Chakra UI**: Less TypeScript support, maintenance concerns
- **Headless UI**: Would need to build all components from scratch
- **Custom components**: High development cost, potential accessibility issues

**Best Practices**:
- Initialize shadcn/ui with `npx shadcn@latest init`
- Store components in `/packages/ui/src/components/` for sharing
- Use `components.json` for configuration
- Customize components via Tailwind utility classes
- Follow shadcn/ui patterns for custom components
- Maintain component variants for consistency
- Implement dark mode using Tailwind's `darkMode: 'class'` strategy
- Use Radix UI primitives for accessibility

**Component Structure**:
```
packages/ui/src/components/
├── ui/                  # Base shadcn/ui components (button, input, card, etc.)
├── marketplace/          # Marketplace-specific shared components
├── forum/                # Forum-specific shared components
└── shared/               # App-agnostic shared components
```

**References**:
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Radix UI Primitives](https://www.radix-ui.com/primitives)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

### 4. Convex Backend Integration

**Decision**: Use Convex 1.x as the backend database and authentication provider

**Rationale**:
- Convex provides serverless, real-time database with built-in authentication
- Excellent TypeScript integration with generated types
- No server management required (fully managed)
- Built-in data validation and reactive queries
- Strong multi-tenancy support (constitution requirement)
- Single project approach simplifies architecture
- Free tier generous for development

**Alternatives Considered**:
- **Supabase**: More complex setup, requires server functions
- **Firebase**: Less TypeScript support, complex authentication
- **Prisma + PostgreSQL**: Requires server management, more complexity
- **PlanetScale**: No built-in authentication, separate service needed

**Best Practices**:
- Initialize Convex with `npx convex dev`
- Use `schema.ts` for database schema definition with validation rules
- Implement `v.defineSchema()` with `v.object()` for type safety
- Create `auth.config.ts` for Convex Auth configuration
- Use `ctx.auth.getUserId()` for authentication in functions
- Implement tenant identification fields in all documents for multi-tenancy
- Use `v.index()` for frequently queried fields
- Leverage `ctx.scheduler` for scheduled tasks
- Use `v.string()`, `v.number()`, etc., with validation rules
- Implement `beforeInsert`, `beforeUpdate` hooks for data validation

**Multi-Tenancy Pattern**:
```typescript
// schema.ts
const documents = defineSchema({
  users: v.object({
    tenantId: v.string(),  // Required for multi-tenancy
    email: v.string(),
    // ... other fields
  }),
  // Index tenant queries
  byTenant: v.index("tenantId")
})
```

**References**:
- [Convex Documentation](https://docs.convex.dev)
- [Convex Schema Reference](https://docs.convex.dev/guides/schemas)
- [Convex Auth Guide](https://docs.convex.dev/guides/authentication)
- [Multi-Tenancy Best Practices](https://docs.convex.dev/guides/production/multi-tenancy)

---

### 5. TypeScript Strict Mode Configuration

**Decision**: Enable TypeScript strict mode across all packages and applications

**Rationale**:
- Catches type errors at compile time
- Reduces runtime errors
- Improves code quality and maintainability
- Aligns with constitution's Code Quality requirements
- Enforces best practices (null checks, type annotations)
- Better IDE support and autocomplete

**Configuration**:
```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

**Best Practices**:
- Use shared `tsconfig.json` in root with `extends` for apps/packages
- Configure `paths` for clean imports (`@createconomy/ui` instead of `../../packages/ui`)
- Enable incremental builds with `tsconfig.buildInfoFile`
- Use `composite: true` for project references
- Configure `baseUrl` to root for consistent imports

**References**:
- [TypeScript Strict Mode](https://www.typescriptlang.org/tsconfig#strict)
- [TypeScript Project References](https://www.typescriptlang.org/docs/handbook/project-references)

---

### 6. ESLint and Prettier Configuration

**Decision**: Use ESLint with TypeScript rules and Prettier for code formatting

**Rationale**:
- ESLint catches code quality issues and potential bugs
- Prettier ensures consistent formatting across team
- Shared configuration ensures consistency across monorepo
- Pre-commit hooks enforce quality before commits
- Aligns with constitution's Code Quality requirements

**ESLint Configuration**:
- Use `@typescript-eslint/recommended` and `@typescript-eslint/recommended-requiring-type-checking`
- Configure `eslint-plugin-import` for import ordering
- Use `eslint-plugin-react` and `eslint-plugin-react-hooks` for Next.js
- Configure `eslint-plugin-jsx-a11y` for accessibility
- Use `eslint-config-next` for Next.js best practices
- Extend `packages/eslint-config-custom` for project-specific rules

**Prettier Configuration**:
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false
}
```

**Best Practices**:
- Use `package.json` `eslintConfig` field for ESLint configuration
- Configure `overrides` for different file types
- Use `lint-staged` with Husky for pre-commit hooks
- Run ESLint with `--max-warnings 0` to fail on warnings
- Configure Prettier to work with ESLint (disable conflicting rules)
- Use `.eslintignore` for generated files

**References**:
- [ESLint Documentation](https://eslint.org/docs/latest/)
- [TypeScript ESLint Plugin](https://typescript-eslint.io/)
- [Prettier Documentation](https://prettier.io/docs/en/options)
- [Lint-Staged Documentation](https://github.com/okonet/lint-staged)

---

### 7. Environment Variable Management

**Decision**: Use `.env` files with Vercel environment variable overrides

**Rationale**:
- Standard approach for configuration management
- Support for different environments (development, staging, production)
- Vercel provides UI for production environment variables
- Secure for secrets (never committed to git)
- Supports per-app configuration
- Aligns with constitution's Configuration Management user story

**Best Practices**:
- Use `.env.example` files for documentation (committed to git)
- Never commit `.env.local` or `.env.production` files
- Use `NEXT_PUBLIC_` prefix for client-side variables
- Use Convex's `process.env` for backend configuration
- Configure `vercel.json` for environment-specific builds
- Use `zod` for runtime environment variable validation
- Document all required environment variables in `.env.example`

**Per-App Configuration**:
```
apps/marketplace/.env.example    # Marketplace-specific variables
apps/forum/.env.example          # Forum-specific variables
apps/admin/.env.example           # Admin-specific variables
apps/seller/.env.example          # Seller-specific variables
convex/.env.local                # Convex development variables
.env.example                     # Root-level shared variables
```

**References**:
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables)
- [Zod Schema Validation](https://zod.dev/)

---

### 8. Vercel Multi-Domain Deployment

**Decision**: Use Vercel with separate projects per domain, monorepo root deployment

**Rationale**:
- Vercel provides excellent Next.js integration
- Supports multi-domain routing via separate projects
- Preview deployments for each PR
- Automatic HTTPS and CDN
- Edge functions and serverless functions
- Aligns with constitution's deployment requirements

**Domain Strategy**:
- **Root project**: Monorepo management and shared packages
- **Marketplace**: `createconomy.com` - Main e-commerce platform
- **Forum**: `discuss.createconomy.com` - Community forum
- **Admin**: `console.createconomy.com` - Admin dashboard
- **Seller**: `seller.createconomy.com` - Seller portal

**Best Practices**:
- Use `vercel.json` for deployment configuration
- Configure `domains` in Vercel project settings
- Use `buildCommand` and `outputDirectory` per app
- Configure `preview` deployments with unique URLs
- Use `alias` for custom domains
- Configure `rewrites` for routing if needed
- Use `regions` for deployment to edge locations
- Set `framework` to `nextjs` in `vercel.json`

**vercel.json Configuration**:
```json
{
  "buildCommand": "turbo run build --filter=@createconomy/marketplace",
  "outputDirectory": ".next",
  "installCommand": "pnpm install",
  "framework": "nextjs"
}
```

**References**:
- [Vercel Monorepo Deployment](https://vercel.com/guides/monorepos)
- [Vercel Domains](https://vercel.com/docs/projects/domains)
- [Vercel Configuration](https://vercel.com/docs/projects/project-configuration)

---

### 9. Development Tooling Integration

**Decision**: Integrate Next DevTools MCP for debugging and optimization

**Rationale**:
- MCP (Model Context Protocol) integration enhances AI assistance
- Next DevTools provides performance insights
- Improves development workflow
- Aligns with .cursor/rules MCP Tools Usage guidelines

**Tooling Stack**:
- **ESLint MCP**: Code linting and quality checks
- **Context7 MCP**: Documentation and code examples
- **Next DevTools MCP**: Next.js debugging and optimization
- **Vercel MCP**: Deployment checks and monitoring
- **Convex MCP**: Database operations and schema design
- **shadcn MCP**: UI component integration
- **Stripe MCP**: Payment processing (future feature)

**Best Practices**:
- Configure MCP servers in `~/.cursor/mcp.json` (global)
- Use `.cursor/rules` for MCP tool usage patterns
- Run ESLint MCP after code changes
- Use Context7 MCP for unfamiliar APIs
- Use Next DevTools MCP for performance optimization
- Use Vercel MCP before deployment

**References**:
- [Cursor MCP Documentation](https://docs.cursor.sh)
- [Next DevTools](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Vercel Analytics](https://vercel.com/docs/analytics)

---

### 10. Git Workflow and Branching

**Decision**: Use feature branch workflow with conventional commits

**Rationale**:
- Aligns with constitution's Branching Strategy
- Enables independent feature development
- Clear commit history
- Facilitates code review process
- Supports preview deployments

**Branching Strategy**:
- `main`: Production-ready code
- `develop`: Integration branch for features
- `feature/*`: Feature branches (e.g., `feature/marketplace-checkout`)
- `fix/*`: Bug fixes (e.g., `fix/stripe-webhook-error`)
- `chore/*`: Maintenance tasks (e.g., `chore/update-dependencies`)

**Conventional Commits Format**:
```
feat: add user registration
fix: resolve Stripe webhook signature validation
docs: update getting started guide
style: format code with Prettier
refactor: optimize database queries
test: add unit tests for auth service
chore: update dependencies
```

**Best Practices**:
- Use Husky for Git hooks (pre-commit, pre-push)
- Configure `commitlint` for conventional commits enforcement
- Use `lint-staged` to run ESLint on changed files
- Create meaningful commit messages
- Commit frequently with focused changes
- Reference feature spec and plan in PR descriptions

**References**:
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Husky Documentation](https://typicode.github.io/husky/)
- [Commitlint Documentation](https://commitlint.js.org/)

---

## Summary of Technical Decisions

| Decision | Technology | Rationale |
|----------|-------------|-----------|
| Monorepo Tool | Turborepo + pnpm workspace | Build caching, Next.js integration, efficient deps |
| Web Framework | Next.js 15+ App Router | Modern features, server components, performance |
| UI Components | shadcn/ui + Tailwind CSS | Accessible, customizable, excellent TS support |
| Backend | Convex 1.x | Serverless, real-time, TypeScript, built-in auth |
| Language | TypeScript 5.x strict | Type safety, code quality |
| Code Quality | ESLint + Prettier | Linting, formatting, consistency |
| Package Manager | pnpm 9.x | Workspace support, strict deps, efficiency |
| Deployment | Vercel | Next.js integration, multi-domain, preview deployments |
| Development Tools | MCP servers | AI assistance, debugging, optimization |
| Git Workflow | Feature branches + conventional commits | Clear history, code review, integration |

---

## Open Questions / Deferred Decisions

None - all technical decisions resolved based on constitution requirements and industry best practices.

---

## References

- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Convex Documentation](https://docs.convex.dev)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Vercel Documentation](https://vercel.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [ESLint Documentation](https://eslint.org/docs/latest/)
- [Prettier Documentation](https://prettier.io/docs/en/)
