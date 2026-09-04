import { IMAGES } from "./images";

export type PricingAccent = "gold" | "green" | "blue";

/** A semantic service-plan shape shared by the FibreHood pricing-card system. */
export interface PricingCarouselPlan {
  id: string;
  segment: "home" | "sme";
  planName: string;
  speedMbps: number;
  monthlyPrice: number;
  description: string;
  features: readonly string[];
  accent: PricingAccent;
  featured?: boolean;
  activationFee?: number;
  backgroundImage: string;
  ctaUrl: string;
}

const HOME_INCLUSIONS = [
  "Unlimited data",
  "FREE installation*",
  "Wi-Fi router included*",
  "Month-to-month",
] as const;

export const HOME_PRICING_CAROUSEL_PLANS: readonly PricingCarouselPlan[] = [
  {
    id: "starter-home-connect",
    segment: "home",
    planName: "Starter Home Connect",
    speedMbps: 5,
    monthlyPrice: 40,
    description: "Perfect for light browsing, email and everyday essentials.",
    features: HOME_INCLUSIONS,
    accent: "gold",
    backgroundImage: IMAGES.fibreGlass,
    ctaUrl: "/coverage",
  },
  {
    id: "smart-home-connect",
    segment: "home",
    planName: "Smart Home Connect",
    speedMbps: 15,
    monthlyPrice: 50,
    description: "Great for families, streaming and connected homes.",
    features: HOME_INCLUSIONS,
    accent: "gold",
    featured: true,
    backgroundImage: IMAGES.lightTrails,
    ctaUrl: "/coverage",
  },
  {
    id: "pro-home-connect",
    segment: "home",
    planName: "Pro Home Connect",
    speedMbps: 30,
    monthlyPrice: 65,
    description: "More speed for work-from-home, gaming and HD streaming.",
    features: HOME_INCLUSIONS,
    accent: "green",
    backgroundImage: IMAGES.fibreConstellation,
    ctaUrl: "/coverage",
  },
  {
    id: "ultra-home-connect",
    segment: "home",
    planName: "Ultra-Home Connect",
    speedMbps: 100,
    monthlyPrice: 85,
    description: "Maximum home speed for heavy streaming, gaming and multiple devices.",
    features: HOME_INCLUSIONS,
    accent: "blue",
    backgroundImage: IMAGES.networkOrb,
    ctaUrl: "/coverage",
  },
];

// Kept separate from the home carousel so the same card system can be used for SME plans.
export const SME_PRICING_PLANS: readonly PricingCarouselPlan[] = [
  { id: "sme-basic", segment: "sme", planName: "SME Basic", speedMbps: 30, monthlyPrice: 75, activationFee: 100, description: "Reliable fibre capacity for focused, connected small teams.", features: HOME_INCLUSIONS, accent: "gold", backgroundImage: IMAGES.routerNode, ctaUrl: "/coverage" },
  { id: "sme-pro", segment: "sme", planName: "SME Pro", speedMbps: 50, monthlyPrice: 125, activationFee: 100, description: "More bandwidth for cloud tools, calls and growing teams.", features: HOME_INCLUSIONS, accent: "green", backgroundImage: IMAGES.fibreConstellation, ctaUrl: "/coverage" },
  { id: "sme-max", segment: "sme", planName: "SME Max", speedMbps: 100, monthlyPrice: 190, activationFee: 100, description: "High-capacity fibre for demanding business operations.", features: HOME_INCLUSIONS, accent: "blue", backgroundImage: IMAGES.networkOrb, ctaUrl: "/coverage" },
];
