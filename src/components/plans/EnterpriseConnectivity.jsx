import { Monitor, Building2, Power, Headphones, ArrowRight } from "lucide-react";

const NAVY = "#072146";
const GOLD = "#FFCC00";

const FEATURES = [
  { icon: Monitor, label: "Dedicated Internet Access" },
  { icon: Building2, label: "Multiple Sites" },
  { icon: Power, label: "99.9% Network Uptime" },
  { icon: Headphones, label: "Priority Support" },
];

export default function EnterpriseConnectivity({
  imageSrc = "/images/enterprise-connectivity.jpg",
  imageAlt = "City skyline representing enterprise connectivity",
  onTalkToSolutionsTeam,
  ctaHref = "#solutions-team",
}) {
  const CtaTag = onTalkToSolutionsTeam ? "button" : "a";

  return (
    <section className="px-6 py-10">
      <div
        className="relative mx-auto max-w-7xl overflow-hidden rounded-2xl bg-cover bg-center px-8 py-12 sm:px-12 sm:py-16"
        style={{ backgroundImage: `url(${imageSrc})` }}
        role="img"
        aria-label={imageAlt}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to right, ${NAVY} 0%, rgba(7,33,70,0.65) 40%, rgba(7,33,70,0.15) 75%, rgba(7,33,70,0) 100%)`,
          }}
          aria-hidden="true"
        />

        <div className="relative max-w-lg">
          <h2 className="mb-4 text-3xl font-extrabold text-white sm:text-4xl">
            Enterprise Connectivity
          </h2>
          <p className="mb-8 text-base font-medium leading-relaxed text-white/90">
            Tailored, high-performance solutions for your organisation.
          </p>

          <div className="mb-9 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
            {FEATURES.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex flex-col items-center text-center">
                  <Icon
                    className="mb-2 h-7 w-7"
                    style={{ color: GOLD }}
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  <span className="text-xs font-semibold leading-snug text-white">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>

          <CtaTag
            href={onTalkToSolutionsTeam ? undefined : ctaHref}
            onClick={onTalkToSolutionsTeam}
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold transition-colors hover:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            style={{ backgroundColor: GOLD, color: NAVY }}
          >
            Talk to Our Solutions Team
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </CtaTag>
        </div>
      </div>
    </section>
  );
}
