"use client";
import React, { useEffect, useState } from "react";
import { getHeroText } from "@/lib/constants/FixedTexts";
import { useTranslations } from "next-intl";
import { useTheme } from "@mui/material/styles"; // ✅ استدعاء الثيم

const TextHero = () => {
  const t = useTranslations("HomeHeroPage");
  const muiTheme = useTheme(); // ✅ يجيب الثيم الحالي (light/dark)

  const [hasMounted, setHasMounted] = useState(false);
  const [sentence, setSentence] = useState("");
  const [sentence2, setSentence2] = useState("");

  useEffect(() => {
    setHasMounted(true);
    const HeroText = getHeroText(t);
    setSentence(HeroText?.[0]?.titel || "");
    setSentence2(HeroText?.[1]?.titel || "");
  }, [t]);

  if (!hasMounted) return null;

  return (
    <div className="w-full flex flex-col items-center justify-center gap-6 px-4 py-8">
      <h1
        className="text-[clamp(1.5rem,6vw,3.8rem)] font-bold text-center"
        style={{
          color: muiTheme.palette.primary.main, // ✅ العنوان بالبرتقالي الأساسي من الثيم الجديد
          // textShadow: `2px 2px 6px ${muiTheme.palette.background.default}`, // ✅ ظل من الخلفية السوداء
        }}
      >
        {sentence}
      </h1>
      <p
        className="text-[clamp(1rem,4vw,2rem)] text-center font-semibold"
        style={{
          color: muiTheme.palette.text.primary,    // ✅ النص الأساسي أبيض خفيف من الثيم الجديد
          opacity: 0.85,
        }}
      >
        {sentence2}
      </p>
    </div>
  );
};

export default TextHero;
