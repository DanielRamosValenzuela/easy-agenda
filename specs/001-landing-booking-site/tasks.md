# Tasks: Sitio Completo EasyAgenda — Landing, Páginas y Reservas

**Input**: Design documents from `/specs/001-landing-booking-site/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/

**Tests**: No automated tests for this iteration (manual verification via quickstart.md).

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup

**Purpose**: Project restructuring, dependencies, and FSD scaffold

- [x] T001 Move `app/` directory into `src/app/` and update `tsconfig.json` paths alias `@/*` to map to `./src/*`
- [x] T002 Initialize shadcn/ui with `npx shadcn@latest init` (new-york style, configure paths to `src/shared/ui/` and `src/shared/lib/utils.ts`)
- [x] T003 Install shadcn/ui components: `npx shadcn@latest add button card calendar dialog form input label popover select separator badge`
- [x] T004 [P] Create `src/shared/lib/format.ts` with `formatPrice()` (CLP via Intl.NumberFormat) and `formatDate()` (date-fns) utility functions
- [x] T005 [P] Create `src/shared/config/site.ts` with site-wide constants (site name, description, navigation links, social links, contact info)
- [x] T006 [P] Update `src/app/globals.css` with CSS scroll-driven animation keyframes (`@keyframes fade-in-up`, `animation-timeline: view()`) and utility class `.reveal`
- [x] T007 Update `src/app/layout.tsx` with Spanish `lang="es"`, EasyAgenda metadata, Geist fonts, base root structure (Fix F1: Navbar+Footer integration deferred to Phase 3)

**Checkpoint**: FSD structure ready, shadcn/ui installed, shared utilities available.

---

## Phase 2: Foundational — Entity Layer (Blocking)

**Purpose**: All entity types, dummy data, and helpers that ALL user stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T008 [P] Create Sport entity: types in `src/entities/sport/model/types.ts`, dummy data (4 sports) in `src/entities/sport/config/data.ts`, public API in `src/entities/sport/index.ts`
- [x] T009 [P] Create Club entity: types in `src/entities/club/model/types.ts`, dummy data (4 clubs) in `src/entities/club/config/data.ts`, helpers in `src/entities/club/lib/helpers.ts`, public API in `src/entities/club/index.ts`
- [x] T010 [P] Create Court entity: types in `src/entities/court/model/types.ts`, dummy data (8-12 courts across 4 clubs) in `src/entities/court/config/data.ts`, helpers (`getSurfaceLabel`, `getAmenityLabel`) in `src/entities/court/lib/helpers.ts`, public API in `src/entities/court/index.ts`
- [x] T011 [P] Create TimeSlot entity: types in `src/entities/time-slot/model/types.ts`, slot generator function (08:00-22:00, 7 days, ~60/30/10% distribution) in `src/entities/time-slot/lib/generate-slots.ts`, public API in `src/entities/time-slot/index.ts`
- [x] T012 [P] Create Booking entity: types in `src/entities/booking/model/types.ts`, dummy bookings (5-8 mixed statuses) in `src/entities/booking/config/data.ts`, helpers (`generateBookingId`, `getStatusLabel`) in `src/entities/booking/lib/helpers.ts`, public API in `src/entities/booking/index.ts`
- [x] T013 [P] Create Review entity: types in `src/entities/review/model/types.ts`, dummy reviews (2-3 per club) in `src/entities/review/config/data.ts`, public API in `src/entities/review/index.ts`
- [x] T014 [P] Create PricingPlan entity: types in `src/entities/pricing-plan/model/types.ts`, dummy plans (Gratis, Pro highlighted, Enterprise) in `src/entities/pricing-plan/config/data.ts`, public API in `src/entities/pricing-plan/index.ts`
- [x] T015 [P] Create Testimonial entity: types in `src/entities/testimonial/model/types.ts`, dummy testimonials (3+) in `src/entities/testimonial/config/data.ts`, public API in `src/entities/testimonial/index.ts`

**Checkpoint**: Foundation ready — all entities defined with types, dummy data, and public APIs. User story implementation can now begin.

---

## Phase 3: User Story 1 — Landing Page y Navegación (Priority: P1) 🎯 MVP

**Goal**: Landing page completa con hero + búsqueda, features, stats, testimonios, B2B, pricing preview, navbar y footer.

**Independent Test**: Navegar a `/` y verificar todas las secciones. Navegar entre páginas usando navbar y footer.

### Implementation for User Story 1

- [x] T016 [P] [US1] Create Navbar widget in `src/widgets/navbar/ui/Navbar.tsx` (client component: logo, nav links, mobile hamburger menu with slide animation) and `src/widgets/navbar/index.ts`
- [x] T017 [P] [US1] Create Footer widget in `src/widgets/footer/ui/Footer.tsx` (server component: nav links, social icons, contact info, copyright) and `src/widgets/footer/index.ts`
- [x] T018 [P] [US1] Create SearchBar feature in `src/features/search/ui/SearchBar.tsx` (client component: deporte select, ubicación select, fecha date picker, "Buscar" button navigating to `/buscar`), search params model in `src/features/search/model/search-params.ts`, and `src/features/search/index.ts`
- [x] T019 [US1] Create HeroSearch widget in `src/widgets/hero-search/ui/HeroSearch.tsx` (client component: title, subtitle, background, embeds SearchBar variant="hero") and `src/widgets/hero-search/index.ts`
- [x] T020 [P] [US1] Create FeaturesSection widget in `src/widgets/features-section/ui/FeaturesSection.tsx` (server component: 4+ feature cards with lucide icons, scroll reveal via `.reveal` CSS class) and `src/widgets/features-section/index.ts`
- [x] T021 [P] [US1] Create StatsCounter widget in `src/widgets/stats-counter/ui/StatsCounter.tsx` (client component: animated counters — +500 Clubes, +50.000 Reservas, +10.000 Jugadores) and `src/widgets/stats-counter/index.ts`
- [x] T022 [P] [US1] Create TestimonialsSection widget in `src/widgets/testimonials-section/ui/TestimonialsSection.tsx` (server component: grid of 3+ testimonial cards from entity data) and `src/widgets/testimonials-section/index.ts`
- [x] T023 [P] [US1] Create B2BSection widget in `src/widgets/b2b-section/ui/B2BSection.tsx` (server component: value proposition for club owners + CTA "Registra tu club") and `src/widgets/b2b-section/index.ts`
- [x] T024 [P] [US1] Create PricingPreview widget in `src/widgets/pricing-preview/ui/PricingPreview.tsx` (server component: preview of 3 plans from entity data, link to `/precios`) and `src/widgets/pricing-preview/index.ts`
- [x] T025 [US1] Create LandingPage composition in `src/pages/landing/ui/LandingPage.tsx` composing: HeroSearch, FeaturesSection, StatsCounter, TestimonialsSection, B2BSection, PricingPreview + final CTA section. Export from `src/pages/landing/index.ts`
- [x] T026 [US1] Update `src/app/page.tsx` as thin route importing and rendering `<LandingPage />` with Next.js Metadata API (title: "EasyAgenda — Reserva Canchas Deportivas")
- [x] T027 [US1] Create custom 404 page in `src/app/not-found.tsx` with branded design and link to home

**Checkpoint**: Landing page fully functional. Navbar and footer visible on all pages. Search bar navigates to `/buscar` (page placeholder until US4).

---

## Phase 4: User Story 2 — Explorar Clubes (Priority: P2)

**Goal**: Página de listado de clubes y página de detalle de club con galería, canchas y reseñas.

**Independent Test**: Navegar a `/clubes`, ver 4+ clubes. Clic en un club → ver detalle completo con canchas y reseñas.

### Implementation for User Story 2

- [x] T028 [P] [US2] Create ClubCard component in `src/widgets/club-grid/ui/ClubCard.tsx` (server component: image, name, city, sports badges, rating stars, link to `/clubes/[id]`)
- [x] T029 [US2] Create ClubGrid widget in `src/widgets/club-grid/ui/ClubGrid.tsx` (server component: responsive grid of ClubCard components) and `src/widgets/club-grid/index.ts`
- [x] T030 [US2] Create ClubDetailView widget in `src/widgets/club-detail-view/ui/ClubDetailView.tsx` (server component: club info, gallery placeholders, opening hours, courts list with "Ver disponibilidad" buttons, reviews section) and `src/widgets/club-detail-view/index.ts`
- [x] T031 [P] [US2] Create ClubsPage composition in `src/_pages/clubs/ui/ClubsPage.tsx` (renders ClubGrid with all clubs data) and export from `src/_pages/clubs/index.ts`
- [x] T032 [P] [US2] Create ClubDetailPage composition in `src/_pages/clubs/ui/ClubDetailPage.tsx` (renders ClubDetailView with club, courts, reviews data) and export from `src/_pages/clubs/index.ts`
- [x] T033 [US2] Create route `src/app/clubes/page.tsx` importing ClubsPage with metadata (title: "Clubes — EasyAgenda")
- [x] T034 [US2] Create route `src/app/clubes/[id]/page.tsx` importing ClubDetailPage, resolving club by `id` param, with dynamic metadata

**Checkpoint**: Club browsing fully functional. Users can explore clubs and see their courts and reviews.

---

## Phase 5: User Story 3 — Explorar Canchas y Disponibilidad (Priority: P3)

**Goal**: Catálogo de canchas con filtros y vista de detalle con calendario de disponibilidad.

**Independent Test**: Navegar a `/canchas`, aplicar filtros, clic en cancha → ver calendario con franjas horarias coloreadas.

### Implementation for User Story 3

- [x] T035 [P] [US3] Create CourtCard component in `src/widgets/court-catalog/ui/CourtCard.tsx` (server component: image, name, club name, sport badge, surface, price, amenities icons, link to `/canchas/[id]`)
- [x] T036 [P] [US3] Create SearchFilters feature in `src/features/search/ui/SearchFilters.tsx` (client component: sport select, city select, price range — updates URL search params without page reload)
- [x] T037 [US3] Create CourtCatalog widget in `src/widgets/court-catalog/ui/CourtCatalog.tsx` (client component: filter sidebar/top bar using SearchFilters + responsive grid of CourtCard) and `src/widgets/court-catalog/index.ts`
- [x] T038 [US3] Create BookingCalendar component in `src/widgets/court-detail-view/ui/BookingCalendar.tsx` (client component: date picker + time slot grid with color-coded status)
- [x] T039 [US3] Create CourtDetailView widget in `src/widgets/court-detail-view/ui/CourtDetailView.tsx` (client component: court info header + BookingCalendar + amenities list + club link) and `src/widgets/court-detail-view/index.ts`
- [x] T040 [P] [US3] Create CourtsPage composition in `src/_pages/courts/ui/CourtsPage.tsx` and export from `src/_pages/courts/index.ts`
- [x] T041 [P] [US3] Create CourtDetailPage composition in `src/_pages/courts/ui/CourtDetailPage.tsx` and export from `src/_pages/courts/index.ts`
- [x] T042 [US3] Create route `src/app/canchas/page.tsx` importing CourtsPage with metadata (title: "Canchas — EasyAgenda")
- [x] T043 [US3] Create route `src/app/canchas/[id]/page.tsx` importing CourtDetailPage, resolving court by `id` param, with dynamic metadata

**Checkpoint**: Court catalog with working filters. Court detail shows interactive calendar with time slots.

---

## Phase 6: User Story 4 — Flujo de Reserva con Calendario (Priority: P4)

**Goal**: Flujo completo de reserva: seleccionar franja → formulario → confirmación. Página de resultados de búsqueda cruzando clubes.

**Independent Test**: Desde hero search o cancha detail, seleccionar slot disponible, completar formulario, ver confirmación con número de reserva.

### Implementation for User Story 4

- [x] T044 [P] [US4] Create booking Zod schema in `src/features/booking/model/booking-schema.ts` (name: min 2 chars, email: valid email, phone: Chilean format) and export from `src/features/booking/index.ts`
- [x] T045 [US4] Create BookingForm feature in `src/features/booking/ui/BookingForm.tsx` (client component: react-hook-form with zod resolver, fields: name, email, phone, displays selected court/slot/price summary, submit generates dummy booking)
- [x] T046 [US4] Create BookingConfirmation feature in `src/features/booking/ui/BookingConfirmation.tsx` (client component: displays booking number, court, club, date, time, duration, total price, "Volver al inicio" button)
- [x] T047 [US4] Integrate booking flow into CourtDetailView: update `src/widgets/court-detail-view/ui/CourtDetailView.tsx` to open BookingForm dialog when available slot is selected, show BookingConfirmation on submit
- [x] T048 [P] [US4] Create SearchResults widget in `src/widgets/search-results/ui/SearchResults.tsx` (server component: list of courts matching search filters) and `src/widgets/search-results/index.ts`
- [x] T049 [P] [US4] Create SearchPage composition in `src/_pages/search/ui/SearchPage.tsx` and export from `src/_pages/search/index.ts`
- [x] T050 [US4] Create route `src/app/buscar/page.tsx` importing SearchPage with metadata (title: "Resultados — EasyAgenda")

**Checkpoint**: Complete booking flow functional. Search from hero redirects to results page with cross-club courts.

---

## Phase 7: User Story 5 — Página de Precios (Priority: P5)

**Goal**: Página de comparativa de 3 planes con plan Pro destacado.

**Independent Test**: Navegar a `/precios` y verificar 3 tarjetas de planes comparativas.

### Implementation for User Story 5

- [x] T051 [US5] Create PricingPage composition in `src/_pages/pricing/ui/PricingPage.tsx` and export from `src/_pages/pricing/index.ts`
- [x] T052 [US5] Create route `src/app/precios/page.tsx` importing PricingPage with metadata (title: "Precios — EasyAgenda")

**Checkpoint**: Pricing page functional with 3 comparative plans.

---

## Phase 8: User Story 6 — Página de Contacto (Priority: P6)

**Goal**: Formulario de contacto con validación y datos de empresa.

**Independent Test**: Navegar a `/contacto`, completar formulario, enviar y ver mensaje de éxito.

### Implementation for User Story 6

- [x] T053 [P] [US6] Create contact Zod schema in `src/features/contact-form/model/contact-schema.ts` and export from `src/features/contact-form/index.ts`
- [x] T054 [US6] Create ContactForm feature in `src/features/contact-form/ui/ContactForm.tsx` (client component: react-hook-form with zod, 4 fields, dummy submit shows success message)
- [x] T055 [US6] Create ContactPage composition in `src/_pages/contact/ui/ContactPage.tsx` and export from `src/_pages/contact/index.ts`
- [x] T056 [US6] Create route `src/app/contacto/page.tsx` importing ContactPage with metadata (title: "Contacto — EasyAgenda")

**Checkpoint**: Contact page functional with validated form and dummy submission.

---

## Phase 9: User Story 7 — Dashboard de Usuario (Priority: P7)

**Goal**: Panel de usuario simulado con reservas próximas e historial.

**Independent Test**: Navegar a `/dashboard` y verificar reservas dummy con diferentes estados.

### Implementation for User Story 7

- [x] T057 [US7] Create DashboardOverview widget in `src/widgets/dashboard-overview/ui/DashboardOverview.tsx` and `src/widgets/dashboard-overview/index.ts`
- [x] T058 [US7] Create DashboardPage composition in `src/_pages/dashboard/ui/DashboardPage.tsx` and export from `src/_pages/dashboard/index.ts`
- [x] T059 [US7] Create route `src/app/dashboard/page.tsx` importing DashboardPage with metadata (title: "Mi Panel — EasyAgenda")

**Checkpoint**: Dashboard shows dummy bookings with mixed statuses.

---

## Phase 10: Polish & Cross-Cutting Concerns

**Purpose**: Responsiveness, visual consistency, animations, edge cases

- [x] T060 [P] Responsive layout verified — all widgets use responsive Tailwind grid classes, mobile hamburger menu, filters collapse
- [x] T061 [P] Scroll reveal animations added — `.reveal` CSS class applied to FeaturesSection, StatsCounter, TestimonialsSection, B2BSection, PricingPreview
- [x] T062 [P] Hover transitions added — all cards use `hover:shadow-md`, `hover:border-primary/30`, `transition-all duration-300`
- [x] T063 All navbar/footer links point to existing pages, 404 page created at `src/app/not-found.tsx`
- [x] T064 `npm run lint` — 0 errors, 0 warnings
- [x] T065 `npm run build` — 0 TypeScript/build errors, 10 routes compiled
- [x] T066 Quickstart verification — all routes accessible, build passes

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Setup (T001-T003 must complete first)
- **US1 Landing (Phase 3)**: Depends on Foundational (all entities needed for landing sections)
- **US2 Clubes (Phase 4)**: Depends on Foundational only (independent of US1)
- **US3 Canchas (Phase 5)**: Depends on Foundational only (independent of US1, US2)
- **US4 Reserva (Phase 6)**: Depends on US3 (needs CourtDetailView with calendar for booking integration)
- **US5 Precios (Phase 7)**: Depends on Foundational only (fully independent)
- **US6 Contacto (Phase 8)**: Depends on Setup only (fully independent)
- **US7 Dashboard (Phase 9)**: Depends on Foundational only (independent)
- **Polish (Phase 10)**: Depends on all user stories being complete

### User Story Dependencies

- **US1 (P1)**: After Foundational → Independent (MVP)
- **US2 (P2)**: After Foundational → Independent
- **US3 (P3)**: After Foundational → Independent
- **US4 (P4)**: After US3 (needs BookingCalendar in CourtDetailView) → Depends on US3
- **US5 (P5)**: After Foundational → Independent
- **US6 (P6)**: After Setup → Independent (doesn't need entities)
- **US7 (P7)**: After Foundational → Independent

### Within Each User Story

- Widgets/features before page compositions
- Page compositions before route files
- Components with no cross-dependencies marked [P] for parallel execution

### Parallel Opportunities

- All Setup tasks T004-T006 can run in parallel
- All 8 entity tasks T008-T015 can run in parallel
- US1 widgets T016-T024 (except T019 depends on T018) can mostly run in parallel
- US2 tasks T028, T031, T032 can partially run in parallel
- US3 tasks T035, T036, T040, T041 can partially run in parallel
- US4 tasks T044, T048, T049 can partially run in parallel
- US5, US6, US7 are independent and can run in parallel with each other
- All Polish tasks T060-T062 can run in parallel

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T007)
2. Complete Phase 2: Foundational entities (T008-T015)
3. Complete Phase 3: US1 Landing Page (T016-T027)
4. **STOP and VALIDATE**: Test landing page, navbar, footer, search bar navigation
5. Deploy/demo if ready — this alone showcases the product

### Incremental Delivery

1. Setup + Foundational → Foundation ready
2. US1 Landing → Test → Deploy (MVP!)
3. US2 Clubes → Test → Deploy
4. US3 Canchas → Test → Deploy
5. US4 Reserva → Test → Deploy (core booking flow complete!)
6. US5 Precios + US6 Contacto + US7 Dashboard → Test → Deploy (all pages)
7. Polish → Final validation → Production-ready

### Parallel Execution (Single Developer)

After Foundational phase, work in priority order:
- US1 (P1) → US2 (P2) → US3 (P3) → US4 (P4) → US5+US6+US7 → Polish

---

## Notes

- [P] tasks = different files, no dependencies on incomplete tasks
- [Story] label maps task to specific user story for traceability
- Each user story is independently completable and testable (except US4 depends on US3)
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- All user-facing text MUST be in Spanish
- All prices MUST use CLP format ($15.000 CLP)
- Use the `frontend-design` skill when implementing UI components for high design quality
