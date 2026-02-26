import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { HeroSearch } from "@/widgets/hero-search";
import { FeaturesSection } from "@/widgets/features-section";
import { StatsCounter } from "@/widgets/stats-counter";
import { TestimonialsSection } from "@/widgets/testimonials-section";
import { B2BSection } from "@/widgets/b2b-section";
import { PricingPreview } from "@/widgets/pricing-preview";

export function LandingPage() {
  return (
    <>
      <HeroSearch />
      <FeaturesSection />
      <StatsCounter />
      <TestimonialsSection />
      <B2BSection />
      <PricingPreview />

      {/* Final CTA Section */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="reveal mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              ¿Listo para jugar?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Únete a miles de jugadores que ya reservan sus canchas con
              EasyAgenda. Es gratis, rápido y sin complicaciones.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="gap-2">
                <Link href="/canchas">
                  Explorar Canchas
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/clubes">Ver Clubes</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
