# Createconomy Monorepo

Digital e-commerce Marketplace with Forum - Multi-domain monorepo built with Next.js, Turborepo, Convex, and Vercel.

## Tech Stack (Latest Stable Versions)

| Package | Version |
|---------|---------|
| Next.js | 16.1.4 |
| React | 19.2.3 |
| Tailwind CSS | 4.1.18 |
| Convex | 1.31.6 |
| Turbo | 2.7.6 |
| TypeScript | 5.9.3 |
| Node.js | v24.12.0 |
| pnpm | 10.28.0 |

## Project Structure

```
CEMVP-0/
├── apps/
│   ├── marketplace/    → createconomy.com
│   ├── forum/          → discuss.createconomy.com
│   ├── admin/          → console.createconomy.com
│   └── seller/         → seller.createconomy.com
├── packages/
│   ├── ui/             # Shared UI components (Shadcn)
│   ├── types/          # TypeScript types
│   ├── config/         # Shared configurations
│   ├── utils/          # Utility functions
│   └── convex/         # Convex schema & auth
├── turbo.json          # Turborepo configuration
└── pnpm-workspace.yaml # pnpm workspace
```

## Getting Started

### Prerequisites

- Node.js >= 24.0.0
- pnpm >= 10.0.0

### Installation

```bash
pnpm install
```

### Development

Run all apps in development mode:

```bash
pnpm dev
```

Run specific app:

```bash
pnpm --filter @createconomy/marketplace dev
pnpm --filter @createconomy/forum dev
pnpm --filter @createconomy/admin dev
pnpm --filter @createconomy/seller dev
```

### Build

Build all packages:

```bash
pnpm build
```

### Testing

Run tests across all packages:

```bash
pnpm test
```

## Deployment

Each app is deployed as a separate Vercel project:

- **Marketplace**: https://createconomy.com
- **Forum**: https://discuss.createconomy.com
- **Admin**: https://console.createconomy.com
- **Seller**: https://seller.createconomy.com

## License

MIT
