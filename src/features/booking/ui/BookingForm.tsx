"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Mail, Phone, CalendarCheck } from "lucide-react";
import type { Court } from "@/entities/court";
import type { Club } from "@/entities/club";
import type { TimeSlot } from "@/entities/time-slot";
import type { Booking } from "@/entities/booking";
import { generateBookingId } from "@/entities/booking";
import { formatPrice, formatDate, formatTimeRange } from "@/shared/lib/format";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Separator } from "@/shared/ui/separator";
import { bookingSchema, type BookingFormData } from "../model/booking-schema";

interface BookingFormProps {
  court: Court;
  club: Club;
  selectedSlot: TimeSlot;
  onConfirm: (booking: Booking) => void;
  onCancel: () => void;
}

export function BookingForm({
  court,
  club,
  selectedSlot,
  onConfirm,
  onCancel,
}: BookingFormProps) {
  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  function handleSubmit(data: BookingFormData) {
    const booking: Booking = {
      id: generateBookingId(),
      courtId: court.id,
      clubId: club.id,
      date: selectedSlot.date,
      startTime: selectedSlot.startTime,
      endTime: selectedSlot.endTime,
      duration: 60,
      customerName: data.name,
      customerEmail: data.email,
      customerPhone: data.phone,
      totalPrice: court.pricePerHour,
      status: "confirmed",
    };
    onConfirm(booking);
  }

  return (
    <div className="space-y-5">
      {/* Slot summary */}
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
        <div className="flex items-start gap-3">
          <CalendarCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
          <div className="min-w-0 flex-1 space-y-1">
            <p className="text-sm font-semibold text-emerald-900">{court.name}</p>
            <p className="text-xs text-emerald-700">{club.name}</p>
            <p className="text-xs text-emerald-700">
              {formatDate(selectedSlot.date)}
            </p>
            <p className="text-sm font-medium text-emerald-800">
              {formatTimeRange(selectedSlot.startTime, selectedSlot.endTime)}
            </p>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-lg font-bold text-emerald-700">
              {formatPrice(court.pricePerHour)}
            </p>
            <p className="text-xs text-emerald-600">por hora</p>
          </div>
        </div>
      </div>

      <Separator />

      {/* Contact form */}
      <div>
        <h3 className="mb-4 text-sm font-semibold text-gray-900">
          Datos de contacto
        </h3>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
                    <User className="h-3 w-3" />
                    Nombre completo
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ej: Juan Pérez"
                      autoComplete="name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
                    <Mail className="h-3 w-3" />
                    Correo electrónico
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="juan@ejemplo.com"
                      autoComplete="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
                    <Phone className="h-3 w-3" />
                    Teléfono
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="912345678"
                      autoComplete="tel"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={onCancel}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                disabled={form.formState.isSubmitting}
              >
                Confirmar reserva
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
