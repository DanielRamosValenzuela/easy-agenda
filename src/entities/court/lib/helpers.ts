import type { Court, Surface, Amenity } from "../model/types";

const SURFACE_LABELS: Record<Surface, string> = {
  "cesped-sintetico": "Césped Sintético",
  cemento: "Cemento",
  cristal: "Cristal",
  parquet: "Parquet",
};

const AMENITY_LABELS: Record<Amenity, string> = {
  iluminacion: "Iluminación",
  techado: "Techado",
  vestuarios: "Vestuarios",
  estacionamiento: "Estacionamiento",
};

export function getSurfaceLabel(surface: Surface): string {
  return SURFACE_LABELS[surface];
}

export function getAmenityLabel(amenity: Amenity): string {
  return AMENITY_LABELS[amenity];
}

export function getCourtById(courts: Court[], id: string): Court | undefined {
  return courts.find((court) => court.id === id);
}

export function getCourtsByClub(courts: Court[], clubId: string): Court[] {
  return courts.filter((court) => court.clubId === clubId);
}

export function getCourtsBySport(courts: Court[], sportId: string): Court[] {
  return courts.filter((court) => court.sportId === sportId);
}

export function getCourtsByPriceRange(
  courts: Court[],
  min: number,
  max: number,
): Court[] {
  return courts.filter(
    (court) => court.pricePerHour >= min && court.pricePerHour <= max,
  );
}
