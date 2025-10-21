"use client";
import React from "react";
import { getHeroText } from "@/lib/constants/FixedTexts";
import { useTranslations } from "next-intl";
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
const TextHero = () => {
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  const t = useTranslations("HomeHeroPage");
  const HeroText = getHeroText(t);
  const sentence = HeroText[0].titel;
  const sentence2 = HeroText[1].titel;
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  return (
    <div className="w-full flex flex-col items-center justify-center gap-6 px-4 py-8">
      <h1 className="text-[clamp(1.5rem,6vw,3.8rem)] font-bold text-[#FF9800] text-center">
        {sentence}
      </h1>
      <p className="text-[clamp(1rem,4vw,2rem)] text-white text-center font-semibold">
        {sentence2}
      </p>
    </div>
  );
};

export default TextHero;
