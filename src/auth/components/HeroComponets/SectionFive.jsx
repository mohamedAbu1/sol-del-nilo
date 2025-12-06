"use client";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { GetTours } from "@/lib/constants/FixedTexts";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const SectionFive = () => {
  const t = useTranslations("HomeHeroPage");

  const [hasMounted, setHasMounted] = useState(false);
  const [Car, setCar] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setHasMounted(true);
    const tours = GetTours(t);
    setCar(tours || []);
  }, [t]);

  // ✅ تغيير الكارد كل 6 ثواني
  useEffect(() => {
    if (Car.length === 0) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % Car.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [Car]);

  if (!hasMounted || Car.length === 0) return null;

  const current = Car[index];

  return (
    <section
      id="section-five"
      style={{padding:"20px"}}
      className="relative w-full h-auto px-4 py-16 overflow-hidden flex flex-col items-center"
    >
      {/* العنوان */}
      <div style={{marginBottom:"20px"}} className="text-center mb-12 w-full max-w-2xl">
        <span className="inline-block text-3xl text-gray-400 dark:text-white font-semibold mb-3">
          {t("sc3P")}
        </span>

        <div className="h-1 bg-[#daa60b] dark:bg-yellow-700 rounded-full mb-4 w-full" />

        <h2 className="text-3xl lg:text-4xl font-bold text-[#daa60b] dark:text-yellow-700 uppercase">
          {t("sc3P")}
        </h2>
      </div>

      {/* ✅ الكارد المتغير */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="flex flex-col md:flex-row items-center justify-between gap-10 mt-10 w-full max-w-5xl"
        >
          {/* ✅ الصورة اليسار */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="w-[260px] md:w-[380px]"
          >
            <Image
              src={current.image}
              alt={current.title}
              width={500}
              height={500}
              className="object-contain"
            />
          </motion.div>

          {/* ✅ النص */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="text-center max-w-md"
          >
            <h3 className="text-2xl font-bold mb-3 text-[#daa60b] dark:text-yellow-500">
              {current.title}
            </h3>

            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {current.description}
            </p>

            <button style={{padding:"5px", marginTop:'10px'}} className="mt-6 px-8 py-3 bg-gradient-to-r from-yellow-500 via-white to-yellow-500 text-black font-semibold rounded-full shadow-lg hover:scale-105 transition">
              {t("sc3BTN") || "Book Now"}
            </button>
          </motion.div>

          {/* ✅ الصورة اليمين (انعكاس) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="w-[260px] md:w-[380px]"
          >
            <Image
              src={current.image}
              alt={current.title}
              width={500}
              height={500}
              className="object-contain scale-x-[-1]"
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default SectionFive;
