# CLAUDE.md

## Project Purpose (WHY)

Multi-domain e-commerce monorepo serving different user roles through 4 Next.js apps, all backed by a single Convex deployment.

## Project Structure (WHAT)

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

## Development (HOW)

**Package manager**: pnpm

**All apps**: `pnpm dev` (ports 3000-3003)

**Single app**: `pnpm --filter @createconomy/<app> dev`

**Convex**: `pnpm convex:dev` (separate terminal)

## Progressive Disclosure

Before starting work, read relevant docs:

| File | When to read |
|------|--------------|
| `docs/architecture.md` | System design, multi-tenancy, shared packages |
| `docs/development-workflow.md` | Commands, verification, environment setup |
| `docs/convex-backend.md` | Schema, functions, Convex best practices |
| `docs/tools-integration.md` | Plugins, MCP servers, skills, hooks |

## Multi-Tenancy

All data segregated by `tenantId`. Tenant detection via `getTenantFromHostname()` in packages/utils/src/tenant.ts.

**Hostnames**:
- `createconomy.com` → marketplace
- `discuss.createconomy.com` → forum
- `console.createconomy.com` → admin
- `seller.createconomy.com` → seller

## Key Reference Points

| Reference | Location |
|----------|----------|
| Convex schema | packages/convex/schema.ts (8 tables) |
| Convex functions | packages/convex/README.md |
| Tenant utilities | packages/utils/src/tenant.ts |
| App providers | apps/*/app/providers.tsx |

## Tools & Integration

**Installed Plugins** (auto-discovered via .claude/settings.json):

- **frontend-design** - UI component generation
- **playwright** - E2E testing

**MCP Servers** (configured in `~/.claude.json`, see `docs/tools-integration.md`):

| Server | Purpose |
|--------|---------|
| `convex` | Database operations, schema queries |
| `context7` | Live documentation lookup (requires CONTEXT7_API_KEY) |
| `figma-dev-mode-mcp-server` | Figma Dev Mode integration (requires Figma plugin) |
| `filesystem` | File operations |
| `github` | PRs, issues, repo operations (requires GITHUB_TOKEN) |
| `memory` | Project knowledge graph |
| `sequential-thinking` | Chain-of-thought reasoning |
| `shadcn` | UI component discovery and installation |

**Installed Skills** (`.claude/skills/`):

**Vercel Labs Skills:**

| Skill | Purpose |
|-------|---------|
| `vercel-composition-patterns` | React composition patterns - compound components, state lifting, avoiding boolean prop proliferation |
| `vercel-react-best-practices` | React/Next.js performance optimization - 40+ rules across 8 categories (waterfalls, bundle size, server/client performance) |
| `vercel-react-native-skills` | React Native/Expo best practices - performance, layout, animation, state management, platform patterns |
| `vercel-deploy-claimable` | Deploy to Vercel with claimable URLs - auto-detects 40+ frameworks from package.json |
| `web-design-guidelines` | Web interface guidelines - 100+ rules covering accessibility, focus states, forms, animation, typography, performance |

**Next Skills:**

| Skill | Purpose |
|-------|---------|
| `next-best-practices` | Next.js framework patterns - file conventions, RSC boundaries, async APIs, data patterns, route handlers (background skill) |
| `next-cache-components` | Next.js 16 Cache Components and PPR - `use cache`, `cacheLife()`, `cacheTag()`, cache invalidation |
| `next-upgrade` | Next.js version upgrades - automated migration with codemods, breaking changes review |

**Convex Skills** (@waynesutton/convex-skills):
| Skill | Purpose |
|-------|---------|
| `convex` | General Convex development guidance |
| `convex-best-practices` | Production-ready Convex apps - function organization, query patterns, validation, TypeScript, error handling |
| `convex-functions` | Writing queries, mutations, actions, and HTTP actions |
| `convex-realtime` | Reactive applications with live updates |
| `convex-schema-validator` | Database schema definition and validation |
| `convex-file-storage` | File upload, storage, and serving |
| `convex-agents` | Building AI agents with Convex |
| `convex-cron-jobs` | Scheduled functions and background tasks |
| `convex-http-actions` | HTTP endpoints and webhook handling |
| `convex-migrations` | Schema evolution and data migrations |
| `convex-security-check` | Quick security audit checklist |
| `convex-security-audit` | Deep security review patterns |
| `convex-component-authoring` | Creating reusable Convex components |

**Other Skills:**
| Skill | Purpose |
|-------|---------|
| `avoid-feature-creep` | Prevent scope creep during development |

## Important Notes

- **Windows**: All apps use --webpack flag (Turbopack compatibility)
- **Convex types**: packages/convex/convex/_generated/ MUST be committed to git
- **After code changes**: type-check → lint → build → manual test
