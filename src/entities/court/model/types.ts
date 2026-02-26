export type Surface = "cesped-sintetico" | "cemento" | "cristal" | "parquet";
export type Amenity = "iluminacion" | "techado" | "vestuarios" | "estacionamiento";

export interface Court {
  id: string;
  name: string;
  clubId: string;
  sportId: string;
  surface: Surface;
  dimensions: string;
  pricePerHour: number;
  amenities: Amenity[];
  image: string;
  isActive: boolean;
}
