import { COURTS } from "@/entities/court";
import { CLUBS } from "@/entities/club";
import { SPORTS } from "@/entities/sport";
import { CourtCatalog } from "@/widgets/court-catalog";

export function CourtsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Catálogo de canchas
        </h1>
        <p className="mt-2 text-gray-500">
          Encuentra y reserva la cancha perfecta para tu deporte favorito.
        </p>
      </div>

      <CourtCatalog courts={COURTS} clubs={CLUBS} sports={SPORTS} />
    </main>
  );
}
