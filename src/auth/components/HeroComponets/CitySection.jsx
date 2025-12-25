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
import { useTheme } from "@mui/material/styles";

const CityCard = ({ city, index, today, router, toursCount }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const pathname = usePathname();
  const muiTheme = useTheme();

  useEffect(() => {
    if (!city.imges || city.imges.length === 0) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % city.imges.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [city.imges]);

  const imageSrc = city.imges?.[currentImageIndex]
    ? `/assets/${city.imges[currentImageIndex]}`
    : "/assets/default.png";

  return (
    <div
      key={city.id || index}
      className="relative w-full h-fit max-w-[350px] md:max-w-[280px] rounded-[15px] overflow-hidden cursor-pointer transform transition-all duration-500"
      style={{
        backgroundColor: muiTheme.palette.background.paper, // خلفية من الثيم الجديد
        boxShadow: `0 8px 15px ${muiTheme.palette.primary.main}40`, // ظل برتقالي من الثيم الجديد
        perspective: "1200px",
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
            key={imageSrc}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <Image
              fill
              src={imageSrc}
              alt={city.name || "City"}
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* اسم المدينة */}
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
              color: muiTheme.palette.primary.main, // برتقالي من الثيم الجديد
              textShadow: `2px 2px 6px ${muiTheme.palette.text.secondary}`, // ظل رمادي/أبيض خفيف من الثيم الجديد
            }}
          >
            {city.name}
          </motion.h3>

          {/* عدد الرحلات */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 0.9, y: -90, scale: 1 }}
                exit={{ opacity: 0, y: 30, scale: 0.95 }}
                transition={{ duration: 0.6, ease: "easeInOut", delay: 0.2 }}
                style={{
                  color: muiTheme.palette.text.primary, // أبيض خفيف من الثيم الجديد
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
  const muiTheme = useTheme();

  return (
    <section
      id="section-three"
      style={{ marginTop: "30px" }}
      className="w-full min-h-auto py-10 flex flex-col items-center justify-start px-4 sm:py-10 md:py-12 lg:py-0"
    >
      <div className="text-center mb-12 w-full max-w-4xl">
        <h2
          style={{ padding: "15px", color: muiTheme.palette.text.primary }} // أبيض خفيف من الثيم الجديد
          className="text-2xl font-bold uppercase tracking-widest mb-2"
        >
          {t("SCTitle")}
        </h2>
        <div
          className="h-1 rounded-full mb-4 w-full"
          style={{ backgroundColor: muiTheme.palette.primary.main }} // برتقالي من الثيم الجديد
        />
        <h3
          style={{ padding: "15px", color: muiTheme.palette.secondary.main }} // رمادي/أبيض خفيف من الثيم الجديد
          className="text-3xl sm:text-4xl font-bold uppercase"
        >
          {t("SCTitle2")}
        </h3>
      </div>

      {/* سلايدر المدن */}
      <Swiper
        spaceBetween={20}
        centeredSlides={true}
        slidesPerView={"auto"}
        breakpoints={{
          0: { spaceBetween: 10 },
          640: { spaceBetween: 15 },
          1024: { spaceBetween: 20 },
        }}
        modules={[Autoplay]}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        speed={1200}
        loop={true}
        className="w-[90%] h-1/2 flex justify-center items-center"
      >
        {cities?.map((city, index) => {
          const toursCount = tours.filter((t) => {
            const destinationName = (
              t.city?.name ||
              t.city ||
              ""
            ).toLowerCase();
            return destinationName.includes(city.name.toLowerCase());
          }).length;

          return (
            <SwiperSlide
              key={city.id || index}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "280px",
              }}
            >
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
          backgroundColor: muiTheme.palette.primary.main, // برتقالي من الثيم الجديد
        }}
        className="w-[80%] h-1 rounded-full mb-4"
      />
    </section>
  );
};

export default CitySection;
