# Research: 001-landing-booking-site

**Date**: 2026-02-26
**Branch**: `001-landing-booking-site`

## Decision Log

### D1: Component Library Setup — shadcn/ui + Tailwind CSS v4

**Decision**: Use `shadcn/ui` (latest) with Tailwind CSS v4 via `npx shadcn@latest init`.

**Rationale**: shadcn/ui is already in the approved constitution stack. It fully supports
Tailwind CSS v4 and React 19. The init command installs: `class-variance-authority`,
`clsx`, `tailwind-merge`, `lucide-react`, `tw-animate-css`.

**Alternatives considered**:
- Radix UI primitives directly — more manual styling, shadcn wraps these already
- Custom components from scratch — unnecessary given shadcn exists

**Notes**:
- `"default"` style is deprecated; only `"new-york"` style is supported
- Colors use OKLCH format in v4
- `tailwindcss-animate` is deprecated; replaced by `tw-animate-css`
- No `tailwind.config.ts` needed; all config via CSS `@theme inline`
- `forwardRef` removed from components (React 19)

### D2: Calendar / Date Picker

**Decision**: Use shadcn/ui `calendar` component (built on `react-day-picker` v9) +
`date-fns` for date formatting.

**Rationale**: The shadcn calendar component is well-maintained, accessible, and
integrates seamlessly with the existing shadcn theming. `react-day-picker` v9 supports
date ranges and year/month navigation out of the box.

**Install**: `npx shadcn@latest add calendar popover button`
**Dependencies added**: `react-day-picker` (~30kb), `date-fns`

**Alternatives considered**:
- Custom calendar from scratch — excessive effort, accessibility concerns
- FullCalendar — overkill for time slot selection, heavy bundle
- react-big-calendar — designed for event display, not booking selection

### D3: Form Handling

**Decision**: Use `react-hook-form` + `zod` + `@hookform/resolvers` via shadcn/ui
`form` component.

**Rationale**: This is the standard shadcn/ui form stack. Constitution Principle III
(Type Safety) recommends Zod for runtime validation at system boundaries. Forms are
system boundaries (user input).

**Install**: `npx shadcn@latest add form input select`
**Dependencies added**: `react-hook-form` (~12kb), `zod` (~14kb), `@hookform/resolvers`

**Alternatives considered**:
- Formik — larger bundle, less TypeScript-native
- Native form handling — lacks validation integration and error state management
- Conform — newer but less ecosystem support with shadcn

### D4: Scroll Animations

**Decision**: CSS-only scroll-driven animations using `animation-timeline: view()`.

**Rationale**: Zero JavaScript, runs on compositor thread (60fps). Browser support in
2026 is broad: Chrome 115+, Edge 115+, Safari 18+, Firefox 120+. Uses progressive
enhancement with `@supports`. Constitution Principle IV (Simplicity) favors the lightest
approach. No additional dependencies.

**Alternatives considered**:
- `motion` (framer-motion) — 4.6-34kb JS, requires `"use client"` on every animated
  component, violates Server Components First principle for simple reveals
- Intersection Observer + CSS classes — more JS than needed, CSS-only is sufficient
- AOS library — abandoned, unnecessary dependency

### D5: Project Structure — FSD with src/ directory

**Decision**: Move `app/` inside `src/` and create all FSD layers under `src/`.
Update `@/*` path alias to map to `./src/*`.

**Rationale**: CLAUDE.md explicitly shows FSD layers under `src/` including `app/`.
Having `@/*` map to `src/` enables clean imports like `@/shared/ui/button` instead of
`@/src/shared/ui/button`.

**Alternatives considered**:
- Keep `app/` at root, FSD layers in `src/` — split structure, ugly imports
- Everything at root — no namespace separation, messy

### D6: Dummy Data Strategy

**Decision**: Define all dummy data as TypeScript constants in `entities/*/config/`
segments, co-located with their entity types.

**Rationale**: Following FSD, each entity owns its data. Constants in `config/` segments
are the correct place for static configuration data. Types in `model/` segments.
Public API via `index.ts` re-exports both types and data.

**Alternatives considered**:
- JSON files — lose TypeScript type safety
- Centralized `shared/config/data.ts` — violates FSD entity ownership
- API mocking (MSW) — over-engineering for static dummy data

### D7: Deportes soportados

**Decision**: 4 deportes de raqueta como valores fijos: pádel, tenis, squash, racquetball.

**Rationale**: Alineado con la identidad del producto (CLAUDE.md: "racquetball, squash,
padel, etc.") y confirmado en la sesión de clarificación.

### D8: Moneda

**Decision**: CLP (peso chileno), formato `$15.000 CLP`.

**Rationale**: Confirmado por el usuario. Alineado con referencia EasyCancha Chile.
Se usará `Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' })` para
formateo consistente.
