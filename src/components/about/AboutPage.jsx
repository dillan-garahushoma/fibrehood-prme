import OurBelief, { BELIEF_ITEMS } from "./OurBelief";
import OurImpact, { IMPACT_STATS, ImpactStatItem } from "./OurImpact";
import OurPeople from "./OurPeople";
import WhatWeStandFor, { VALUES, ValueCard } from "./WhatWeStandFor";
import MoreThanInternet, { ConnectivityBanner } from "./MoreThanInternet";

export {
  OurBelief,
  BELIEF_ITEMS,
  OurImpact,
  IMPACT_STATS,
  ImpactStatItem,
  OurPeople,
  WhatWeStandFor,
  VALUES,
  ValueCard,
  MoreThanInternet,
  ConnectivityBanner,
};
export * from "./aboutHooks";

export default function AboutPage({ images = {} }) {
  return (
    <div className="bg-white">
      <OurBelief imageSrc={images.belief} />
      <OurImpact />
      <OurPeople imageSrc={images.people} medalImageSrc={images.medal} />
      <WhatWeStandFor />
      <MoreThanInternet imageSrc={images.connectivity} />
    </div>
  );
}
