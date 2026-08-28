import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, MapPin } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { NAV_LINKS } from "@/data/site";
import { cn } from "@/lib/utils";

function PrimaryCTA({ className, onClick }) {
  return (
    <Link
      to="/coverage"
      onClick={onClick}
      className={cn(
        "group inline-flex items-center gap-2 rounded-full bg-loop px-5 py-2.5 text-sm font-semibold text-signal transition-all",
        "hover:shadow-loop focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-loop focus-visible:ring-offset-2 focus-visible:ring-offset-signal",
        className
      )}
    >
      <MapPin className="h-4 w-4" />
      Check Coverage
      <span className="transition-transform group-hover:translate-x-0.5">→</span>
    </Link>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
          scrolled ? "glass-nav border-b border-line/70 shadow-signal" : "bg-transparent"
        )}
      >
        <nav className="container-lattice flex h-16 items-center justify-between md:h-20">
          <Link to="/" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-loop rounded-md">
            <Logo tone={scrolled || open ? "ink" : "ink"} />
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
                    active ? "text-signal" : "text-ink-soft hover:text-signal"
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

          <div className="hidden lg:block">
            <PrimaryCTA />
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-signal transition-colors hover:bg-fog lg:hidden"
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
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="rounded-lg px-3 py-3 text-base font-medium text-signal transition-colors hover:bg-fog"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2">
                <PrimaryCTA className="w-full justify-center" onClick={() => setOpen(false)} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;