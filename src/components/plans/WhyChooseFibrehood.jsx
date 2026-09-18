import { Wifi, Waypoints, Shield, Users } from "lucide-react";

const NAVY = "#072146";
const GOLD = "#FFCC00";

const REASONS = [
  {
    icon: Wifi,
    title: "100% Fibre Infrastructure",
    description: "Built for speed, reliability and the future.",
  },
  {
    icon: Waypoints,
    title: "Trusted Local Provider",
    description: "Licensed, reliable and customer-focused.",
  },
  {
    icon: Shield,
    title: "Support That Cares",
    description: "Real people. Real solutions. Always.",
  },
  {
    icon: Users,
    title: "Connecting Zimbabwe",
    description: "Empowering homes, businesses and communities.",
  },
];

function ReasonItem({ icon: Icon, title, description }) {
  return (
    <div>
      <div className="flex items-start gap-3">
        <Icon
          className="h-8 w-8 shrink-0"
          style={{ color: GOLD }}
          strokeWidth={1.75}
          aria-hidden="true"
        />
        <h3 className="text-lg font-bold leading-snug" style={{ color: NAVY }}>
          {title}
        </h3>
      </div>
      <p className="mt-2 pl-11 text-sm leading-relaxed text-slate-500">{description}</p>
    </div>
  );
}

export default function WhyChooseFibrehood() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-3 text-3xl font-extrabold sm:text-4xl" style={{ color: NAVY }}>
          Why Choose Fibrehood?
        </h2>
        <span
          className="mb-10 block h-1 w-12 rounded-full"
          style={{ backgroundColor: GOLD }}
          aria-hidden="true"
        />

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map((item) => (
            <ReasonItem key={item.title} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
