"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { BiSearch } from "react-icons/bi";
import { AiOutlineLock } from "react-icons/ai";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const BtnHero = () => {
  const t = useTranslations("HomeHeroPage");
  const router = useRouter();

  const boxVariants = {
    hidden: { opacity: 0, x: +100 },
    visible: { opacity: 1, x: 0 },
  };
  const boxVariants2 = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
  };

  // ✅ منع التفاعل قبل تحميل المتصفح
  const [hasMounted, setHasMounted] = useState(false);
  const [today, setToday] = useState("2025-01-01");

  useEffect(() => {
    setHasMounted(true);
    setToday(new Date().toISOString().split("T")[0]);
  }, []);

  return (
    <div style={{ marginLeft: "20px" }} className="divBtnHero">
      <motion.span
        variants={boxVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2, duration: 0.5 }}
        onClick={() => {
          const query = new URLSearchParams({
            destination: "All",
            category: "All",
            date: today,
            duration: "5",
            minPrice: "0",
            maxPrice: "14000",
            search: "All",
          }).toString();

          router.push(`/tours?${query}`, { scroll: false, shallow: true });
        }}
      >
        <Button className="BtnHero1 text-gray-400">
          <BiSearch />
          {t("btn1")}
        </Button>
      </motion.span>

      <motion.span
        variants={boxVariants2}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2, duration: 0.5 }}
        onClick={() => router.push("/visaInfo")}
      >
        <Button className="BtnHero2 dark:text-white">
          <AiOutlineLock />
          {t("btn2")}
        </Button>
      </motion.span>
    </div>
  );
};

export default BtnHero;
