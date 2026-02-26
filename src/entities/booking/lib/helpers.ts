import type { Booking, BookingStatus } from "../model/types";

const STATUS_LABELS: Record<BookingStatus, string> = {
  confirmed: "Confirmada",
  completed: "Completada",
  cancelled: "Cancelada",
};

export function getStatusLabel(status: BookingStatus): string {
  return STATUS_LABELS[status];
}

export function generateBookingId(): string {
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10).replace(/-/g, "");
  const random = Math.floor(Math.random() * 999) + 1;
  return `EA-${dateStr}-${random.toString().padStart(3, "0")}`;
}

export function getUpcomingBookings(bookings: Booking[]): Booking[] {
  const today = new Date().toISOString().slice(0, 10);
  return bookings
    .filter((b) => b.date >= today && b.status === "confirmed")
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function getPastBookings(bookings: Booking[]): Booking[] {
  const today = new Date().toISOString().slice(0, 10);
  return bookings
    .filter((b) => b.date < today || b.status !== "confirmed")
    .sort((a, b) => b.date.localeCompare(a.date));
}
