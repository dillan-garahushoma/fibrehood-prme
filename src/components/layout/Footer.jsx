import React from "react";
import { Link } from "react-router-dom";
import { MessageCircle, Phone, Mail, MapPin } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { LoopMark } from "@/components/brand/LoopMark";
import { SITE, whatsappLink } from "@/data/site";

const EXPLORE = [
  { label: "Fibre Plans", to: "/plans" },
  { label: "Coverage", to: "/coverage" },
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
    <footer className="relative overflow-hidden bg-fog text-ink">
      <div className="pointer-events-none absolute -right-10 top-10 opacity-[0.05] text-signal">
        <LoopMark className="h-72 w-[36rem]" stroke={2} />
      </div>
      <div className="bg-grid absolute inset-0 opacity-30" aria-hidden="true" />

      <div className="container-lattice relative">
        <div className="grid gap-12 py-16 md:grid-cols-12 md:py-20">
          <div className="md:col-span-4">
            <Logo tone="ink" loopClass="text-loop" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-soft">
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
                className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-ink/5"
              >
                <Phone className="h-4 w-4" /> Call
              </a>
            </div>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink/50">Explore</h3>
            <ul className="mt-4 space-y-3">
              {EXPLORE.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm text-ink-soft transition-colors hover:text-signal">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink/50">Help</h3>
            <ul className="mt-4 space-y-3">
              {HELP.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm text-ink-soft transition-colors hover:text-signal">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink/50">Connect</h3>
            <ul className="mt-4 space-y-3 text-sm text-ink-soft">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-signal" />
                <a href={`mailto:${SITE.email}`} className="hover:text-signal">{SITE.email}</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-signal" />
                <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="hover:text-signal">{SITE.phone}</a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-signal" />
                <span>{SITE.region}</span>
              </li>
            </ul>
            <div className="mt-5 flex flex-wrap gap-2">
              {SITE.social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="rounded-full border border-ink/15 px-3 py-1.5 text-xs text-ink-soft transition-colors hover:border-signal hover:text-signal"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-ink/10 py-6 text-xs text-ink-soft sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} {SITE.legal.entity}. All rights reserved.</p>
          <div className="flex flex-wrap gap-5">
            {LEGAL.map((l) => (
              <Link key={l.label} to={l.to} className="transition-colors hover:text-signal">
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