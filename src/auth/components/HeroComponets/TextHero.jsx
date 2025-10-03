"use client";
import React from "react";
import { getHeroText } from "@/lib/constants/FixedTexts";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const TextHero = () => {
  const t = useTranslations("HomeHeroPage");
  const HeroText = getHeroText(t);
  const sentence = HeroText[0].titel;
  const sentence2 = HeroText[1].titel;
  const sentence3 = t("p");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const letter = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-6 px-4 py-8 text-center">
      <motion.h1
        variants={container}
        initial="hidden"
        animate="visible"
        className="text-[clamp(1.8rem,6vw,4rem)] font-bold text-[#FF9800] flex flex-wrap justify-center gap-[2px]"
      >
        {sentence.split("").map((char, index) => (
          <motion.span
            key={index}
            variants={letter}
            transition={{ delay: index * 0.05, duration: 0.4 }}
          >
            {char}
          </motion.span>
        ))}
      </motion.h1>

      <motion.h3
        variants={container}
        initial="hidden"
        animate="visible"
        transition={{ delay: 1 }}
        className="text-[clamp(1.1rem,4vw,2.5rem)] text-white font-semibold flex flex-wrap justify-center gap-[2px]"
      >
        {sentence2.split("").map((char, index) => (
          <motion.span
            key={index}
            variants={letter}
            transition={{ delay: index * 0.05, duration: 0.4 }}
          >
            {char}
          </motion.span>
        ))}
      </motion.h3>

      <motion.p
        variants={container}
        initial="hidden"
        animate="visible"
        className="text-white text-[clamp(1rem,2.5vw,1.3rem)] max-w-2xl capitalize leading-relaxed"
      >
        {sentence3.split("").map((char, index) => (
          <motion.span
            key={index}
            variants={letter}
            transition={{ delay: index * 0.03, duration: 0.4 }}
          >
            {char}
          </motion.span>
        ))}
      </motion.p>
    </div>
  );
};

export default TextHero;
