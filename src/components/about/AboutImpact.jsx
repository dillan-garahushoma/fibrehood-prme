import React from "react";
import { Reveal } from "@/components/common/Reveal";
import { SectionLabel } from "@/components/common/SectionLabel";
import { Image } from "@/components/ui/image";
import { IMAGES } from "@/data/images";

const OUTCOMES = [
  {
    src: IMAGES.inHomeJoy,
    alt: "A family enjoying fibre internet at home together",
    title: "Families stay connected",
    copy: "Evening calls, shared streams, and the people who matter a tap away.",
  },
  {
    src: IMAGES.lifeEvening,
    alt: "A student studying online in the evening",
    title: "Students keep learning",
    copy: "Research, revision and online classes that don't drop at the crucial moment.",
  },
  {
    src: IMAGES.domainCoworking,
    alt: "Professionals working online from a shared workspace",
    title: "Professionals work from anywhere",
    copy: "Calls that hold, deadlines that land, borders that matter a little less.",
  },
  {
    src: IMAGES.domainRetail,
    alt: "A shop running its business over fibre internet",
    title: "Businesses stay open",
    copy: "Card machines, cloud stock, bookings — the modern till runs on fibre.",
  },
  {
    src: IMAGES.communityCoverage,
    alt: "Aerial view of a connected neighbourhood at dusk",
    title: "Communities grow stronger",
    copy: "When a neighbourhood connects properly, opportunity compounds street by street.",
  },
];

/**
 * More Than Internet — a full-width visual moment followed by a staggered
 * editorial mosaic of everyday outcomes, tied to everyday Zimbabwean life.
 */
export function AboutImpact() {
  const [first, second, third, fourth, fifth] = OUTCOMES;

  return (
    <section className="bg-paper">
      {/* ── Full-bleed statement band ──────────────────────────────── */}
      <div className="relative h-[420px] overflow-hidden sm:h-[520px] lg:h-[560px]">
        <Image
          src={IMAGES.coverageAerial}
          alt="Aerial view of Zimbabwean rooftops at dusk"
          fittingType="fill"
          className="h-full w-full"
        />
        <div className="absolute inset-0 bg-signal-deep/70" />
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <Reveal className="max-w-3xl text-center">
            <SectionLabel tone="light" className="justify-center">
              More Than Internet
            </SectionLabel>
            <p className="mt-7 font-heading text-3xl font-extrabold leading-[1.08] tracking-tighter text-paper sm:text-5xl lg:text-6xl">
              We don&rsquo;t sell megabits<span className="text-loop">.</span>
              <br />
              We sell what they make possible<span className="text-loop">.</span>
            </p>
          </Reveal>
        </div>
      </div>

      {/* ── Staggered outcome mosaic ───────────────────────────────── */}
      <div className="container-lattice py-24 lg:py-32">
        <Reveal>
          <p className="max-w-xl text-base leading-[1.8] text-ink-soft">
            A connection is only worth what it lets you do. Here is what fibre
            from FibreHood is for, in the places it matters most.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-12">
          <Outcome item={first} className="sm:col-span-7" aspect="aspect-[16/11]" />
          <Outcome item={second} className="sm:col-span-5 sm:mt-16 lg:mt-24" aspect="aspect-[4/3.4]" delay={0.1} />
          <Outcome item={third} className="sm:col-span-5 lg:col-start-2" aspect="aspect-[4/3.4]" />
          <Outcome item={fourth} className="sm:col-span-7 lg:mt-16" aspect="aspect-[16/11]" delay={0.1} />
        </div>

        {/* Closing wide moment */}
        <Reveal delay={0.1} className="mt-12">
          <div className="relative overflow-hidden rounded-xl">
            <div className="aspect-[16/9] sm:aspect-[21/9]">
              <Image
                src={fifth.src}
                alt={fifth.alt}
                fittingType="fill"
                className="h-full w-full"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-signal-deep/80 via-signal-deep/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-7 sm:p-10">
              <h3 className="font-heading text-xl font-extrabold tracking-tight text-paper sm:text-2xl">
                {fifth.title}
              </h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-paper/80">{fifth.copy}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Outcome({ item, className, aspect, delay = 0 }) {
  return (
    <Reveal delay={delay} className={className} amount={0.25}>
      <div className="overflow-hidden rounded-lg">
        <div className={aspect}>
          <Image src={item.src} alt={item.alt} fittingType="fill" className="h-full w-full" />
        </div>
      </div>
      <div className="mt-5">
        <h3 className="font-heading text-lg font-bold tracking-tight text-ink">{item.title}</h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-soft">{item.copy}</p>
      </div>
    </Reveal>
  );
}

export default AboutImpact;
