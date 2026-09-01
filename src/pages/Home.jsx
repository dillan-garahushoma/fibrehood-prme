import React from "react";
import Hero from "@/components/home/Hero";
import QuickActions from "@/components/home/QuickActions";
import ValueProp from "@/components/home/ValueProp";
import FeaturedOffer from "@/components/home/FeaturedOffer";
import HowItWorks from "@/components/home/HowItWorks";
import NetworkVisual from "@/components/home/NetworkVisual";
import PlanPreview from "@/components/home/PlanPreview";
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
      <QuickActions />
      <HowItWorks />
      <ValueProp />
      <FeaturedOffer />
      <NetworkVisual />
      <CoverflowCarousel />
      <PlanPreview />
      <RouterSection />
      <Lifestyle />
      <Testimonials />
      <CoverageCTA />
      <SupportPreview />
    </>
  );
}