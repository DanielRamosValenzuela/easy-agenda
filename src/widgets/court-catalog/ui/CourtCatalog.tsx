"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { SearchX } from "lucide-react";
import type { Court } from "@/entities/court";
import { getCourtsBySport, getCourtsByPriceRange } from "@/entities/court";
import type { Club } from "@/entities/club";
import { getClubById } from "@/entities/club";
import type { Sport } from "@/entities/sport";
import { getUniqueCities } from "@/entities/club";
import { SearchFilters } from "@/features/search";
import { CourtCard } from "./CourtCard";

interface CourtCatalogProps {
  courts: Court[];
  clubs: Club[];
  sports: Sport[];
}

export function CourtCatalog({ courts, clubs, sports }: CourtCatalogProps) {
  const searchParams = useSearchParams();

  const deporte = searchParams.get("deporte") ?? "";
  const ciudad = searchParams.get("ciudad") ?? "";
  const precioMin = searchParams.get("precioMin") ?? "";
  const precioMax = searchParams.get("precioMax") ?? "";

  const cities = useMemo(() => getUniqueCities(clubs), [clubs]);

  const filteredCourts = useMemo(() => {
    let result = courts.filter((c) => c.isActive);

    // Filter by sport
    if (deporte) {
      result = getCourtsBySport(result, deporte);
    }

    // Filter by city (look up club city)
    if (ciudad) {
      result = result.filter((court) => {
        const club = getClubById(clubs, court.clubId);
        return club?.city === ciudad;
      });
    }

    // Filter by price range
    const min = precioMin ? parseInt(precioMin, 10) : 0;
    const max = precioMax ? parseInt(precioMax, 10) : Infinity;
    if (precioMin || precioMax) {
      result = getCourtsByPriceRange(result, min, max);
    }

    return result;
  }, [courts, clubs, deporte, ciudad, precioMin, precioMax]);

  const hasFilters = !!(deporte || ciudad || precioMin || precioMax);

  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
      {/* Sidebar filters */}
      <aside className="w-full shrink-0 lg:w-64 xl:w-72">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <SearchFilters sports={sports} cities={cities} />
        </div>
      </aside>

      {/* Results */}
      <div className="min-w-0 flex-1">
        {/* Results header */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {filteredCourts.length === 0
                ? "Sin resultados"
                : `${filteredCourts.length} ${filteredCourts.length === 1 ? "cancha encontrada" : "canchas encontradas"}`}
            </h2>
            {hasFilters && (
              <p className="mt-0.5 text-sm text-gray-500">
                Filtros activos aplicados
              </p>
            )}
          </div>
        </div>

        {/* Empty state */}
        {filteredCourts.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 py-16 text-center">
            <SearchX className="mb-4 h-10 w-10 text-gray-300" />
            <h3 className="text-base font-semibold text-gray-600">
              No encontramos canchas con esos filtros
            </h3>
            <p className="mt-1 text-sm text-gray-400">
              Intenta ajustar los filtros de búsqueda para ver más resultados.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filteredCourts.map((court) => (
              <CourtCard key={court.id} court={court} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
