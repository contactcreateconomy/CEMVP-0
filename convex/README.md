# Convex Backend

This directory contains the Convex backend for the CreateEconomy platform.

## Setup

```bash
# Initialize Convex
npx convex dev
```

## Structure

- `schema.ts` - Database schema definition
- `auth.config.ts` - Convex Auth configuration
- `functions/` - Serverless functions
  - `auth/` - Authentication functions (register, login, logout, refresh)
  - `users/` - User management functions
  - `tenants/` - Tenant management functions
- `http/` - HTTP endpoints

## Authentication

Convex Auth provides unified authentication across all four applications:
- Marketplace (createconomy.com)
- Forum (discuss.createconomy.com)
- Admin (console.createconomy.com)
- Seller (seller.createconomy.com)

All applications share the same session and user context.

## Multi-Tenancy

All database operations include `tenantId` for data isolation. Queries automatically filter by tenant context.

## Development

```bash
# Start development server
npx convex dev

# Deploy to production
npx convex deploy
```

## Documentation

- [Convex Documentation](https://docs.convex.dev/)
- [Convex Auth Documentation](https://docs.convex.dev/auth)
- [API Contracts](../../specs/001-project-init/contracts/README.md)
- [Data Model](../../specs/001-project-init/data-model.md)
