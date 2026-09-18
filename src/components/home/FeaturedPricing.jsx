import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import CoverFlowCarousel from "@/components/ui/CoverflowCarousel";
import { FIBRE_PRICING } from "@/data/fibrePricing";
import Reveal from "@/components/common/Reveal";

// Homepage featured pricing gateway: residential ladder (Starter → Smart → Pro)
// plus the Ultra-Home teaser card. SME plans live only on /plans.
const FEATURED_ITEMS = [
  ...FIBRE_PRICING.filter((p) => p.category === "home"),
  FIBRE_PRICING.find((p) => p.id === "sme-offer"),
];

export default function FeaturedPricing() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Section-wide background — stronger, covers header → carousel → footer */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute inset-0 bg-grid" style={{ opacity: 0.6 }} />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 32%, rgba(255,204,0,0.14) 0%, transparent 55%), linear-gradient(180deg, #FFFFFF 0%, #EAEFF5 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 62%, rgba(7,34,72,0.08) 0%, transparent 65%)",
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Section framing */}
        <div className="container-lattice pt-16 pb-6 text-center">
          <Reveal>
            <div className="eyebrow justify-center mb-4">
              <span style={{ width: "28px", height: "1px", background: "linear-gradient(90deg, transparent, hsl(var(--loop)))" }} />
              Residential Fibre Plans
            </div>
            <h2
              className="font-heading text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold tracking-tighter text-balance"
              style={{ color: "#072146" }}
            >
              SELECT THE FIBRE SERVICE SUITABLE TO YOUR NEEDS
            </h2>
            <p className="mt-3 text-sm sm:text-base text-ink-soft max-w-xl mx-auto text-balance">
              From light browsing to a fully connected household. Free installation, Wi-Fi router included, month-to-month — no lock-in.
            </p>
          </Reveal>
        </div>

        {/* Carousel — starts on the first card, resets on re-entry, autoplay kept */}
        <CoverFlowCarousel
          items={FEATURED_ITEMS}
          sectionLabel={null}
          autoplay={true}
          autoplayDelay={5000}
          startIndex={0}
          transparent
        />

        {/* Compare all plans gateway */}
        <div className="container-lattice pb-16 pt-2 flex items-center justify-center">
          <Link
            to="/plans"
            className="group inline-flex items-center gap-2 rounded-full border border-[#072146]/10 bg-[#FFCC00] px-5 py-3 text-sm font-semibold text-[#072146] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_0_4px_rgba(255,204,0,0.22),0_8px_22px_rgba(255,204,0,0.35)] focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/60"
          >
            Compare all plans
            <ArrowRight size={15} strokeWidth={2.5} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}