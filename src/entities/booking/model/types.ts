export type BookingStatus = "confirmed" | "completed" | "cancelled";

export interface Booking {
  id: string;
  courtId: string;
  clubId: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  totalPrice: number;
  status: BookingStatus;
}
