"use client";

import { useSearchParams } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import { COURTS } from "@/entities/court";
import { CLUBS } from "@/entities/club";
import { SearchBar } from "@/features/search";
import { SearchResults } from "@/widgets/search-results";

export function SearchPage() {
  const searchParams = useSearchParams();

  const deporte = searchParams.get("deporte") ?? "";
  const ubicacion = searchParams.get("ubicacion") ?? "";
  const fecha = searchParams.get("fecha") ?? "";

  // Filter courts based on search params
  const filteredCourts = COURTS.filter((court) => {
    if (!court.isActive) return false;

    // Filter by sport
    if (deporte && court.sportId !== deporte) return false;

    // Filter by city (via club)
    if (ubicacion) {
      const club = CLUBS.find((c) => c.id === court.clubId);
      if (!club || club.city !== ubicacion) return false;
    }

    return true;
  });

  // Build active filter labels
  const activeFilters: string[] = [];
  if (deporte) {
    const sportLabels: Record<string, string> = {
      padel: "Pádel",
      tenis: "Tenis",
      squash: "Squash",
      racquetball: "Racquetball",
    };
    activeFilters.push(sportLabels[deporte] ?? deporte);
  }
  if (ubicacion) activeFilters.push(ubicacion);
  if (fecha) activeFilters.push(fecha);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search bar header */}
      <div className="border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto max-w-5xl px-4 py-4 sm:px-6 lg:px-8">
          <SearchBar variant="compact" />
        </div>
      </div>

      {/* Results */}
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Results header */}
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-gray-400" />
              <h1 className="text-base font-semibold text-gray-900">
                Resultados de búsqueda
              </h1>
            </div>
            <p className="text-sm text-gray-500">
              {filteredCourts.length === 0
                ? "No se encontraron canchas"
                : filteredCourts.length === 1
                  ? "1 cancha encontrada"
                  : `${filteredCourts.length} canchas encontradas`}
              {activeFilters.length > 0 && (
                <span className="text-gray-400">
                  {" "}para{" "}
                  <span className="font-medium text-gray-600">
                    {activeFilters.join(", ")}
                  </span>
                </span>
              )}
            </p>
          </div>

          {/* Active filters */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {activeFilters.map((filter) => (
                <span
                  key={filter}
                  className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700"
                >
                  {filter}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Grid of results */}
        <SearchResults courts={filteredCourts} clubs={CLUBS} />
      </div>
    </div>
  );
}
