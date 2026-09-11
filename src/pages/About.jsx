import { useState } from "react";
import { PageHero } from "@/components/common/PageHero";
import AboutDevelopmentSections from "@/components/about/AboutDevelopmentSections";
import PeopleNetworkCollage from "@/components/about/PeopleNetworkCollage";

export default function About() {
  const [showPeopleNetwork, setShowPeopleNetwork] = useState(false);

  return (
    <>
      <PageHero
        tone="dark"
        eyebrow="About FibreHood"
        title="We exist to bridge the access gap."
        subtitle="FibreHood is a direct fibre connectivity platform — built so people can find out what fibre really reaches them, choose with clarity, and get connected without the runaround."
      />
      <AboutDevelopmentSections />
      <section className="bg-white py-20 md:py-28">
        <div className="container-lattice">
          <div className="max-w-2xl">
            <p className="eyebrow">People make the network</p>
            <h2 className="mt-4 font-heading text-3xl font-bold tracking-tighter text-signal sm:text-4xl">
              The network matters because people do.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">
              Fibre is infrastructure, but the reason we build it is human: the people, teams, and
              neighbourhoods that depend on a connection that works.
            </p>
            <button
              onClick={() => setShowPeopleNetwork((visible) => !visible)}
              className="group mt-10 inline-flex w-fit items-center gap-3"
              aria-expanded={showPeopleNetwork}
              aria-controls="people-network-collage"
            >
              <span className="h-px w-8 bg-black transition-all duration-300 group-hover:w-12" />
              <span className="text-[13px] font-medium tracking-[0.08em]">Discover more</span>
            </button>
          </div>
          {showPeopleNetwork && (
            <div id="people-network-collage" className="mt-12">
              <PeopleNetworkCollage />
            </div>
          )}
        </div>
      </section>
    </>
  );
}
