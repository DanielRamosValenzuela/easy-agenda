import Link from "next/link";
import { MapPin, Phone, Mail, Clock, Star, ChevronRight } from "lucide-react";
import type { Club } from "@/entities/club";
import { formatRating } from "@/entities/club";
import type { Court } from "@/entities/court";
import { getSurfaceLabel } from "@/entities/court";
import type { Review } from "@/entities/review";
import { formatPrice } from "@/shared/lib/format";
import { formatDate } from "@/shared/lib/format";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { Separator } from "@/shared/ui/separator";

const SPORT_LABELS: Record<string, string> = {
  padel: "Pádel",
  tenis: "Tenis",
  squash: "Squash",
  racquetball: "Racquetball",
};

function StarRating({ rating, size = "md" }: { rating: number; size?: "sm" | "md" }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const iconClass = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`${iconClass} ${
            i < fullStars
              ? "fill-amber-400 text-amber-400"
              : i === fullStars && hasHalfStar
                ? "fill-amber-200 text-amber-400"
                : "fill-gray-200 text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}

interface ClubDetailViewProps {
  club: Club;
  courts: Court[];
  reviews: Review[];
}

export function ClubDetailView({ club, courts, reviews }: ClubDetailViewProps) {
  return (
    <div className="w-full">
      {/* Hero / Cover */}
      <div className="relative h-56 w-full rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 md:h-72">
        <div className="absolute inset-0 rounded-2xl bg-black/20" />
        <div className="absolute inset-0 flex items-end p-6 md:p-8">
          <div className="relative z-10 flex flex-col gap-2">
            {/* Sport badges */}
            <div className="flex flex-wrap gap-2">
              {club.sportIds.map((sportId) => (
                <Badge
                  key={sportId}
                  className="border-white/40 bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
                >
                  {SPORT_LABELS[sportId] ?? sportId}
                </Badge>
              ))}
            </div>
            <h1 className="text-2xl font-bold text-white drop-shadow md:text-3xl">
              {club.name}
            </h1>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <StarRating rating={club.rating} />
                <span className="text-sm font-semibold text-white">
                  {formatRating(club.rating)}
                </span>
                <span className="text-sm text-white/70">
                  ({reviews.length} {reviews.length === 1 ? "reseña" : "reseñas"})
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-white/90">
              <MapPin className="h-4 w-4 shrink-0" />
              <span className="text-sm">{club.address}, {club.city}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left column: description + courts + reviews */}
        <div className="lg:col-span-2 space-y-8">
          {/* Description */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Sobre el club</h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">
              {club.description}
            </p>
          </div>

          <Separator />

          {/* Courts */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Canchas disponibles
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {courts.length} {courts.length === 1 ? "cancha" : "canchas"} en este club
            </p>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {courts.map((court) => (
                <Card
                  key={court.id}
                  className="overflow-hidden transition-shadow hover:shadow-md"
                >
                  {/* Court color strip */}
                  <div className="h-2 w-full bg-gradient-to-r from-emerald-400 to-teal-500" />
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="truncate font-semibold text-gray-900">
                          {court.name}
                        </h3>
                        <div className="mt-1 flex flex-wrap items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {SPORT_LABELS[court.sportId] ?? court.sportId}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {getSurfaceLabel(court.surface)}
                          </span>
                        </div>
                      </div>
                      <div className="shrink-0 text-right">
                        <p className="text-sm font-bold text-emerald-700">
                          {formatPrice(court.pricePerHour)}
                        </p>
                        <p className="text-xs text-gray-400">por hora</p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <Button asChild size="sm" className="w-full gap-1">
                        <Link href={`/canchas/${court.id}`}>
                          Ver disponibilidad
                          <ChevronRight className="h-3.5 w-3.5" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Separator />

          {/* Reviews */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Reseñas</h2>
            <div className="mt-1 flex items-center gap-2">
              <StarRating rating={club.rating} />
              <span className="text-sm font-semibold text-gray-800">
                {formatRating(club.rating)}
              </span>
              <span className="text-sm text-gray-500">
                · {reviews.length} {reviews.length === 1 ? "reseña" : "reseñas"}
              </span>
            </div>

            <div className="mt-5 space-y-4">
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          {/* Avatar placeholder */}
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-700">
                            {review.author.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {review.author}
                            </p>
                            <p className="text-xs text-gray-400">
                              {formatDate(review.date)}
                            </p>
                          </div>
                        </div>
                        <StarRating rating={review.rating} size="sm" />
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-gray-600">
                        {review.comment}
                      </p>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p className="text-sm text-gray-400">
                  Aún no hay reseñas para este club.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right column: info card */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="text-base">Información del club</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Teléfono
                  </p>
                  <a
                    href={`tel:${club.phone.replace(/\s/g, "")}`}
                    className="text-sm text-gray-800 hover:text-emerald-700 transition-colors"
                  >
                    {club.phone}
                  </a>
                </div>
              </div>

              <Separator />

              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Email
                  </p>
                  <a
                    href={`mailto:${club.email}`}
                    className="text-sm text-gray-800 hover:text-emerald-700 transition-colors break-all"
                  >
                    {club.email}
                  </a>
                </div>
              </div>

              <Separator />

              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Horario de apertura
                  </p>
                  <p className="text-sm text-gray-800 leading-relaxed">
                    {club.openingHours}
                  </p>
                </div>
              </div>

              <Separator />

              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Dirección
                  </p>
                  <p className="text-sm text-gray-800">{club.address}</p>
                  <p className="text-sm text-gray-500">{club.city}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
