import { CLUBS } from "@/entities/club";
import { ClubGrid } from "@/widgets/club-grid";

export function ClubsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <ClubGrid clubs={CLUBS} />
    </main>
  );
}
