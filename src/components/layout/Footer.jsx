import React from "react";
import { Link } from "react-router-dom";
import { MessageCircle, Phone, Mail, MapPin } from "lucide-react";
import { SITE, whatsappLink } from "@/data/site";

const EXPLORE = [
  { label: "Fibre Plans", to: "/plans" },
  { label: "Coverage", to: "/coverage" },
  { label: "Partners", to: "/partners" },
  { label: "About", to: "/about" },
  { label: "Support", to: "/faq" },
  { label: "Contact", to: "/contact" }
];
const HELP = [
  { label: "FAQ", to: "/faq" },
  { label: "Installation", to: "/faq?cat=installation" },
  { label: "Troubleshooting", to: "/faq?cat=router-wifi" },
  { label: "Billing", to: "/faq?cat=billing" }
];
const LEGAL = [
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Terms & Conditions", to: "/terms" }
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-signal-deep text-paper">
      <div className="container-lattice relative">
        <div className="grid gap-10 py-16 md:grid-cols-12 md:gap-8 md:items-start md:py-20">
          <div className="md:col-span-4">
            <img src="/white.png" alt="FibreHood" className="block h-[7.5rem] w-auto object-contain md:h-[9rem] -mt-6 md:-mt-8" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-paper/70">
              FibreHood builds direct fibre connections for homes and businesses —
              coverage-first, locally supported, and straightforward from check to connection.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={whatsappLink("I'd like to get connected to FibreHood.")}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-loop px-4 py-2 text-sm font-semibold text-signal transition-transform hover:scale-[1.02]"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
              <a
                href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2 rounded-full border border-paper/20 px-4 py-2 text-sm font-medium text-paper transition-colors hover:bg-paper/10"
              >
                <Phone className="h-4 w-4" /> Call
              </a>
            </div>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-paper/50">Explore</h3>
            <ul className="mt-4 space-y-3">
              {EXPLORE.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm text-paper/70 transition-colors hover:text-loop">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-paper/50">Help</h3>
            <ul className="mt-4 space-y-3">
              {HELP.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm text-paper/70 transition-colors hover:text-loop">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-paper/50">Connect</h3>
            <ul className="mt-4 space-y-3 text-sm text-paper/70">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-loop" />
                <a href={`mailto:${SITE.email}`} className="hover:text-loop">{SITE.email}</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-loop" />
                <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="hover:text-loop">{SITE.phone}</a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-loop" />
                <span>{SITE.region}</span>
              </li>
            </ul>
            <div className="mt-5 flex flex-wrap gap-2">
              {SITE.social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="rounded-full border border-paper/20 px-3 py-1.5 text-xs text-paper/70 transition-colors hover:border-loop hover:text-loop"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-paper/15 py-6 text-xs text-paper/60 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} {SITE.legal.entity}. All rights reserved.</p>
          <div className="flex flex-wrap gap-5">
            {LEGAL.map((l) => (
              <Link key={l.label} to={l.to} className="transition-colors hover:text-loop">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;