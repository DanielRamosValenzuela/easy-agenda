import Link from "next/link";
import { Building2, TrendingUp, Users, Clock } from "lucide-react";
import { Button } from "@/shared/ui/button";

const benefits = [
  {
    icon: TrendingUp,
    title: "Aumenta tus ingresos",
    description: "Llena horarios vacíos y maximiza la ocupación de tus canchas.",
  },
  {
    icon: Users,
    title: "Nuevos clientes",
    description: "Miles de jugadores buscan canchas en nuestra plataforma todos los días.",
  },
  {
    icon: Clock,
    title: "Ahorra tiempo",
    description: "Automatiza las reservas y olvídate de la agenda manual.",
  },
];

export function B2BSection() {
  return (
    <section className="bg-gradient-to-br from-primary/5 via-background to-primary/10 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="reveal">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <Building2 className="h-3 w-3" />
              Para Clubes
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              ¿Tienes un club deportivo?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              Únete a la red de clubes de EasyAgenda y empieza a recibir reservas
              online hoy mismo. Sin inversión inicial, sin contratos largos.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" className="gap-2">
                <Link href="/contacto">
                  <Building2 className="h-4 w-4" />
                  Registra tu Club
                </Link>
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="reveal flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <benefit.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{benefit.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
