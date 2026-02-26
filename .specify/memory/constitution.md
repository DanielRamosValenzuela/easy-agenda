<!--
  Sync Impact Report
  ==================
  Version change: 0.0.0 (template) → 1.0.0
  Modified principles: N/A (initial creation)
  Added sections:
    - Core Principles (6 principles)
    - Tech Stack & Constraints
    - Development Workflow
    - Governance
  Removed sections: N/A
  Templates requiring updates:
    - .specify/templates/plan-template.md ✅ compatible (Constitution Check section exists)
    - .specify/templates/spec-template.md ✅ compatible (user stories + requirements align)
    - .specify/templates/tasks-template.md ✅ compatible (FSD phase structure fits)
  Follow-up TODOs: None
-->

# EasyAgenda Constitution

## Core Principles

### I. Feature-Sliced Design (FSD) Architecture (NON-NEGOTIABLE)

All source code MUST follow Feature-Sliced Design methodology with strict
unidirectional imports across layers:

- **Layers (top → bottom)**: `app/ → pages/ → widgets/ → features/ → entities/ → shared/`
- A module MUST only import from layers **strictly below it**
- Modules on the **same layer** MUST NOT import from each other
- Each slice (except `app/` and `shared/`) MUST expose a public API via `index.ts`
- Internal segments (`ui/`, `model/`, `api/`, `lib/`, `config/`) MUST NOT be imported directly from outside the slice
- Next.js `app/` directory handles routing only — route pages MUST be thin compositions of widgets and features

**Rationale**: FSD enforces separation of concerns, prevents circular dependencies,
and makes the codebase navigable by domain rather than technical role.

### II. Server Components First

All React components MUST be Server Components by default.

- `"use client"` directive MUST only be added when strictly required (event handlers, hooks, browser APIs)
- Data fetching and business logic MUST live in Server Components or FSD layer modules, not in client components
- Client components MUST be as small and focused as possible

**Rationale**: Server Components reduce bundle size, improve performance, and
simplify data flow by keeping logic on the server.

### III. Type Safety (NON-NEGOTIABLE)

TypeScript MUST be used in strict mode across the entire codebase.

- All function parameters and return types MUST be explicitly typed or correctly inferred
- `any` type MUST NOT be used — use `unknown` with type narrowing instead
- Zod schemas SHOULD be used for runtime validation at system boundaries (user input, API responses)
- Supabase generated types MUST be used for database interactions

**Rationale**: Strict typing catches bugs at compile time and serves as
living documentation for data structures.

### IV. Simplicity & YAGNI

Every piece of code MUST serve a current, concrete requirement.

- MUST NOT add features, abstractions, or configurations for hypothetical future needs
- MUST NOT create helper utilities for one-time operations
- Three similar lines of code are preferred over a premature abstraction
- Error handling and validation MUST only be added at system boundaries (user input, external APIs)
- MUST NOT add comments, docstrings, or type annotations to code that was not changed

**Rationale**: Premature abstraction increases cognitive load and maintenance
burden without delivering value.

### V. Public API Boundaries

Every FSD slice MUST expose a single public API through its `index.ts`.

- External consumers MUST import from the slice's `index.ts`, never from internal segments
- `shared/ui/` hosts all shadcn/ui components, customized through Tailwind
- `shared/api/` hosts the Supabase client setup and shared data-fetching utilities
- `shared/lib/` hosts generic helper functions detached from business logic

**Rationale**: Public API boundaries enable safe refactoring inside slices
without breaking consumers, and make dependencies explicit.

### VI. Spanish-First UI

All user-facing text MUST be written in Spanish as the primary language.

- UI labels, error messages, validation messages, and placeholder text MUST be in Spanish
- Technical identifiers (variable names, file names, commit messages) remain in English
- Future i18n support SHOULD be planned but MUST NOT be implemented until explicitly requested

**Rationale**: The target audience is Spanish-speaking. Keeping technical
code in English maintains compatibility with the ecosystem.

## Tech Stack & Constraints

The following technologies form the approved stack. Any additions MUST be
justified and documented in this section before installation.

| Category | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | 16.1.6 |
| UI Library | React | 19.2.3 |
| Language | TypeScript | ^5 (strict) |
| Styling | Tailwind CSS | v4 |
| Component Library | shadcn/ui | (via shared/ui/) |
| Database | Supabase (PostgreSQL) | — |
| Linting | ESLint (flat config) | ^9 |
| CSS Processing | @tailwindcss/postcss | ^4 |
| Path Alias | `@/*` → project root | — |

### Installed Libraries Log

> This section tracks every library added to the project beyond the initial
> scaffold. Update this table whenever a new dependency is installed.

| Library | Version | Type | Date | Purpose |
|---|---|---|---|---|
| *(ninguna adicional instalada aún)* | — | — | — | — |

### Constraints

- **Node.js**: Compatible with Next.js 16 requirements
- **Package Manager**: npm (lockfile committed)
- **Deployment**: Target platform TBD
- **Browser Support**: Modern evergreen browsers
- **Performance**: Core Web Vitals compliance (LCP < 2.5s, FID < 100ms, CLS < 0.1)

## Development Workflow

### Code Organization

- Route files in `app/` MUST be thin — delegate to FSD layers
- shadcn/ui components MUST live in `src/shared/ui/`
- Supabase client MUST be configured in `src/shared/api/`
- SEO metadata MUST use Next.js Metadata API in layout/page files

### Quality Gates

- `npm run lint` MUST pass before any commit
- `npm run build` MUST succeed before merging to main
- All new components MUST follow the FSD slice structure with proper `index.ts` exports

### Branching

- `main` branch is the primary integration branch
- Feature branches MUST follow the pattern `###-feature-name`
- Commits MUST be atomic and descriptive

## Governance

This constitution supersedes all other development practices for EasyAgenda.
All code contributions MUST verify compliance with these principles.

- **Amendments**: Any change to this constitution MUST be documented with version bump, rationale, and migration plan if breaking
- **Versioning**: MAJOR.MINOR.PATCH — MAJOR for principle removals/redefinitions, MINOR for new principles/sections, PATCH for clarifications
- **Compliance Review**: Every feature spec and implementation plan MUST include a Constitution Check gate
- **Runtime Guidance**: See `CLAUDE.md` for development runtime guidance and commands

**Version**: 1.0.0 | **Ratified**: 2026-02-26 | **Last Amended**: 2026-02-26
