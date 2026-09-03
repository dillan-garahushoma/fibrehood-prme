import React from "react";
import Hero from "@/components/home/Hero";
import EverydayLife from "@/components/home/EverydayLife";
import ValueProp from "@/components/home/ValueProp";
import FlagshipPlans from "@/components/home/FlagshipPlans";
import HowItWorks from "@/components/home/HowItWorks";
import NetworkVisual from "@/components/home/NetworkVisual";
import CoverflowCarousel from "@/components/ui/CoverflowCarousel";
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
      <FlagshipPlans />
      <HowItWorks />
      <ValueProp />
      <NetworkVisual />
      <CoverflowCarousel />
      <RouterSection />
      <Lifestyle />
      <Testimonials />
      <CoverageCTA />
      <SupportPreview />
    </>
  );
}