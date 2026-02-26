import type { Metadata } from "next";
import { ClubsPage } from "@/_pages/clubs";

export const metadata: Metadata = {
  title: "Clubes | EasyAgenda",
  description:
    "Descubre los mejores clubes de deportes de raqueta en Chile. Reserva tu cancha de pádel, tenis, squash o racquetball en minutos.",
};

export default function Page() {
  return <ClubsPage />;
}
