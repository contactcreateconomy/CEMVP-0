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

**MCP Servers**: Configured in `~/.claude.json` (7 servers: memory, github, convex, context7, sequential-thinking, filesystem, shadcn)

## Important Notes

- **Windows**: All apps use --webpack flag (Turbopack compatibility)
- **Convex types**: packages/convex/convex/_generated/ MUST be committed to git
- **After code changes**: type-check → lint → build → manual test
