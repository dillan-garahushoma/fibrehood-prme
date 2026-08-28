// DEVELOPMENT FIXTURES — FibreHood fibre plans.
// These packages are indicative and intended to be replaced with verified
// FibreHood service data before launch. Prices are shown as "indicative" in the UI.
// Do not present these as confirmed commercial offers without replacement.

export const PLANS = [
  // ── Home ───────────────────────────────────────────────────────────────
  {
    id: "home-25",
    name: "Home 25",
    segment: "home",
    provider: "FibreHood",
    price: 40,
    currency: "USD",
    cycle: "month",
    download: 25,
    upload: 10,
    type: "Fibre to the Home",
    contract: "24-month",
    installation: "Standard installation included",
    features: [
      "Unlimited data allowance",
      "Router included on contract",
      "Free standard installation",
      "IPv6 ready",
      "Local support"
    ],
    bestFor: ["Light browsing", "Email & social", "One or two devices"],
    popular: false,
    dev: true,
    displayOrder: 1
  },
  {
    id: "home-50",
    name: "Home 50",
    segment: "home",
    provider: "FibreHood",
    price: 60,
    currency: "USD",
    cycle: "month",
    download: 50,
    upload: 25,
    type: "Fibre to the Home",
    contract: "24-month",
    installation: "Standard installation included",
    features: [
      "Unlimited data allowance",
      "Wi-Fi 5 router included",
      "Free standard installation",
      "Soft-fibre backup pathway",
      "Local support"
    ],
    bestFor: ["Family streaming", "Video calls", "Up to ~6 devices"],
    popular: true,
    dev: true,
    displayOrder: 2
  },
  {
    id: "home-100",
    name: "Home 100",
    segment: "home",
    provider: "FibreHood",
    price: 90,
    currency: "USD",
    cycle: "month",
    download: 100,
    upload: 50,
    type: "Fibre to the Home",
    contract: "24-month",
    installation: "Standard installation included",
    features: [
      "Unlimited data allowance",
      "Wi-Fi 6 router included",
      "Free standard installation",
      "Priority evening capacity",
      "Local support"
    ],
    bestFor: ["4K streaming", "Gaming", "Smart home"],
    popular: false,
    dev: true,
    displayOrder: 3
  },
  {
    id: "home-200",
    name: "Home 200",
    segment: "home",
    provider: "FibreHood",
    price: 130,
    currency: "USD",
    cycle: "month",
    download: 200,
    upload: 100,
    type: "Fibre to the Home",
    contract: "24-month",
    installation: "Standard installation included",
    features: [
      "Unlimited data allowance",
      "Wi-Fi 6 router included",
      "Free standard installation",
      "Priority evening capacity",
      "Local support"
    ],
    bestFor: ["Power households", "Multi-room 4K", "Heavy downloads"],
    popular: false,
    dev: true,
    displayOrder: 4
  },
  // ── Business ───────────────────────────────────────────────────────────
  {
    id: "biz-100",
    name: "Business 100",
    segment: "business",
    provider: "FibreHood",
    price: 120,
    currency: "USD",
    cycle: "month",
    download: 100,
    upload: 100,
    type: "Symmetric Fibre",
    contract: "24-month",
    installation: "Business-grade installation",
    features: [
      "Symmetric 100/100 Mbps",
      "Static IP option",
      "Business router included",
      "Contention priority",
      "Support response SLA"
    ],
    bestFor: ["Small office", "Cloud apps", "Point-of-sale"],
    popular: true,
    dev: true,
    displayOrder: 5
  },
  {
    id: "biz-250",
    name: "Business 250",
    segment: "business",
    provider: "FibreHood",
    price: 220,
    currency: "USD",
    cycle: "month",
    download: 250,
    upload: 250,
    type: "Symmetric Fibre",
    contract: "24-month",
    installation: "Business-grade installation",
    features: [
      "Symmetric 250/250 Mbps",
      "Static IP included",
      "Business router included",
      "Contention priority",
      "Support response SLA"
    ],
    bestFor: ["Growing office", "Large file transfers", "Hosted voice"],
    popular: false,
    dev: true,
    displayOrder: 6
  },
  {
    id: "biz-500",
    name: "Business 500",
    segment: "business",
    provider: "FibreHood",
    price: 380,
    currency: "USD",
    cycle: "month",
    download: 500,
    upload: 500,
    type: "Symmetric Fibre",
    contract: "36-month",
    installation: "Business-grade installation",
    features: [
      "Symmetric 500/500 Mbps",
      "Static IP included",
      "Managed business router",
      "Dedicated capacity options",
      "Priority support SLA"
    ],
    bestFor: ["Multi-site", "Production teams", "Resilience"],
    popular: false,
    dev: true,
    displayOrder: 7
  },
  {
    id: "biz-1000",
    name: "Business 1000",
    segment: "business",
    provider: "FibreHood",
    price: 650,
    currency: "USD",
    cycle: "month",
    download: 1000,
    upload: 1000,
    type: "Symmetric Fibre",
    contract: "36-month",
    installation: "Business-grade installation",
    features: [
      "Symmetric 1 Gbps",
      "Static IP included",
      "Managed business router",
      "Dedicated capacity options",
      "Priority support SLA"
    ],
    bestFor: ["Data-heavy operations", "Hosted infrastructure", "High uptime needs"],
    popular: false,
    dev: true,
    displayOrder: 8
  }
];

export const PLAN_CATEGORIES = [
  { id: "home", label: "Home", blurb: "Everyday connectivity for households." },
  { id: "business", label: "Business", blurb: "Symmetric, reliable fibre for work." }
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