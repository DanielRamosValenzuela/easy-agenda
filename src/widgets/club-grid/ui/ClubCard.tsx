import Link from "next/link";
import { MapPin, Star } from "lucide-react";
import type { Club } from "@/entities/club";
import { formatRating } from "@/entities/club";
import { Card, CardContent } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";

const SPORT_LABELS: Record<string, string> = {
  padel: "Pádel",
  tenis: "Tenis",
  squash: "Squash",
  racquetball: "Racquetball",
};

const COVER_GRADIENTS = [
  "from-emerald-500 to-teal-600",
  "from-blue-500 to-indigo-600",
  "from-violet-500 to-purple-600",
  "from-orange-500 to-amber-600",
];

interface ClubCardProps {
  club: Club;
  index?: number;
}

export function ClubCard({ club, index = 0 }: ClubCardProps) {
  const gradient = COVER_GRADIENTS[index % COVER_GRADIENTS.length];
  const rating = parseFloat(formatRating(club.rating));
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;

  return (
    <Link href={`/clubes/${club.id}`} className="group block">
      <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5">
        {/* Cover image placeholder */}
        <div
          className={`relative h-44 bg-gradient-to-br ${gradient} flex items-end p-4`}
        >
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative z-10">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur-sm px-2.5 py-1 text-xs font-medium text-white">
              <MapPin className="h-3 w-3" />
              {club.city}
            </span>
          </div>
        </div>

        <CardContent className="p-4">
          {/* Club name */}
          <h3 className="text-base font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
            {club.name}
          </h3>

          {/* Address */}
          <p className="mt-1 text-sm text-gray-500 line-clamp-1">
            {club.address}
          </p>

          {/* Sport badges */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {club.sportIds.map((sportId) => (
              <Badge
                key={sportId}
                variant="secondary"
                className="text-xs font-medium"
              >
                {SPORT_LABELS[sportId] ?? sportId}
              </Badge>
            ))}
          </div>

          {/* Rating */}
          <div className="mt-3 flex items-center gap-1.5">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-3.5 w-3.5 ${
                    i < fullStars
                      ? "fill-amber-400 text-amber-400"
                      : i === fullStars && hasHalfStar
                        ? "fill-amber-200 text-amber-400"
                        : "fill-gray-200 text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-semibold text-gray-800">
              {formatRating(club.rating)}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
