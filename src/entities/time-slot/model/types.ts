export type SlotStatus = "available" | "occupied" | "partial";

export interface TimeSlot {
  id: string;
  courtId: string;
  date: string;
  startTime: string;
  endTime: string;
  status: SlotStatus;
}
