import Link from "next/link";
import { MapPin, CircleDot } from "lucide-react";
import type { Court } from "@/entities/court";
import { getSurfaceLabel } from "@/entities/court";
import type { Club } from "@/entities/club";
import { formatPrice } from "@/shared/lib/format";
import { Badge } from "@/shared/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";

const SPORT_LABELS: Record<string, string> = {
  padel: "Pádel",
  tenis: "Tenis",
  squash: "Squash",
  racquetball: "Racquetball",
};

const SPORT_BADGE_CLASSES: Record<string, string> = {
  padel: "bg-emerald-100 text-emerald-700 border-emerald-200",
  tenis: "bg-amber-100 text-amber-700 border-amber-200",
  squash: "bg-violet-100 text-violet-700 border-violet-200",
  racquetball: "bg-blue-100 text-blue-700 border-blue-200",
};

interface SearchResultsProps {
  courts: Court[];
  clubs: Club[];
}

export function SearchResults({ courts, clubs }: SearchResultsProps) {
  if (courts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50 py-16 text-center">
        <CircleDot className="mb-3 h-10 w-10 text-gray-300" />
        <p className="text-base font-semibold text-gray-500">
          Sin resultados
        </p>
        <p className="mt-1 text-sm text-gray-400">
          No encontramos canchas que coincidan con tu búsqueda. Intenta con otros filtros.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {courts.map((court) => {
        const club = clubs.find((c) => c.id === court.clubId);
        const sportLabel = SPORT_LABELS[court.sportId] ?? court.sportId;
        const sportBadgeClass =
          SPORT_BADGE_CLASSES[court.sportId] ??
          "bg-gray-100 text-gray-700 border-gray-200";

        return (
          <Link
            key={court.id}
            href={`/canchas/${court.id}`}
            className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-xl"
          >
            <Card className="h-full overflow-hidden border border-gray-200 transition-all duration-200 group-hover:border-emerald-300 group-hover:shadow-md">
              {/* Availability indicator strip */}
              <div className="h-1.5 w-full bg-emerald-400" />

              <CardHeader className="pb-2 pt-4">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-base font-semibold text-gray-900 leading-snug group-hover:text-emerald-700 transition-colors">
                    {court.name}
                  </CardTitle>
                  {/* Availability dot */}
                  <div
                    className="mt-1 flex shrink-0 items-center gap-1 text-xs text-emerald-600"
                    title="Disponible"
                  >
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-medium">Disponible</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-3 pb-4">
                {/* Club location */}
                {club && (
                  <div className="flex items-center gap-1.5 text-sm text-gray-500">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                    <span className="truncate">
                      {club.name} &middot; {club.city}
                    </span>
                  </div>
                )}

                {/* Sport & surface badges */}
                <div className="flex flex-wrap gap-1.5">
                  <Badge
                    variant="outline"
                    className={`text-xs font-medium ${sportBadgeClass}`}
                  >
                    {sportLabel}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="text-xs font-medium text-gray-500 border-gray-200 bg-gray-50"
                  >
                    {getSurfaceLabel(court.surface)}
                  </Badge>
                </div>

                {/* Price */}
                <div className="flex items-baseline justify-between pt-1">
                  <p className="text-lg font-bold text-emerald-700">
                    {formatPrice(court.pricePerHour)}
                  </p>
                  <p className="text-xs text-gray-400">por hora</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
