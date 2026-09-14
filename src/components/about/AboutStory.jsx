import { Reveal } from "@/components/common/Reveal";
import { SectionLabel } from "@/components/common/SectionLabel";
import { Image } from "@/components/ui/image";
import { ABOUT_IMAGES } from "@/data/aboutContent";

export default function AboutStory() {
  return (
    <section aria-labelledby="about-story-heading" className="bg-paper py-24 lg:py-32">
      <div className="container-lattice">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <Reveal><SectionLabel>The FibreHood Story</SectionLabel></Reveal>
            <Reveal delay={0.08}>
              <h2 id="about-story-heading" className="font-heading mt-6 text-3xl font-bold leading-[1.15] tracking-tighter text-signal sm:text-4xl lg:text-[2.75rem]">
                Connection shouldn&rsquo;t depend on where you happen to live.
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="mt-8 max-w-md space-y-5 text-base leading-relaxed text-ink-soft">
                <p>Across Zimbabwe, dependable fibre still reaches unevenly. Some neighbourhoods have it; many still wait.</p>
                <p>FibreHood exists to close that gap &mdash; bringing reliable, accessible fibre to homes, businesses, and the streets between them, without the complexity that usually comes with it.</p>
                <p>Check what reaches your address, choose a plan that fits, and get connected &mdash; with real people behind every step.</p>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <div className="relative h-72 overflow-hidden sm:h-96 lg:h-[30rem]">
              <Image src={ABOUT_IMAGES.story} alt="A Zimbabwean neighbourhood street at golden hour" fittingType="fill" className="h-full w-full" />
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <blockquote className="ff-serif mx-auto mt-20 max-w-3xl border-l-2 border-loop py-2 pl-6 text-2xl font-medium leading-snug text-ink sm:mt-24 sm:text-3xl">
            &ldquo;We&rsquo;re not here to sell you a connection. We&rsquo;re here to make sure yours works &mdash; for everything you rely on it for.&rdquo;
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}