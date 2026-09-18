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
      className="group flex min-h-[300px] flex-col items-center justify-center rounded-[22px] border border-[rgba(7,33,70,0.06)] bg-white px-7 py-10 text-center shadow-[0_1px_2px_rgba(7,33,70,0.04),0_10px_20px_-10px_rgba(7,33,70,0.12)] transition-shadow duration-300 hover:shadow-[0_2px_4px_rgba(7,33,70,0.05),0_16px_28px_-12px_rgba(7,33,70,0.16)]"
    >
      <Icon
        className="mb-[22px] h-[42px] w-[42px] transition-transform duration-300 group-hover:scale-110"
        style={{ color: GOLD }}
        strokeWidth={1.75}
        aria-hidden="true"
      />

      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">
        {card.eyebrow}
      </p>

      {card.titleSuffix ? (
        <p className="mb-2.5 flex items-baseline justify-center gap-0.5">
          <span className="text-xl font-medium sm:text-[23px]" style={{ color: NAVY }}>
            {card.title}
          </span>
          <span className="text-sm text-slate-500">{card.titleSuffix}</span>
        </p>
      ) : (
        <p className="mb-2.5 text-xl font-medium leading-tight sm:text-[23px]" style={{ color: NAVY }}>
          {card.title}
        </p>
      )}

      <p className="max-w-[230px] text-sm leading-relaxed text-slate-600">{card.description}</p>
    </div>
  );
}

export default function MoreThanInternet({ cards = CARDS }) {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-7xl rounded-[20px] bg-[#F4F6FA] p-8 sm:p-10">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <FeatureCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
