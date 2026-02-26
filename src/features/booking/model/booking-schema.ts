import { z } from "zod";

export const bookingSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Ingresa un email válido"),
  phone: z
    .string()
    .regex(/^(\+?56)?9\d{8}$/, "Ingresa un teléfono válido (ej: 912345678)"),
});

export type BookingFormData = z.infer<typeof bookingSchema>;
