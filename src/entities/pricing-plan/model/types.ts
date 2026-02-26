export interface PricingPlan {
  id: string;
  name: string;
  priceMonthly: number;
  features: string[];
  limitations: string[];
  isHighlighted: boolean;
  ctaLabel: string;
}
