"use client";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { GetTours } from "@/lib/constants/FixedTexts";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useTheme } from "@mui/material/styles"; // ✅ استدعاء الثيم

const SectionFive = () => {
  const t = useTranslations("HomeHeroPage");
  const muiTheme = useTheme(); // ✅ يجيب الثيم الحالي (light/dark)

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
      style={{ padding: "20px" }}
      className="relative w-full h-auto px-4 py-16 overflow-hidden flex flex-col items-center"
    >
      {/* العنوان */}
      <div style={{ marginBottom: "20px" }} className="text-center mb-12 w-full max-w-2xl">
        <span
          className="inline-block text-3xl font-semibold mb-3"
          style={{ color: muiTheme.palette.text.secondary }} // ✅ النص الثانوي من الثيم الجديد (برتقالي)
        >
          {t("sc3P")}
        </span>

        <div
          className="h-1 rounded-full mb-4 w-full"
          style={{ backgroundColor: muiTheme.palette.primary.main }} // ✅ خط برتقالي أساسي من الثيم الجديد
        />

        <h2
          className="text-3xl lg:text-4xl font-bold uppercase"
          style={{ color: muiTheme.palette.text.primary }} // ✅ النص الأساسي أبيض خفيف من الثيم الجديد
        >
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
            <h3
              className="text-2xl font-bold mb-3"
              style={{ color: muiTheme.palette.primary.main }} // ✅ العنوان برتقالي أساسي من الثيم الجديد
            >
              {current.title}
            </h3>

            <p
              className="leading-relaxed"
              style={{ color: muiTheme.palette.text.primary }} // ✅ النص أبيض خفيف من الثيم الجديد
            >
              {current.description}
            </p>

            <button
              style={{
                padding: "5px",
                marginTop: "10px",
                background: `linear-gradient(90deg, ${muiTheme.palette.primary.main}, ${muiTheme.palette.secondary.main})`, // ✅ زر متدرج برتقالي → أبيض خفيف
                color: muiTheme.palette.getContrastText(muiTheme.palette.primary.main),
              }}
              className="mt-6 px-8 py-3 font-semibold rounded-full shadow-lg hover:scale-105 transition"
            >
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
