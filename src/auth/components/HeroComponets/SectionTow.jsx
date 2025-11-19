"use client";
import { useTranslations } from "next-intl";
import React, { forwardRef, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTripsContext } from "@/context/TripsContext";
import { useTripContext } from "@/context/TripContext";
import { motion } from "framer-motion";
const SectionTow = forwardRef(() => {
  const { categories } = useTripsContext();
  const { tours } = useTripContext();
  const t = useTranslations("HomeHeroPage");
  const router = useRouter();

  const [hasMounted, setHasMounted] = useState(false);
  const [today, setToday] = useState("2025-01-01");
  const [noToursMessage, setNoToursMessage] = useState("");
  const [shuffledCategories, setShuffledCategories] = useState([]);

  useEffect(() => {
    setToday(new Date().toISOString().split("T")[0]);
    setShuffledCategories(categories);
  }, [categories]);
  useEffect(() => {
    setHasMounted(true);
    setToday(new Date().toISOString().split("T")[0]);
  }, []);

  // if (!hasMounted) return null;
  // ✅ Shuffle كل دقيقة
  useEffect(() => {
    const interval = setInterval(() => {
      setShuffledCategories((prev) => {
        const newArr = [...prev];
        for (let i = newArr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
        }
        return newArr;
      });
    }, 20000); // كل دقيقة

    return () => clearInterval(interval);
  }, []);
  return (
    <section
      id="section-two"
      // style={{ marginTop: "10px" }}
      className="w-full min-h-screen px-4 py-10 flex flex-col items-center justify-start text-white relative"
    >
      {/* ✅ العنوان */}
      <div className="text-center mb-12 w-full max-w-4xl">
        <div className="h-1 bg-[#daa60b] dark:bg-yellow-500 rounded-full mb-4 w-full" />
        <h2
          style={{ padding: "15px" }}
          className="text-3xl sm:text-4xl font-bold text-[#daa60b] dark:text-yellow-700 tracking-wide uppercase mb-4"
        >
          {t("sc1Title")}
        </h2>
      </div>

      {/* ✅ شبكة الكروت المتجاوبة */}
      <div className="container flex flex-row flex-wrap gap-4">
        {shuffledCategories.map((card, index) => (
          <motion.div
            key={card.id || index}
            layout
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
            className="
    relative 
    w-full sm:w-[48%] md:w-[31%] lg:w-[23%] 
    rounded-3xl overflow-hidden shadow-2xl 
    group hover:shadow-yellow-500/40 
    transition duration-500
  "
          >
            <Image
              width={400}
              height={200}
              src={card.img ? `/assets/${card.img}` : "/assets/default.png"}
              alt={card.name}
              className="w-full h-[280px] sm:h-[300px] md:h-[320px] object-cover transform group-hover:scale-110 transition duration-700 ease-in-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t dark:from-black/70 to-transparent z-10" />
            <div className="absolute bottom-6 left-6 z-20">
              <h3 className="text-white sm:text-3xl font-bold tracking-wide mb-4 drop-shadow-lg text-[20px]">
                {card.name}
              </h3>
              <button
                className="btn-next-section3"
                onClick={() => {
                  const hasTours = tours.some((t) => {
                    const category = t.category?.name || t.category || "";
                    return category.toLowerCase() === card.name.toLowerCase();
                  });

                  if (hasTours) {
                    const query = new URLSearchParams({
                      destination: "All",
                      category: card.name,
                      date: today,
                      duration: "5",
                      minPrice: "0",
                      maxPrice: "14000",
                      search: "All",
                    }).toString();

                    router.push(`/tours?${query}`);
                  } else {
                    setNoToursMessage(
                      `Unfortunately, there are currently no trips available for this category: "${card.name}"`
                    );
                  }
                }}
              >
                View All →
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
});

export default SectionTow;
