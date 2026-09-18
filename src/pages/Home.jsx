import React from "react";
import Hero from "@/components/home/Hero";
import MoreThanInternet from "@/components/home/MoreThanInternet";
import FibreInstallation from "@/components/home/FibreInstallation";
import HowItWorks from "@/components/home/HowItWorks";
import FeaturedPricing from "@/components/home/FeaturedPricing";

export default function Home() {
  return (
    <>
      <Hero />
      <MoreThanInternet />
      <FeaturedPricing />
      <HowItWorks />
      <FibreInstallation />
    </>
  );
}