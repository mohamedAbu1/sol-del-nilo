"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useCitiesCategories } from "@/context/CitiesCategoriesContext";
import DividerWithIcon from "@/components/layout/DividerWithIcon";
import { useRouter } from "next/navigation";

// دالة لتشفير الكويري
const encodeData = (obj) => btoa(JSON.stringify(obj));

function CityCard({ city, themeName, language }) {
  const [imgIndex, setImgIndex] = useState(0);
  const router = useRouter();
  const cityName =
    city.name?.[language] || city.name?.["en"] || city.name || "";

  // ✅ أنيميشن لتغيير الصور كل 4 ثواني
  useEffect(() => {
    const interval = setInterval(() => {
      setImgIndex((prev) => (prev + 1) % (city.images?.length || 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [city.images]);

  const handleExplore = () => {
    const queryObj = {
      city: city.id,
      category: "",
      price: "Economy",
      popular: false,
    };
    const encoded = encodeData(queryObj);
    router.push(`/trips?data=${encoded}`);
  };

  return (
    <div
      onClick={handleExplore}
      className={`relative rounded-2xl overflow-hidden group cursor-pointer h-[360px]
        transition-all duration-500 hover:scale-[1.06] hover:shadow-2xl
        ${
          themeName === "dark"
            ? "bg-[#1a1a1a] border border-gold/20 shadow-lg"
            : "bg-[#F5F5F5] border border-[#c9a34a]/30 shadow-md"
        }
      `}
    >
      <AnimatePresence mode="sync">
        <motion.div
          key={imgIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <Image
            src={
              city.images?.[imgIndex]?.startsWith("/")
                ? city.images[imgIndex]
                : city.images?.[imgIndex]?.startsWith("http")
                  ? city.images[imgIndex]
                  : "/fallback.jpg"
            }
            alt={cityName}
            fill
            className="object-cover rounded-lg"
          />
        </motion.div>
      </AnimatePresence>

      <div
        className={`absolute inset-0 bg-gradient-to-t ${
          themeName === "dark" ? "from-black/60" : "from-[#fdf6e3]/70"
        } via-transparent to-transparent flex items-end justify-center pb-4`}
      >
        <p
          className={`text-lg font-bold tracking-wide drop-shadow-lg ${
            themeName === "dark" ? "text-white" : "text-[#3a2c0a]"
          }`}
        >
          {cityName}
        </p>
      </div>
    </div>
  );
}

const CitiesSection = () => {
  const { themeName } = useTheme();
  const { t, i18n } = useTranslation("home");
  const { cities, loading } = useCitiesCategories();

  if (loading) {
    return <p className="text-center text-gray-500">Loading cities...</p>;
  }

  // كرر المدن مرتين علشان تعمل loop سلس
  const looped = [...cities, ...cities];

  return (
    <section
      className={`flex py-12 px-6 flex-col w-full mx-auto relative
         ${
           themeName === "dark"
             ? "bg-[#0f0f0f] text-white"
             : "bg-[#F5F5F5] text-[#3a2c0a]"
         }
      `}
    >
      <div className="max-w-2xl mx-auto mb-16 w-full">
        <h2
          className={`
            text-5xl font-extrabold tracking-wide drop-shadow-md text-center
            ${
              themeName === "dark"
                ? "text-gold"
                : "bg-gradient-to-r from-[#c9a34a] to-[#eab308] bg-clip-text text-transparent"
            }
          `}
        >
          {t("ExploreCities")}
        </h2>
        <DividerWithIcon />
      </div>

      {/* ✅ Auto Slider + Draggable */}
      <div className="relative overflow-hidden w-full max-w-7xl mx-auto h-[410px]">
        <motion.div
          className="flex h-full"
          drag="x"
          dragConstraints={{ left: -looped.length * 220, right: 0 }}
          whileTap={{ cursor: "grabbing" }}
          animate={{ x: ["0%", "-100%"] }}
          transition={{
            duration: 25,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {looped.map((city, i) => (
            <div
              key={i}
              className="min-w-[65%] sm:min-w-[40%] md:min-w-[33.33%] lg:min-w-[20%] p-3"
            >
              <CityCard
                city={city}
                themeName={themeName}
                language={i18n.language}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CitiesSection;
