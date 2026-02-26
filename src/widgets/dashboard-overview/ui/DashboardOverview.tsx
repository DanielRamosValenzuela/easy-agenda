import Link from "next/link";
import { CalendarDays, PlusCircle, Clock, RotateCcw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Badge } from "@/shared/ui/badge";
import type { Booking, BookingStatus } from "@/entities/booking";
import {
  getStatusLabel,
  getUpcomingBookings,
  getPastBookings,
} from "@/entities/booking";
import { COURTS, getCourtById } from "@/entities/court";
import { CLUBS, getClubById } from "@/entities/club";
import { formatPrice, formatDateShort } from "@/shared/lib/format";
import { cn } from "@/shared/lib/utils";

interface DashboardOverviewProps {
  bookings: Booking[];
}

function statusVariant(
  status: BookingStatus
): "default" | "secondary" | "destructive" | "outline" {
  if (status === "confirmed") return "default";
  if (status === "completed") return "secondary";
  return "destructive";
}

function BookingRow({ booking }: { booking: Booking }) {
  const court = getCourtById(COURTS, booking.courtId);
  const club = getClubById(CLUBS, booking.clubId);

  return (
    <div className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Date & Time */}
      <div className="flex items-center gap-3 min-w-[140px]">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
          <CalendarDays className="h-4 w-4 text-muted-foreground" />
        </div>
        <div>
          <p className="text-sm font-medium">{formatDateShort(booking.date)}</p>
          <p className="text-xs text-muted-foreground">
            {booking.startTime} – {booking.endTime}
          </p>
        </div>
      </div>

      {/* Court & Club */}
      <div className="flex-1 sm:px-4">
        <p className="text-sm font-medium">
          {court?.name ?? booking.courtId}
        </p>
        <p className="text-xs text-muted-foreground">
          {club?.name ?? booking.clubId}
        </p>
      </div>

      {/* Status & Price */}
      <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end sm:justify-start">
        <Badge variant={statusVariant(booking.status)} className="shrink-0">
          {getStatusLabel(booking.status)}
        </Badge>
        <p className="text-sm font-semibold">{formatPrice(booking.totalPrice)}</p>
      </div>
    </div>
  );
}

export function DashboardOverview({ bookings }: DashboardOverviewProps) {
  const upcoming = getUpcomingBookings(bookings);
  const past = getPastBookings(bookings);
  const nextBooking = upcoming[0] ?? null;
  const activeCount = upcoming.length;

  const nextCourt = nextBooking
    ? getCourtById(COURTS, nextBooking.courtId)
    : null;

  return (
    <div className="space-y-8">
      {/* Summary Cards Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Total Active */}
        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <CalendarDays className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{activeCount}</p>
              <p className="text-sm text-muted-foreground">
                {activeCount === 1 ? "Reserva activa" : "Reservas activas"}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Next Booking */}
        <Card
          className={cn(
            "sm:col-span-1",
            nextBooking && "border-primary/40 bg-primary/5"
          )}
        >
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-muted-foreground">
                Próxima reserva
              </p>
              {nextBooking ? (
                <>
                  <p className="truncate text-sm font-medium">
                    {nextCourt?.name ?? nextBooking.courtId}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDateShort(nextBooking.date)} · {nextBooking.startTime}
                  </p>
                </>
              ) : (
                <p className="text-sm text-muted-foreground">Sin reservas</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Action */}
        <Card>
          <CardContent className="flex flex-col items-center justify-center gap-3 pt-6">
            <p className="text-sm text-muted-foreground">¿Quieres jugar?</p>
            <Button className="w-full gap-2" asChild>
              <Link href="/canchas">
                <PlusCircle className="h-4 w-4" />
                Nueva Reserva
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Bookings */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base">
            <CalendarDays className="h-4 w-4 text-primary" />
            Proximas Reservas
          </CardTitle>
        </CardHeader>
        <CardContent>
          {upcoming.length === 0 ? (
            <div className="py-8 text-center text-sm text-muted-foreground">
              <p>No tienes reservas próximas.</p>
              <Button variant="outline" className="mt-4 gap-2" asChild>
                <Link href="/canchas">
                  <PlusCircle className="h-4 w-4" />
                  Reservar una cancha
                </Link>
              </Button>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {upcoming.map((booking) => (
                <BookingRow key={booking.id} booking={booking} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Past / History */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base">
            <RotateCcw className="h-4 w-4 text-muted-foreground" />
            Historial
          </CardTitle>
        </CardHeader>
        <CardContent>
          {past.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No tienes reservas anteriores.
            </p>
          ) : (
            <div className="divide-y divide-border">
              {past.map((booking) => (
                <BookingRow key={booking.id} booking={booking} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
