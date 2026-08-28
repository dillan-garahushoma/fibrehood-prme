// Centralized site configuration for FibreHood.
// NOTE: Contact details below are DEVELOPMENT placeholders — replace with verified FibreHood details before launch.

export const SITE = {
  name: "FibreHood",
  tagline: "Bridging the access gap",
  // DEVELOPMENT placeholder WhatsApp number (international format, no +).
  whatsapp: "263770000000",
  // DEVELOPMENT placeholder contact details.
  phone: "+263 000 000 000",
  email: "hello@fibrehood.example",
  // Operating region descriptor (kept honest / non-numeric).
  region: "Local fibre networks",
  hours: "Mon–Fri, 08:00–17:00",
  social: [
    { label: "Facebook", href: "#" },
    { label: "X", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "Instagram", href: "#" }
  ],
  legal: {
    entity: "FibreHood",
    jurisdiction: "Your region"
  }
};

export const NAV_LINKS = [
  { label: "Fibre Plans", to: "/plans" },
  { label: "Coverage", to: "/coverage" },
  { label: "About", to: "/about" },
  { label: "Support", to: "/faq" },
  { label: "Contact", to: "/contact" }
];

/** Build a prefilled WhatsApp deep link with a contextual message. */
export function whatsappLink(message = "I'd like to get connected to FibreHood.") {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

/** Common contextual WhatsApp intents. */
export const WA_INTENTS = {
  connect: () => whatsappLink("I'd like to get connected to FibreHood."),
  plan: (planName) => whatsappLink(`I'm interested in the ${planName} fibre package. Can you help me check availability and get connected?`),
  coverage: (address) => whatsappLink(`I checked my address (${address}) on the FibreHood site. Can you confirm availability and next steps?`),
  nearCoverage: (address) => whatsappLink(`I'd like to register my interest for fibre at ${address} and be notified when my area goes live.`),
  notCovered: (address) => whatsappLink(`FibreHood isn't showing coverage at ${address} yet. I'd like to be kept informed about future rollouts here.`),
  support: () => whatsappLink("Hi FibreHood, I need some support with my connection.")
};