"use client";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import { useTheme } from "@/context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useCitiesCategories } from "@/context/CitiesCategoriesContext";
import DividerWithIcon from "@/components/layout/DividerWithIcon";
import { useRouter } from "next/navigation";

// دالة لتشفير الكويري
const encodeData = (obj) => btoa(JSON.stringify(obj));

// دالة لتحسين الصور من Supabase
const optimize = (url) => {
  if (!url) return "/fallback.jpg";
  if (!url.startsWith("http")) return url;
  return `${url}?width=600&quality=70&format=webp`;
};

function CategoryCard({ cat, theme, themeName, language, isMobile }) {
  const [imgIndex, setImgIndex] = useState(0);
  const router = useRouter();
  const cardRef = useRef(null);
  const [visible, setVisible] = useState(false);

  // Lazy load عبر Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setVisible(true);
      },
      { threshold: 0.2 },
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  // تغيير الصور فقط عندما يكون الكارد ظاهر وفي الشاشات الكبيرة
  useEffect(() => {
    if (!visible || isMobile) return;
    const interval = setInterval(() => {
      setImgIndex((prev) => (prev + 1) % (cat.images?.length || 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [visible, cat.images, isMobile]);

  const displayName =
    typeof cat.name === "object"
      ? cat.name?.[language] || cat.name?.en || cat.name
      : cat.name;

  const handleClick = () => {
    const queryObj = {
      city: "all",
      category: [displayName],
      price: "Economy",
      popular: false,
    };
    router.push(`/trips?data=${encodeData(queryObj)}`);
  };

  return (
    <div
      ref={cardRef}
      onClick={handleClick}
      className={`relative rounded-2xl overflow-hidden group cursor-pointer min-w-[320px] lg:min-w-[250px] p-4 h-full
        transition-all duration-500 hover:scale-[1.06] hover:shadow-2xl
      ${theme.card} ${theme.border} ${theme.shadow}
      `}
    >
      <AnimatePresence mode="sync">
        {visible && (
          <motion.div
            key={isMobile ? 0 : imgIndex} // في الموبايل دايمًا الصورة الأولى
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <Image
              src={optimize(cat.images?.[isMobile ? 0 : imgIndex])}
              alt={displayName}
              fill
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover rounded-lg"
            />
          </motion.div>
        )}
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
          {displayName}
        </p>
      </div>
    </div>
  );
}

const CategoriesSection = () => {
  const { theme, themeName } = useTheme();
  const { t, i18n } = useTranslation("home");
  const { categories, loading } = useCitiesCategories();

  const normalizedLang = i18n.language.split("-")[0];
  const original = categories;
  const looped = [...original, ...original, ...original]; // للتكرار واللانهاية

  const cardWidth = 290;
  const middleIndex = original.length; // نبدأ من منتصف النسخة

  const [index, setIndex] = useState(middleIndex);
  const [isMobile, setIsMobile] = useState(false);

  // تحديد إذا الشاشة موبايل
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

// حركة تلقائية (loop)
useEffect(() => {
  const interval = setInterval(() => {
    setIndex((prev) => prev + 1);
  }, isMobile ? 4000 : 3000); // ممكن تخلي الموبايل أبطأ شوية
  return () => clearInterval(interval);
}, [isMobile]);


// إعادة ضبط عند الوصول للنهاية
useEffect(() => {
  if (index >= original.length * 2) {
    // نرجع للمنتصف علشان يبان وكأنه مستمر
    setIndex(original.length);
  }
}, [index, original.length]);


  if (loading) {
    return <p className="text-center text-gray-500">Loading categories...</p>;
  }

  return (
    <section
      className={`flex flex-col py-24 px-6 w-full mx-auto relative transition-colors duration-500
        ${
          themeName === "dark"
            ? "bg-[#0f0f0f] text-white"
            : "bg-[#fdf6e3] text-[#3a2c0a]"
        }
      `}
    >
      <div className="max-w-7xl mx-auto mb-10 text-start">
        <h2
          className={`text-5xl font-extrabold tracking-wide drop-shadow-md text-left
            ${
              themeName === "dark"
                ? "text-gold"
                : "bg-gradient-to-r from-[#c9a34a] to-[#eab308] bg-clip-text text-transparent"
            }
          `}
        >
          {t("ExploreCategories")}
        </h2>
        <p className="mt-4 text-lg opacity-80 text-start">{t("Discover")}</p>
        <DividerWithIcon />
      </div>

      <div className="relative overflow-hidden w-full max-w-7xl mx-auto h-[480px]">
        <motion.div
          className="flex h-full cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: -looped.length * cardWidth, right: 0 }}
          animate={isMobile ? {} : { x: -index * cardWidth }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          onDragEnd={(event, info) => {
            const offset = info.offset.x;
            const newIndex = index - Math.round(offset / cardWidth);
            setIndex(newIndex);
          }}
        >
          {looped.map((cat, i) => (
            <div
              key={i}
              className={`p-3 ${
                isMobile
                  ? "w-[100%] flex justify-center"
                  : "min-w-[50%] sm:min-w-[50%] md:min-w-[33.33%] lg:min-w-[20%]"
              }`}
            >
              <CategoryCard
                cat={cat}
                themeName={themeName}
                language={normalizedLang}
                theme={theme}
                isMobile={isMobile}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CategoriesSection;
