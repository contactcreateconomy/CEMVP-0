---
description: Deploy all 4 apps to production
---

You are deploying all Createconomy applications to production.

## Architecture

This monorepo has 4 apps, each deploying to a separate domain:

| App | Domain | Vercel Project |
|-----|--------|----------------|
| marketplace | createconomy.com | createconomy-marketplace |
| forum | discuss.createconomy.com | createconomy-forum |
| admin | console.createconomy.com | createconomy-admin |
| seller | seller.createconomy.com | createconomy-seller |

All apps share a single Convex backend.

## Deployment Steps

### 1. Deploy Convex Backend

```bash
pnpm convex:deploy
```

This deploys the schema and functions to your Convex production deployment.

### 2. Build All Apps

```bash
pnpm build
```

Turborepo will build all packages in dependency order.

### 3. Deploy Apps to Vercel

Each app has its own Vercel project. Deploy individually:

```bash
# Marketplace
cd apps/marketplace && vercel --prod

# Forum
cd apps/forum && vercel --prod

# Admin
cd apps/admin && vercel --prod

# Seller
cd apps/seller && vercel --prod
```

Or use the Vercel dashboard to deploy all apps.

## Environment Variables

Each app needs these environment variables in Vercel:

**Common:**
- `NEXT_PUBLIC_CONVEX_URL` - Convex deployment URL
- `CONVEX_ADMIN_KEY` - Convex admin key

**App URLs:**
- `MARKETPLACE_URL` - Production marketplace URL
- `FORUM_URL` - Production forum URL
- `ADMIN_URL` - Production admin URL
- `SELLER_URL` - Production seller URL

**Stripe (when implemented):**
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

## Verification Checklist

After deployment:

- [ ] Convex dashboard shows correct schema
- [ ] Each app loads at its domain
- [ ] Tenant detection works (check hostname)
- [ ] Multi-tenancy isolates data correctly
- [ ] Environment variables are set in Vercel
- [ ] No console errors in browser
- [ ] API routes respond correctly

## Rollback Procedure

If deployment fails:

1. **Vercel**: Use Vercel dashboard to rollback to previous deployment
2. **Convex**: `pnpm convex:deploy` with previous commit's schema

## Troubleshooting

### Build Failures

```bash
# Clear build artifacts
pnpm clean

# Rebuild
pnpm build
```

### Convex Deployment Issues

```bash
# Check Convex status
pnpm convex:dev --status

# View deployment logs
npx convex logs
```

### Environment Variable Issues

- Verify variables in Vercel dashboard
- Check for typos in variable names
- Ensure `NEXT_PUBLIC_` prefix for client-accessible vars

## Pre-Deployment Checklist

- [ ] All tests pass: `pnpm test`
- [ ] Type check passes: `pnpm type-check`
- [ ] Lint passes: `pnpm lint`
- [ ] Build succeeds: `pnpm build`
- [ ] No console.log statements (hooks will warn)
- [ ] Environment variables documented
- [ ] Schema changes are backward compatible
