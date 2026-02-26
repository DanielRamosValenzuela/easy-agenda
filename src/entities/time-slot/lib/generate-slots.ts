import { format, addDays } from "date-fns";
import type { TimeSlot, SlotStatus } from "../model/types";

function getRandomStatus(): SlotStatus {
  const rand = Math.random();
  if (rand < 0.6) return "available";
  if (rand < 0.9) return "occupied";
  return "partial";
}

export function generateTimeSlots(
  courtId: string,
  startDate: Date = new Date(),
  days: number = 7,
): TimeSlot[] {
  const slots: TimeSlot[] = [];

  for (let d = 0; d < days; d++) {
    const date = addDays(startDate, d);
    const dateStr = format(date, "yyyy-MM-dd");

    for (let hour = 8; hour < 22; hour++) {
      const startTime = `${hour.toString().padStart(2, "0")}:00`;
      const endTime = `${(hour + 1).toString().padStart(2, "0")}:00`;

      slots.push({
        id: `${courtId}-${dateStr}-${startTime}`,
        courtId,
        date: dateStr,
        startTime,
        endTime,
        status: getRandomStatus(),
      });
    }
  }

  return slots;
}

export function getSlotsByDate(slots: TimeSlot[], date: string): TimeSlot[] {
  return slots.filter((slot) => slot.date === date);
}

export function getAvailableSlots(slots: TimeSlot[]): TimeSlot[] {
  return slots.filter((slot) => slot.status !== "occupied");
}
