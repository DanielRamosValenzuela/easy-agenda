import type { Club } from "../model/types";

export function getClubById(clubs: Club[], id: string): Club | undefined {
  return clubs.find((club) => club.id === id);
}

export function getClubsByCity(clubs: Club[], city: string): Club[] {
  return clubs.filter((club) => club.city === city);
}

export function getClubsBySport(clubs: Club[], sportId: string): Club[] {
  return clubs.filter((club) => club.sportIds.includes(sportId));
}

export function getUniqueCities(clubs: Club[]): string[] {
  return [...new Set(clubs.map((club) => club.city))];
}

export function formatRating(rating: number): string {
  return rating.toFixed(1);
}
