import { Infinity as InfinityIcon, Tag, Wrench, Receipt } from "lucide-react";

const NAVY = "#072146";
const GOLD = "#FFCC00";

const CARDS = [
  {
    id: "unlimited-internet",
    icon: InfinityIcon,
    eyebrow: "No data caps",
    title: "Unlimited internet",
    description: "Seamless browsing, streaming, gaming and working from home.",
  },
  {
    id: "plans-from",
    icon: Tag,
    eyebrow: "Plans from",
    title: "US$40",
    titleSuffix: "/mo",
    description: "Affordable plans to suit every household.",
  },
  {
    id: "free-installation",
    icon: Wrench,
    eyebrow: "On us",
    title: "Free installation",
    description: "We handle the setup so you can connect hassle-free.",
  },
  {
    id: "activation-fees",
    icon: Receipt,
    eyebrow: "Activation from",
    title: "US$65",
    description: "One-time fee applied at signup.",
  },
];

function FeatureCard({ card }) {
  const Icon = card.icon;

  return (
    <div
      className="group relative flex min-h-[300px] flex-col items-center justify-center overflow-hidden rounded-[22px] border border-white/70 bg-gradient-to-br from-white via-white/85 to-[#E9EFF9]/80 px-7 py-10 text-center shadow-[0_28px_55px_-26px_rgba(7,33,70,0.38),0_12px_26px_-16px_rgba(7,33,70,0.22)] ring-1 ring-[rgba(7,33,70,0.05)] backdrop-blur-xl transition-shadow duration-300 hover:shadow-[0_34px_66px_-26px_rgba(7,33,70,0.46),0_14px_30px_-16px_rgba(7,33,70,0.28)]"
    >
      {/* Soft light bloom + top highlight for the glass surface */}
      <span
        className="pointer-events-none absolute -top-20 left-1/2 h-44 w-44 -translate-x-1/2 rounded-full bg-white/80 blur-2xl"
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent"
        aria-hidden="true"
      />

      <div className="relative flex flex-col items-center">
        <Icon
          className="mb-[22px] h-[42px] w-[42px] transition-transform duration-300 group-hover:scale-110"
          style={{ color: GOLD }}
          strokeWidth={1.75}
          aria-hidden="true"
        />

        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-600">
          {card.eyebrow}
        </p>

        {card.titleSuffix ? (
          <p className="mb-2.5 flex items-baseline justify-center gap-0.5">
            <span className="text-xl font-medium sm:text-[23px]" style={{ color: NAVY }}>
              {card.title}
            </span>
            <span className="text-sm text-slate-600">{card.titleSuffix}</span>
          </p>
        ) : (
          <p className="mb-2.5 text-xl font-medium leading-tight sm:text-[23px]" style={{ color: NAVY }}>
            {card.title}
          </p>
        )}

        <p className="max-w-[230px] text-sm leading-relaxed text-slate-700">{card.description}</p>
      </div>
    </div>
  );
}

export default function MoreThanInternet({ cards = CARDS }) {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-7xl rounded-[20px] bg-gradient-to-br from-[#F7F9FC] via-[#F4F6FA] to-[#E7EDF7] p-8 sm:p-10">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <FeatureCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}