import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, User, Home, Gauge, MapPin, Info, Headset, Mail, Handshake, Network, ArrowRight } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { NAV_LINKS } from "@/data/site";
import { useNavOverDark } from "@/hooks/useNavOverDark";
import { cn } from "@/lib/utils";


function ClientPortalLink({ className, onClick }) {
  return (
    <a
      href="https://fibrehood.splynx.app/portal/login"
      target="_blank"
      rel="noreferrer"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-loop",
        className
      )}
    >
      <User className="h-4 w-4" />
      Client Portal
    </a>
  );
}

export const MOBILE_ICONS = {
  "/": Home,
  "/plans": Gauge,
  "/coverage": MapPin,
  "/about": Info,
  "/partners": Handshake,
  "/fibre-installation": Network,
  "/faq": Headset,
  "/contact": Mail
};

export function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  // Transparent (light logo + white links) while over a dark hero;
  // light glass bar everywhere else so it stays visible.
  const overDark = useNavOverDark(location.pathname);
  const solid = !overDark || open;

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const linkTone = (active) =>
    active
      ? (solid ? "text-signal" : "text-paper")
      : (solid ? "text-ink-soft hover:text-signal" : "text-paper/80 hover:text-paper");

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "transition-all duration-300",
          solid ? "glass-nav border-b border-line/70 shadow-signal" : "bg-transparent"
        )}
      >
        <nav className="container-lattice flex h-12 items-center justify-between md:h-14">
          <div className="pointer-events-none select-none opacity-0" aria-hidden="true">
            <Logo tone="ink" />
          </div>

          <div className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => {
              const active = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={cn("relative text-sm font-medium transition-colors", linkTone(active))}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1.5 left-0 right-0 h-0.5 rounded-full bg-loop"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="hidden items-center gap-4 lg:flex">
            <ClientPortalLink className={solid ? "text-ink-soft" : "text-paper/80"} />
            <Link
              to="/signup"
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-all hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-loop",
                solid
                  ? "bg-loop text-signal hover:bg-loop/90 hover:shadow-loop"
                  : "bg-loop text-signal hover:bg-loop/90 hover:shadow-loop"
              )}
            >
              Sign Up <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-md transition-colors lg:hidden",
              solid ? "text-signal hover:bg-fog" : "text-paper hover:bg-paper/10"
            )}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="glass-nav border-b border-line/70 lg:hidden"
          >
            <div className="container-lattice flex flex-col gap-1 py-4">
              {NAV_LINKS.map((link) => {
                const active = location.pathname === link.to;
                const Icon = MOBILE_ICONS[link.to] || Home;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium transition-colors hover:bg-fog",
                      active ? "text-signal" : "text-ink-soft"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    {link.label}
                  </Link>
                );
              })}
              <div className="mt-3 border-t border-line/50 pt-3 flex flex-col gap-2">
                <Link
                  to="/signup"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-full bg-loop px-4 py-3 text-base font-semibold text-signal transition-colors hover:bg-loop/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-loop"
                >
                  Sign Up <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <ClientPortalLink
                  className="px-3 py-2 text-base text-ink-soft hover:text-signal"
                  onClick={() => setOpen(false)}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;