# Tasks: Project Initialization

**Input**: Design documents from `C:\Users\Suren\Documents\GitHub\CEMVP-0\specs\001-project-init\`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are OPTIONAL - tests were not explicitly requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

**Version Policy**: All version references follow plan.md specifications: Next.js 15.5.8, React 19.2.0, TypeScript 5.9.3, Tailwind CSS 4.1.14, pnpm 9.0.0, Turborepo 2.0.0, Convex 1.0.0

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Monorepo**: `apps/`, `packages/` at repository root
- **Applications**: `apps/marketplace/`, `apps/forum/`, `apps/admin/`, `apps/seller/`
- **Packages**: `packages/ui/`, `packages/types/`, `packages/utils/`, `packages/config/`, `packages/eslint-config-custom/`
- **Backend**: `convex/` at repository root
- Paths follow the monorepo structure defined in plan.md

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Initialize Turborepo monorepo with pnpm workspace configuration in package.json
- [X] T002 Create pnpm-workspace.yaml with workspace configuration
- [X] T003 Create turbo.json with build configuration and cache settings
- [X] T004 Create root tsconfig.json with TypeScript strict mode and project references
- [X] T005 Initialize Git repository with .gitignore for monorepo and Convex
- [X] T005a Create initial Git branches (main, develop) following constitution branching strategy
- [X] T006 [P] Create root eslint.config.mjs with TypeScript rules and monorepo overrides
- [X] T007 [P] Create root prettierrc.json with code formatting configuration
- [X] T008 [P] Create root .env.example with environment variable templates
- [X] T009 Create vercel.json with multi-domain deployment configuration
- [X] T010 Update README.md with project overview and setup instructions

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T011 Create packages directory structure (packages/ui, packages/types, packages/utils, packages/config, packages/eslint-config-custom)
- [X] T012 Create apps directory structure (apps/marketplace, apps/forum, apps/admin, apps/seller)
- [X] T013 Create convex directory structure (convex/functions, convex/http)
- [X] T014 Initialize Convex schema in convex/schema.ts with users, sessions, tenants tables
- [X] T015 Create Convex auth configuration in convex/auth.config.ts
- [X] T016 [P] Create packages/ui/package.json with shadcn/ui and React 19.2.0 dependencies
- [X] T017 [P] Create packages/ui/tsconfig.json with TypeScript configuration
- [X] T018 [P] Create packages/ui/src/components/ui directory for shadcn/ui components
- [X] T019 [P] Create packages/ui/src/index.ts for barrel exports
- [X] T020 [P] Create packages/types/package.json with TypeScript dependencies
- [X] T021 [P] Create packages/types/tsconfig.json with TypeScript configuration
- [X] T022 [P] Create packages/types/src/convex directory for Convex types
- [X] T023 [P] Create packages/types/src/database directory for database entity types
- [X] T024 [P] Create packages/types/src/index.ts for barrel exports
- [X] T025 [P] Create packages/utils/package.json with utility function dependencies
- [X] T026 [P] Create packages/utils/tsconfig.json with TypeScript configuration
- [X] T027 [P] Create packages/utils/src/convex directory for Convex utilities
- [X] T028 [P] Create packages/utils/src/format directory for formatting utilities
- [X] T029 [P] Create packages/utils/src/validation directory for validation utilities
- [X] T030 [P] Create packages/utils/src/index.ts for barrel exports
- [X] T031 [P] Create packages/config/package.json with configuration dependencies
- [X] T032 [P] Create packages/config/tsconfig.json with TypeScript configuration
- [X] T033 [P] Create packages/config/src/eslint directory for shared ESLint config
- [X] T034 [P] Create packages/config/src/prettier directory for shared Prettier config
- [X] T035 [P] Create packages/config/src/tailwind directory for shared Tailwind config
- [X] T036 [P] Create packages/config/src/index.ts for barrel exports
- [X] T037 [P] Create packages/eslint-config-custom/package.json with ESLint configuration
- [X] T038 [P] Create packages/eslint-config-custom/index.js with custom ESLint rules
- [X] T039 Initialize shadcn/ui components.json configuration in packages/ui
- [X] T040 Set up Husky for Git hooks pre-commit and pre-push
- [X] T041 Set up lint-staged for pre-commit linting and formatting

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Monorepo Structure Setup (Priority: P1) 🎯 MVP

**Goal**: Establish Turborepo monorepo with four Next.js applications and shared packages

**Independent Test**: Verify monorepo structure exists with separate application folders and shared package folders, dependencies install correctly, and build command succeeds

### Implementation for User Story 1

- [X] T042 [US1] Create apps/marketplace/package.json with Next.js 15.5.8 dependencies
- [X] T043 [US1] Create apps/marketplace/tsconfig.json with TypeScript configuration
- [X] T044 [US1] Create apps/marketplace/tailwind.config.ts with Tailwind CSS configuration
- [X] T045 [US1] Create apps/marketplace/next.config.mjs with Next.js configuration
- [X] T046 [US1] Create apps/marketplace/.env.example with environment variable templates
- [X] T047 [US1] Create apps/marketplace/app directory with layout.tsx and page.tsx
- [X] T048 [P] [US1] Create apps/forum/package.json with Next.js 15.5.8 dependencies
- [X] T049 [P] [US1] Create apps/forum/tsconfig.json with TypeScript configuration
- [X] T050 [P] [US1] Create apps/forum/tailwind.config.ts with Tailwind CSS configuration
- [X] T051 [P] [US1] Create apps/forum/next.config.mjs with Next.js configuration
- [X] T052 [P] [US1] Create apps/forum/.env.example with environment variable templates
- [X] T053 [P] [US1] Create apps/forum/app directory with layout.tsx and page.tsx
- [X] T054 [P] [US1] Create apps/admin/package.json with Next.js 15.5.8 dependencies
- [X] T055 [P] [US1] Create apps/admin/tsconfig.json with TypeScript configuration
- [X] T056 [P] [US1] Create apps/admin/tailwind.config.ts with Tailwind CSS configuration
- [X] T057 [P] [US1] Create apps/admin/next.config.mjs with Next.js configuration
- [X] T058 [P] [US1] Create apps/admin/.env.example with environment variable templates
- [X] T059 [P] [US1] Create apps/admin/app directory with layout.tsx and page.tsx
- [X] T060 [P] [US1] Create apps/seller/package.json with Next.js 15.5.8 dependencies
- [X] T061 [P] [US1] Create apps/seller/tsconfig.json with TypeScript configuration
- [X] T062 [P] [US1] Create apps/seller/tailwind.config.ts with Tailwind CSS configuration
- [X] T063 [P] [US1] Create apps/seller/next.config.mjs with Next.js configuration
- [X] T064 [P] [US1] Create apps/seller/.env.example with environment variable templates
- [X] T065 [P] [US1] Create apps/seller/app directory with layout.tsx and page.tsx
- [X] T066 [US1] Add peerDependencies and workspace configuration to all packages
- [X] T067 [US1] Install dependencies with pnpm install at repository root
- [X] T068 [US1] Verify build works with pnpm build command
- [X] T069 [US1] Verify all four apps run with pnpm dev --filter command (build successful, manual dev verification required)

**Checkpoint**: At this point, monorepo structure is complete and all applications run independently

---

## Phase 4: User Story 2 - Application Framework Setup (Priority: P2)

**Goal**: Create four independent Next.js applications with App Router, TypeScript, and basic routing

**Independent Test**: Start each Next.js dev server independently and access default home pages

### Implementation for User Story 2

- [X] T070 [US2] Create apps/marketplace/app/layout.tsx with root layout and metadata
- [X] T071 [US2] Create apps/marketplace/app/page.tsx with home page
- [X] T072 [US2] Configure apps/marketplace/next.config.mjs with images and optimization settings
- [X] T073 [US2] Create apps/marketplace/app/api directory for API routes
- [X] T074 [P] [US2] Create apps/forum/app/layout.tsx with root layout and metadata
- [X] T075 [P] [US2] Create apps/forum/app/page.tsx with home page
- [X] T076 [P] [US2] Configure apps/forum/next.config.mjs with images and optimization settings
- [X] T077 [P] [US2] Create apps/forum/app/api directory for API routes
- [X] T078 [P] [US2] Create apps/admin/app/layout.tsx with root layout and metadata
- [X] T079 [P] [US2] Create apps/admin/app/page.tsx with home page
- [X] T080 [P] [US2] Configure apps/admin/next.config.mjs with images and optimization settings
- [X] T081 [P] [US2] Create apps/admin/app/api directory for API routes
- [X] T082 [P] [US2] Create apps/seller/app/layout.tsx with root layout and metadata
- [X] T083 [P] [US2] Create apps/seller/app/page.tsx with home page
- [X] T084 [P] [US2] Configure apps/seller/next.config.mjs with images and optimization settings
- [X] T085 [P] [US2] Create apps/seller/app/api directory for API routes
- [ ] T086 [US2] Verify all applications build successfully with pnpm build
- [ ] T087 [US2] Verify all applications run independently on different ports

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Shared Code Infrastructure (Priority: P2)

**Goal**: Create shared packages for UI components, TypeScript types, utilities, and configuration

**Independent Test**: Create a reusable component in shared UI package and import it into each application

### Implementation for User Story 3

- [ ] T088 [P] [US3] Add base shadcn/ui components to packages/ui/src/components/ui (Button, Input, Card, Dialog, Form, Label, Select, Toast, Alert)
- [ ] T089 [P] [US3] Export shadcn/ui components from packages/ui/src/index.ts
- [X] T090 [US3] Create database entity types in packages/types/src/database for users, sessions, tenants, products, orders
- [X] T091 [US3] Create Convex types in packages/types/src/convex for schema and function types
- [X] T092 [US3] Export all types from packages/types/src/index.ts
- [X] T093 [US3] Create formatting utilities in packages/utils/src/format/currency.ts
- [X] T094 [US3] Create formatting utilities in packages/utils/src/format/date.ts
- [ ] T095 [US3] Create Convex utilities in packages/utils/src/convex/auth.ts
- [X] T096 [US3] Create validation utilities in packages/utils/src/validation/email.ts
- [X] T097 [US3] Export all utilities from packages/utils/src/index.ts
- [X] T098 [US3] Create shared ESLint configuration in packages/config/src/eslint/index.mjs
- [X] T099 [US3] Create shared Prettier configuration in packages/config/src/prettier/index.mjs
- [X] T100 [US3] Create shared Tailwind configuration in packages/config/src/tailwind/index.ts
- [X] T101 [US3] Export all configurations from packages/config/src/index.ts
- [ ] T102 [US3] Build shared packages with pnpm build --filter=./packages/*
- [ ] T103 [US3] Create test component in packages/ui/src/components/test-button.tsx
- [ ] T104 [US3] Import test component into apps/marketplace/app/page.tsx
- [ ] T105 [US3] Import test component into apps/forum/app/page.tsx
- [ ] T106 [US3] Import test component into apps/admin/app/page.tsx
- [ ] T107 [US3] Import test component into apps/seller/app/page.tsx
- [ ] T108 [US3] Verify test component renders in all applications
- [ ] T109 [US3] Remove test component after verification

**Checkpoint**: At this point, User Stories 1, 2, AND 3 should all work independently

---

## Phase 6: User Story 4 - Backend Database Integration (Priority: P2)

**Goal**: Configure Convex as backend database with schema and authentication accessible by all applications

**Independent Test**: Initialize Convex, start development server, and verify dashboard connects

### Implementation for User Story 4

- [X] T110 [US4] Update convex/schema.ts with users table schema and indexes (see data-model.md for detailed specifications)
- [X] T111 [US4] Update convex/schema.ts with sessions table schema and indexes (see data-model.md for detailed specifications)
- [X] T112 [US4] Update convex/schema.ts with tenants table schema and indexes (see data-model.md for detailed specifications)
- [X] T113 [US4] Add placeholder tables to convex/schema.ts (products, orders, forumPosts, forumComments - see data-model.md for reference)
- [X] T114 [US4] Create convex/auth.config.ts with Convex Auth configuration (see contracts/README.md for authentication flow)
- [X] T115 [US4] Create convex/README.md with documentation and setup instructions
- [X] T116 [US4] Create convex/functions/auth/register.ts for user registration (matches contracts/README.md POST /auth/register)
- [X] T117 [US4] Create convex/functions/auth/login.ts for user login (matches contracts/README.md POST /auth/login)
- [X] T118 [US4] Create convex/functions/auth/logout.ts for user logout (matches contracts/README.md POST /auth/logout)
- [X] T119 [US4] Create convex/functions/auth/refresh.ts for session refresh (matches contracts/README.md POST /auth/refresh)
- [X] T120 [US4] Create convex/functions/users/me.ts for current user information (matches contracts/README.md GET /users/me)
- [X] T121 [US4] Create convex/functions/tenants/me.ts for current tenant information (matches contracts/README.md GET /tenants/me)
- [X] T122 [US4] Create convex/http/health.ts for health check endpoint (matches contracts/README.md GET /health)
- [ ] T123 [US4] Update all applications' .env.example with Convex environment variables
- [ ] T124 [US4] Update root .env.example with Convex environment variables
- [ ] T125 [US4] Initialize Convex project with npx convex dev
- [ ] T126 [US4] Verify Convex dashboard is accessible
- [ ] T127 [US4] Verify schema is displayed in Convex dashboard
- [ ] T128 [US4] Test user registration function
- [ ] T129 [US4] Test user login function
- [ ] T130 [US4] Verify applications can connect to Convex

### Multi-Tenant Data Isolation (Additional)

- [ ] T211 [US4] Create tenant context utility in packages/utils/src/convex/tenant.ts
- [ ] T212 [US4] Update all Convex query functions to filter by tenant context
- [ ] T213 [US4] Update all Convex mutation functions to validate tenant access
- [ ] T214 [US4] Add tenant identification to Convex auth middleware
- [ ] T215 [US4] Test that tenant A cannot access tenant B's data
- [ ] T216 [US4] Create tenant isolation unit tests for all Convex functions

**Checkpoint**: At this point, User Stories 1, 2, 3, AND 4 should all work independently

---

## Phase 7: User Story 5 - Development Tooling Configuration (Priority: P3)

**Goal**: Configure ESLint, Prettier, TypeScript, and Git hooks for consistent code quality

**Independent Test**: Create a test file with intentional linting errors and run quality check tools

### Implementation for User Story 5

- [ ] T131 [P] [US5] Update packages/eslint-config-custom/index.js with TypeScript rules
- [ ] T132 [US5] Update packages/eslint-config-custom/index.js with React rules for Next.js
- [ ] T133 [US5] Update packages/eslint-config-custom/index.js with accessibility rules
- [ ] T134 [US5] Update root eslint.config.mjs with custom ESLint config extension
- [ ] T135 [US5] Add ESLint overrides for all packages and applications
- [ ] T136 [US5] Update packages/config/src/prettier/index.mjs with formatting rules
- [ ] T137 [US5] Update root prettierrc.json with monorepo overrides
- [ ] T138 [US5] Add Prettier ignore patterns for generated files
- [ ] T139 [US5] Verify ESLint runs without errors with pnpm lint
- [ ] T140 [US5] Verify Prettier formats correctly with pnpm format
- [ ] T141 [US5] Verify TypeScript type checking passes with pnpm type-check
- [ ] T142 [US5] Create test file with intentional linting errors in apps/marketplace
- [ ] T143 [US5] Run pnpm lint and verify errors are detected
- [ ] T144 [US5] Verify pre-commit hooks are configured in package.json
- [ ] T145 [US5] Verify lint-staged is configured for pre-commit checks
- [ ] T146 [US5] Remove test file after verification

### Security Implementation (Additional)

- [ ] T199 [P] [US5] Create CSRF protection utility in packages/utils/src/security/csrf.ts
- [ ] T200 [P] [US5] Create rate limiting middleware in packages/utils/src/security/rateLimit.ts
- [ ] T201 [P] [US5] Create input validation utilities in packages/utils/src/validation/schemas.ts using Zod
- [ ] T202 [US5] Apply CSRF protection to all API routes in apps/marketplace/app/api
- [ ] T203 [P] [US5] Apply CSRF protection to all API routes in apps/forum/app/api
- [ ] T204 [P] [US5] Apply CSRF protection to all API routes in apps/admin/app/api
- [ ] T205 [P] [US5] Apply CSRF protection to all API routes in apps/seller/app/api
- [ ] T206 [US5] Apply rate limiting to all API routes in apps/marketplace/app/api
- [ ] T207 [P] [US5] Apply rate limiting to all API routes in apps/forum/app/api
- [ ] T208 [P] [US5] Apply rate limiting to all API routes in apps/admin/app/api
- [ ] T209 [P] [US5] Apply rate limiting to all API routes in apps/seller/app/api
- [ ] T210 [US5] Validate all Convex function inputs using Zod schemas

**Checkpoint**: At this point, all user stories should have code quality tools configured

---

## Phase 7.5: Development Tools & Testing Infrastructure (Priority: P3)

**Goal**: Configure Next DevTools integration and set up basic test infrastructure

**Independent Test**: Run Next DevTools to analyze component performance and execute test suites

### Implementation for Development Tools & Testing

- [ ] T178 [P] [US5] Install and configure Next DevTools MCP integration in all applications
- [ ] T179 [P] [US5] Create Jest/Vitest configuration in root jest.config.js for unit tests
- [ ] T180 [P] [US5] Create Playwright configuration in root playwright.config.ts for E2E tests
- [ ] T181 [P] [US5] Create test setup utilities in packages/utils/src/testing/mockData.ts
- [ ] T182 [P] [US5] Create test setup utilities in packages/utils/src/testing/testHelpers.ts
- [ ] T183 [US5] Create unit test for shared UI components in packages/ui
- [ ] T184 [US5] Create integration test for Convex functions in convex/
- [ ] T185 [US5] Create E2E test for basic application routing in apps/marketplace
- [ ] T186 [US5] Create E2E test for Convex connectivity in apps/marketplace
- [ ] T187 [US5] Verify Next DevTools MCP connects to all applications
- [ ] T188 [US5] Verify test suites run with pnpm test (unit) and pnpm test:e2e
- [ ] T189 [US5] Verify test coverage report shows >= 80% for critical paths
- [ ] T190 [US5] Update package.json with test scripts (test, test:watch, test:e2e, test:coverage)

**Checkpoint**: At this point, development tools and testing infrastructure should be operational

---

## Phase 8: User Story 6 - Configuration Management Setup (Priority: P3)

**Goal**: Set up environment variable management for different environments and applications

**Independent Test**: Create configuration files for different environments and verify applications load correct settings

### Implementation for User Story 6

- [ ] T147 [P] [US6] Create apps/marketplace/.env.development with development environment variables
- [ ] T148 [P] [US6] Create apps/marketplace/.env.production with production environment variables
- [ ] T149 [P] [US6] Create apps/forum/.env.development with development environment variables
- [ ] T150 [P] [US6] Create apps/forum/.env.production with production environment variables
- [ ] T151 [P] [US6] Create apps/admin/.env.development with development environment variables
- [ ] T152 [P] [US6] Create apps/admin/.env.production with production environment variables
- [ ] T153 [P] [US6] Create apps/seller/.env.development with development environment variables
- [ ] T154 [P] [US6] Create apps/seller/.env.production with production environment variables
- [ ] T155 [US6] Create packages/config/src/environment/index.ts with environment variable validation
- [ ] T156 [US6] Export environment configuration from packages/config/src/index.ts
- [ ] T157 [US6] Create configuration loader in apps/marketplace/lib/config.ts
- [ ] T158 [US6] Create configuration loader in apps/forum/lib/config.ts
- [ ] T159 [US6] Create configuration loader in apps/admin/lib/config.ts
- [ ] T160 [US6] Create configuration loader in apps/seller/lib/config.ts
- [ ] T161 [US6] Verify applications load correct environment variables
- [ ] T162 [US6] Verify configuration works in development and production
- [ ] T163 [US6] Test environment variable validation with invalid values

**Checkpoint**: At this point, all user stories should have configuration management working

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T164 [P] Update README.md with getting started guide reference to quickstart.md
- [ ] T165 [P] Update README.md with architecture reference to plan.md
- [ ] T166 [P] Update README.md with API documentation reference to contracts/README.md
- [ ] T167 [P] Update README.md with data model reference to data-model.md
- [ ] T168 [P] Update .gitignore with additional patterns for monorepo
- [ ] T169 [P] Update .gitignore with Convex-specific patterns
- [ ] T170 Run pnpm format on all files to ensure consistent formatting
- [ ] T171 Run pnpm lint on all files to ensure no linting errors
- [ ] T172 Run pnpm type-check on all files to ensure no type errors
- [ ] T173 Run pnpm build on all packages and applications
- [ ] T174 Verify all four applications run with pnpm dev
- [ ] T175 Verify Convex development server connects to all applications
- [ ] T176 Create initial commit with comprehensive message
- [ ] T177 Update quickstart.md with any additional setup steps discovered

---

## Phase 9.5: Edge Case Handling & Error Management

**Purpose**: Implement handling for identified edge cases

- [ ] T191 [P] Create pnpm script to detect duplicate dependencies across packages
- [ ] T192 [P] Add dependency conflict resolution documentation to README.md
- [ ] T193 Create Convex error handling middleware for connection failures
- [ ] T194 [P] Create configuration validation utility in packages/utils/src/validation/config.ts
- [ ] T195 Add config validation check at application startup in all apps
- [ ] T196 [P] Create circular dependency detection script for package analysis
- [ ] T197 Add pre-commit hook to check for circular dependencies
- [ ] T198 Add pre-build check to ensure all dependencies installed (pnpm install --frozen-lockfile)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (Phase 4)**: Depends on Foundational (Phase 2) - Can run in parallel with User Story 1
- **User Story 3 (Phase 5)**: Depends on Foundational (Phase 2) AND User Story 1 - Can run in parallel with User Story 2
- **User Story 4 (Phase 6)**: Depends on Foundational (Phase 2) AND User Story 1 - Can run in parallel with User Stories 2 and 3
- **User Story 5 (Phase 7)**: Depends on Foundational (Phase 2) AND User Story 3 - Can run in parallel with User Stories 2 and 4
- **Development Tools & Testing (Phase 7.5)**: Depends on Foundational (Phase 2) - Can run in parallel with User Story 6
- **User Story 6 (Phase 8)**: Depends on Foundational (Phase 2) AND User Story 3 - Can run in parallel with User Stories 4, 5, and 7.5
- **Polish (Phase 9)**: Depends on all desired user stories being complete
- **Edge Case Handling (Phase 9.5)**: Depends on Foundational (Phase 2) - Can run after all other phases

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Independent of US1
- **User Story 3 (P2)**: Depends on US1 (needs apps to import shared packages) - Independent of US2 and US4
- **User Story 4 (P2)**: Depends on US1 (needs apps to connect to Convex) - Independent of US2 and US3
- **User Story 5 (P3)**: Depends on US3 (needs shared packages configured) - Independent of US1, US2, US4, US6
- **User Story 6 (P3)**: Depends on US3 (needs configuration package) - Independent of US1, US2, US4, US5

### Within Each User Story

- Setup and foundational tasks follow specified order
- Package and app creation can be parallel
- Shared package tasks before app-specific integration
- Configuration before validation
- Test before cleanup

### Parallel Opportunities

**Phase 1 - Setup**:
- All tasks marked [P] (T006-T009) can run in parallel

**Phase 2 - Foundational**:
- All tasks marked [P] (T016-T038) can run in parallel within Phase 2
- Each package (ui, types, utils, config, eslint-config-custom) can be created in parallel

**Phase 3 - User Story 1**:
- Tasks T048-T065 (forum, admin, seller setup) can run in parallel with marketplace setup
- Each app's package.json, tsconfig, tailwind, next.config can be created in parallel

**Phase 4 - User Story 2**:
- Tasks for forum (T074-T077) can run in parallel with marketplace
- Tasks for admin (T078-T081) can run in parallel with marketplace and forum
- Tasks for seller (T082-T085) can run in parallel with marketplace, forum, and admin

**Phase 5 - User Story 3**:
- Tasks T088-T089 (UI components) can run in parallel with T090-T092 (types)
- Tasks T093-T097 (utilities) can run in parallel with types and UI components
- Tasks T098-T101 (config) can run in parallel with types, UI, and utilities

**Phase 6 - User Story 4**:
- Tasks T110-T113 (schema) can run in parallel with T114-T122 (functions and config)
- T123-T124 (environment variables) can run in parallel with schema and functions

**Phase 7 - User Story 5**:
- Tasks T131-T132 (ESLint config) can run in parallel with T136-T137 (Prettier config)
- Tasks T142-T143 (test verification) sequential after configuration
- Tasks T199-T210 (security implementation) can run in parallel with T131-T146

**Phase 7.5 - Development Tools & Testing**:
- All tasks T178-T182 (setup) can run in parallel
- Tasks T183-T189 (test implementation) can run in parallel with setup
- Tasks T187-T190 (verification) sequential after test implementation

**Phase 8 - User Story 6**:
- All tasks T147-T154 (environment files) can run in parallel
- T155-T156 (configuration package) sequential before T157-T163 (app loaders)
- T157-T160 (app loaders) can run in parallel

**Phase 9 - Polish**:
- All tasks T164-T167 (README updates) can run in parallel
- Tasks T168-T173 (validation and builds) sequential in order

**Phase 9.5 - Edge Case Handling**:
- All tasks T191-T192, T194, T196-T197 can run in parallel
- Tasks T193, T195, T198 are sequential and depend on parallel tasks

**Multiple Developers**:
Once Foundational phase completes:
- Developer A: User Story 1 + User Story 3
- Developer B: User Story 2 + User Story 4
- Developer C: User Story 5 + User Story 6
All stories complete and integrate independently

---

## Parallel Example: User Story 1

```bash
# Create all four applications in parallel:
Task: "Create apps/marketplace/package.json with Next.js 15.5.8 dependencies"
Task: "Create apps/forum/package.json with Next.js 15.5.8 dependencies"
Task: "Create apps/admin/package.json with Next.js 15.5.8 dependencies"
Task: "Create apps/seller/package.json with Next.js 15.5.8 dependencies"

# Create all TypeScript configs in parallel:
Task: "Create apps/marketplace/tsconfig.json with TypeScript configuration"
Task: "Create apps/forum/tsconfig.json with TypeScript configuration"
Task: "Create apps/admin/tsconfig.json with TypeScript configuration"
Task: "Create apps/seller/tsconfig.json with TypeScript configuration"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T010)
2. Complete Phase 2: Foundational (T011-T041) CRITICAL - blocks all stories
3. Complete Phase 3: User Story 1 (T042-T069)
4. **STOP and VALIDATE**: Verify monorepo structure, dependencies install correctly, all apps run
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Add User Story 4 → Test independently → Deploy/Demo
6. Add User Story 5 + Development Tools & Testing → Test independently → Deploy/Demo
7. Add User Story 6 → Test independently → Deploy/Demo
8. Complete Edge Case Handling → Finalize error management
9. Complete Polish → Final deployment

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 + User Story 3
   - Developer B: User Story 2 + User Story 4
   - Developer C: User Story 5 + Development Tools & Testing + User Story 6
3. All stories complete and integrate independently
4. Team collaborates on Edge Case Handling and Polish phases

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
- Tests are OPTIONAL as they were not explicitly requested in the feature specification
- All configuration MUST follow constitution principles established in `.specify/memory/constitution.md`
- All work MUST follow technology stack decisions documented in `research.md`
- All database schemas MUST follow the design documented in `data-model.md`
- All API endpoints MUST follow the contracts documented in `contracts/README.md`
