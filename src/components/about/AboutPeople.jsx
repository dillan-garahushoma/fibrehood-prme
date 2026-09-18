import { Reveal } from "@/components/common/Reveal";
import { SectionLabel } from "@/components/common/SectionLabel";
import PeopleNetworkCollage from "@/components/about/PeopleNetworkCollage";

export default function AboutPeople() {
  return (
    <section aria-labelledby="people-heading" className="bg-paper py-24 lg:py-32">
      <div className="container-lattice">
        <div className="max-w-2xl">
          <Reveal><SectionLabel>The People Behind Fibrehood</SectionLabel></Reveal>
          <Reveal delay={0.08}>
            <h2 id="people-heading" className="ff-serif mt-6 text-3xl font-medium leading-tight text-ink sm:text-4xl">
              Real people. Real support. Real accountability.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-ink-soft">
              Behind every connection are the people who plan the routes, install the fibre, answer the calls, and keep improving the network. They live in the same communities they serve &mdash; and they take your connection personally.
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.12} className="mt-16">
          <PeopleNetworkCollage />
        </Reveal>
      </div>
    </section>
  );
}