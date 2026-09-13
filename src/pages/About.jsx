import { SplitHero } from "@/components/common/SplitHero";
import { IMAGES } from "@/data/images";
import AboutBody from "@/components/about/AboutBody";

export default function About() {
  return (
    <>
      <SplitHero
        image={IMAGES.aboutHero}
        alt="FibreHood fibre infrastructure connecting a community at dusk"
        eyebrow="About FibreHood"
        title="We exist to bridge the access gap."
        subtitle="FibreHood is a direct fibre connectivity platform — built so people can find out what fibre really reaches them, choose with clarity, and get connected without the runaround."
      />
      <AboutBody />
    </>
  );
}