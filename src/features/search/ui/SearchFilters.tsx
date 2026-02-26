"use client";

import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import type { Sport } from "@/entities/sport";
import { Button } from "@/shared/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { cn } from "@/shared/lib/utils";

interface SearchFiltersProps {
  sports: Sport[];
  cities: string[];
  className?: string;
}

const ALL_VALUE = "all";

export function SearchFilters({ sports, cities, className }: SearchFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const deporte = searchParams.get("deporte") ?? "";
  const ciudad = searchParams.get("ciudad") ?? "";
  const precioMin = searchParams.get("precioMin") ?? "";
  const precioMax = searchParams.get("precioMax") ?? "";

  const hasActiveFilters = !!(deporte || ciudad || precioMin || precioMax);

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value && value !== ALL_VALUE) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.replace(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams],
  );

  function clearAll() {
    router.replace("?", { scroll: false });
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-semibold text-gray-800">Filtros</span>
          {hasActiveFilters && (
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold text-white">
              {[deporte, ciudad, precioMin, precioMax].filter(Boolean).length}
            </span>
          )}
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearAll}
            className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-700 transition-colors"
          >
            <X className="h-3 w-3" />
            Limpiar
          </button>
        )}
      </div>

      {/* Deporte */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium uppercase tracking-wide text-gray-400">
          Deporte
        </label>
        <Select
          value={deporte || ALL_VALUE}
          onValueChange={(v) => updateParam("deporte", v)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Todos los deportes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL_VALUE}>Todos los deportes</SelectItem>
            {sports.map((sport) => (
              <SelectItem key={sport.id} value={sport.id}>
                {sport.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Ciudad */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium uppercase tracking-wide text-gray-400">
          Ciudad
        </label>
        <Select
          value={ciudad || ALL_VALUE}
          onValueChange={(v) => updateParam("ciudad", v)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Todas las ciudades" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL_VALUE}>Todas las ciudades</SelectItem>
            {cities.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Rango de precio */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium uppercase tracking-wide text-gray-400">
          Precio por hora (CLP)
        </label>
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <input
              type="number"
              value={precioMin}
              onChange={(e) => updateParam("precioMin", e.target.value)}
              placeholder="Mín"
              min={0}
              step={1000}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>
          <span className="shrink-0 text-xs text-gray-400">—</span>
          <div className="flex-1">
            <input
              type="number"
              value={precioMax}
              onChange={(e) => updateParam("precioMax", e.target.value)}
              placeholder="Máx"
              min={0}
              step={1000}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>
        </div>
        {/* Quick price presets */}
        <div className="flex flex-wrap gap-1.5 pt-0.5">
          {[
            { label: "Hasta $12.000", max: "12000" },
            { label: "Hasta $20.000", max: "20000" },
            { label: "Premium", min: "20000" },
          ].map((preset) => (
            <button
              key={preset.label}
              onClick={() => {
                const params = new URLSearchParams(searchParams.toString());
                if (preset.min) {
                  params.set("precioMin", preset.min);
                  params.delete("precioMax");
                } else if (preset.max) {
                  params.set("precioMax", preset.max);
                  params.delete("precioMin");
                }
                router.replace(`?${params.toString()}`, { scroll: false });
              }}
              className="rounded-full border border-gray-200 px-2.5 py-0.5 text-xs text-gray-600 hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Aplicar (visible en mobile) */}
      {hasActiveFilters && (
        <Button
          variant="outline"
          size="sm"
          onClick={clearAll}
          className="w-full gap-2 text-gray-600 sm:hidden"
        >
          <X className="h-3.5 w-3.5" />
          Limpiar filtros
        </Button>
      )}
    </div>
  );
}
