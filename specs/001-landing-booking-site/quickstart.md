# Quickstart: 001-landing-booking-site

**Date**: 2026-02-26

## Prerequisites

- Node.js (compatible with Next.js 16)
- npm

## Setup

```bash
# 1. Clone and checkout feature branch
git checkout 001-landing-booking-site

# 2. Install dependencies
npm install

# 3. Initialize shadcn/ui (if not done)
npx shadcn@latest init

# 4. Install required shadcn components
npx shadcn@latest add button calendar card dialog form input label popover select separator badge

# 5. Start dev server
npm run dev
```

## Verification Steps

### Landing Page (P1)
1. Navigate to `http://localhost:3000`
2. Verify hero section with search bar (deporte, ubicación, fecha)
3. Scroll and verify: features, stats counters, testimonials, B2B section, pricing preview, CTA
4. Verify navbar links and footer
5. Test mobile menu (resize to <768px)

### Clubes (P2)
1. Navigate to `/clubes`
2. Verify 4+ club cards in grid
3. Click a club → verify detail page with gallery, courts, reviews

### Canchas (P3)
1. Navigate to `/canchas`
2. Verify court catalog with filters
3. Apply sport filter → verify list updates
4. Click a court → verify detail with calendar

### Búsqueda (P1/P4)
1. Use search bar in hero → verify redirect to `/buscar` with results
2. Verify results show courts from multiple clubs

### Reserva (P4)
1. From court detail, select available time slot
2. Fill booking form (name, email, phone)
3. Submit → verify confirmation screen with booking number

### Precios (P5)
1. Navigate to `/precios`
2. Verify 3 plans with "Pro" highlighted

### Contacto (P6)
1. Navigate to `/contacto`
2. Fill and submit form → verify success message

### Dashboard (P7)
1. Navigate to `/dashboard`
2. Verify upcoming and past bookings displayed

### Cross-cutting
- All pages responsive (320px–1920px)
- All navbar/footer links work (no broken links)
- 404 page for invalid URLs (e.g., `/nonexistent`)
- Consistent visual design across all pages
