"use client";

import Link from "next/link";
import { CheckCircle2, CalendarCheck, Clock, Receipt, Home, LayoutDashboard } from "lucide-react";
import type { Booking } from "@/entities/booking";
import { formatPrice, formatDate, formatTimeRange } from "@/shared/lib/format";
import { Button } from "@/shared/ui/button";
import { Separator } from "@/shared/ui/separator";

interface BookingConfirmationProps {
  booking: Booking;
  onClose: () => void;
}

export function BookingConfirmation({ booking, onClose }: BookingConfirmationProps) {
  return (
    <div className="space-y-6 text-center">
      {/* Success animation */}
      <div className="flex flex-col items-center gap-3">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 animate-in zoom-in-50 duration-300">
          <CheckCircle2 className="h-8 w-8 text-emerald-600" />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-gray-900">
            ¡Reserva confirmada!
          </h3>
          <p className="text-sm text-gray-500">
            Tu reserva ha sido registrada exitosamente.
          </p>
        </div>
      </div>

      <Separator />

      {/* Booking details */}
      <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 text-left space-y-3">
        {/* Booking ID */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-medium text-gray-500 uppercase tracking-wide">
            <Receipt className="h-3.5 w-3.5" />
            N° de reserva
          </div>
          <span className="rounded-full bg-emerald-100 px-3 py-0.5 text-xs font-bold text-emerald-800 font-mono tracking-wide">
            {booking.id}
          </span>
        </div>

        <Separator className="my-1" />

        {/* Date */}
        <div className="flex items-center gap-3">
          <CalendarCheck className="h-4 w-4 shrink-0 text-emerald-600" />
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">
              Fecha
            </p>
            <p className="text-sm font-semibold text-gray-800">
              {formatDate(booking.date)}
            </p>
          </div>
        </div>

        {/* Time */}
        <div className="flex items-center gap-3">
          <Clock className="h-4 w-4 shrink-0 text-emerald-600" />
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">
              Horario
            </p>
            <p className="text-sm font-semibold text-gray-800">
              {formatTimeRange(booking.startTime, booking.endTime)}
            </p>
          </div>
        </div>

        {/* Duration & Price */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <div className="rounded-lg bg-white border border-gray-100 p-3">
            <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">
              Duración
            </p>
            <p className="mt-0.5 text-sm font-bold text-gray-800">
              {booking.duration} min
            </p>
          </div>
          <div className="rounded-lg bg-emerald-50 border border-emerald-100 p-3">
            <p className="text-xs text-emerald-600 uppercase tracking-wide font-medium">
              Total
            </p>
            <p className="mt-0.5 text-sm font-bold text-emerald-700">
              {formatPrice(booking.totalPrice)}
            </p>
          </div>
        </div>
      </div>

      {/* Note */}
      <p className="text-xs text-gray-400">
        Recibirás un correo de confirmación en{" "}
        <span className="font-medium text-gray-600">{booking.customerEmail}</span>
      </p>

      {/* Action buttons */}
      <div className="flex flex-col gap-2 sm:flex-row">
        <Button variant="outline" className="flex-1 gap-2" asChild onClick={onClose}>
          <Link href="/">
            <Home className="h-4 w-4" />
            Volver al inicio
          </Link>
        </Button>
        <Button
          className="flex-1 gap-2 bg-emerald-600 hover:bg-emerald-700"
          asChild
          onClick={onClose}
        >
          <Link href="/dashboard">
            <LayoutDashboard className="h-4 w-4" />
            Ver mis reservas
          </Link>
        </Button>
      </div>
    </div>
  );
}
