"use client";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import NextImage from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useTripsContext } from "@/context/TripsContext";
import { useTripContext } from "@/context/TripContext";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useTheme } from "@mui/material/styles"; // ✅ استدعاء الثيم

const animations = [
  { initial: { opacity: 0, x: 50 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -50 } },
  { initial: { opacity: 0, y: 50 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -50 } },
  { initial: { opacity: 0, scale: 1.2 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.8 } },
  { initial: { opacity: 0, rotate: 10 }, animate: { opacity: 1, rotate: 0 }, exit: { opacity: 0, rotate: -10 } },
];

const CategoryCard = ({ card, today, router, toursCount, muiTheme }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [animIndex, setAnimIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const pathname = usePathname();
  const anim = animations[animIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % (card.imges?.length || 1));
      setAnimIndex(Math.floor(Math.random() * animations.length));
    }, 10000);
    return () => clearInterval(interval);
  }, [card.imges]);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative w-full h-[400px] max-w-[350px] md:max-w-[280px] rounded-[15px] overflow-hidden cursor-pointer transform transition-all duration-500"
      style={{
        backgroundColor: muiTheme.palette.background.paper, // ✅ خلفية الكارد من الثيم
        boxShadow: `0 8px 15px rgba(0,0,0,0.3), 0 15px 30px rgba(0,0,0,0.4)`,
        perspective: "1200px",
      }}
      onClick={() => {
        sessionStorage.setItem(`scroll-${pathname}`, window.scrollY.toString());
        const query = new URLSearchParams({
          destination: "ALL",
          category: card.name,
          date: today,
          duration: "All",
          minPrice: "0",
          maxPrice: "1400",
          search: "All",
        }).toString();
        router.push(`/tours?${query}`);
      }}
    >
      {/* ✅ صورة الكارد */}
      <AnimatePresence mode="sync">
        <motion.div
          key={card.imges?.[currentImageIndex]}
          initial={{ ...anim.initial, position: "absolute", inset: 0 }}
          animate={{ ...anim.animate, position: "absolute", inset: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <NextImage
            fill
            src={card.imges?.[currentImageIndex] ? `/assets/${card.imges[currentImageIndex]}` : "/assets/default.png"}
            alt={card.name}
            className="object-cover w-full h-full"
          />
        </motion.div>
      </AnimatePresence>

      {/* ✅ طبقة التدرج */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: `linear-gradient(to top, ${muiTheme.palette.background.default}B3, transparent)`, // ✅ تدرج من خلفية الثيم
        }}
      />

      {/* ✅ النص */}
      <div className="absolute inset-0 flex flex-col items-center justify-end z-20">
        <motion.h3
          initial={{ y: -20, opacity: 1 }}
          animate={hovered ? { y: -120, opacity: 1 } : { y: -20, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 15 }}
          style={{
            fontSize: "25px",
            fontFamily: "Prata, serif",
            fontWeight: "bold",
            letterSpacing: "0.05em",
            textAlign: "center",
            padding: "4px",
            color: muiTheme.palette.text.primary, // ✅ النص من الثيم
            textShadow: "2px 2px 6px rgba(0,0,0,0.6)",
          }}
        >
          {card.name}
        </motion.h3>

        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 0.7, y: -90, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              transition={{ duration: 0.6, ease: "easeInOut", delay: 0.2 }}
              style={{ color: muiTheme.palette.secondary.main, fontSize: "18px", fontWeight: 600 }}
            >
              {`${toursCount} TOURS`}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const SectionTow = () => {
  const { categories } = useTripsContext();
  const { tours } = useTripContext();
  const t = useTranslations("HomeHeroPage");
  const router = useRouter();
  const muiTheme = useTheme(); // ✅ استدعاء الثيم

  const [today, setToday] = useState("2025-01-01");
  useEffect(() => {
    setToday(new Date().toISOString().split("T")[0]);
  }, []);

  return (
    <section id="section-two" className="w-full min-h-auto px-4 py-10 flex flex-col items-center justify-start relative">
      {/* ✅ العنوان */}
      <div className="text-center mb-12 w-full max-w-4xl">
        <div className="h-1 rounded-full mb-4 w-full" style={{ backgroundColor: muiTheme.palette.primary.main }} />
        <h2
          style={{
            padding: "15px",
            color: muiTheme.palette.secondary.main, // ✅ النص من اللون الثانوي
          }}
          className="text-3xl sm:text-4xl font-bold tracking-wide uppercase mb-4"
        >
          {t("sc1Title")}
        </h2>
      </div>

      {/* ✅ سلايدر الوجهات */}
      <Swiper
        spaceBetween={20}
        breakpoints={{
          0: { slidesPerView: 1.25 },
          480: { slidesPerView: 1.4 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1400: { slidesPerView: 4 },
        }}
        modules={[Autoplay]}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        speed={1200}
        loop={true}
        className="w-[90%] h-1/2 flex justify-center items-center"
      >
        {categories.map((card, index) => {
          const toursCount = tours.filter((t) => {
            const categoryName = t.category?.name || t.category || "";
            return categoryName.toLowerCase() === card.name.toLowerCase();
          }).length;

          return (
            <SwiperSlide key={card.id || index} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <CategoryCard card={card} today={today} router={router} toursCount={toursCount} muiTheme={muiTheme} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default SectionTow;
