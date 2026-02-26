# Page Routes Contract

**Date**: 2026-02-26

All routes are under `src/app/` following Next.js App Router conventions.

## Routes

| Route                    | Page Title          | Description                              |
|--------------------------|---------------------|------------------------------------------|
| `/`                      | EasyAgenda          | Landing page (hero + search + sections)  |
| `/clubes`                | Clubes              | Club listing grid                        |
| `/clubes/[id]`           | {Club Name}         | Club detail page                         |
| `/canchas`               | Canchas             | Court catalog with filters               |
| `/canchas/[id]`          | {Court Name}        | Court detail with calendar               |
| `/buscar`                | Resultados          | Search results (cross-club)              |
| `/precios`               | Precios             | Pricing plans comparison                 |
| `/contacto`              | Contacto            | Contact form + company info              |
| `/dashboard`             | Mi Panel            | User dashboard (simulated)               |

## Query Parameters

### `/buscar`

| Param      | Type   | Required | Description                          |
|------------|--------|----------|--------------------------------------|
| deporte    | string | No       | Sport slug filter                    |
| ubicacion  | string | No       | City/location filter                 |
| fecha      | string | No       | ISO date YYYY-MM-DD                  |
| hora       | string | No       | Time in HH:mm format                |

### `/canchas`

| Param      | Type   | Required | Description                          |
|------------|--------|----------|--------------------------------------|
| deporte    | string | No       | Sport slug filter                    |
| ubicacion  | string | No       | City/location filter                 |
| precioMin  | number | No       | Minimum price CLP                    |
| precioMax  | number | No       | Maximum price CLP                    |

## Shared Layout

All routes share a root layout with:
- Navbar (persistent, top)
- Footer (persistent, bottom)
- Metadata via Next.js Metadata API

## Custom 404

`not-found.tsx` at `src/app/` level with branded design and link to home.
