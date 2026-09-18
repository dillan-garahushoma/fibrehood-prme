import { Reveal } from "@/components/common/Reveal";
import { SectionLabel } from "@/components/common/SectionLabel";

function IconStreet(props) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M8 18H56" />
      <path d="M12 23H52" strokeOpacity="0.45" />
      <rect x="15" y="31" width="34" height="16" rx="6" />
      <path d="M21 36H43" strokeOpacity="0.5" />
      <circle cx="25" cy="40.5" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="32" cy="40.5" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="39" cy="40.5" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconAccessBuild(props) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="24" cy="32" r="14" />
      <circle cx="24" cy="32" r="4" />
      <path d="M24 18V22M24 42V46M10 32H14" />
      <path d="M38 32C46 32 50 22 58 20" />
      <circle cx="58" cy="20" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconDistribution(props) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="8" y="24" width="14" height="16" rx="3" />
      <circle cx="15" cy="32" r="1.5" fill="currentColor" stroke="none" />
      <path d="M22 27L46 15M22 31L50 27M22 35L50 39M22 39L46 51" />
      <circle cx="48" cy="15" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="52" cy="27" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="52" cy="39" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="48" cy="51" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconBuilding(props) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="18" y="12" width="28" height="40" rx="2" />
      <rect x="24" y="20" width="6" height="6" />
      <rect x="34" y="20" width="6" height="6" />
      <rect x="24" y="32" width="6" height="6" />
      <rect x="34" y="32" width="6" height="6" />
      <rect x="27" y="44" width="10" height="8" />
    </svg>
  );
}

function IconUnit(props) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 50V20Q22 14 28 14H34Q40 14 40 20V50" />
      <path d="M28 50V42H34" strokeOpacity="0.45" />
      <circle cx="34" cy="34" r="1.7" fill="currentColor" stroke="none" />
      <rect x="46" y="28" width="9" height="13" rx="2" />
      <circle cx="50.5" cy="34.5" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconCustomer(props) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="17" y="36" width="30" height="13" rx="4" />
      <circle cx="32" cy="42.5" r="1.7" fill="currentColor" stroke="none" />
      <path d="M23 29Q32 20 41 29M18 22Q32 9 46 22" />
    </svg>
  );
}

const FLOW = [
  { Icon: IconStreet, label: "Street network", copy: "High-capacity fibre runs through the streets of your neighbourhood." },
  { Icon: IconAccessBuild, label: "Access build", copy: "We bring the fibre from the street right to your building." },
  { Icon: IconDistribution, label: "Distribution point", copy: "A central point distributes the signal cleanly within the building." },
  { Icon: IconBuilding, label: "Building", copy: "Your building is connected to the wider Fibrehood network." },
  { Icon: IconUnit, label: "Individual unit", copy: "Fibre reaches your door — your unit is ready to go live." },
  { Icon: IconCustomer, label: "Customer", copy: "You're connected. Pick a plan and get online in minutes." },
];

export function UnderSurface() {
  return (
    <section
      id="network"
      className="relative overflow-hidden py-28 lg:py-36"
      style={{ background: "linear-gradient(155deg, #031630 0%, #072248 55%, #031630 100%)" }}
    >
      <div className="container-lattice relative">
        <Reveal>
          <SectionLabel tone="light">Under The Surface</SectionLabel>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-heading mt-6 max-w-2xl text-3xl font-bold leading-[1.15] tracking-tighter text-signal sm:text-4xl lg:text-[2.75rem]">
            A lot goes into making &ldquo;connected&rdquo; feel effortless.
          </h2>
        </Reveal>

        <div className="mt-20 grid grid-cols-1 gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-20">
          {FLOW.map(({ Icon, label, copy }, index) => (
            <Reveal key={label} delay={index * 0.08} amount={0.4} className="text-center sm:text-left">
              <Icon className="mx-auto h-14 w-14 text-loop sm:mx-0" aria-hidden="true" />
              <h3 className="mt-6 font-display text-sm font-semibold uppercase tracking-wider text-paper">{label}</h3>
              <p className="mt-2 max-w-[24ch] text-sm leading-relaxed text-paper/60 sm:max-w-none">{copy}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default UnderSurface;
