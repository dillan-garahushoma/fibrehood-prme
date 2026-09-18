import { Wifi, LifeBuoy, Briefcase, HelpCircle, Megaphone, Headset, Receipt, Mail } from "lucide-react";

// Verified contact channels from existing project data.
export const CONTACT_DETAILS = [
  { icon: Megaphone, label: "Sales & Marketing", value: "+263 780 711 337", href: "tel:+263780711337" },
  { icon: Headset, label: "Customer Support", value: "+263 784 416 605", href: "tel:+263784416605" },
  { icon: Receipt, label: "Billing", value: "+263 780 257 425", href: "tel:+263780257425" },
  { icon: Megaphone, label: "Fibrehood Business", value: "+263 780 797 695", href: "tel:+263780797695" },
  { icon: Mail, label: "Support Email", value: "support@fibrehood.co.zw", href: "mailto:support@fibrehood.co.zw" },
  { icon: Mail, label: "Sales Email", value: "sales@fibrehood.co.zw", href: "mailto:sales@fibrehood.co.zw" }
];

export const PATHWAYS = [
  { icon: Wifi, title: "Get connected / check coverage", copy: "Find out what fibre reaches your address and take the first step.", action: "Check coverage", to: "/coverage" },
  { icon: LifeBuoy, title: "Existing customer support", copy: "Help with your connection, account, or billing.", action: "Visit support", to: "/faq" },
  { icon: Briefcase, title: "Business or partnership enquiries", copy: "Bring fibre to your estate, development, or business.", action: "Explore fibre installation", to: "/fibre-installation" },
  { icon: HelpCircle, title: "General enquiries", copy: "Something else on your mind? Send us a message.", action: "Send us a message", href: "#send-message" }
];

export const ENQUIRY_TYPES = [
  "Check fibre coverage",
  "New connection",
  "Existing connection support",
  "Billing question",
  "Business enquiry",
  "Partnership enquiry",
  "Other"
];

export const SELF_SERVICE = [
  { label: "Coverage checker", copy: "See what fibre reaches your address.", to: "/coverage" },
  { label: "Fibre plans", copy: "Compare home and business packages.", to: "/plans" },
  { label: "Support & help centre", copy: "Answers to common questions.", to: "/faq" },
  { label: "Account login", copy: "Manage your Fibrehood account.", to: "/login" }
];