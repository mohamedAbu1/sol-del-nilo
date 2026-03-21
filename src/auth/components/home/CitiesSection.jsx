"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useCitiesCategories } from "@/context/CitiesCategoriesContext";
import DividerWithIcon from "@/components/layout/DividerWithIcon";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

// دالة لتشفير الكويري
const encodeData = (obj) => btoa(JSON.stringify(obj));

function CityCard({ city, themeName, theme, language, t }) {
  const router = useRouter();
  const cityName =
    city.name?.[language] || city.name?.["en"] || city.name || "";
  const handleExplore = () => {
    const queryObj = {
      city: [cityName],
      category: "all",
      price: "Economy",
      popular: false,
    };
    const encoded = encodeData(queryObj);
    router.push(`/trips?data=${encoded}`);
  };

  return (
    <div className="min-w-[320px] p-4 h-full">
      <div
        className={`
          relative h-100 rounded-2xl overflow-hidden group cursor-pointer
          ${theme.card} ${theme.border} ${theme.shadow}
          transition-all duration-500
          hover:scale-[1.05] hover:shadow-2xl hover:-rotate-1
        `}
      >
        <Image
          src={city.images?.[0] || "/fallback.jpg"}
          alt={cityName || "City image"}
          fill
          className="object-cover rounded-lg"
        />
        <div
          className={`
            absolute inset-0 
            ${theme.overlay}
            flex flex-col items-center justify-end pb-6
          `}
        >
          <p className="text-lg font-bold text-white drop-shadow-lg mb-2">
            {cityName}
          </p>
          <button
            onClick={handleExplore}
            className={`
              opacity-0 group-hover:opacity-100 px-4 py-2 rounded-lg text-sm font-medium transition text-white cursor-pointer
              ${
                themeName === "dark"
                  ? "bg-[#c9a34a] hover:bg-yellow-500"
                  : "bg-[#c9a34a] hover:bg-[#b5892e]"
              }
            `}
          >
            {t("Explore")}
          </button>
        </div>
      </div>
    </div>
  );
}

const CitiesSection = () => {
  const { theme, themeName } = useTheme();
  const { t, i18n } = useTranslation("home");
  const { cities, loading } = useCitiesCategories();
  const normalizedLang = i18n.language.split("-")[0];

  const [x, setX] = useState(0); // للتحكم اليدوي

  if (loading) {
    return <p className="text-center text-gray-500">Loading cities...</p>;
  }

  // كرر المدن مرتين علشان تعمل loop سلس
  const looped = [...cities, ...cities];

  return (
    <section
      className={`
        flex py-12 px-6 flex-col w-full mx-auto relative
         ${
           themeName === "dark"
             ? "bg-[#0f0f0f] text-white"
             : "bg-[#fdf6e3] text-[#3a2c0a]"
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

      {/* ✅ Marquee + Drag + Buttons */}
      <div className="relative overflow-hidden w-full max-w-7xl mx-auto h-[480px]">
        <motion.div
          className="flex h-full"
          animate={{ x }}
          transition={{ type: "spring", stiffness: 100 }}
          drag="x"
          dragConstraints={{ left: -1000, right: 0 }} // حدود السحب
        >
          {looped.map((city, i) => (
            <CityCard
              key={i}
              city={city}
              t={t}
              themeName={themeName}
              theme={theme}
              language={normalizedLang}
            />
          ))}
        </motion.div>

        {/* أزرار التحكم */}
        <div className="absolute inset-y-0 left-0 flex items-center">
          <button
            onClick={() => setX(x + 300)}
            className={`p-2 rounded-full ${
              themeName === "dark"
                ? "bg-[#c9a34a] text-black hover:bg-yellow-500"
                : "bg-[#c9a34a] text-white hover:bg-[#b5892e]"
            }`}
          >
            <FaArrowLeft />
          </button>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center">
          <button
            onClick={() => setX(x - 300)}
            className={`p-2 rounded-full ${
              themeName === "dark"
                ? "bg-[#c9a34a] text-black hover:bg-yellow-500"
                : "bg-[#c9a34a] text-white hover:bg-[#b5892e]"
            }`}
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CitiesSection;
