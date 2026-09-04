// FibreHood fibre pricing — verified commercial packages.
// Home Fibre and SME Fibre plans used by the pricing carousel and plan pages.

const HOME_FEATURES = [
  "Unlimited data",
  "FREE installation*",
  "Wi-Fi router included*",
  "Month-to-month"
];

const HOME_CTA = { text: "Check availability", url: "/coverage" };

export const FIBRE_PRICING = [
  // ── Home Fibre ───────────────────────────────────────────────────────
  {
    id: "starter-home-connect",
    category: "home",
    planName: "Starter",
    planSubtitle: "Home Connect",
    speed: 5,
    speedUnit: "Mbps",
    price: 40,
    currency: "US$",
    billingPeriod: "month",
    badge: null,
    description: "Perfect for light browsing, email and everyday essentials.",
    idealFor: "1–3 devices · browsing, email, calls",
    features: HOME_FEATURES,
    accent: "gold",
    ctaText: HOME_CTA.text,
    ctaUrl: HOME_CTA.url
  },
  {
    id: "smart-home-connect",
    category: "home",
    planName: "Smart",
    planSubtitle: "Home Connect",
    speed: 15,
    speedUnit: "Mbps",
    price: 50,
    currency: "US$",
    billingPeriod: "month",
    badge: "Most Popular",
    description: "Great for families, streaming and connected homes.",
    idealFor: "4–6 devices · HD streaming, family WiFi",
    features: HOME_FEATURES,
    accent: "gold",
    featured: true,
    ctaText: HOME_CTA.text,
    ctaUrl: HOME_CTA.url
  },
  {
    id: "pro-home-connect",
    category: "home",
    planName: "Pro",
    planSubtitle: "Home Connect",
    speed: 30,
    speedUnit: "Mbps",
    price: 65,
    currency: "US$",
    billingPeriod: "month",
    badge: null,
    description: "More speed for work-from-home, gaming and HD streaming.",
    idealFor: "7–10 devices · 4K streaming, gaming, WFH",
    features: HOME_FEATURES,
    accent: "green",
    ctaText: HOME_CTA.text,
    ctaUrl: HOME_CTA.url
  },
  {
    id: "ultra-home-connect",
    category: "home",
    planName: "Ultra-Home",
    planSubtitle: "Connect",
    speed: 100,
    speedUnit: "Mbps",
    price: 85,
    currency: "US$",
    billingPeriod: "month",
    badge: null,
    description: "Maximum home speed for heavy streaming, gaming and multiple devices.",
    idealFor: "10+ devices · heavy streaming, smart home",
    features: HOME_FEATURES,
    accent: "blue",
    teaser: true,
    ctaText: "Explore on plans page",
    ctaUrl: "/plans#ultra"
  },
  {
    id: "sme-offer",
    category: "sme",
    planName: "Business",
    planSubtitle: "SME Fibre",
    speed: 50,
    speedUnit: "Mbps",
    price: 75,
    currency: "US$",
    billingPeriod: "month",
    badge: null,
    description: "Dedicated fibre for growing teams and connected workplaces.",
    idealFor: "5–15 seats · cloud tools, VoIP, POS",
    features: ["Dedicated business support", "US$100 activation", "SLA-backed uptime", "Scalable to 100 Mbps"],
    accent: "navy",
    teaser: true,
    ctaText: "View business plans",
    ctaUrl: "/plans#business"
  },
  // ── SME Fibre ────────────────────────────────────────────────────────
  {
    id: "sme-basic",
    category: "sme",
    planName: "SME",
    planSubtitle: "Basic",
    speed: 30,
    speedUnit: "Mbps",
    price: 75,
    currency: "US$",
    billingPeriod: "month",
    badge: null,
    description: "Reliable fibre for growing businesses and everyday business connectivity.",
    features: ["US$100 activation fee"],
    accent: "navy",
    ctaText: HOME_CTA.text,
    ctaUrl: HOME_CTA.url
  },
  {
    id: "sme-pro",
    category: "sme",
    planName: "SME",
    planSubtitle: "Pro",
    speed: 50,
    speedUnit: "Mbps",
    price: 125,
    currency: "US$",
    billingPeriod: "month",
    badge: null,
    description: "More capacity for teams, cloud tools and demanding business workloads.",
    features: ["US$100 activation fee"],
    accent: "navy",
    ctaText: HOME_CTA.text,
    ctaUrl: HOME_CTA.url
  },
  {
    id: "sme-max",
    category: "sme",
    planName: "SME",
    planSubtitle: "Max",
    speed: 100,
    speedUnit: "Mbps",
    price: 190,
    currency: "US$",
    billingPeriod: "month",
    badge: null,
    description: "Maximum business speed for high-demand teams and connected workplaces.",
    features: ["US$100 activation fee"],
    accent: "navy",
    ctaText: HOME_CTA.text,
    ctaUrl: HOME_CTA.url
  }
];

export const PRICING_CATEGORIES = [
  { id: "home", label: "Home Fibre" },
  { id: "sme", label: "SME Fibre" }
];

export function pricingByCategory(category) {
  return FIBRE_PRICING.filter((p) => p.category === category);
}

// Accent colour tokens — restrained, premium palette.
export const ACCENTS = {
  gold: { hex: "#E6B400", soft: "rgba(230,180,0,0.12)", glow: "rgba(230,180,0,0.35)" },
  green: { hex: "#0E9F6E", soft: "rgba(14,159,110,0.10)", glow: "rgba(14,159,110,0.22)" },
  blue: { hex: "#2563EB", soft: "rgba(37,99,235,0.10)", glow: "rgba(37,99,235,0.22)" },
  navy: { hex: "#072248", soft: "rgba(7,34,72,0.08)", glow: "rgba(7,34,72,0.18)" }
};