import React from "react";
import Hero from "@/components/home/Hero";
import EverydayLife from "@/components/home/EverydayLife";
import ValueProp from "@/components/home/ValueProp";
import FeaturedOffer from "@/components/home/FeaturedOffer";
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
      <CoverflowCarousel />
      <HowItWorks />
      <ValueProp />
      <FeaturedOffer />
      <NetworkVisual />
      <RouterSection />
      <Lifestyle />
      <Testimonials />
      <CoverageCTA />
      <SupportPreview />
    </>
  );
}