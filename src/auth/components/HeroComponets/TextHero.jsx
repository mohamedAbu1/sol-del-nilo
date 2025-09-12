"use client";
// ? $$$$$$$$$$$$$$$$$$$$$$$$
import React from "react";
import { getHeroText } from "@/lib/constants/FixedTexts";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
 const TextHero = () => {

  // ? $$$$$$$$$$$$$$$$$$$$$$
  const t = useTranslations("HomeHeroPage");
  const HeroText = getHeroText(t);
  const sentence = HeroText[0].titel;
  const sentence2 = HeroText[1].titel;
  const sentence3 = t("p");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  const letter = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  // ? $$$$$$$$$$$$$$$$$$$$$$
  return (
    <>
      <motion.h1
        variants={container}
        initial="hidden"
        animate="visible"
        style={{color:"#FF9800"}}
        className="titleHero text-5xl h1 lg:text-7xl xl:text-8xl text-center flex gap-1 h1"
        
      >
        {sentence.split("").map((char, index) => (
          <motion.span
            key={index}
            variants={letter}
            transition={{ delay: index * 0.2, duration: 0.5 }}
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
        className="titleHero2 text-2xl text-white p lg:text-4xl text-center "
      >
        {sentence2.split("").map((char, index) => (
          <motion.span
            key={index}
            variants={letter}
            transition={{ delay: index * 0.2, duration: 0.5 }}
          >
            {char}
          </motion.span>
        ))}
      </motion.h3>
      <motion.p
        variants={container}
        initial="hidden"
        animate="visible"
        style={{textTransform:"capitalize", textAlign:"center"}}
        className="titleHero3 text-white md:w-1/2"
      >
        {sentence3.split("").map((char, index) => (
          <motion.span
            key={index}
            variants={letter}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            {char}
          </motion.span>
        ))}
      </motion.p>
    </>
  );
};

export default TextHero;
