"use client";
import { useTranslations } from "next-intl";
import React, { forwardRef, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTripsContext } from "@/context/TripsContext";
import { useTripContext } from "@/context/TripContext";
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

const SectionTow = forwardRef(() => {
  const { categories } = useTripsContext();
  const t = useTranslations("HomeHeroPage");
  const router = useRouter();
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  const [noToursMessage, setNoToursMessage] = useState("");
  const { tours, setTours } = useTripContext();

  return (
    <section
      id="section-two"
      style={{ marginTop: "10px" }}
      className="w-full min-h-screen px-4 py-10 flex flex-col items-center justify-start text-white relative"
    >
      {/* ✅ العنوان */}
      <div className="text-center mb-12 w-full max-w-4xl">
        <div className="h-1 bg-[#daa60b] dark:bg-yellow-500 rounded-full mb-4 w-full" />
        <h2
          style={{ marginBottom: "15px" }}
          className="text-3xl sm:text-4xl font-bold text-[#daa60b] dark:text-yellow-700 tracking-wide uppercase"
        >
          {t("sc1Title")}
        </h2>
      </div>
      {/* ✅ شبكة الكروت المتجاوبة */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full max-w-7xl flex-wrap">
        {categories.map((card, index) => (
          <div
            key={card.id || index}
            className="relative rounded-3xl overflow-hidden shadow-2xl group hover:shadow-yellow-500/40 transition duration-500"
          >
            <Image
              width={400}
              height={200}
              src={card.img ? `/assets/${card.img}` : "/assets/default.png"}
              alt={card.name}
              className="w-full h-[320px] object-cover transform group-hover:scale-110 transition duration-700 ease-in-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t dark:from-black/70 to-transparent z-10" />
            <div className="absolute bottom-6 left-6 z-20">
              <h3
                style={{ fontSize: "20px", marginBottom: "20px" }}
                className="text-white sm:text-3xl font-bold tracking-wide mb-4 drop-shadow-lg"
              >
                {card.name}
              </h3>
              <button
                className="btn-next-section3"
                onClick={() => {
                  const today = new Date().toISOString().split("T")[0];

                  // ✅ تحقق من وجود رحلات لهذه الفئة
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
                      `Unfortunately, there are currently no trips available for this category."${card.name}"`
                    );
                  }
                }}
              >
                View All →
              </button>
            </div>
          </div>
        ))}
        {noToursMessage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div style={{padding:"20px",}} className="w-[100%] bg-white dark:bg-gray-900 text-center rounded-xl shadow-xl px-6 py-8 max-w-md mx-4">
              <h3 style={{paddingBottom:"10px"}} className="text-xl font-bold text-red-600 dark:text-yellow-400 mb-4">
                {noToursMessage}
              </h3>
              <p style={{paddingBottom:"10px"}} className="text-sm text-gray-600 dark:text-gray-300">
               Try choosing another category or adjusting the filters to get results.
              </p>
              <button
                style={{padding:"10px", cursor:"pointer"}} className="mt-6 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full transition"
                onClick={() => setNoToursMessage("")}
              >
                closing
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
});

export default SectionTow;
