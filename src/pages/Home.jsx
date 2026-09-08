import React from "react";
import Hero from "@/components/home/Hero";
import EverydayLife from "@/components/home/EverydayLife";
import ValueProp from "@/components/home/ValueProp";
import ClientPortal from "@/components/home/ClientPortal";
import ConnectionJourney from "@/components/home/ConnectionJourney";
import FeaturedPricing from "@/components/home/FeaturedPricing";
import Lifestyle from "@/components/home/Lifestyle";
import Testimonials from "@/components/home/Testimonials";
import CoverageCTA from "@/components/home/CoverageCTA";
import SupportPreview from "@/components/home/SupportPreview";

export default function Home() {
  return (
    <>
      <Hero />
      <EverydayLife />
      <FeaturedPricing />
      <ConnectionJourney />
      <ValueProp />
      <ClientPortal />
      <Lifestyle />
      <Testimonials />
      <CoverageCTA />
      <SupportPreview />
    </>
  );
}