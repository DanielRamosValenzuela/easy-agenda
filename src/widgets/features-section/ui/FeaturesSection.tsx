import { CalendarCheck, Search, Clock, ShieldCheck, Smartphone, BarChart3 } from "lucide-react";
import { Card, CardContent } from "@/shared/ui/card";

const features = [
  {
    icon: Search,
    title: "Búsqueda Inteligente",
    description: "Encuentra canchas disponibles por deporte, ubicación y horario en todos los clubes asociados.",
  },
  {
    icon: CalendarCheck,
    title: "Reserva Instantánea",
    description: "Confirma tu cancha en segundos. Sin llamadas telefónicas, sin esperas innecesarias.",
  },
  {
    icon: Clock,
    title: "Disponibilidad Real",
    description: "Consulta la disponibilidad actualizada de todas las canchas y elige el horario que más te convenga.",
  },
  {
    icon: ShieldCheck,
    title: "Reserva Segura",
    description: "Tu reserva queda confirmada al instante con número de seguimiento y notificación por email.",
  },
  {
    icon: Smartphone,
    title: "Desde Cualquier Lugar",
    description: "Reserva desde tu celular, tablet o computador. La plataforma se adapta a cualquier dispositivo.",
  },
  {
    icon: BarChart3,
    title: "Gestión para Clubes",
    description: "Panel de administración completo para que los clubes gestionen canchas, horarios y reservas.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Todo lo que necesitas para jugar
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            EasyAgenda conecta jugadores con los mejores clubes deportivos de Chile.
          </p>
        </div>

        <div className="reveal mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="group border-border/50 transition-all duration-300 hover:border-primary/30 hover:shadow-md">
              <CardContent className="p-6">
                <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-2.5">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
