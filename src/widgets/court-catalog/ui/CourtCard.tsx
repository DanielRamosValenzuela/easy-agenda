import Link from "next/link";
import { Zap, Lightbulb, Home, ParkingSquare, Building2, ArrowRight } from "lucide-react";
import type { Court, Amenity } from "@/entities/court";
import { getSurfaceLabel, getAmenityLabel } from "@/entities/court";
import { CLUBS } from "@/entities/club";
import { getClubById } from "@/entities/club";
import { formatPrice } from "@/shared/lib/format";
import { Card, CardContent } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";

const SPORT_LABELS: Record<string, string> = {
  padel: "Pádel",
  tenis: "Tenis",
  squash: "Squash",
  racquetball: "Racquetball",
};

const SPORT_GRADIENTS: Record<string, string> = {
  padel: "from-emerald-500 to-teal-600",
  tenis: "from-amber-500 to-orange-600",
  squash: "from-violet-500 to-purple-600",
  racquetball: "from-blue-500 to-indigo-600",
};

const AMENITY_ICONS: Record<Amenity, React.ReactNode> = {
  iluminacion: <Lightbulb className="h-3.5 w-3.5" />,
  techado: <Home className="h-3.5 w-3.5" />,
  vestuarios: <Building2 className="h-3.5 w-3.5" />,
  estacionamiento: <ParkingSquare className="h-3.5 w-3.5" />,
};

interface CourtCardProps {
  court: Court;
}

export function CourtCard({ court }: CourtCardProps) {
  const club = getClubById(CLUBS, court.clubId);
  const gradient =
    SPORT_GRADIENTS[court.sportId] ??
    `from-emerald-500 to-teal-600`;

  return (
    <Link href={`/canchas/${court.id}`} className="group block">
      <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5">
        {/* Image placeholder */}
        <div
          className={`relative h-40 bg-gradient-to-br ${gradient} flex items-end p-4`}
        >
          <div className="absolute inset-0 bg-black/15" />
          {/* Sport badge pinned top-left */}
          <div className="absolute left-3 top-3 z-10">
            <Badge className="border-white/30 bg-white/20 text-white backdrop-blur-sm text-xs font-medium">
              {court.sportId === "racquetball" && (
                <Zap className="mr-1 h-3 w-3" />
              )}
              {SPORT_LABELS[court.sportId] ?? court.sportId}
            </Badge>
          </div>
          {/* Price badge pinned top-right */}
          <div className="absolute right-3 top-3 z-10">
            <span className="inline-flex items-center rounded-lg bg-black/40 px-2.5 py-1 text-sm font-bold text-white backdrop-blur-sm">
              {formatPrice(court.pricePerHour)}
              <span className="ml-1 text-xs font-normal opacity-80">/hr</span>
            </span>
          </div>
          {/* Surface label bottom-left */}
          <div className="relative z-10">
            <span className="text-xs text-white/80 font-medium">
              {getSurfaceLabel(court.surface)}
            </span>
          </div>
        </div>

        <CardContent className="p-4">
          {/* Court name */}
          <h3 className="text-base font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
            {court.name}
          </h3>

          {/* Club name */}
          {club && (
            <p className="mt-0.5 text-sm text-gray-500 line-clamp-1">
              {club.name} &middot; {club.city}
            </p>
          )}

          {/* Dimensions */}
          <p className="mt-1 text-xs text-gray-400">{court.dimensions}</p>

          {/* Amenities */}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {court.amenities.map((amenity) => (
              <span
                key={amenity}
                className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
                title={getAmenityLabel(amenity)}
              >
                {AMENITY_ICONS[amenity]}
                <span className="sr-only">{getAmenityLabel(amenity)}</span>
              </span>
            ))}
            {court.amenities.length > 0 && (
              <span className="text-xs text-gray-400">
                {court.amenities.map(getAmenityLabel).join(", ")}
              </span>
            )}
          </div>

          {/* CTA */}
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs font-medium text-emerald-600 group-hover:underline flex items-center gap-1">
              Ver disponibilidad
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
            </span>
            <Badge variant="outline" className="text-xs font-normal text-gray-500">
              {getSurfaceLabel(court.surface)}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
