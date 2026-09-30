import { SplitHero } from "@/components/common/SplitHero";
import { IMAGES } from "@/data/images";
import AboutBody from "@/components/about/AboutBody";

const ABOUT_PAGE_IMAGES = {
  belief: "/images/about/our-belief.jpg",
  people: "/images/about/our-people.jpg",
  connectivity: "/images/about/connectivity-banner.jpg",
};

export default function About() {
  return (
    <>
      <SplitHero
        image={IMAGES.studentsHero}
        alt="Students learning together in a Fibrehood-connected community"
        fullBleed
        eyebrow="About Fibrehood"
        title="We exist to unlock opportunities and talent"
        subtitle="Connectivity for marginalised communities."
      />
      <AboutBody images={ABOUT_PAGE_IMAGES} />
    </>
  );
}