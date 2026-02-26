import type { Metadata } from "next";
import { CLUBS, getClubById } from "@/entities/club";
import { ClubDetailPage } from "@/_pages/clubs";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const club = getClubById(CLUBS, id);

  if (!club) {
    return {
      title: "Club no encontrado | EasyAgenda",
    };
  }

  return {
    title: `${club.name} | EasyAgenda`,
    description: club.description,
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return <ClubDetailPage clubId={id} />;
}
