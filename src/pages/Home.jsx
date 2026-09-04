import React from "react";
import Hero from "@/components/home/Hero";
import EverydayLife from "@/components/home/EverydayLife";
import ValueProp from "@/components/home/ValueProp";
import ConnectionJourney from "@/components/home/ConnectionJourney";
import NetworkVisual from "@/components/home/NetworkVisual";
import FeaturedPricing from "@/components/home/FeaturedPricing";
import RouterSection from "@/components/home/RouterSection";
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
      <NetworkVisual />
      <RouterSection />
      <Lifestyle />
      <Testimonials />
      <CoverageCTA />
      <SupportPreview />
    </>
  );
}