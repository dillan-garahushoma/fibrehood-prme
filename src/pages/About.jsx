import { PageHero } from "@/components/common/PageHero";
import AboutDevelopmentSections from "@/components/about/AboutDevelopmentSections";

export default function About() {
  return (
    <>
      <PageHero
        tone="dark"
        eyebrow="About FibreHood"
        title="We exist to bridge the access gap."
        subtitle="FibreHood is a direct fibre connectivity platform — built so people can find out what fibre really reaches them, choose with clarity, and get connected without the runaround."
      />

      <AboutDevelopmentSections />
    </>
  );
}