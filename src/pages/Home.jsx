import React from "react";
import Hero from "@/components/home/Hero";
import EverydayLife from "@/components/home/EverydayLife";
import ValueProp from "@/components/home/ValueProp";
import ClientPortal from "@/components/home/ClientPortal";
import ConnectionJourney from "@/components/home/ConnectionJourney";
import FeaturedPricing from "@/components/home/FeaturedPricing";
import Testimonials from "@/components/home/Testimonials";
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
      <Testimonials />
      <SupportPreview />
    </>
  );
}