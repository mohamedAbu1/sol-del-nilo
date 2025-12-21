"use client";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useTripsContext } from "@/context/TripsContext";
import { useTripContext } from "@/context/TripContext";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Image from "next/image";
import { useTheme } from "@mui/material/styles"; // ✅ استدعاء الثيم

const CityCard = ({ city, index, today, router, toursCount }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const pathname = usePathname();
  const muiTheme = useTheme(); // ✅ يجيب الثيم الحالي

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % (city.imges?.length || 1));
    }, 8000);
    return () => clearInterval(interval);
  }, [city.imges]);

  return (
    <div
      key={city.id || index}
      className="group relative rounded-3xl overflow-hidden shadow-xl transition duration-300 cursor-pointer"
      style={{
        backgroundColor: muiTheme.palette.background.paper, // ✅ خلفية الكارد من الثيم
        boxShadow: `0 4px 12px ${muiTheme.palette.primary.main}40`, // ✅ ظل بلون أساسي شفاف
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => {
        sessionStorage.setItem(`scroll-${pathname}`, window.scrollY.toString());
        const query = new URLSearchParams({
          destination: city.name,
          category: "All",
          date: today,
          duration: "All",
          minPrice: "0",
          maxPrice: "1400",
          search: "All",
        }).toString();
        router.push(`/tours?${query}`);
      }}
    >
      <div className="relative w-full h-[350px]">
        <AnimatePresence mode="sync">
          <motion.div
            key={city.imges?.[currentImageIndex] || `city-${index}`}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <Image
              fill
              src={
                city.imges?.[currentImageIndex]
                  ? `/assets/${city.imges[currentImageIndex]}`
                  : "/assets/default.png"
              }
              alt={city.name}
            />
          </motion.div>
        </AnimatePresence>

        {/* ✅ اسم المدينة */}
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
              color: muiTheme.palette.secondary.main, // ✅ النص من الثيم
              textShadow: "2px 2px 6px rgba(0,0,0,0.6)",
            }}
          >
            {city.name}
          </motion.h3>

          {/* ✅ عدد الرحلات */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 0.7, y: -90, scale: 1 }}
                exit={{ opacity: 0, y: 30, scale: 0.95 }}
                transition={{ duration: 0.6, ease: "easeInOut", delay: 0.2 }}
                style={{
                  color: muiTheme.palette.secondary.contrastText, // ✅ اللون الثانوي من الثيم
                  fontSize: "18px",
                  fontWeight: 600,
                }}
              >
                {`${toursCount} TOURS`}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const CitySection = () => {
  const [today, setToday] = useState("2025-01-01");
  useEffect(() => {
    setToday(new Date().toISOString().split("T")[0]);
  }, []);

  const { cities } = useTripsContext();
  const { tours } = useTripContext();
  const t = useTranslations("HomeHeroPage");
  const router = useRouter();
  const muiTheme = useTheme(); // ✅ استدعاء الثيم

  return (
    <section
      id="section-three"
      style={{ marginTop: "30px" }}
      className="w-full min-h-auto py-10 flex flex-col items-center justify-start px-4 sm:py-10 md:py-12 lg:py-0"
    >
      <div className="text-center mb-12 w-full max-w-4xl">
        <h2
          style={{
            padding: "15px",
            color: muiTheme.palette.text.primary, // ✅ النص من الثيم
          }}
          className="text-2xl font-bold uppercase tracking-widest mb-2"
        >
          {t("SCTitle")}
        </h2>
        <div
          className="h-1 rounded-full mb-4 w-full"
          style={{ backgroundColor: muiTheme.palette.primary.main }} // ✅ خط من اللون الأساسي
        />
        <h3
          style={{
            padding: "15px",
            color: muiTheme.palette.secondary.main, // ✅ النص من اللون الثانوي
          }}
          className="text-3xl sm:text-4xl font-bold uppercase"
        >
          {t("SCTitle2")}
        </h3>
      </div>

      {/* ✅ سلايدر المدن */}
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
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        speed={1200}
        loop={true}
        className="w-[90%] flex justify-center items-center"
      >
        {cities.map((city, index) => {
          const toursCount = tours.filter((t) => {
            const destinationName = (
              t.city?.name ||
              t.city ||
              ""
            ).toLowerCase();
            return destinationName.includes(city.name.toLowerCase());
          }).length;

          return (
            <SwiperSlide key={city.id || index}>
              <CityCard
                city={city}
                index={index}
                today={today}
                router={router}
                toursCount={toursCount}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div
        style={{
          marginTop: "20px",
          backgroundColor: muiTheme.palette.primary.main, // ✅ خط سفلي من الثيم
        }}
        className="w-[80%] h-1 rounded-full mb-4"
      />
    </section>
  );
};

export default CitySection;
