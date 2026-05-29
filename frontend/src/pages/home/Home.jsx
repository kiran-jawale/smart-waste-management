import React from "react";
import HeroSection from "./parts/HeroSection";
import WhatWhySection from "./parts/WhatWhySection";
import HowToUseSection from "./parts/HowToUseSection";
import WasteTypesSection from "./parts/WasteTypesSection";
import { content } from "../../constants/content";

const Home = () => {
  const { whatWhy } = content.home;

  return (
    <div className="flex flex-col">
      <HeroSection />
      <WhatWhySection
        title={whatWhy.title}
        what={whatWhy.what}
        why={whatWhy.why}
      />
      <HowToUseSection />
      <WasteTypesSection />
    </div>
  );
};

export default Home;
