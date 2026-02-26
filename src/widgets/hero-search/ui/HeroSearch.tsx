"use client";

import { SearchBar } from "@/features/search";

export function HeroSearch() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10 py-20 sm:py-28 lg:py-36">
      {/* Decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Reserva tu cancha
            <span className="block text-primary">en segundos</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
            Encuentra y reserva canchas de pádel, tenis, squash y racquetball en
            los mejores clubes de Chile. Sin llamadas, sin esperas.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl">
          <SearchBar variant="hero" />
        </div>

        <div className="mx-auto mt-8 flex max-w-md items-center justify-center gap-6 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            Disponibilidad en tiempo real
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            Confirmación instantánea
          </span>
        </div>
      </div>
    </section>
  );
}
