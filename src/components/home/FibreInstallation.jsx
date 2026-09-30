import React from "react";
import { Link } from "react-router-dom";
import { Home, Building2, Users, Briefcase, ArrowRight, Network } from "lucide-react";

const NAVY = "#072146";
const GOLD = "#FFCC00";

const AUDIENCES = [
  {
    icon: Home,
    title: "Homes",
    description: "Reliable fibre for your home.",
  },
  {
    icon: Building2,
    title: "Apartments & MDUs",
    description: "Connectivity for complexes and estates.",
  },
  {
    icon: Users,
    title: "Communities",
    description: "Partner with us for a connected community.",
  },
  {
    icon: Briefcase,
    title: "Businesses",
    description: "Scalable solutions for your business.",
  },
];

function AudienceCard({ item }) {
  const Icon = item.icon;

  return (
    <div className="rounded-xl border-[1.5px] border-slate-200/90 bg-white p-5 shadow-[0_10px_24px_rgba(7,34,72,0.08),0_2px_6px_rgba(7,34,72,0.04)] transition-all hover:shadow-[0_16px_32px_rgba(7,34,72,0.12)]">
      <div className="relative mb-3.5 inline-flex">
        <Icon className="h-8 w-8 text-signal" strokeWidth={1.75} aria-hidden="true" />
        <span
          className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-loop"
        />
      </div>
      <h3 className="mb-1.5 font-heading text-base font-bold leading-snug text-signal">
        {item.title}
      </h3>
      <p className="text-xs sm:text-sm leading-snug text-slate-500">{item.description}</p>
    </div>
  );
}

export function FibreInstallation({
  imageSrc = "/images/collage-fibre-installation.png",
  imageAlt = "Fibrehood technicians installing fibre equipment in a neighbourhood",
  onExpressInterest,
  ctaHref = "/fibre-installation",
}) {
  const isButton = Boolean(onExpressInterest);

  return (
    <section className="overflow-hidden bg-[#FBF9F5] py-16 lg:py-24">
      <div className="container-lattice">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          {/* Left: content */}
          <div>
            <div className="eyebrow mb-4">
              <span className="h-px w-7 bg-loop" aria-hidden="true" />
              Fibre Installation
            </div>

            <h2 className="mb-5 font-heading text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold leading-[1.08] tracking-tighter text-signal">
              Get fibre for your neighbourhood, building, home or business
            </h2>

            <p className="mb-8 max-w-md text-base leading-relaxed text-slate-500">
              We make it simple to bring Fibrehood&apos;s fast, reliable fibre internet
              to your community, complex, office or home.
            </p>

            <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {AUDIENCES.map((item) => (
                <AudienceCard key={item.title} item={item} />
              ))}
            </div>

            {isButton ? (
              <button
                type="button"
                onClick={onExpressInterest}
                className="inline-flex items-center gap-2 rounded-full bg-loop px-7 py-3.5 text-sm font-semibold text-signal transition-all hover:bg-loop/90 hover:shadow-loop hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#072146]"
              >
                Express Interest
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            ) : (
              <Link
                to={ctaHref}
                className="inline-flex items-center gap-2 rounded-full bg-loop px-7 py-3.5 text-sm font-semibold text-signal transition-all hover:bg-loop/90 hover:shadow-loop hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#072146]"
              >
                Express Interest
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            )}
          </div>

          {/* Right: arched image with glow + floating card */}
          <div className="relative pb-20 sm:pb-0 sm:pr-4">
            <div className="relative">
              {/* Subtle gold glow behind the curve */}
              <div
                className="pointer-events-none absolute -inset-1 opacity-40 blur-md"
                style={{
                  borderRadius: "999px 48px 48px 999px",
                  background: "radial-gradient(circle at 10% 50%, rgba(255,204,0,0.5) 0%, transparent 70%)",
                }}
                aria-hidden="true"
              />

              <div
                className="aspect-[4/3] w-full overflow-hidden border-[1.5px] border-amber-300/40 bg-slate-200 shadow-[0_20px_50px_rgba(7,33,70,0.14)] lg:aspect-[5/4]"
                style={{ borderRadius: "999px 48px 48px 999px" }}
              >
                <img
                  src={imageSrc}
                  alt={imageAlt}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-3 left-4 right-4 flex items-center gap-4 rounded-2xl border-[1.5px] border-slate-200/90 bg-white p-4 shadow-[0_20px_40px_-15px_rgba(7,33,70,0.30)] sm:-bottom-6 sm:left-auto sm:right-0 sm:w-auto sm:max-w-sm">
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-loop"
              >
                <Network className="h-5 w-5 text-signal" strokeWidth={2} aria-hidden="true" />
              </div>
              <div>
                <p className="font-heading text-sm font-bold leading-snug text-signal">
                  Building a more connected Zimbabwe
                </p>
                <p className="text-xs text-slate-500">
                  Fibre for people, communities and opportunity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FibreInstallation;
