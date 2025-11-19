"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { FaHeart, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MdOutlineReviews } from "react-icons/md";
import { BiDollar } from "react-icons/bi";
import { useTripContext } from "@/context/TripContext";
import { motion } from "framer-motion";
export default function SectionThree() {
  const { tours } = useTripContext();
  const t = useTranslations("HomeHeroPage");
  const router = useRouter();

  const [hasMounted, setHasMounted] = useState(false);
  const [topTours, setTopTours] = useState([]);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!Array.isArray(tours)) return;

    const toursWithReviews = tours.filter(
      (tour) => Array.isArray(tour.reviews) && tour.reviews.length > 0
    );

    const sortedTours = toursWithReviews
      .sort((a, b) => b.reviews.length - a.reviews.length)
      .slice(0, 8);

    setTopTours(sortedTours);
  }, [tours]);

  if (!hasMounted) return null;

  return (
    <section
      id="section-three"
      className="w-full min-h-screen py-10 flex flex-col items-center justify-start text-white px-4 sm:py-10 md:py-12 lg:py-0"
    >
      {/* ✅ العنوان */}
      <div className="text-center mb-12 w-full max-w-4xl">
        <h2
          style={{ padding: "15px" }}
          className="text-2xl font-bold text-white uppercase tracking-widest mb-2 mt-4"
        >
          {t("sc2P")}
        </h2>
        <div className="h-1 bg-[#daa60b] dark:bg-yellow-700 rounded-full mb-4 w-full" />
        <h3
          style={{ padding: "15px" }}
          className="text-3xl sm:text-4xl font-bold text-[#daa60b] dark:text-yellow-700 uppercase mb-4"
        >
          {t("sc2Title")}
        </h3>
      </div>

      {/* ✅ شبكة الكروت المتجاوبة */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full max-w-screen-xl">
        {topTours.map((tour, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }} // يبدأ شفاف وتحت
            whileInView={{ opacity: 1, y: 0 }} // يظهر عند دخول الشاشة
            viewport={{ once: true, amount: 0.2 }} // once: يحدث مرة واحدة فقط، amount: يبدأ عند دخول 20% من الكارد
            transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
            className="group relative bg-[#fff] dark:bg-neutral-900 rounded-3xl overflow-hidden shadow-xl hover:shadow-yellow-500/40 transition duration-300"
          >
            {/* صورة الجولة */}
            <div className="relative">
              <Image
                width={400}
                height={200}
                src={
                  tour.image?.[0]?.name
                    ? `/assets/${tour.image[0].name}`
                    : "/assets/default.jpg"
                }
                alt={tour.title}
                loading="lazy"
                placeholder="blur"
                blurDataURL="data:image/webp;base64,..."
                className="w-full h-[320px] object-cover transform group-hover:scale-110 transition duration-700 ease-in-out"
              />
              <div
                style={{ padding: "4px" }}
                className="absolute top-3 left-3 bg-yellow-500 text-gray-700 text-sm font-bold rounded-full shadow-md flex items-center gap-1"
              >
                <BiDollar className="text-gray-500 dark:text-gray-700" />
                {tour.price}
              </div>
              <button className="absolute top-3 right-3 text-yellow-600 text-xl rounded-full p-2 shadow-md hover:scale-110 transition">
                <FaHeart />
              </button>
            </div>

            {/* تفاصيل الجولة */}
            <div className="p-5 flex flex-col justify-between h-[170px] bg-gradient-to-br from-white via-yellow-50 to-yellow-100 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 rounded-b-3xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_20px_rgba(255,255,255,0.05)] backdrop-blur-sm border-t border-yellow-200 dark:border-yellow-800 transition-all duration-300">
              {/* معلومات الجولة */}
              <div className="rounded-md h-9/12 px-2">
                <div style={{padding:"8px"}} className="flex items-center justify-between mb-2 px-2">
                  <p className="text-sm flex items-center gap-2 text-gray-600 dark:text-yellow-300">
                    <FaMapMarkerAlt className="text-yellow-500 dark:text-yellow-400" />
                    <span className="font-medium">{tour.city.name}</span>
                  </p>
                  <p className="text-sm flex items-center gap-2 text-gray-600 dark:text-yellow-300">
                    <MdOutlineReviews className="text-yellow-500 dark:text-yellow-400" />
                    <span>{tour.reviews.length} Reviews</span>
                  </p>
                </div>
                <h4 style={{padding:"8px"}}  className="text-[1.05rem] font-semibold text-gray-800 dark:text-white leading-snug line-clamp-2 tracking-wide mt-3">
                  {tour.title}
                </h4>
              </div>

              {/* التاريخ والزر */}
              <div className="flex items-center justify-between rounded-xl bg-white/70 dark:bg-neutral-800/60 shadow-inner backdrop-blur-md h-3/12 px-3 py-2">
                <div style={{padding:"16px"}} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <FaCalendarAlt className="text-yellow-500 dark:text-yellow-400" />
                  <span>{tour.theDate}</span>
                </div>
                <button
                  onClick={() => router.push(`/tours/${tour.id}`)}
                  style={{padding:"6px"}}
                  className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white dark:text-gray-900 font-semibold rounded-full shadow-lg hover:scale-105 hover:shadow-yellow-400/50 transition-all duration-300 text-sm lg:text-base px-4 py-2"
                >
                  Details →
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
