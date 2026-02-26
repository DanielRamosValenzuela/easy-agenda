import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Badge } from "@/shared/ui/badge";
import { PRICING_PLANS } from "@/entities/pricing-plan";
import { formatPrice } from "@/shared/lib/format";
import { cn } from "@/shared/lib/utils";

export function PricingPreview() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Planes para cada club
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Comienza gratis y escala cuando lo necesites. Sin sorpresas.
          </p>
        </div>

        <div className="reveal mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {PRICING_PLANS.map((plan) => (
            <Card
              key={plan.id}
              className={cn(
                "relative transition-all duration-300",
                plan.isHighlighted
                  ? "border-primary shadow-lg shadow-primary/10 scale-[1.02]"
                  : "border-border/50 hover:shadow-md"
              )}
            >
              {plan.isHighlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground">Recomendado</Badge>
                </div>
              )}
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-lg">{plan.name}</CardTitle>
                <div className="mt-2">
                  <span className="text-3xl font-bold">
                    {plan.priceMonthly === 0 ? "Gratis" : formatPrice(plan.priceMonthly)}
                  </span>
                  {plan.priceMonthly > 0 && (
                    <span className="text-sm text-muted-foreground">/mes</span>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {plan.features.slice(0, 4).map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.isHighlighted ? "default" : "outline"}
                  className="w-full"
                  asChild
                >
                  <Link href="/precios">{plan.ctaLabel}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button variant="ghost" asChild className="gap-2">
            <Link href="/precios">
              Ver todos los detalles
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
