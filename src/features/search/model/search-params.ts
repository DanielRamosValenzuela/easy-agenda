export interface SearchParams {
  deporte?: string;
  ubicacion?: string;
  fecha?: string;
  hora?: string;
}

export function buildSearchUrl(params: SearchParams): string {
  const searchParams = new URLSearchParams();
  if (params.deporte) searchParams.set("deporte", params.deporte);
  if (params.ubicacion) searchParams.set("ubicacion", params.ubicacion);
  if (params.fecha) searchParams.set("fecha", params.fecha);
  if (params.hora) searchParams.set("hora", params.hora);
  return `/buscar?${searchParams.toString()}`;
}
