"use client"
import React from "react";
import { Button } from "@/components/ui/button";
import { BiSearch } from "react-icons/bi";
import { AiOutlineLock } from "react-icons/ai";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$
const BtnHero = () => {
  // ? $$$$$$$$$$$$$$$$$$$$$$
  const t = useTranslations("HomeHeroPage");
  // ? $$$$$$$$$$$$$$$$$$$$$$
  const boxVariants = {
    hidden: { opacity: 0, x: +100 },
    visible: { opacity: 1, x: 0 },
  };
  const boxVariants2 = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
  };
  // ? $$$$$$$$$$$$$$$$$$$$$$

  return (
    <div className="divBtnHero">
      <motion.span
        variants={boxVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Button className={"BtnHero1 text-gray-400"}>
          <BiSearch />
          {t("btn1")}
        </Button>
      </motion.span>

      <motion.span
        variants={boxVariants2}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Button className={"BtnHero2"}>
          <AiOutlineLock />
          {t("btn2")}
        </Button>
      </motion.span>
    </div>
  );
};

export default BtnHero;
