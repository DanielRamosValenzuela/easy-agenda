"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Ruler,
  Clock,
  Lightbulb,
  Home,
  ParkingSquare,
  Building2,
  ChevronRight,
} from "lucide-react";
import type { Court, Amenity } from "@/entities/court";
import { getSurfaceLabel, getAmenityLabel } from "@/entities/court";
import type { Club } from "@/entities/club";
import type { TimeSlot } from "@/entities/time-slot";
import type { Booking } from "@/entities/booking";
import { formatPrice } from "@/shared/lib/format";
import { Badge } from "@/shared/ui/badge";
import { Separator } from "@/shared/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/shared/ui/dialog";
import { BookingForm, BookingConfirmation } from "@/features/booking";
import { BookingCalendar } from "./BookingCalendar";

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
  iluminacion: <Lightbulb className="h-4 w-4 text-emerald-600" />,
  techado: <Home className="h-4 w-4 text-emerald-600" />,
  vestuarios: <Building2 className="h-4 w-4 text-emerald-600" />,
  estacionamiento: <ParkingSquare className="h-4 w-4 text-emerald-600" />,
};

interface CourtDetailViewProps {
  court: Court;
  club: Club;
}

type BookingStep = "idle" | "form" | "confirmation";

export function CourtDetailView({ court, club }: CourtDetailViewProps) {
  const gradient = SPORT_GRADIENTS[court.sportId] ?? "from-emerald-500 to-teal-600";

  const [bookingStep, setBookingStep] = useState<BookingStep>("idle");
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  function handleSelectSlot(slot: TimeSlot) {
    setSelectedSlot(slot);
    setBookingStep("form");
  }

  function handleConfirmBooking(booking: Booking) {
    setConfirmedBooking(booking);
    setBookingStep("confirmation");
  }

  function handleCloseDialog() {
    setBookingStep("idle");
    setSelectedSlot(null);
    setConfirmedBooking(null);
  }

  return (
    <div className="w-full">
      {/* Back link */}
      <div className="mb-6">
        <Link
          href="/canchas"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-emerald-700 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al catálogo de canchas
        </Link>
      </div>

      {/* Hero / image placeholder */}
      <div
        className={`relative h-56 w-full overflow-hidden rounded-2xl bg-gradient-to-br ${gradient} md:h-72`}
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex items-end p-6 md:p-8">
          <div className="relative z-10 space-y-2">
            {/* Sport badge */}
            <Badge className="border-white/30 bg-white/20 text-white backdrop-blur-sm">
              {SPORT_LABELS[court.sportId] ?? court.sportId}
            </Badge>
            {/* Court name */}
            <h1 className="text-2xl font-bold text-white drop-shadow md:text-3xl">
              {court.name}
            </h1>
            {/* Club link */}
            <div className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-white/80" />
              <Link
                href={`/clubes/${club.id}`}
                className="text-sm text-white/90 underline-offset-2 hover:text-white hover:underline transition-colors"
              >
                {club.name}
              </Link>
              <ChevronRight className="h-3.5 w-3.5 text-white/60" />
              <span className="text-sm text-white/70">{club.city}</span>
            </div>
          </div>
        </div>
        {/* Price badge top-right */}
        <div className="absolute right-4 top-4 z-10">
          <div className="rounded-xl bg-black/40 px-4 py-2 backdrop-blur-sm text-center">
            <p className="text-xl font-bold text-white">{formatPrice(court.pricePerHour)}</p>
            <p className="text-xs text-white/70">por hora</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left: Info */}
        <div className="space-y-8 lg:col-span-2">
          {/* Court details grid */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Detalles de la cancha
            </h2>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {/* Surface */}
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Superficie
                </p>
                <p className="mt-1 text-sm font-semibold text-gray-800">
                  {getSurfaceLabel(court.surface)}
                </p>
              </div>
              {/* Dimensions */}
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                <div className="flex items-center gap-1.5">
                  <Ruler className="h-3.5 w-3.5 text-gray-400" />
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Dimensiones
                  </p>
                </div>
                <p className="mt-1 text-sm font-semibold text-gray-800">
                  {court.dimensions}
                </p>
              </div>
              {/* Price */}
              <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-emerald-500" />
                  <p className="text-xs font-medium uppercase tracking-wide text-emerald-600">
                    Precio / hora
                  </p>
                </div>
                <p className="mt-1 text-sm font-bold text-emerald-700">
                  {formatPrice(court.pricePerHour)}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Amenities */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Comodidades e instalaciones
            </h2>
            {court.amenities.length === 0 ? (
              <p className="mt-3 text-sm text-gray-400">
                Sin comodidades adicionales registradas.
              </p>
            ) : (
              <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {court.amenities.map((amenity) => (
                  <li
                    key={amenity}
                    className="flex items-center gap-3 rounded-lg border border-gray-100 bg-white px-4 py-3 text-sm text-gray-700 shadow-xs"
                  >
                    {AMENITY_ICONS[amenity]}
                    <span className="font-medium">{getAmenityLabel(amenity)}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <Separator />

          {/* Club info teaser */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Club</h2>
            <div className="mt-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <p className="font-semibold text-gray-900">{club.name}</p>
                  <p className="flex items-center gap-1.5 text-sm text-gray-500">
                    <MapPin className="h-3.5 w-3.5 shrink-0" />
                    {club.address}, {club.city}
                  </p>
                  <p className="text-sm text-gray-500">{club.openingHours}</p>
                </div>
                <Link
                  href={`/clubes/${club.id}`}
                  className="shrink-0 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 hover:bg-emerald-100 transition-colors"
                >
                  Ver club
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Booking calendar */}
        <div className="lg:col-span-1">
          <div className="sticky top-6">
            <BookingCalendar
              courtId={court.id}
              pricePerHour={court.pricePerHour}
              onSelectSlot={handleSelectSlot}
            />
          </div>
        </div>
      </div>

      {/* Booking Dialog */}
      <Dialog
        open={bookingStep !== "idle"}
        onOpenChange={(open) => { if (!open) handleCloseDialog(); }}
      >
        <DialogContent className="sm:max-w-md">
          {bookingStep === "form" && selectedSlot && (
            <>
              <DialogHeader>
                <DialogTitle>Completar reserva</DialogTitle>
                <DialogDescription>
                  Ingresa tus datos para confirmar la reserva del horario seleccionado.
                </DialogDescription>
              </DialogHeader>
              <BookingForm
                court={court}
                club={club}
                selectedSlot={selectedSlot}
                onConfirm={handleConfirmBooking}
                onCancel={handleCloseDialog}
              />
            </>
          )}
          {bookingStep === "confirmation" && confirmedBooking && (
            <>
              <DialogHeader>
                <DialogTitle className="sr-only">Reserva confirmada</DialogTitle>
                <DialogDescription className="sr-only">
                  Tu reserva ha sido confirmada exitosamente.
                </DialogDescription>
              </DialogHeader>
              <BookingConfirmation
                booking={confirmedBooking}
                onClose={handleCloseDialog}
              />
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
