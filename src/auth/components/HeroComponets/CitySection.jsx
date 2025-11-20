"use client";
import { useTranslations } from "next-intl";
import { FaHeart, FaMapMarkerAlt } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTripsContext } from "@/context/TripsContext";
import { useState, useEffect } from "react";
import { useTripContext } from "@/context/TripContext";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const CitySection = () => {
  const [noToursCity, setNoToursCity] = useState(null);
  const [today, setToday] = useState("2025-01-01");

  useEffect(() => {
    setToday(new Date().toISOString().split("T")[0]);
  }, []);

  const { cities } = useTripsContext();
  const [shuffledCities, setShuffledCities] = useState([]);

  useEffect(() => {
    if (Array.isArray(cities)) {
      setShuffledCities(cities);
    }
  }, [cities]);

  const { tours } = useTripContext();
  const t = useTranslations("HomeHeroPage");
  const router = useRouter();

  // ✅ Shuffle كل دقيقة (للشاشات الكبيرة فقط)
  const theme = useTheme();
  const isLaptopUp = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    if (!isLaptopUp) return;
    const interval = setInterval(() => {
      setShuffledCities((prev) => {
        const newArr = [...prev];
        for (let i = newArr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
        }
        return newArr;
      });
    }, 40000);
    return () => clearInterval(interval);
  }, [isLaptopUp]);

  // ✅ Variants للأنيمشن على الموبايل
  const mobileImageVariants = {
    hidden: { opacity: 0, rotateY: -90 },
    visible: { opacity: 1, rotateY: 0 },
  };

  // ✅ دالة التحويل عند الضغط على مدينة
  const handleCityClick = (cityName) => {
    const query = new URLSearchParams({
      destination: cityName,   // اسم المدينة
      category: "All",         // جميع الكاتيجوري
      date: today,             // التاريخ الحالي
      duration: "All",         // كل المدد
      minPrice: "0",           // أقل سعر
      maxPrice: "1400",        // أعلى سعر
      search: "All",           // بحث عام
    }).toString();

    router.push(`/tours?${query}`);
  };

  return (
    <section
      id="section-three"
      style={{ marginTop: "30px" }}
      className="w-full min-h-screen py-10 flex flex-col items-center justify-start text-white px-4 sm:py-10 md:py-12 lg:py-0"
    >
      <div className="text-center mb-12 w-full max-w-4xl">
        <h2
          style={{ padding: "15px" }}
          className="text-2xl font-bold text-white uppercase tracking-widest mb-2"
        >
          {t("SCTitle")}
        </h2>
        <div className="h-1 bg-[#daa60b] dark:bg-yellow-700 rounded-full mb-4 w-full" />
        <h3
          style={{ padding: "15px" }}
          className="text-3xl sm:text-4xl font-bold text-[#daa60b] dark:text-yellow-700 uppercase"
        >
          {t("SCTitle2")}
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full max-w-screen-xl">
        {shuffledCities.map((city, index) => {
          if (isLaptopUp) {
            // ✅ أنيمشن للشاشات الكبيرة
            return (
              <motion.div
                key={city.id || index}
                layout
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.2,
                  ease: "easeOut",
                }}
                className="group relative bg-[#fff] dark:bg-neutral-900 rounded-3xl overflow-hidden shadow-xl hover:shadow-yellow-500/40 transition duration-300 cursor-pointer"
                onClick={() => handleCityClick(city.name)} // ✅ التحويل عند الضغط
              >
                <div className="relative">
                  <Image
                    width={400}
                    height={100}
                    src={city.img ? `/assets/${city.img}` : "/assets/default.png"}
                    alt={city.name}
                    loading="lazy"
                    className="w-full h-[350px] object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    style={{ padding: "4px" }}
                    className="absolute flex items-center gap-1.5 top-3 left-3 bg-yellow-500 text-black text-sm font-bold px-3 py-1 rounded-full shadow-md"
                  >
                    <FaMapMarkerAlt className="text-gray-500 dark:text-gray-800" />
                    {city.name}
                  </div>
                  <button className="absolute top-3 right-3 text-yellow-600 text-xl rounded-full p-2 shadow-md hover:scale-110 transition">
                    <FaHeart />
                  </button>
                </div>
              </motion.div>
            );
          }

          // ✅ أنيمشن مختلف للشاشات الصغيرة
          return (
            <motion.div
              key={city.id || index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              variants={mobileImageVariants}
              className="group relative bg-[#fff] dark:bg-neutral-900 rounded-3xl overflow-hidden shadow-xl hover:shadow-yellow-500/40 transition duration-300 cursor-pointer"
              style={{ perspective: "1000px" }}
              onClick={() => handleCityClick(city.name)} // ✅ التحويل عند الضغط
            >
              <motion.img
                src={city.img ? `/assets/${city.img}` : "/assets/default.png"}
                alt={city.name}
                className="w-full h-[350px] object-cover"
                variants={mobileImageVariants}
              />
              <div
                style={{ padding: "4px" }}
                className="absolute flex items-center gap-1.5 top-3 left-3 bg-yellow-500 text-black text-sm font-bold px-3 py-1 rounded-full shadow-md"
              >
                <FaMapMarkerAlt className="text-gray-500 dark:text-gray-800" />
                {city.name}
              </div>
              <button className="absolute top-3 right-3 text-yellow-600 text-xl rounded-full p-2 shadow-md hover:scale-110 transition">
                <FaHeart />
              </button>
            </motion.div>
          );
        })}

        {noToursCity && (
          <div
            style={{ opacity: "0.9" }}
            className="fixed inset-0 bg-black flex items-center justify-center z-50"
          >
            <div
              style={{ padding: "10px" }}
              className="bg-white text-black px-6 py-4 rounded-xl shadow-lg text-xl font-bold"
            >
              There are currently no tours to {noToursCity}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CitySection;
