import React from "react";
import { PartnersHero } from "@/components/partners/PartnersHero";
import { AudienceCards } from "@/components/partners/AudienceCards";
import { PartnerPillars } from "@/components/partners/PartnerPillars";
import { PartnerProcess } from "@/components/partners/PartnerProcess";
import { PartnerCTA } from "@/components/partners/PartnerCTA";

export default function Partners() {
  return (
    <>
      <PartnersHero />
      <AudienceCards />
      <PartnerPillars />
      <PartnerProcess />
      <PartnerCTA />
    </>
  );
}
