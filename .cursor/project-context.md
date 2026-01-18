# CEMVP-0 Project Context

## Project Overview
This project uses Cursor AI with Model Context Protocol (MCP) servers for enhanced development capabilities.

## Configured MCP Servers

### Code Quality & Documentation
- **eslint**: Linting and code quality checks
- **context7**: Up-to-date documentation and code examples
- **npm**: npm package management and dependency analysis

### Framework & Development Tools
- **next-devtools**: Next.js development tools and debugging
- **vercel**: Vercel deployment and integration

### Backend Services
- **convex**: Backend database and serverless functions
- **stripe**: Payment processing and customer management

### UI Components
- **shadcn**: shadcn/ui component library integration
- **vision**: Image and visual analysis for UI implementation

### Utilities
- **web-search-prime**: Web search capabilities
- **web-reader**: Web content reading
- **zread**: Repository reading and analysis
- **fs**: Filesystem operations

## Cursor Rules Configuration

Project-specific rules are located in `.cursor/rules/`:

1. **mcp-tools.mdc** - Quick reference for MCP tool usage and workflow order
2. **core-workflow.mdc** - Essential development workflow guidelines
3. **code-style.mdc** - Code style and TypeScript conventions
4. **testing-standards.mdc** - Testing requirements and coverage
5. **deployment-checklist.mdc** - Deployment checklist and process
6. **backend-integration.mdc** - Convex and Stripe integration rules
7. **ui-components.mdc** - UI component development with shadcn/ui

All rules are configured with `alwaysApply: true` to enforce best practices consistently and are kept concise (under 30 lines each) for optimal context window usage.

## Development Workflow

1. **Planning**: Use Plan Mode for complex tasks, clarify requirements before coding
2. **Implementation**: Apply ESLint MCP after changes, use Context7 MCP for documentation
3. **Testing**: Write tests first (TDD), run tests before committing
4. **Deployment**: Use Vercel MCP for deployment checks, Next DevTools MCP for performance analysis
5. **Review**: Use MCP tools to assist in code reviews

## Key Principles

- **Type Safety**: Strict TypeScript, no `any` types
- **Code Quality**: Always run ESLint MCP before committing
- **Performance**: Use Next DevTools MCP for optimization
- **Security**: Never commit secrets, use environment variables
- **Best Practices**: Follow .cursor/rules guidelines consistently

## Getting Started

1. Review the rules in `.cursor/rules/` to understand development standards
2. Familiarize yourself with available MCP servers and their use cases
3. Use Context7 MCP when working with unfamiliar libraries
4. Use ESLint MCP to maintain code quality
5. Use Next DevTools MCP for debugging and optimization

## MCP Tool Quick Reference

- Need documentation? → Use **context7** MCP
- Need to lint code? → Use **eslint** MCP
- Debugging Next.js? → Use **next-devtools** MCP
- Deploying to Vercel? → Use **vercel** MCP
- Payment integration? → Use **stripe** MCP
- Database operations? → Use **convex** MCP
- UI components? → Use **shadcn** MCP
- Analyzing designs? → Use **vision** MCP
- Web research? → Use **web-search-prime** or **web-reader** MCP
- Repo analysis? → Use **zread** MCP
- Package management? → Use **npm** MCP

## Notes

- All MCP servers are configured in `~/.cursor/mcp.json` (global configuration)
- Rules are project-specific in `.cursor/rules/`
- Restart Cursor after MCP configuration changes
- Review and update rules regularly as project evolves
