// FibreHood fibre plans — verified commercial packages.
// Home Fibre and SME Fibre plans used across the plans page.

export const PLANS = [
  // ── Home Fibre ───────────────────────────────────────────────────────
  {
    id: "starter-home-connect",
    name: "Starter Home Connect",
    segment: "home",
    provider: "FibreHood",
    price: 40,
    currency: "USD",
    cycle: "month",
    download: 5,
    upload: 3,
    type: "Fibre to the Home",
    contract: "Month-to-month",
    installation: "Activation from US$65",
    activation: "from US$65",
    usageLabel: "Light usage",
    features: [
      "Great for 1–3 devices",
      "Smooth browsing & email",
      "SD video streaming",
    ],
    bestFor: ["Light browsing", "Email & social", "1–3 devices"],
    popular: false,
    dev: false,
    displayOrder: 1
  },
  {
    id: "smart-home-connect",
    name: "Smart Home Connect",
    segment: "home",
    provider: "FibreHood",
    price: 50,
    currency: "USD",
    cycle: "month",
    download: 15,
    upload: 8,
    type: "Fibre to the Home",
    contract: "Month-to-month",
    installation: "Activation from US$65",
    activation: "from US$65",
    usageLabel: "Family usage",
    features: [
      "Handles 4–6 devices at once",
      "HD streaming on multiple screens",
      "Comfortable for video calls",
    ],
    bestFor: ["Family streaming", "HD video calls", "4–6 devices"],
    popular: true,
    dev: false,
    displayOrder: 2
  },
  {
    id: "pro-home-connect",
    name: "Pro Home Connect",
    segment: "home",
    provider: "FibreHood",
    price: 65,
    currency: "USD",
    cycle: "month",
    download: 30,
    upload: 15,
    type: "Fibre to the Home",
    contract: "Month-to-month",
    installation: "Activation from US$65",
    activation: "from US$65",
    usageLabel: "Serious home usage",
    features: [
      "Supports 7–10 devices",
      "4K streaming without buffering",
      "Solid upload for working from home",
    ],
    bestFor: ["Work from home", "4K streaming", "7–10 devices"],
    popular: false,
    dev: false,
    displayOrder: 3
  },
  {
    id: "ultra-home-connect",
    name: "Ultra-Home Connect",
    segment: "home",
    provider: "FibreHood",
    price: 85,
    currency: "USD",
    cycle: "month",
    download: 100,
    upload: 50,
    type: "Fibre to the Home",
    contract: "Month-to-month",
    installation: "Activation from US$65",
    activation: "from US$65",
    usageLabel: "Heavy / connected home",
    features: [
      "10+ devices with headroom to spare",
      "Heavy streaming & smart home",
      "Strong upload for content creators",
    ],
    bestFor: ["Smart home", "Heavy streaming", "10+ devices"],
    popular: false,
    dev: false,
    displayOrder: 4
  },
  // ── SME Fibre ────────────────────────────────────────────────────────
  {
    id: "sme-basic",
    name: "SME Basic",
    segment: "business",
    provider: "FibreHood",
    price: 75,
    currency: "USD",
    cycle: "month",
    download: 30,
    upload: 30,
    type: "Symmetric Fibre",
    contract: "Month-to-month",
    installation: "US$100 activation fee",
    activation: "US$100",
    usageLabel: "Everyday business",
    features: [
      "Ideal for small offices & POS",
      "Reliable cloud app performance",
      "Scalable to higher tiers",
    ],
    bestFor: ["Small office", "Cloud apps", "Point-of-sale"],
    popular: false,
    dev: false,
    displayOrder: 5
  },
  {
    id: "sme-pro",
    name: "SME Pro",
    segment: "business",
    provider: "FibreHood",
    price: 125,
    currency: "USD",
    cycle: "month",
    download: 50,
    upload: 50,
    type: "Symmetric Fibre",
    contract: "Month-to-month",
    installation: "US$100 activation fee",
    activation: "US$100",
    usageLabel: "Growing teams",
    features: [
      "VoIP & video conferencing ready",
      "Multiple concurrent cloud workloads",
      "Contention priority over Basic",
    ],
    bestFor: ["Growing team", "VoIP & video", "Cloud workloads"],
    popular: true,
    dev: false,
    displayOrder: 6
  },
  {
    id: "sme-max",
    name: "SME Max",
    segment: "business",
    provider: "FibreHood",
    price: 190,
    currency: "USD",
    cycle: "month",
    download: 100,
    upload: 100,
    type: "Symmetric Fibre",
    contract: "Month-to-month",
    installation: "US$100 activation fee",
    activation: "US$100",
    usageLabel: "Demanding operations",
    features: [
      "High-demand teams & hosted infra",
      "Dedicated capacity options",
      "Priority business support SLA",
    ],
    bestFor: ["Demanding teams", "Hosted infrastructure", "High uptime"],
    popular: false,
    dev: false,
    displayOrder: 7
  }
];

export const PLAN_CATEGORIES = [
  { id: "home", label: "Home Fibre", blurb: "Everyday connectivity for households. Activation from US$65." },
  { id: "business", label: "SME Fibre", blurb: "Symmetric connectivity for growing businesses. US$100 activation fee." }
];

/** Group plans by segment. */
export function plansBySegment(segment) {
  return PLANS.filter((p) => p.segment === segment).sort((a, b) => a.displayOrder - b.displayOrder);
}

export function getPlan(id) {
  return PLANS.find((p) => p.id === id);
}

export function formatSpeed(mbps) {
  return mbps >= 1000 ? "1 Gbps" : `${mbps} Mbps`;
}