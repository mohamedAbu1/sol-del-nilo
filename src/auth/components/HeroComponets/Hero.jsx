"use client";
import { useEffect, useState } from "react";
import LinksMidea from "./LinksMidea";
import BtnHero from "./BtnHero";
import TextHero from "./TextHero";
import TravelPlannerForm from "./TravelPlannerForm";

const Hero = ({ showBubble }) => {
  // ✅ منع التفاعل قبل تحميل المتصفح
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <section
      style={{ color: "var(--textLithe)" }}
      className="w-full h-full flex flex-col items-center justify-end md:justify-center gap-5 z-20"
    >
      <TextHero />
      <TravelPlannerForm />
      <BtnHero />
    </section>
  );
};

export default Hero;
