import type { Sport } from "../model/types";

export const SPORTS: Sport[] = [
  {
    id: "padel",
    name: "Pádel",
    icon: "racquet",
    description: "El deporte de raqueta más popular de Chile, jugado en parejas en una cancha cerrada con paredes de cristal.",
  },
  {
    id: "tenis",
    name: "Tenis",
    icon: "circle-dot",
    description: "El clásico deporte de raqueta, individual o en parejas, en canchas de diversos tipos de superficie.",
  },
  {
    id: "squash",
    name: "Squash",
    icon: "square",
    description: "Deporte de raqueta de alta intensidad jugado en una cancha cerrada de cuatro paredes.",
  },
  {
    id: "racquetball",
    name: "Racquetball",
    icon: "zap",
    description: "Deporte dinámico de raqueta jugado en cancha cerrada con reglas de rebote en todas las paredes.",
  },
];
