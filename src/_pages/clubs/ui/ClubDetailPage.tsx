import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CLUBS, getClubById } from "@/entities/club";
import { COURTS, getCourtsByClub } from "@/entities/court";
import { REVIEWS } from "@/entities/review";
import { ClubDetailView } from "@/widgets/club-detail-view";
import { Button } from "@/shared/ui/button";

interface ClubDetailPageProps {
  clubId: string;
}

export function ClubDetailPage({ clubId }: ClubDetailPageProps) {
  const club = getClubById(CLUBS, clubId);

  if (!club) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50 py-24 text-center">
          <p className="text-lg font-semibold text-gray-700">
            Club no encontrado
          </p>
          <p className="mt-2 text-sm text-gray-400">
            El club que buscas no existe o ha sido eliminado.
          </p>
          <Button asChild variant="outline" className="mt-6">
            <Link href="/clubes">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Ver todos los clubes
            </Link>
          </Button>
        </div>
      </main>
    );
  }

  const courts = getCourtsByClub(COURTS, clubId);
  const reviews = REVIEWS.filter((review) => review.clubId === clubId);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Back link */}
      <div className="mb-6">
        <Button asChild variant="ghost" size="sm" className="-ml-2 gap-1.5 text-gray-500 hover:text-gray-900">
          <Link href="/clubes">
            <ArrowLeft className="h-4 w-4" />
            Todos los clubes
          </Link>
        </Button>
      </div>

      <ClubDetailView club={club} courts={courts} reviews={reviews} />
    </main>
  );
}
