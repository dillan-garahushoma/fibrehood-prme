import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { NAV_LINKS } from "@/data/site";
import { cn } from "@/lib/utils";

// Routes whose opening section sits on a light/white background — the navbar
// turns glassy immediately there so it stays visible. Every current page opens
// on a dark Signal Navy hero, so this starts empty; add routes as pages go light.
const LIGHT_TOP_ROUTES = [];

export function Navbar() {
  const [pastHero, setPastHero] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const lightTop = LIGHT_TOP_ROUTES.includes(location.pathname);

  // Solid = the light glass bar — once the nav has scrolled past the page's
  // hero, on pages that open on a white background, or while the mobile menu is
  // open. Otherwise the nav keeps the hero's colour: transparent, full-white
  // FibreHood logo, light text.
  const solid = pastHero || open || lightTop;

  useEffect(() => {
    // Go glassy once the navbar has scrolled past the hero section — while
    // over the dark hero it stays transparent so the hero carries the tone.
    const onScroll = () => {
      const hero = document.querySelector("main section");
      const threshold = hero ? hero.offsetTop + hero.offsetHeight - 80 : 24;
      setPastHero(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "transition-all duration-300",
          solid ? "glass-nav border-b border-line/70 shadow-signal" : "bg-transparent"
        )}
      >
        <nav className="container-lattice flex h-16 items-center justify-between md:h-20">
          <Link to="/" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-loop rounded-md">
            <Logo
              tone={solid ? "ink" : "light"}
              loopClassName={solid ? undefined : "text-paper"}
            />
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => {
              const active = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={cn(
                    "relative text-sm font-medium transition-colors",
                    active
                      ? (solid ? "text-signal" : "text-paper")
                      : (solid ? "text-ink-soft hover:text-signal" : "text-paper/80 hover:text-paper")
                  )}
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

          <div className="hidden items-center gap-6 lg:flex">
            <Link
              to="/login"
              className={cn(
                "text-sm font-medium transition-colors",
                solid ? "text-ink-soft hover:text-signal" : "text-paper/80 hover:text-paper"
              )}
            >
              Sign In
            </Link>
            <Link
              to="/portal"
              className="group inline-flex items-center gap-2 rounded-full bg-loop px-5 py-2.5 text-sm font-semibold text-signal transition-all hover:shadow-loop focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-loop"
            >
              Client Portal
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
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
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={cn(
                      "rounded-lg px-3 py-3 text-base font-medium transition-colors hover:bg-fog",
                      active ? "text-signal" : "text-ink-soft"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="mt-3 space-y-2 border-t border-line/70 pt-3">
                <Link
                  to="/login"
                  className="block rounded-lg px-3 py-3 text-base font-medium text-ink-soft transition-colors hover:bg-fog hover:text-signal"
                >
                  Sign In
                </Link>
                <Link
                  to="/portal"
                  className="flex items-center justify-center gap-2 rounded-full bg-loop px-5 py-3 text-sm font-semibold text-signal"
                >
                  Client Portal
                  <span>→</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;