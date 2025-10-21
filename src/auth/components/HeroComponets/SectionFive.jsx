"use client";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { GetTours } from "@/lib/constants/FixedTexts";

const SectionFive = () => {
  const t = useTranslations("HomeHeroPage");

  // ✅ منع التفاعل قبل تحميل المتصفح
  const [hasMounted, setHasMounted] = useState(false);
  const [Car, setCar] = useState([]);

  useEffect(() => {
    setHasMounted(true);
    const tours = GetTours(t);
    setCar(tours || []);
  }, [t]);

  if (!hasMounted) return null;

  return (
    <section
      id="section-five"
      className="relative w-full h-auto px-4 sm:py-10 md:py-12 lg:py-0 overflow-hidden flex flex-col items-center"
    >
      {/* العنوان */}
      <div className="text-center mb-12">
        <span
          style={{ marginBottom: "10px" }}
          className="inline-block text-3xl text-gray-400 dark:text-white font-semibold px-3 py-1 rounded-full mb-3"
        >
          {t("sc3P")}
        </span>
        <h2
          style={{ marginBottom: "15px" }}
          className="text-3xl lg:text-4xl font-bold text-[#daa60b] dark:text-yellow-700 uppercase"
        >
          {t("sc3P")}
        </h2>
      </div>

      {/* ✅ شبكة الكروت المتجاوبة */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-screen-xl">
        {Car.map((tour, index) => (
          <div
            key={index}
            style={{ height: "440px" }}
            className="rounded-2xl overflow-hidden shadow-lg hover:shadow-yellow-500/40 transition duration-300 flex flex-col"
          >
            {/* الصورة */}
            <div className="relative h-[300px] bg-transparent overflow-visible">
              <img
                src={tour.image}
                alt={tour.title}
                className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-[100%] h-auto object-cover z-10 rounded-2xl"
              />
            </div>

            {/* التفاصيل */}
            <div
              style={{ padding: "10px" }}
              className="h-1/2 p-5 flex flex-col justify-between flex-grow"
            >
              <h3 className="text-lg font-bold text-gray-600 dark:text-gray-200 mb-2">
                {tour.title}
              </h3>
              <p
                style={{ fontSize: "15px" }}
                className="text-gray-500 dark:text-gray-400 mb-4"
              >
                {tour.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SectionFive;
