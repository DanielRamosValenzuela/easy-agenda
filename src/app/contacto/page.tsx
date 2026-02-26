import type { Metadata } from "next";
import { ContactPage } from "@/_pages/contact";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contáctanos para resolver tus dudas sobre EasyAgenda. Te respondemos en menos de 24 horas hábiles.",
};

export default function ContactoPage() {
  return <ContactPage />;
}
