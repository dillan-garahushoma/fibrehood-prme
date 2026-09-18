import React, { useEffect } from "react";
import { PartnersHero } from "@/components/partners/PartnersHero";
import { AudienceCards } from "@/components/partners/AudienceCards";
import { PartnerPillars } from "@/components/partners/PartnerPillars";
import { PartnerProcess } from "@/components/partners/PartnerProcess";

export default function Partners() {
  useEffect(() => {
    document.title = "Fibre Installation | FibreHood";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "FibreHood partners with residents associations, developers, and body corporates to deliver fibre installation for communities and developments."
      );
    }
  }, []);

  return (
    <>
      <PartnersHero />
      <AudienceCards />
      <PartnerProcess />
      <PartnerPillars />
    </>
  );
}
