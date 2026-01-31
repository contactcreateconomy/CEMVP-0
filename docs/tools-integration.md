# Tools Integration

This document covers the installed plugins, MCP servers, and configuration available in this project.

## Installed Plugins

Plugins are auto-discovered via `.claude/settings.json`.

### frontend-design

**Source**: Official Claude Code plugin

**Purpose**: Create distinctive, production-grade frontend interfaces with high design quality. Generates creative, polished code that avoids generic AI aesthetics.

**Use when**: Building web components, pages, or applications that require thoughtful UI design.

### playwright

**Source**: Official Claude Code plugin

**Purpose**: End-to-end testing with Playwright.

**Use when**: Testing user flows across applications.

## MCP Servers

MCP (Model Context Protocol) servers extend Claude's capabilities.

### Project MCP Configuration

This project uses **project-specific MCP servers** configured in `~/.claude.json`.

**Enabled MCPs:**
| MCP Server | Purpose | API Key Required |
|------------|---------|------------------|
| `memory` | Project-specific knowledge graph | No |
| `github` | GitHub operations (PRs, issues, repos) | Yes (GITHUB_TOKEN) |
| `convex` | Convex database operations | No |
| `context7` | Live documentation lookup | Optional (CONTEXT7_API_KEY) |
| `sequential-thinking` | Chain-of-thought reasoning | No |
| `filesystem` | Filesystem operations | No |
| `shadcn` | Shadcn UI component discovery and installation | No |

### Global MCP Servers

Additional MCP servers are configured at user level in `~/.claude.json`:
- `zai-mcp-server` - Image/video analysis
- `web-search-prime` - Web search
- `web-reader` - Web content fetching
- `zread` - Image/OCR/video tools

### First-Time Setup

To add API keys for MCP servers, edit `~/.claude.json`:

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_your_token_here"
      }
    }
  }
}
```

### Context Warning

Keep under 10 MCPs enabled to preserve context window.

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

## Plugin Configuration

The project's `.claude/settings.json` enables auto-discovery:

```json
{
  "enabledPlugins": {
    "frontend-design@claude-plugins-official": true,
    "playwright@claude-plugins-official": true
  }
}
```

## Project-Specific Configuration

This repository is configured for **fully portable, team-friendly Claude Code setup**:

| File | Purpose | Committed to Git? |
|------|---------|-------------------|
| `.claude/settings.json` | Plugins, permissions | Yes |
| `.claude/settings.local.json` | Personal API keys and preferences | No (git-ignored) |

### Benefits

- ✅ **No manual setup** - Clone and start working
- ✅ **Consistent team experience** - Everyone uses same configuration
- ✅ **Secure** - API keys never committed to git
- ✅ **Portable** - Works across machines

## Resources

- **Plugin Docs**: https://docs.anthropic.com/claude-code/plugins
- **MCP Docs**: https://modelcontextprotocol.io
