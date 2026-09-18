import AboutStory from "./AboutStory";
import WhatWeStandFor from "./WhatWeStandFor";
import MoreThanInternet from "./MoreThanInternet";
import OurImpact from "./OurImpact";
import OurPeople from "./OurPeople";
import CustomerCommitment from "./CustomerCommitment";
import OurBelief from "./OurBelief";
import { TodaySection } from "./AboutLikedSections";
import Testimonials from "@/components/home/Testimonials";
import AboutCTA from "./AboutCTA";

export default function AboutBody({ images = {} }) {
  return (
    <>
      <AboutStory />
      <WhatWeStandFor />
      <MoreThanInternet imageSrc={images.connectivity} />
      <OurImpact />
      <OurPeople imageSrc={images.people} medalImageSrc={images.medal} />
      <CustomerCommitment />
      <OurBelief imageSrc={images.belief} />
      <TodaySection />
      <Testimonials />
      <AboutCTA />
    </>
  );
}