import { Reveal } from "@/components/common/Reveal";
import { SectionLabel } from "@/components/common/SectionLabel";
import { Image } from "@/components/ui/image";
import { ABOUT_IMAGES } from "@/data/aboutContent";
import { IMAGES } from "@/data/images";

const SCENES = [
  { img: ABOUT_IMAGES.infrastructure, alt: "A fibre technician installing network equipment on a street pole", title: "Infrastructure, installed with care", copy: "Fibre is brought street by street — planned, trenched, spliced, and commissioned by teams who take pride in doing it properly." },
  { img: IMAGES.fibreGlass, alt: "Close-up of fibre optic cable strands", title: "Equipment built to last", copy: "The systems, teams, and care behind every connection — from the cable in the ground to the equipment that keeps your home online." }
];

export default function BuiltBehindScenes() {
  return (
    <section aria-labelledby="behind-heading" className="bg-fog py-24 lg:py-32">
      <div className="container-lattice">
        <div className="max-w-2xl">
          <Reveal><SectionLabel>Built Behind the Scenes</SectionLabel></Reveal>
          <Reveal delay={0.08}>
            <h2 id="behind-heading" className="ff-serif mt-6 text-3xl font-medium leading-tight text-ink sm:text-4xl">
              The network you don&rsquo;t see is the one you depend on.
            </h2>
          </Reveal>
        </div>
        <div className="mt-16 space-y-16 lg:mt-20 lg:space-y-24">
          {SCENES.map((s, i) => (
            <div key={s.title} className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-16">
              <Reveal className={i % 2 === 1 ? "lg:order-2" : ""}>
                <div className="h-64 overflow-hidden sm:h-80 lg:h-[24rem]">
                  <Image src={s.img} alt={s.alt} fittingType="fill" className="h-full w-full" />
                </div>
              </Reveal>
              <Reveal delay={0.08} className={i % 2 === 1 ? "lg:order-1" : ""}>
                <h3 className="ff-serif text-2xl font-medium text-ink">{s.title}</h3>
                <p className="mt-4 max-w-md text-base leading-relaxed text-ink-soft">{s.copy}</p>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}