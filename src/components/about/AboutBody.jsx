import AboutStory from "./AboutStory";
import WhatWeStandFor from "./WhatWeStandFor";
import MoreThanInternet from "./MoreThanInternet";
import CustomerCommitment from "./CustomerCommitment";
import AboutCTA from "./AboutCTA";
import { BeliefSection, PeopleSection, TodaySection } from "./AboutLikedSections";

export default function AboutBody() {
  return (
    <>
      <AboutStory />
      <WhatWeStandFor />
      <MoreThanInternet />
      <PeopleSection />
      <CustomerCommitment />
      <BeliefSection />
      <TodaySection />
      <AboutCTA />
    </>
  );
}