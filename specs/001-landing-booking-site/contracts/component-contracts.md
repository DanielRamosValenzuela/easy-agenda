# Component Contracts

**Date**: 2026-02-26

## Widget Contracts (src/widgets/)

### navbar

**Exports**: `Navbar`
**Props**: None (reads route for active state)
**Behavior**: Persistent top navigation. Logo links to `/`. Links: Inicio, Clubes,
Canchas, Precios, Contacto. Mobile: hamburger menu with slide animation.
**Server/Client**: Client component (mobile menu toggle requires state).

### footer

**Exports**: `Footer`
**Props**: None
**Behavior**: Persistent bottom. Navigation links, social icons, contact info, copyright.
**Server/Client**: Server component.

### hero-search

**Exports**: `HeroSearch`
**Props**: None
**Behavior**: Hero section with title, subtitle, background. Contains search bar with
3 fields: deporte (select), ubicación (select), fecha (date picker). "Buscar" button
navigates to `/buscar?deporte=X&ubicacion=Y&fecha=Z`.
**Server/Client**: Client component (form interactions).

### features-section

**Exports**: `FeaturesSection`
**Props**: None
**Behavior**: Grid of 4+ feature cards with icon, title, description. Scroll reveal.
**Server/Client**: Server component.

### stats-counter

**Exports**: `StatsCounter`
**Props**: None
**Behavior**: Row of 3-4 counters with animated numbers (e.g., "+500 Clubes").
**Server/Client**: Client component (counter animation).

### testimonials-section

**Exports**: `TestimonialsSection`
**Props**: None
**Behavior**: Carousel or grid of 3+ testimonial cards.
**Server/Client**: Server component (CSS-only carousel or static grid).

### b2b-section

**Exports**: `B2BSection`
**Props**: None
**Behavior**: Section targeting club owners. Value proposition + CTA button.
**Server/Client**: Server component.

### pricing-preview

**Exports**: `PricingPreview`
**Props**: None
**Behavior**: Preview of 3 plans. Links to `/precios` for full details.
**Server/Client**: Server component.

### club-grid

**Exports**: `ClubGrid`
**Props**: `{ clubs: Club[] }`
**Behavior**: Responsive grid of club cards. Each card links to `/clubes/[id]`.
**Server/Client**: Server component.

### club-detail-view

**Exports**: `ClubDetailView`
**Props**: `{ club: Club; courts: Court[]; reviews: Review[] }`
**Behavior**: Full club detail with gallery, info, courts list, reviews.
**Server/Client**: Server component (gallery carousel is client sub-component).

### court-catalog

**Exports**: `CourtCatalog`
**Props**: `{ courts: Court[]; clubs: Club[]; sports: Sport[] }`
**Behavior**: Grid with sidebar/top filters. Filters update URL params client-side.
**Server/Client**: Client component (filter state management).

### court-detail-view

**Exports**: `CourtDetailView`
**Props**: `{ court: Court; club: Club; timeSlots: TimeSlot[] }`
**Behavior**: Court info + booking calendar. Selecting slot opens booking flow.
**Server/Client**: Client component (calendar interaction).

### search-results

**Exports**: `SearchResults`
**Props**: `{ courts: Court[]; clubs: Club[]; filters: SearchFilters }`
**Behavior**: List of available courts matching search criteria. Each result shows
court, club, price, availability indicator.
**Server/Client**: Server component (filters applied before render).

### dashboard-overview

**Exports**: `DashboardOverview`
**Props**: `{ bookings: Booking[] }`
**Behavior**: Summary cards + booking list with status badges.
**Server/Client**: Server component.

## Feature Contracts (src/features/)

### booking

**Exports**: `BookingForm`, `BookingConfirmation`
**BookingForm Props**: `{ court: Court; club: Club; selectedSlot: TimeSlot }`
**BookingConfirmation Props**: `{ booking: Booking }`
**Behavior**: Form with name, email, phone + validation. On submit, generates dummy
booking and shows confirmation.
**Server/Client**: Client component (form state + validation).

### search

**Exports**: `SearchBar`, `SearchFilters`
**SearchBar Props**: `{ variant: "hero" | "compact" }`
**SearchFilters Props**: `{ sports: Sport[]; cities: string[] }`
**Behavior**: Search bar with sport/location/date fields. Navigates to `/buscar`.
**Server/Client**: Client component.

### contact-form

**Exports**: `ContactForm`
**Props**: None
**Behavior**: Name, email, subject, message fields with Zod validation.
Dummy submit shows success toast/message.
**Server/Client**: Client component (form state).

## Entity Public APIs (src/entities/)

Each entity exposes via `index.ts`:
- **Types**: TypeScript interfaces (e.g., `Club`, `Court`, `Sport`)
- **Data**: Dummy data arrays (e.g., `CLUBS`, `COURTS`, `SPORTS`)
- **Helpers**: Display formatters (e.g., `formatPrice`, `getSurfaceLabel`)
