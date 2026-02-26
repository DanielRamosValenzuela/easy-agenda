import { notFound } from "next/navigation";
import { COURTS, getCourtById } from "@/entities/court";
import { CLUBS, getClubById } from "@/entities/club";
import { CourtDetailView } from "@/widgets/court-detail-view";

interface CourtDetailPageProps {
  courtId: string;
}

export function CourtDetailPage({ courtId }: CourtDetailPageProps) {
  const court = getCourtById(COURTS, courtId);

  if (!court) {
    notFound();
  }

  const club = getClubById(CLUBS, court.clubId);

  if (!club) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <CourtDetailView court={court} club={club} />
    </main>
  );
}
