# Tools Integration

This document covers the installed plugins, MCP servers, skills, agents, and hooks available in this project.

## Installed Plugins

Plugins are auto-discovered via `.claude/settings.json`.

### everything-claude-code

**Location**: `.claude/everything-claude-code/` (git submodule)

**Purpose**: Battle-tested collection of agents, skills, hooks, and commands evolved over 10+ months of intensive Claude Code use.

**Repository**: https://github.com/affaan-m/everything-claude-code

**Components**:
- 13 specialized agents
- 24+ skills
- Automated hooks
- Custom commands

### frontend-design

**Source**: Official Claude Code plugin

**Purpose**: Create distinctive, production-grade frontend interfaces with high design quality. Generates creative, polished code that avoids generic AI aesthetics.

**Use when**: Building web components, pages, or applications that require thoughtful UI design.

### playwright

**Source**: Official Claude Code plugin

**Purpose**: End-to-end testing with Playwright.

**Use when**: Testing user flows across applications. See `/e2e` skill.

## everything-claude-code Components

### Agents

Auto-discovered agents for specialized tasks:

| Agent | Purpose |
|-------|---------|
| `architect` | Software architecture and system design |
| `build-error-resolver` | Fix build and TypeScript errors |
| `code-reviewer` | Proactive code quality review |
| `database-reviewer` | Database query and schema review |
| `doc-updater` | Update codemaps and documentation |
| `e2e-runner` | End-to-end testing with Playwright |
| `go-build-resolver` | Go build error resolution |
| `go-reviewer` | Go code review |
| `planner` | Implementation planning for complex features |
| `refactor-cleaner` | Dead code cleanup and consolidation |
| `security-reviewer` | Security vulnerability detection |
| `tdd-guide` | Test-driven development workflow |

### Skills

Key skills for development workflow:

**Core Development Skills:**
- `/convex-development` - Convex backend development (schema, functions, best practices)
- `/plan` - Implementation planning (creates step-by-step plans)
- `/tdd` - Test-driven development (enforces 80%+ coverage)
- `/commit` - Git commits (properly formatted commits)

**Best Practices Skills:**
- `backend-patterns` - Backend architecture, API design, database optimization
- `frontend-patterns` - React, Next.js, state management, performance
- `coding-standards` - TypeScript, JavaScript, React, Node.js best practices
- `security-review` - Security checklist for sensitive features
- `react-best-practices` - 57 performance rules across 8 categories
- `tdd-workflow` - Test-driven development with unit/integration/E2E tests

**Utility Skills:**
- `strategic-compact` - Suggests context compaction at logical intervals
- `continuous-learning` - Extracts reusable patterns from sessions
- `verification-loop` - Iterative verification workflow

**Specialized Skills:**
- `clickhouse-io` - ClickHouse database patterns and analytics
- `postgres-patterns` - PostgreSQL optimization and patterns
- `golang-patterns` - Go language best practices

### Hooks

Automated behaviors triggered by tool use:

**PreToolUse Hooks:**
- **Dev server blocker**: Blocks dev servers outside tmux for log access
- **Tmux reminder**: Suggests tmux for long-running commands
- **Git push reminder**: Prompts review before git push
- **Doc blocker**: Prevents random .md file creation
- **Compact suggester**: Suggests manual compaction intervals

**PostToolUse Hooks:**
- **Prettier formatter**: Auto-formats JS/TS files after edits
- **TypeScript checker**: Type-checks .ts/.tsx files after edits
- **Console.log warning**: Warns about console.log statements
- **Build analyzer**: Async analysis after builds (background)
- **PR logger**: Logs PR URLs after creation

**Session Hooks:**
- **Session start**: Loads previous context and detects package manager
- **Session end**: Persists session state and evaluates for patterns
- **Stop**: Checks for console.log in modified files
- **PreCompact**: Saves state before context compaction

## MCP Servers

MCP (Model Context Protocol) servers extend Claude's capabilities.

### Project MCP Configuration

This project uses **project-specific MCP servers** configured in `.mcp.json` (committed to git).

**Enabled MCPs:**
| MCP Server | Purpose | API Key Required |
|------------|---------|------------------|
| `memory` | Project-specific knowledge graph | No |
| `github` | GitHub operations (PRs, issues, repos) | Yes (GITHUB_TOKEN) |
| `convex` | Convex database operations | No |
| `context7` | Live documentation lookup | Optional (CONTEXT7_API_KEY) |
| `sequential-thinking` | Chain-of-thought reasoning | No |
| `filesystem` | Filesystem operations | No |
| `figma-dev-mode-mcp-server` | Figma Dev Mode integration | No (requires Figma app running) |

### First-Time Setup

1. **Copy the template:**
   ```bash
   cp .claude/settings.local.json.example .claude/settings.local.json
   ```

2. **Add your API keys** to `.claude/settings.local.json`:
   ```json
   {
     "env": {
       "GITHUB_TOKEN": "ghp_your_token_here",
       "CONTEXT7_API_KEY": "ctx7sk_your_key_here (optional)"
     }
   }
   ```

3. **Restart Claude Code** to load the configuration.

### How It Works

- `.mcp.json` defines the MCP servers with `${VAR}` syntax for environment variables
- `.claude/settings.local.json` (git-ignored) contains your actual API keys
- Each team member has their own `settings.local.json` with their keys
- Keys are never committed to git

### Adding More MCPs

To add additional MCP servers, edit `.mcp.json`:

```json
{
  "mcpServers": {
    "firecrawl": {
      "command": "npx",
      "args": ["-y", "firecrawl-mcp"],
      "env": {
        "FIRECRAWL_API_KEY": "${FIRECRAWL_API_KEY}"
      }
    }
  }
}
```

Then add the key to your `.claude/settings.local.json`.

### Context Warning

Keep under 10 MCPs enabled to preserve context window. Disable unused MCPs in `.claude/settings.json`:
```json
{
  "disabledMcpjsonServers": ["firecrawl"]
}
```

## Permissions

Project-specific permissions are defined in `.claude/settings.json`:

**Allowed:**
- All pnpm commands
- Git operations (status, diff, add, commit, log)
- Read/Edit/Write in apps/, packages/, docs/
- npx and node commands

**Ask confirmation:**
- `git push`
- `pnpm convex:deploy`
- Editing `.env` files

**Denied:**
- `curl` commands
- `rm -rf` commands
- Reading `.env` files
- Reading `.claude/settings.local.json`

## Key Skills Reference

### /convex-development

**Use when**: Working with any Convex backend code
- Writing or modifying schema definitions
- Creating queries, mutations, or actions
- Implementing auth or file storage
- Debugging Convex functions
- Optimizing database queries

### /plan

**Use when**: Implementing new features or significant refactoring
- Creates step-by-step implementation plans
- Identifies critical files and architectural trade-offs
- Waits for confirmation before touching code

### /tdd

**Use when**: Writing new features, fixing bugs, or refactoring
- Enforces writing tests first
- Ensures 80%+ test coverage
- Guides unit, integration, and E2E test setup

### /e2e

**Use when**: Testing user flows across applications
- Generates Playwright tests
- Captures screenshots/videos/traces
- Tests critical user journeys

### /commit

**Use when**: Committing changes to git
- Creates properly formatted commits
- Stages appropriate files
- Includes co-authorship attribution

## Plugin Configuration

The project's `.claude/settings.json` enables auto-discovery:

```json
{
  "enabledPlugins": {
    "everything-claude-code@everything-claude-code": true,
    "frontend-design@claude-plugins-official": true,
    "playwright@claude-plugins-official": true
  }
}
```

No additional configuration needed. All agents, skills, and hooks are automatically discovered.

## Project-Specific Configuration

This repository is configured for **fully portable, team-friendly Claude Code setup**:

| File | Purpose | Committed to Git? |
|------|---------|-------------------|
| `.mcp.json` | MCP server definitions | Yes |
| `.claude/settings.json` | Plugins, permissions, MCP controls | Yes |
| `.claude/settings.local.json` | Personal API keys and preferences | No (git-ignored) |
| `.claude/settings.local.json.example` | Template for new team members | Yes |

### Benefits

- ✅ **No manual setup** - Clone and start working
- ✅ **Consistent team experience** - Everyone uses same configuration
- ✅ **Secure** - API keys never committed to git
- ✅ **Portable** - Works across machines
- ✅ **Version controlled** - Configuration evolves with project

## Getting Help

- **Backend questions**: Use `backend-patterns` skill
- **Frontend questions**: Use `frontend-patterns` or `react-best-practices` skill
- **Security review**: Use `security-review` skill
- **Testing**: Use `/tdd` or `/e2e` skills
- **Planning**: Use `/plan` skill
- **Code review**: Code reviewer agent triggers automatically

## Resources

- **everything-claude-code**: https://github.com/affaan-m/everything-claude-code
- **Plugin Docs**: https://docs.anthropic.com/claude-code/plugins
- **MCP Docs**: https://modelcontextprotocol.io
