# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

EasyAgenda is a court booking application for racquet sports (racquetball, squash, padel, etc.) designed to be scalable for clubs. Built with Next.js 16 App Router, Supabase, and shadcn/ui.

## Commands

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Tech Stack

- **Framework**: Next.js 16 (App Router, React 19, Server Components by default)
- **Language**: TypeScript 5 (strict mode)
- **Styling**: Tailwind CSS v4 + shadcn/ui component library
- **Database**: Supabase (PostgreSQL)
- **Linting**: ESLint 9 (flat config) with next/core-web-vitals and typescript rules
- **Path alias**: `@/*` maps to project root

## Architecture: Feature-Sliced Design (FSD)

This project follows [Feature-Sliced Design](https://feature-sliced.design/) methodology. Code is organized in layers with strict unidirectional imports.

### Layers (top to bottom)

```
src/
├── app/        # Next.js App Router: routing, layouts, providers, global styles
├── pages/      # FSD pages: full-page compositions assembling widgets
├── widgets/    # Self-contained UI blocks delivering complete use cases
├── features/   # Reusable product features with business value (actions, forms)
├── entities/   # Business domain models (court, booking, user, club)
├── shared/     # Reusable utilities detached from business logic (ui, api, lib, config)
```

### Import Rule

A module can **only import from layers strictly below it**. Modules on the same layer cannot import from each other.

- `widgets/` can import from `features/`, `entities/`, `shared/`
- `features/` can import from `entities/`, `shared/`
- `entities/` can import from `shared/` only
- `shared/` cannot import from any other layer

### Slices and Segments

Each layer (except `app/` and `shared/`) is divided into **slices** (business domains like `booking`, `court`, `user`, `club`). Each slice contains **segments**:

- `ui/` — Components, styles
- `model/` — Types, schemas, stores, business logic
- `api/` — Supabase queries, data fetching
- `lib/` — Helper functions for the slice
- `config/` — Constants, feature flags

Every slice exposes a public API through its `index.ts` file. Import from slices via their public API, never reach into internal segments directly.

### FSD + Next.js App Router Integration

The Next.js `app/` directory handles routing and acts as the FSD **app layer**. Route pages in `app/` should be thin — they compose widgets and features from the FSD layers. Business logic, UI components, and data fetching live in the FSD layers, not in route files.

## Conventions

- Server Components by default; add `"use client"` only when needed (event handlers, hooks, browser APIs)
- shadcn/ui components live in `shared/ui/` and are customized through Tailwind
- Supabase client setup belongs in `shared/api/`
- Use Next.js Metadata API for SEO in layout/page files
- Spanish is the primary user-facing language for the application
