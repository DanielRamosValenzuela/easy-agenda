"use client";

import { useState, useMemo } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon, Clock, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import type { TimeSlot } from "@/entities/time-slot";
import { generateTimeSlots, getSlotsByDate } from "@/entities/time-slot";
import { formatPrice } from "@/shared/lib/format";
import { Calendar } from "@/shared/ui/calendar";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { cn } from "@/shared/lib/utils";

interface BookingCalendarProps {
  courtId: string;
  pricePerHour: number;
  onSelectSlot?: (slot: TimeSlot) => void;
}

function SlotStatusIcon({ status }: { status: TimeSlot["status"] }) {
  if (status === "available") {
    return <CheckCircle2 className="h-3 w-3 text-emerald-500" />;
  }
  if (status === "occupied") {
    return <XCircle className="h-3 w-3 text-red-400" />;
  }
  return <AlertCircle className="h-3 w-3 text-amber-500" />;
}

export function BookingCalendar({ courtId, pricePerHour, onSelectSlot }: BookingCalendarProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [calendarOpen, setCalendarOpen] = useState(false);

  // Generate slots once for 14 days and cache
  const allSlots = useMemo(
    () => generateTimeSlots(courtId, today, 14),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [courtId],
  );

  const slotsForDate = useMemo(() => {
    const dateStr = format(selectedDate, "yyyy-MM-dd");
    return getSlotsByDate(allSlots, dateStr);
  }, [allSlots, selectedDate]);

  function handleSlotClick(slot: TimeSlot) {
    if (slot.status === "occupied") return;
    const next = selectedSlot?.id === slot.id ? null : slot;
    setSelectedSlot(next);
    if (next && onSelectSlot) {
      onSelectSlot(next);
    }
  }

  function handleDateSelect(date: Date | undefined) {
    if (!date) return;
    setSelectedDate(date);
    setSelectedSlot(null);
    setCalendarOpen(false);
  }

  const slotButtonClass = (slot: TimeSlot, isSelected: boolean): string => {
    if (slot.status === "occupied") {
      return "cursor-not-allowed border-red-200 bg-red-50 text-red-400 opacity-70";
    }
    if (isSelected) {
      return "border-emerald-600 bg-emerald-600 text-white shadow-md ring-2 ring-emerald-300";
    }
    if (slot.status === "partial") {
      return "border-amber-300 bg-amber-50 text-amber-700 hover:border-amber-500 hover:bg-amber-100";
    }
    return "border-emerald-200 bg-emerald-50 text-emerald-700 hover:border-emerald-500 hover:bg-emerald-100";
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-base">
          <CalendarIcon className="h-5 w-5 text-emerald-600" />
          Reservar horario
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Date picker */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium uppercase tracking-wide text-gray-400">
            Fecha
          </label>
          <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start gap-2 font-normal"
              >
                <CalendarIcon className="h-4 w-4 text-gray-400" />
                {format(selectedDate, "EEEE d 'de' MMMM, yyyy", { locale: es })}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                disabled={(date) => {
                  const d = new Date(date);
                  d.setHours(0, 0, 0, 0);
                  const t = new Date();
                  t.setHours(0, 0, 0, 0);
                  const maxDate = new Date(t);
                  maxDate.setDate(t.getDate() + 13);
                  return d < t || d > maxDate;
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-sm border border-emerald-300 bg-emerald-50" />
            Disponible
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-sm border border-amber-300 bg-amber-50" />
            Parcial
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-sm border border-red-200 bg-red-50" />
            Ocupado
          </span>
        </div>

        {/* Time slot grid */}
        <div className="space-y-2">
          <label className="text-xs font-medium uppercase tracking-wide text-gray-400">
            Horarios disponibles
          </label>
          {slotsForDate.length === 0 ? (
            <p className="py-6 text-center text-sm text-gray-400">
              No hay horarios disponibles para esta fecha.
            </p>
          ) : (
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
              {slotsForDate.map((slot) => {
                const isSelected = selectedSlot?.id === slot.id;
                return (
                  <button
                    key={slot.id}
                    onClick={() => handleSlotClick(slot)}
                    disabled={slot.status === "occupied"}
                    title={
                      slot.status === "partial"
                        ? "Disponible con reserva parcial"
                        : slot.status === "occupied"
                          ? "No disponible"
                          : "Disponible"
                    }
                    className={cn(
                      "flex flex-col items-center justify-center rounded-lg border px-2 py-2.5 text-xs font-medium transition-all duration-150",
                      slotButtonClass(slot, isSelected),
                    )}
                  >
                    <Clock className="mb-1 h-3 w-3 opacity-60" />
                    <span>{slot.startTime}</span>
                    <span className="opacity-60">→ {slot.endTime}</span>
                    <SlotStatusIcon status={slot.status} />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Selected slot summary */}
        {selectedSlot && (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
            <p className="text-sm font-semibold text-emerald-800">
              Horario seleccionado
            </p>
            <div className="mt-2 flex items-center justify-between">
              <div>
                <p className="text-sm text-emerald-700">
                  {format(selectedDate, "EEEE d 'de' MMMM", { locale: es })}
                </p>
                <p className="text-sm font-medium text-emerald-900">
                  {selectedSlot.startTime} — {selectedSlot.endTime}
                </p>
                {selectedSlot.status === "partial" && (
                  <p className="mt-1 text-xs text-amber-600">
                    Este horario tiene disponibilidad parcial.
                  </p>
                )}
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-emerald-700">
                  {formatPrice(pricePerHour)}
                </p>
                <p className="text-xs text-emerald-600">por hora</p>
              </div>
            </div>
            <Button
              className="mt-4 w-full"
              size="sm"
              onClick={() => onSelectSlot && selectedSlot && onSelectSlot(selectedSlot)}
            >
              Continuar con la reserva
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
