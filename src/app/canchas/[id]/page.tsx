import type { Metadata } from "next";
import { COURTS, getCourtById } from "@/entities/court";
import { CourtDetailPage } from "@/_pages/courts";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const court = getCourtById(COURTS, id);
  return {
    title: court ? `${court.name} — Reservar cancha` : "Cancha no encontrada",
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return <CourtDetailPage courtId={id} />;
}
