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

- **everything-claude-code** - Agents, skills, hooks for development workflow
- **frontend-design** - UI component generation
- **playwright** - E2E testing

**everything-claude-code provides**:

- **Agents**: architect, build-error-resolver, code-reviewer, security-reviewer, tdd-guide, planner, refactor-cleaner, doc-updater, e2e-runner
- **Skills**: convex-development, backend-patterns, frontend-patterns, security-review, tdd-workflow, react-best-practices
- **Hooks**: Auto-format (Prettier), TypeScript check, console.log warnings, context compaction suggestions
- **Commands**: /plan, /tdd, /e2e, /commit, /code-review, /build-fix, /verify, /refactor-clean
- **Rules**: coding-style, security, performance, testing, git-workflow (see below)

**Rules** (located in `.claude/everything-claude-code/rules/`):
- `coding-style.md` - Immutability, file organization, naming conventions
- `security.md` - Security best practices and patterns
- `performance.md` - Performance optimization guidelines
- `testing.md` - Testing strategies and coverage
- `git-workflow.md` - Git commit and branch conventions
- `patterns.md` - Architectural patterns to follow
- `agents.md` - Agent usage guidelines
- `hooks.md` - Hook configuration reference

**MCP Servers**: `.mcp.json` (6 servers: memory, github, convex, context7, sequential-thinking, filesystem)

## Important Notes

- **Windows**: All apps use --webpack flag (Turbopack compatibility)
- **Convex types**: packages/convex/convex/_generated/ MUST be committed to git
- **After code changes**: type-check → lint → build → manual test

## Key Skills

- `/convex-development` - Convex backend work
- `/plan` - Implementation planning
- `/tdd` - Test-driven development
- `/e2e` - End-to-end testing
- `/commit` - Git commits
