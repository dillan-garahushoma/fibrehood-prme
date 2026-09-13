import { Reveal } from "@/components/common/Reveal";
import { SectionLabel } from "@/components/common/SectionLabel";
import { Image } from "@/components/ui/image";
import { ABOUT_IMAGES, IMPACT_TILES } from "@/data/aboutContent";

export default function MoreThanInternet() {
  return (
    <section aria-labelledby="impact-heading" className="bg-paper">
      <div className="container-lattice pt-24 lg:pt-32">
        <div className="max-w-2xl">
          <Reveal><SectionLabel>More Than Internet</SectionLabel></Reveal>
          <Reveal delay={0.08}>
            <h2 id="impact-heading" className="ff-serif mt-6 text-3xl font-medium leading-tight text-ink sm:text-4xl">
              Connectivity is what it makes possible.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-ink-soft">
              It&rsquo;s never been about megabits. It&rsquo;s about what people do with them &mdash; and the doors that open when a neighbourhood comes online.
            </p>
          </Reveal>
        </div>
      </div>
      <Reveal delay={0.1} className="mt-12">
        <div className="relative h-[55vh] min-h-[340px] w-full overflow-hidden">
          <Image src={ABOUT_IMAGES.impact} alt="A family gathered around a laptop at home in the evening" fittingType="fill" className="h-full w-full" />
          <div className="absolute inset-0 bg-ink/25" aria-hidden="true" />
          <p className="ff-serif absolute bottom-8 left-6 max-w-xs text-2xl font-medium text-paper sm:left-12 sm:max-w-sm sm:text-3xl">
            Families staying close &mdash; across towns, and across borders.
          </p>
        </div>
      </Reveal>
      <div className="container-lattice py-16 lg:py-24">
        <div className="grid gap-6 sm:grid-cols-3">
          {IMPACT_TILES.map((t, i) => (
            <Reveal key={t.caption} delay={i * 0.08} className={i === 0 ? "sm:mt-10" : i === 2 ? "sm:mt-16" : ""}>
              <figure>
                <div className="h-56 overflow-hidden sm:h-64">
                  <Image src={t.img} alt={t.alt} fittingType="fill" className="h-full w-full" />
                </div>
                <figcaption className="mt-3 text-sm font-medium text-ink">{t.caption}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}