# CreateEconomy Digital AI Workflow Marketplace

CreateEconomy is a platform for discovering, purchasing, and deploying AI workflows across multiple domains. Built with Next.js, Turborepo, Convex, and shadcn/ui.

## 🚀 Quick Start

### Prerequisites

- Node.js 18.0.0 or higher
- pnpm 9.0.0 or higher

### Installation

```bash
# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env

# Start development servers
pnpm dev
```

### Project Structure

```
createconomy/
├── apps/                      # Next.js applications
│   ├── marketplace/          # createconomy.com
│   ├── forum/                # discuss.createconomy.com
│   ├── admin/                # console.createconomy.com
│   └── seller/               # seller.createconomy.com
├── packages/                 # Shared packages
│   ├── ui/                   # shadcn/ui components
│   ├── types/                # TypeScript types
│   ├── utils/                # Utility functions
│   ├── config/               # Shared configurations
│   └── eslint-config-custom/ # ESLint configuration
├── convex/                   # Convex backend
│   ├── schema.ts            # Database schema
│   ├── auth.config.ts       # Authentication config
│   ├── functions/           # Serverless functions
│   └── http/                # HTTP endpoints
├── specs/                    # Feature specifications
└── docs/                     # Documentation
```

## 📚 Documentation

- [Quick Start Guide](specs/001-project-init/quickstart.md) - Detailed setup instructions
- [Architecture Plan](specs/001-project-init/plan.md) - Technical architecture and design decisions
- [API Contracts](specs/001-project-init/contracts/README.md) - API specifications
- [Data Model](specs/001-project-init/data-model.md) - Database schema and relationships
- [Research](specs/001-project-init/research.md) - Technical research and decisions

## 🛠️ Development

### Available Scripts

```bash
# Build all packages and applications
pnpm build

# Start all development servers
pnpm dev

# Run linting
pnpm lint

# Format code
pnpm format

# Type check
pnpm type-check

# Run tests
pnpm test

# Run E2E tests
pnpm test:e2e
```

### Building Specific Apps

```bash
# Build specific app
pnpm build --filter @createconomy/marketplace

# Run specific app in dev mode
pnpm dev --filter @createconomy/marketplace
```

## 🌐 Domains

- **Marketplace**: [createconomy.com](https://createconomy.com) - Main marketplace for AI workflows
- **Forum**: [discuss.createconomy.com](https://discuss.createconomy.com) - Community discussions
- **Admin**: [console.createconomy.com](https://console.createconomy.com) - Administration console
- **Seller**: [seller.createconomy.com](https://seller.createconomy.com) - Seller portal

## 🏗️ Architecture

This project follows the **Multi-Domain Monorepo Architecture** principle:

- **Turborepo** for build orchestration and caching
- **pnpm workspaces** for efficient dependency management
- **Convex** for unified backend database and authentication
- **shadcn/ui + Tailwind CSS** for consistent design system
- **Multi-tenant** data isolation for all applications

See the [Architecture Plan](specs/001-project-init/plan.md) for more details.

## 🎯 Tech Stack

- **Frontend**: Next.js 15.5.8, React 19.2.0, TypeScript 5.9.3
- **Styling**: Tailwind CSS 4.1.14, shadcn/ui
- **Backend**: Convex 1.0.0
- **Package Manager**: pnpm 9.0.0
- **Build Tool**: Turborepo 2.0.0
- **Hosting**: Vercel (multi-domain deployment)

## 📄 License

Proprietary - All rights reserved

## 🤝 Contributing

See the [Constitution](.specify/memory/constitution.md) for development principles and guidelines.

## 🔐 Security

All applications follow security-first design principles:
- Multi-tenant data isolation
- Single session authentication across domains
- Environment variable management for secrets
- CSRF protection and rate limiting
- Input validation with Zod

## 📞 Support

For support and questions, please refer to the [Forum](https://discuss.createconomy.com) or contact the development team.
