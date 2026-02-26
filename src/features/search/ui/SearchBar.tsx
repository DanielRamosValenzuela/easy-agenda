"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Calendar } from "lucide-react";
import { Button } from "@/shared/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { SPORTS } from "@/entities/sport";
import { CLUBS, getUniqueCities } from "@/entities/club";
import { buildSearchUrl } from "../model/search-params";
import { cn } from "@/shared/lib/utils";

interface SearchBarProps {
  variant: "hero" | "compact";
}

export function SearchBar({ variant }: SearchBarProps) {
  const router = useRouter();
  const [deporte, setDeporte] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [fecha, setFecha] = useState("");

  const cities = getUniqueCities(CLUBS);

  function handleSearch() {
    const url = buildSearchUrl({
      deporte: deporte || undefined,
      ubicacion: ubicacion || undefined,
      fecha: fecha || undefined,
    });
    router.push(url);
  }

  const isHero = variant === "hero";

  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-xl bg-card p-4 shadow-lg border border-border",
        isHero
          ? "sm:flex-row sm:items-end sm:gap-2 md:p-5"
          : "sm:flex-row sm:items-end sm:gap-2"
      )}
    >
      <div className={cn("flex-1 space-y-1.5", isHero && "min-w-0")}>
        <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
          <Search className="h-3 w-3" />
          Deporte
        </label>
        <Select value={deporte} onValueChange={setDeporte}>
          <SelectTrigger className={cn(isHero && "h-11")}>
            <SelectValue placeholder="Todos los deportes" />
          </SelectTrigger>
          <SelectContent>
            {SPORTS.map((sport) => (
              <SelectItem key={sport.id} value={sport.id}>
                {sport.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className={cn("flex-1 space-y-1.5", isHero && "min-w-0")}>
        <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          Ubicación
        </label>
        <Select value={ubicacion} onValueChange={setUbicacion}>
          <SelectTrigger className={cn(isHero && "h-11")}>
            <SelectValue placeholder="Todas las ciudades" />
          </SelectTrigger>
          <SelectContent>
            {cities.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className={cn("flex-1 space-y-1.5", isHero && "min-w-0")}>
        <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          Fecha
        </label>
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
            isHero && "h-11"
          )}
        />
      </div>

      <Button
        onClick={handleSearch}
        size={isHero ? "lg" : "default"}
        className={cn("gap-2", isHero && "sm:px-8")}
      >
        <Search className="h-4 w-4" />
        Buscar
      </Button>
    </div>
  );
}
