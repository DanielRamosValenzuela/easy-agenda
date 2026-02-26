import type { Metadata } from "next";
import { PricingPage } from "@/_pages/pricing";

export const metadata: Metadata = {
  title: "Precios",
  description:
    "Conoce los planes de EasyAgenda. Comienza gratis y escala a medida que tu club crece. Sin contratos, sin costos ocultos.",
};

export default function PreciosPage() {
  return <PricingPage />;
}
