import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  email: z
    .string()
    .min(1, { message: "El correo electrónico es obligatorio." })
    .email({ message: "Ingresa un correo electrónico válido." }),
  subject: z
    .string()
    .min(3, { message: "El asunto debe tener al menos 3 caracteres." }),
  message: z
    .string()
    .min(10, { message: "El mensaje debe tener al menos 10 caracteres." }),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
