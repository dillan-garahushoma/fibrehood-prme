// Centralized site configuration for Fibrehood.
export const SITE = {
  name: "Fibrehood",
  tagline: "Bridging the access gap",
  whatsapp: "263784416605",
  phone: "+263 784 416 605",
  email: "support@fibrehood.co.zw",
  region: "Zimbabwe",
  hours: "Contact Fibrehood directly",
  social: [
    { label: "Facebook", href: "#" },
    { label: "X", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "Instagram", href: "#" }
  ],
  legal: {
    entity: "Fibrehood",
    jurisdiction: "Your region"
  }
};

export const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Fibre Plans", to: "/plans" },
  { label: "Coverage", to: "/coverage" },
  { label: "About", to: "/about" },
  { label: "Fibre Installation", to: "/fibre-installation" },
  { label: "Support", to: "/faq" },
  { label: "Contact", to: "/contact" }
];

/** Build a prefilled WhatsApp deep link with a contextual message. */
export function whatsappLink(message = "I'd like to get connected to Fibrehood.") {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

/** Common contextual WhatsApp intents. */
export const WA_INTENTS = {
  connect: () => whatsappLink("I'd like to get connected to Fibrehood."),
  plan: (planName) => whatsappLink(`I'm interested in the ${planName} fibre package. Can you help me check availability and get connected?`),
  coverage: (address) => whatsappLink(`I checked my address (${address}) on the Fibrehood site. Can you confirm availability and next steps?`),
  nearCoverage: (address) => whatsappLink(`I'd like to register my interest for fibre at ${address} and be notified when my area goes live.`),
  notCovered: (address) => whatsappLink(`Fibrehood isn't showing coverage at ${address} yet. I'd like to be kept informed about future rollouts here.`),
  support: () => whatsappLink("Hi Fibrehood, I need some support with my connection."),
  partner: () => whatsappLink("Hi Fibrehood, I'd like to explore a partnership — bringing fibre to my estate / development / community."),
  enterprise: () => whatsappLink("Hi Fibrehood, I'd like to speak to your solutions team about enterprise connectivity.")
};