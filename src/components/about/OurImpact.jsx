import { Home, Users, MapPin } from "lucide-react";
import { NAVY, GOLD, useInView, useCountUp, Reveal } from "./aboutHooks";

export const IMPACT_STATS = [
  { id: "home-passes", icon: Home, accent: "navy", value: 5000, suffix: "+", label: "Home Passes" },
  { id: "homes-connected", icon: Users, accent: "gold", prefix: "+", value: 1000, label: "Homes Connected" },
  { id: "scope", icon: MapPin, accent: "navy", prefix: "+", value: 25000, label: "Home Passes in current scope" },
];

export function ImpactStatItem({ stat, delay = 0 }) {
  const Icon = stat.icon;
  const isGold = stat.accent === "gold";
  const [ref, isInView] = useInView(0.1);
  const count = useCountUp(stat.value, isInView);

  return (
    <div
      ref={ref}
      className="group flex items-center gap-4 px-2 py-6 sm:px-8 sm:py-0 transition-all duration-300 hover:-translate-y-0.5"
    >
      <span
        className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full transition-transform duration-500 group-hover:scale-110"
        style={{ backgroundColor: isGold ? GOLD : NAVY }}
      >
        <Icon
          className="h-7 w-7"
          style={{ color: isGold ? NAVY : "#FFFFFF" }}
          strokeWidth={1.75}
          aria-hidden="true"
        />
      </span>
      <div>
        <p className="text-2xl font-extrabold sm:text-3xl" style={{ color: NAVY }}>
          {stat.prefix}
          {count > 0 ? count.toLocaleString() : stat.value.toLocaleString()}
          {stat.suffix}
        </p>
        <p className="text-sm font-semibold text-slate-500 sm:text-base">{stat.label}</p>
      </div>
    </div>
  );
}

export default function OurImpact({ stats = IMPACT_STATS }) {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <h2 className="mb-3 text-3xl font-extrabold sm:text-4xl" style={{ color: NAVY }}>
            Our Impact
          </h2>
          <span
            className="mb-10 block h-1 w-12 rounded-full"
            style={{ backgroundColor: GOLD }}
            aria-hidden="true"
          />
        </Reveal>

        <div className="flex flex-col divide-y divide-slate-100 sm:flex-row sm:divide-x sm:divide-y-0">
          {stats.map((stat, i) => (
            <div key={stat.id} className="flex-1">
              <Reveal delay={i * 0.1}>
                <ImpactStatItem stat={stat} delay={i * 120} />
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
