import type { PricingPlan } from "../model/types";

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "gratis",
    name: "Gratis",
    priceMonthly: 0,
    features: [
      "Hasta 2 canchas",
      "Reservas básicas",
      "Calendario de disponibilidad",
      "Notificaciones por email",
    ],
    limitations: [
      "Sin reportes avanzados",
      "Sin personalización de marca",
      "Soporte por email únicamente",
    ],
    isHighlighted: false,
    ctaLabel: "Comenzar Gratis",
  },
  {
    id: "pro",
    name: "Pro",
    priceMonthly: 49990,
    features: [
      "Canchas ilimitadas",
      "Reservas avanzadas con recurrencia",
      "Calendario inteligente",
      "Reportes y analíticas",
      "Personalización de marca",
      "Integración con redes sociales",
      "Soporte prioritario 24/7",
      "App móvil para clientes",
    ],
    limitations: [
      "Sin API personalizada",
    ],
    isHighlighted: true,
    ctaLabel: "Elegir Pro",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    priceMonthly: 149990,
    features: [
      "Todo lo del plan Pro",
      "API personalizada",
      "Multi-sede",
      "Gestión de torneos",
      "Facturación electrónica",
      "Onboarding dedicado",
      "Gerente de cuenta exclusivo",
      "SLA garantizado 99.9%",
    ],
    limitations: [],
    isHighlighted: false,
    ctaLabel: "Contactar Ventas",
  },
];
