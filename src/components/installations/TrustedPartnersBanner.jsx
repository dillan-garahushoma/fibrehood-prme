import React from "react";
import { LogoCloud } from "@/components/ui/logo-cloud-3";
import { cn } from "@/lib/utils";

const PARTNER_LOGOS = [
  {
    src: "/images/partners/partner-1.png",
    alt: "Infrastructure Partner 1",
    height: 80,
  },
  {
    src: "/images/partners/partner-2.png",
    alt: "Infrastructure Partner 2",
    height: 80,
  },
  {
    src: "/images/partners/partner-3.png",
    alt: "Infrastructure Partner 3",
    height: 80,
  },
  {
    src: "/images/partners/partner-4.png",
    alt: "Infrastructure Partner 4",
    height: 80,
  },
  // Repeat to fill the marquee
  {
    src: "/images/partners/partner-1.png",
    alt: "Infrastructure Partner 1",
    height: 80,
  },
  {
    src: "/images/partners/partner-2.png",
    alt: "Infrastructure Partner 2",
    height: 80,
  },
  {
    src: "/images/partners/partner-3.png",
    alt: "Infrastructure Partner 3",
    height: 80,
  },
  {
    src: "/images/partners/partner-4.png",
    alt: "Infrastructure Partner 4",
    height: 80,
  },
];

/**
 * TrustedPartnersBanner — logo-cloud section on the Installations page.
 * Shows infrastructure/network partners in an infinite scrolling strip.
 */
export function TrustedPartnersBanner({ className }) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-[#FBF9F5] py-14 md:py-20",
        className
      )}
    >
      {/* Subtle radial glow */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -top-1/2 left-1/2 -z-10 -translate-x-1/2",
          "h-[80vmin] w-[80vmin] rounded-b-full",
          "blur-[40px] opacity-40",
          "bg-[radial-gradient(ellipse_at_center,rgba(255,204,0,0.25),transparent_60%)]"
        )}
      />

      <div className="container-lattice">
        {/* Heading — larger text */}
        <h2 className="mb-2 text-center font-medium text-foreground text-2xl tracking-tight md:text-4xl">
          <span className="text-muted-foreground">Trusted by industry experts.</span>
          <br />
          <span className="font-bold text-signal">
            Built on proven infrastructure partnerships.
          </span>
        </h2>

        {/* Thin rule */}
        <div className="mx-auto my-8 h-px max-w-sm bg-border [mask-image:linear-gradient(to_right,transparent,black,transparent)]" />

        {/* Logo marquee — bigger logos */}
        <LogoCloud logos={PARTNER_LOGOS} logoClassName="h-16 md:h-20" />

        {/* Bottom rule */}
        <div className="mt-8 h-px bg-border [mask-image:linear-gradient(to_right,transparent,black,transparent)]" />
      </div>
    </section>
  );
}

export default TrustedPartnersBanner;
