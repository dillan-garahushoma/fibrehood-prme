import { useRef, useState } from "react";
import Reveal from "@/components/common/Reveal";
import { SectionLabel } from "@/components/common/SectionLabel";
import PeopleNetworkCollage from "@/components/about/PeopleNetworkCollage";
import UnderSurface from "@/components/about/UnderSurface";

const DOTS = [
  ["22%", "30%"],
  ["40%", "58%"],
  ["60%", "22%"],
  ["70%", "68%"],
  ["35%", "80%"],
  ["50%", "45%"],
];

export function PeopleSection() {
  const [showPeopleNetwork, setShowPeopleNetwork] = useState(false);
  const collageRef = useRef(null);

  const handleDiscover = () => {
    setShowPeopleNetwork((visible) => !visible);
    requestAnimationFrame(() => {
      setTimeout(() => {
        collageRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 120);
    });
  };

  return (
    <section id="people" className="relative bg-paper pb-28 pt-20 lg:pb-36 lg:pt-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-stretch lg:gap-16">
          <div className="flex flex-col">
            <Reveal>
              <SectionLabel tone="light">People Make The Network</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-heading mt-6 max-w-lg text-3xl font-bold leading-[1.15] tracking-tighter text-signal sm:text-4xl lg:text-[2.75rem]">
                Great infrastructure doesn&rsquo;t happen by accident.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-8 max-w-md space-y-4 text-base leading-relaxed text-ink-soft">
                <p>It takes planners, engineers, technicians, project teams and people who care about getting the details right.</p>
                <p>
                  From network design and deployment to commissioning, operation and maintenance, FibreHood brings together
                  the expertise required to turn a plan into infrastructure people can rely on.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <button
                onClick={handleDiscover}
                className="group mt-auto inline-flex items-center gap-4 pt-12 text-ink-soft"
                aria-expanded={showPeopleNetwork}
                aria-controls="people-network-collage"
              >
                <span className="h-px w-10 bg-ink-soft/40 transition-all duration-300 group-hover:w-14" />
                <span className="text-sm font-medium tracking-[0.08em]">Discover more</span>
              </button>
            </Reveal>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Reveal delay={0.15} className="col-span-2">
              <ImageTile src="/images/engineer-field.jpg" alt="Technician splicing fibre cables in the field at night" className="h-64 sm:h-72" />
            </Reveal>
            <Reveal delay={0.25}>
              <ImageTile src="/images/installation-closeup.jpg" alt="Close-up of fibre optic cable strands" className="h-44" />
            </Reveal>
            <Reveal delay={0.35}>
              <ImageTile src="/images/team-plans.jpg" alt="Engineers reviewing network infrastructure plans" className="h-44" />
            </Reveal>
          </div>
        </div>

        {showPeopleNetwork && (
          <div id="people-network-collage" ref={collageRef} className="mt-16 scroll-mt-24">
            <PeopleNetworkCollage />
            <Reveal delay={0.1}>
              <p className="mx-auto mt-10 max-w-2xl text-center text-base leading-relaxed text-ink-soft">
                Behind every connection are the people who plan the routes, install the fibre, answer the calls, and keep improving the network. They live in the same communities they serve &mdash; and they take your connection personally.
              </p>
            </Reveal>
          </div>
        )}
      </div>
    </section>
  );
}

function ImageTile({ src, alt, className }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl">
      <img
        src={src}
        alt={alt}
        className={`w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 ${className}`}
      />
      <div className="absolute inset-0 bg-ink/10 mix-blend-multiply" />
    </div>
  );
}

export function BeliefSection() {
  return (
    <section className="relative overflow-hidden bg-bone-50 py-28 lg:py-40">
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
        <Reveal><span className="font-heading text-6xl text-amber-500/50">&ldquo;</span></Reveal>
        <Reveal delay={0.1}>
          <blockquote className="font-display text-2xl leading-[1.3] text-navy-950 sm:text-4xl">
            Access is more than a connection. It is possibility.
          </blockquote>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="mt-12 text-sm font-semibold uppercase tracking-[0.25em] text-amber-600">That is why we build.</p>
        </Reveal>
        <Reveal delay={0.35}>
          <div className="mt-8 space-y-2 text-lg text-navy-700/90">
            <p>Not just for faster downloads.</p>
            <p>Not just for another connection.</p>
            <p>But for the student learning from home.</p>
            <p>The entrepreneur building a business.</p>
            <p>The family staying connected.</p>
            <p>The team working across borders.</p>
            <p>The next idea that hasn&rsquo;t been imagined yet.</p>
          </div>
        </Reveal>
        <Reveal delay={0.45}>
          <p className="font-display mt-10 text-xl text-navy-950 sm:text-2xl">Infrastructure changes what people can do.</p>
        </Reveal>
      </div>
    </section>
  );
}

export function TodaySection() {
  return (
    <section className="relative bg-signal-deep py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <Reveal>
              <SectionLabel tone="light">Today</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-heading mt-6 flex max-w-lg items-start gap-3 text-3xl font-bold leading-[1.15] tracking-tighter text-paper sm:text-4xl lg:text-[2.75rem]">
                <span className="mt-[0.38em] h-2.5 w-2.5 shrink-0 rounded-full bg-loop" aria-hidden="true" />
                The network keeps growing. So does the opportunity.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-8 max-w-md space-y-4 text-base leading-relaxed text-paper/75">
                <p>As communities become increasingly connected, the infrastructure beneath them matters more than ever.</p>
                <p>
                  FibreHood continues to build networks designed around accessibility, flexibility and long-term value
                  &mdash; creating stronger digital foundations for the places people live and work.
                </p>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <div className="relative overflow-hidden rounded-2xl border border-paper/10">
              <img src="/images/community-coverage.jpg" alt="Aerial view of a connected neighbourhood at dusk" className="h-80 w-full object-cover sm:h-96" />
              <div className="absolute inset-0">
                {DOTS.map(([top, left], index) => (
                  <span
                    key={`${top}-${left}`}
                    className="pulse-glow absolute h-2.5 w-2.5 rounded-full bg-loop shadow-[0_0_12px_4px_rgba(255,204,0,0.6)]"
                    style={{ top, left, animationDelay: `${index * 0.4}s` }}
                  />
                ))}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-signal-deep/60 via-transparent to-transparent" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default function AboutLikedSections() {
  return (
    <>
      <UnderSurface />
      <PeopleSection />
      <BeliefSection />
      <TodaySection />
    </>
  );
}