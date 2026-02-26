import Link from "next/link";
import { Check, X, HelpCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Badge } from "@/shared/ui/badge";
import { Separator } from "@/shared/ui/separator";
import { PRICING_PLANS } from "@/entities/pricing-plan";
import { formatPrice } from "@/shared/lib/format";
import { cn } from "@/shared/lib/utils";

const FAQ_ITEMS = [
  {
    question: "¿Puedo cambiar de plan en cualquier momento?",
    answer:
      "Sí. Puedes actualizar o bajar de plan cuando lo necesites. Los cambios se reflejan al inicio del próximo período de facturación. Si subes de plan, el acceso a las nuevas funciones es inmediato.",
  },
  {
    question: "¿Qué métodos de pago aceptan?",
    answer:
      "Aceptamos tarjetas de crédito y débito (Visa, Mastercard, American Express), transferencia bancaria y WebPay. Todos los pagos están protegidos con cifrado SSL.",
  },
  {
    question: "¿Hay contrato de permanencia?",
    answer:
      "No. Todos nuestros planes son mensuales y sin compromiso de permanencia. Puedes cancelar en cualquier momento desde tu panel de administración sin penalidades.",
  },
  {
    question: "¿El plan Gratis tiene límite de tiempo?",
    answer:
      "No. El plan Gratis es permanente mientras lo necesites. No caduca, no requiere tarjeta de crédito para registrarte y siempre tendrás acceso a las funciones básicas incluidas.",
  },
];

export function PricingPage() {
  return (
    <div className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Planes y Precios
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Comienza gratis y escala a medida que tu club crece. Sin sorpresas,
            sin costos ocultos.
          </p>
        </div>

        {/* Billing note */}
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Todos los precios en pesos chilenos (CLP) con IVA incluido.
        </p>

        {/* Pricing Cards */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3 md:items-start">
          {PRICING_PLANS.map((plan) => (
            <Card
              key={plan.id}
              className={cn(
                "relative flex flex-col transition-all duration-300",
                plan.isHighlighted
                  ? "border-primary shadow-xl shadow-primary/15 md:scale-[1.03]"
                  : "border-border/60 hover:border-border hover:shadow-md"
              )}
            >
              {plan.isHighlighted && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                  <Badge className="bg-primary px-4 py-1 text-primary-foreground shadow-sm">
                    Recomendado
                  </Badge>
                </div>
              )}

              <CardHeader className={cn("pb-4", plan.isHighlighted && "pt-8")}>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <div className="mt-3">
                  {plan.priceMonthly === 0 ? (
                    <span className="text-4xl font-bold">Gratis</span>
                  ) : (
                    <>
                      <span className="text-4xl font-bold">
                        {formatPrice(plan.priceMonthly)}
                      </span>
                      <span className="ml-1 text-sm text-muted-foreground">
                        /mes
                      </span>
                    </>
                  )}
                </div>
                {plan.priceMonthly === 0 && (
                  <p className="text-sm text-muted-foreground">
                    Sin tarjeta de crédito
                  </p>
                )}
              </CardHeader>

              <CardContent className="flex flex-1 flex-col gap-6">
                <Button
                  variant={plan.isHighlighted ? "default" : "outline"}
                  className="w-full"
                  asChild
                >
                  <Link
                    href={
                      plan.id === "enterprise" ? "/contacto" : "/dashboard"
                    }
                  >
                    {plan.ctaLabel}
                  </Link>
                </Button>

                <Separator />

                {/* Features */}
                {plan.features.length > 0 && (
                  <div>
                    <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                      Incluye
                    </p>
                    <ul className="space-y-2.5">
                      {plan.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2.5 text-sm"
                        >
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Limitations */}
                {plan.limitations.length > 0 && (
                  <div>
                    <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                      No incluye
                    </p>
                    <ul className="space-y-2.5">
                      {plan.limitations.map((limitation) => (
                        <li
                          key={limitation}
                          className="flex items-start gap-2.5 text-sm text-muted-foreground"
                        >
                          <X className="mt-0.5 h-4 w-4 shrink-0 text-destructive/70" />
                          <span>{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust note */}
        <div className="mt-10 text-center text-sm text-muted-foreground">
          <p>
            ¿Tienes dudas?{" "}
            <Link
              href="/contacto"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Contacta a nuestro equipo
            </Link>{" "}
            y te ayudamos a elegir el plan ideal.
          </p>
        </div>

        {/* FAQ Section */}
        <div className="mt-24">
          <div className="mx-auto max-w-2xl">
            <div className="flex items-center gap-3">
              <HelpCircle className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold tracking-tight">
                Preguntas frecuentes
              </h2>
            </div>
            <p className="mt-2 text-muted-foreground">
              Todo lo que necesitas saber sobre nuestros planes.
            </p>

            <div className="mt-8 divide-y divide-border">
              {FAQ_ITEMS.map((item) => (
                <div key={item.question} className="py-6">
                  <h3 className="text-base font-semibold">{item.question}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-xl bg-muted/50 p-6 text-center">
              <p className="font-medium">
                ¿Aún tienes preguntas sobre los planes?
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Escríbenos y te respondemos en menos de 24 horas.
              </p>
              <Button className="mt-4" asChild>
                <Link href="/contacto">Contactar soporte</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
