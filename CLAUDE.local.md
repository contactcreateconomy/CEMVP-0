# CLAUDE.local.md

This file extends CLAUDE.md with user-specific or environment-specific configuration.

## Local Overrides

Add any local development settings or preferences here that should not be committed to the repository.

## Examples

```bash
# Local development URLs
MARKETPLACE_URL=http://localhost:3000
FORUM_URL=http://localhost:3001
ADMIN_URL=http://localhost:3002
SELLER_URL=http://localhost:3003

# Local Convex
NEXT_PUBLIC_CONVEX_URL=http://localhost:3000
```

## Notes

- This file is git-ignored (see .gitignore)
- Use for environment-specific configuration
- Do not commit secrets or sensitive information
