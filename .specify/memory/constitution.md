<!--
SYNC IMPACT REPORT
==================
Version Change: Initial → 1.0.0
Version Rationale: MAJOR - Initial constitution creation for Digital AI Workflow Marketplace project

Modified Principles: None (initial version)

Added Sections:
- Core Principles (6 principles)
- Technology Stack Standards
- Quality Standards
- Development Workflow
- Governance & Compliance

Removed Sections: None (initial version)

Templates Status:
- plan-template.md: ✅ Aligned - No changes needed
- spec-template.md: ✅ Aligned - No changes needed
- tasks-template.md: ✅ Aligned - No changes needed

Follow-up TODOs: None
-->

# CreateEconomy Constitution

## Core Principles

### I. Multi-Domain Monorepo Architecture

The platform MUST use a Vercel monorepo structure with Turborepo, deploying separate applications to distinct domains. Each application (marketplace, forum, admin, seller) MUST be an independent Next.js app in `/apps/` directory. Shared code MUST live in `/packages/`. Domain routing MUST be configured at Vercel level. Cross-app communication MUST use shared packages, not direct imports. This principle ensures scalability, independent deployment cycles, and clear domain boundaries for buyers, sellers, administrators, and community members.

### II. Mobile-First SEO & Performance

All applications MUST prioritize mobile-first design, with mobile optimization as the baseline, not an afterthought. Every page MUST achieve good Core Web Vitals (LCP < 2.5s, FID < 100ms, CLS < 0.1). Semantic HTML MUST be used throughout for proper SEO structure. Images MUST be optimized with next/image. Critical above-the-fold content MUST be prioritized. Lazy loading MUST be applied to non-critical resources. Performance monitoring MUST be continuous via Lighthouse and Web Vitals API. This principle ensures the platform ranks well in search engines and provides excellent user experience across all devices globally.

### III. Security-First Design

All applications MUST meet modern security standards for e-commerce platforms. All user inputs MUST be validated on both client and server. Environment variables MUST be used for all secrets (API keys, Stripe keys, Convex keys). HTTPS MUST be enforced everywhere. CSRF protection MUST be implemented. Rate limiting MUST be applied to API endpoints. Sensitive data MUST never be exposed to client-side code. Stripe webhook signatures MUST be validated. Security dependencies MUST be audited regularly. This principle protects user data, transactions, and builds trust across global markets.

### IV. Multi-Tenant Data Isolation

The platform MUST support multi-tenancy with strict data isolation between tenants (customers, sellers, administrators). Convex document schemas MUST include tenant identification fields. Queries MUST filter by tenant context automatically. No tenant MUST be able to access another tenant's data through API calls or Convex functions. Cross-tenant operations MUST be explicitly restricted at the function level. Tenant-specific indexes MUST be optimized. Data cleanup MUST be comprehensive on tenant deletion. This principle enables serving multiple organizations or user groups while maintaining data privacy and compliance.

### V. Single Session Authentication

Convex Auth MUST provide single login session management across all four domains. User authentication state MUST synchronize seamlessly between marketplace, forum, admin, and seller portals. Session tokens MUST be shared via Convex. Cross-domain authentication MUST use Convex's built-in session management. Logout from one domain MUST invalidate sessions across all domains. Session timeouts MUST be consistent across applications. Authentication MUST be the gatekeeper for all protected routes. This principle provides seamless user experience while maintaining security across the entire platform ecosystem.

### VI. Component Reusability & Design System

UI components MUST leverage shadcn/ui with Tailwind CSS for consistency. Components MUST be shared via packages directory, not duplicated across apps. Custom components MUST follow shadcn/ui patterns. Design tokens (colors, spacing, typography) MUST be centralized. Dark mode MUST be supported across all applications. Accessibility MUST meet WCAG AA standards. Components MUST be responsive across all breakpoints. This principle ensures visual consistency, faster development, and easier maintenance across all four applications.

## Technology Stack Standards

### Frontend
- **Framework**: Next.js (Latest stable version with App Router)
- **Styling**: Tailwind CSS with custom theme
- **Components**: shadcn/ui component library
- **Package Manager**: pnpm for monorepo management

### Backend
- **Runtime**: Node.js (LTS version)
- **Framework**: Next.js API Routes + Convex Functions
- **Database**: Convex (serverless real-time database)
- **Authentication**: Convex Auth with session management

### Deployment & Infrastructure
- **Hosting**: Vercel with Turborepo monorepo
- **Domains**: Separate deployments for each app (createconomy.com, discuss.createconomy.com, console.createconomy.com, seller.createconomy.com)
- **CI/CD**: Vercel Git integration with preview deployments

### Third-Party Services
- **Payments**: Stripe Checkout (starting with test mode)
- **Analytics**: Vercel Analytics + Custom Convex analytics
- **Monitoring**: Vercel Logs + Custom error tracking

### Development Tools
- **Linting**: ESLint with TypeScript rules
- **Formatting**: Prettier
- **Testing**: Jest/Vitest + Playwright for E2E
- **Type Safety**: TypeScript strict mode enabled

## Quality Standards

### Performance Benchmarks
- **First Contentful Paint (FCP)**: < 1.8s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **First Input Delay (FID)**: < 100ms
- **Cumulative Layout Shift (CLS)**: < 0.1
- **Time to Interactive (TTI)**: < 3.8s

### Code Quality
- TypeScript strict mode MUST be enforced
- ESLint MUST pass with no errors before committing
- Code coverage MUST be maintained at 80%+ for critical paths
- Function complexity MUST be kept low (Cyclomatic complexity < 10)
- File size MUST be kept reasonable (< 500 lines per file)

### SEO Standards
- Meta tags MUST be complete and unique per page
- Structured data (Schema.org) MUST be implemented where appropriate
- Sitemap.xml MUST be generated and submitted to search engines
- Robots.txt MUST be configured correctly
- Internal linking structure MUST be logical and crawlable

### Accessibility Standards
- WCAG AA compliance MUST be met
- Keyboard navigation MUST work for all interactive elements
- ARIA labels MUST be provided where needed
- Color contrast ratios MUST meet AA standards (4.5:1 for normal text)
- Alt text MUST be provided for all images

## Development Workflow

### Feature Development Process
1. **Specification**: Create detailed feature spec using `/speckit.spec`
2. **Planning**: Create implementation plan using `/speckit.plan`
3. **Tasks**: Break down into actionable tasks using `/speckit.tasks`
4. **Implementation**: Code following this constitution and .cursor/rules
5. **Testing**: Test thoroughly (unit, integration, E2E)
6. **Review**: Code review with ESLint MCP checks
7. **Deploy**: Deploy to preview, validate, then production

### Branching Strategy
- `main`: Production-ready code
- `develop`: Integration branch for features
- `feature/*`: Feature branches (e.g., `feature/marketplace-checkout`)
- `fix/*`: Bug fixes (e.g., `fix/stripe-webhook-error`)
- `chore/*`: Maintenance tasks (e.g., `chore/update-dependencies`)

### Commit Standards
- Commits MUST be frequent and focused
- Commit messages MUST be clear and follow conventional commits format
- Tests MUST pass before committing
- ESLint MUST pass before committing
- Changes MUST be reviewed before merging to main

### Deployment Process
1. Create feature branch from `develop`
2. Develop and test locally
3. Open pull request with spec/plan reference
4. Deploy to preview environment
5. Test thoroughly in preview
6. Get approval from team
7. Merge to `develop`
8. Deploy to staging
9. Final validation
10. Merge to `main` for production

## Governance & Compliance

### Constitution Authority
This constitution supersedes all other development practices and guidelines. It establishes non-negotiable standards for the CreateEconomy platform. All feature specifications, implementation plans, and code changes MUST comply with these principles.

### Amendment Process
1. Amendment proposal MUST be documented with rationale
2. Impact analysis MUST be conducted across all dependent templates
3. Team discussion and approval required for changes
4. Version MUST be bumped according to semantic versioning
5. Dependent templates MUST be updated synchronously
6. Sync Impact Report MUST be generated and reviewed
7. Changes MUST be communicated to all stakeholders

### Versioning Policy
- **MAJOR (X.0.0)**: Backward incompatible changes - principle removals or redefinitions
- **MINOR (0.X.0)**: New principles or substantial expansions to existing sections
- **PATCH (0.0.X)**: Clarifications, wording improvements, non-semantic refinements

### Compliance Review
All pull requests MUST verify compliance with:
1. This constitution (principles and standards)
2. .cursor/rules (development workflow and best practices)
3. MCP tool integration guidelines
4. Security and accessibility requirements
5. Performance benchmarks

### Non-Compliance Handling
- Violations MUST be documented in pull request comments
- Justification MUST be provided for intentional deviations
- Complex solutions MUST have simpler alternatives evaluated
- Team lead approval required for waivers
- All waivers MUST be tracked and reviewed periodically

### Integration with Cursor Rules
This constitution works synergistically with .cursor/rules:
- **Constitution**: High-level architectural principles and project standards
- **.cursor/rules**: Detailed development practices, tool usage, and workflows

No duplication exists between this constitution and .cursor/rules:
- Constitution focuses on: Architecture, Technology Stack, Quality Standards, Governance
- .cursor/rules focus on: Implementation details, MCP tool usage, Code style, Testing practices

Both MUST be followed - they are complementary, not redundant.

**Version**: 1.0.0 | **Ratified**: 2026-01-18 | **Last Amended**: 2026-01-18
