import type { Club } from "@/entities/club";
import { ClubCard } from "./ClubCard";

interface ClubGridProps {
  clubs: Club[];
}

export function ClubGrid({ clubs }: ClubGridProps) {
  return (
    <section className="w-full">
      {/* Section header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Clubes Deportivos
        </h1>
        <p className="mt-2 text-base text-gray-500">
          Descubre los mejores clubes de deportes de raqueta y reserva tu cancha
          en minutos.
        </p>
      </div>

      {/* Results count */}
      <p className="mb-4 text-sm text-gray-500">
        {clubs.length === 1
          ? "1 club disponible"
          : `${clubs.length} clubes disponibles`}
      </p>

      {/* Grid */}
      {clubs.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {clubs.map((club, index) => (
            <ClubCard key={club.id} club={club} index={index} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 py-16 text-center">
          <p className="text-base font-medium text-gray-600">
            No se encontraron clubes
          </p>
          <p className="mt-1 text-sm text-gray-400">
            Intenta ajustar los filtros de búsqueda.
          </p>
        </div>
      )}
    </section>
  );
}
