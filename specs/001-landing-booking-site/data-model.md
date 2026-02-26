# Data Model: 001-landing-booking-site

**Date**: 2026-02-26
**Branch**: `001-landing-booking-site`
**Note**: All data is dummy/static for this iteration. No database persistence.

## Entities

### Sport (Deporte)

| Field       | Type   | Constraints                                  |
|-------------|--------|----------------------------------------------|
| id          | string | Unique slug: "padel", "tenis", "squash", "racquetball" |
| name        | string | Display name in Spanish: "Pádel", "Tenis", "Squash", "Racquetball" |
| icon        | string | Lucide icon name                             |
| description | string | Short description (1 sentence)               |

**Values**: Fixed enum of 4 sports. No CRUD operations.

---

### Club

| Field         | Type       | Constraints                          |
|---------------|------------|--------------------------------------|
| id            | string     | Unique identifier (slug)             |
| name          | string     | Club name                            |
| description   | string     | Multi-paragraph description          |
| address       | string     | Full street address                  |
| city          | string     | City name                            |
| phone         | string     | Contact phone                        |
| email         | string     | Contact email                        |
| openingHours  | string     | Human-readable schedule              |
| coverImage    | string     | Placeholder image path or gradient   |
| gallery       | string[]   | Array of placeholder image paths     |
| rating        | number     | 1.0–5.0 average rating               |
| sportIds      | string[]   | References to Sport.id               |

**Relationships**: Club has many Courts. Club has many Reviews.
**Minimum dummy data**: 4 clubs.

---

### Court (Cancha)

| Field      | Type     | Constraints                                            |
|------------|----------|--------------------------------------------------------|
| id         | string   | Unique identifier                                      |
| name       | string   | Court display name (e.g., "Cancha 1")                  |
| clubId     | string   | Reference to Club.id                                   |
| sportId    | string   | Reference to Sport.id                                  |
| surface    | string   | Enum: "cesped-sintetico", "cemento", "cristal", "parquet" |
| dimensions | string   | Human-readable (e.g., "20m x 10m")                     |
| pricePerHour | number | Price in CLP (integer, no decimals)                    |
| amenities  | string[] | Array: "iluminacion", "techado", "vestuarios", "estacionamiento" |
| image      | string   | Placeholder image path                                 |
| isActive   | boolean  | Always true for dummy data                             |

**Relationships**: Court belongs to one Club. Court belongs to one Sport.
Court has many TimeSlots.

**Surface display names**:
- "cesped-sintetico" → "Césped Sintético"
- "cemento" → "Cemento"
- "cristal" → "Cristal"
- "parquet" → "Parquet"

---

### TimeSlot (Franja Horaria)

| Field    | Type   | Constraints                                        |
|----------|--------|----------------------------------------------------|
| id       | string | Unique identifier                                  |
| courtId  | string | Reference to Court.id                              |
| date     | string | ISO date format YYYY-MM-DD                         |
| startTime| string | 24h format HH:mm (e.g., "09:00")                  |
| endTime  | string | 24h format HH:mm (e.g., "10:00")                  |
| status   | string | Enum: "available", "occupied", "partial"           |

**Generation rules for dummy data**:
- Slots from 08:00 to 22:00 (14 slots per day per court)
- 1-hour duration each
- Status distribution: ~60% available, ~30% occupied, ~10% partial
- Generated for 7 days starting from current date

**Status display**:
- "available" → Verde, selectable
- "occupied" → Rojo, disabled
- "partial" → Amarillo, selectable with note

---

### Booking (Reserva)

| Field         | Type   | Constraints                                  |
|---------------|--------|----------------------------------------------|
| id            | string | Unique booking number (e.g., "EA-20260226-001") |
| courtId       | string | Reference to Court.id                        |
| clubId        | string | Reference to Club.id (denormalized)          |
| date          | string | ISO date YYYY-MM-DD                          |
| startTime     | string | 24h format HH:mm                            |
| endTime       | string | 24h format HH:mm                            |
| duration      | number | In minutes (always 60 for v1)                |
| customerName  | string | From booking form                            |
| customerEmail | string | From booking form                            |
| customerPhone | string | From booking form                            |
| totalPrice    | number | CLP integer                                  |
| status        | string | Enum: "confirmed", "completed", "cancelled"  |

**State transitions** (for dashboard dummy data):
- confirmed → completed (past date)
- confirmed → cancelled (user action, visual only)

**Dummy bookings for dashboard**: 5-8 bookings with mixed statuses.

---

### PricingPlan (Plan de Precios)

| Field        | Type     | Constraints                        |
|--------------|----------|------------------------------------|
| id           | string   | Unique slug                        |
| name         | string   | "Gratis", "Pro", "Enterprise"      |
| priceMonthly | number   | CLP integer (0 for free)           |
| features     | string[] | Included features list             |
| limitations  | string[] | Limitations/restrictions           |
| isHighlighted| boolean  | True for recommended plan          |
| ctaLabel     | string   | Button text                        |

**Values**: Exactly 3 plans. "Pro" is highlighted.

---

### Review (Reseña)

| Field    | Type   | Constraints                    |
|----------|--------|--------------------------------|
| id       | string | Unique identifier              |
| clubId   | string | Reference to Club.id           |
| author   | string | Reviewer name                  |
| rating   | number | 1–5 integer                    |
| comment  | string | Review text in Spanish         |
| date     | string | ISO date YYYY-MM-DD            |

**Minimum**: 2-3 reviews per club.

---

### Testimonial (Testimonio)

| Field    | Type   | Constraints                    |
|----------|--------|--------------------------------|
| id       | string | Unique identifier              |
| name     | string | Person name                    |
| role     | string | Title/role (e.g., "Administrador, Club X") |
| avatar   | string | Placeholder image              |
| quote    | string | Testimonial text in Spanish    |
| clubName | string | Associated club name           |

**Minimum**: 3 testimonials for landing page.

---

## Entity Relationship Summary

```
Sport (4 fixed)
  └── Court.sportId
  └── Club.sportIds[]

Club (4+ dummy)
  ├── Court.clubId (1:N)
  ├── Review.clubId (1:N)
  └── Booking.clubId (1:N denormalized)

Court
  ├── TimeSlot.courtId (1:N)
  └── Booking.courtId (1:N)

TimeSlot → generated dynamically from Court + date range

Booking → created from form submission (client-side only)

PricingPlan (3 fixed) — standalone, no relationships
Testimonial (3+ fixed) — standalone, no relationships
```
