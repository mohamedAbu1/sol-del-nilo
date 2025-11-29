"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { FaHeart, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { MdOutlineReviews } from "react-icons/md";
import { BiDollar } from "react-icons/bi";
import { useTripContext } from "@/context/TripContext";
import { motion } from "framer-motion";

// ✅ استدعاء Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules"; // ✅ لازم تستدعيه
import "swiper/css";

export default function SectionThree() {
  const { tours } = useTripContext();
  const t = useTranslations("HomeHeroPage");
  const router = useRouter();
  const pathname = usePathname();

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
      className="w-full min-h-auto py-10 flex flex-col items-center justify-start text-white px-4 sm:py-10 md:py-12 lg:py-0"
    >
      {/* ✅ العنوان */}
      <div
        style={{ paddingBottom: "15px", paddingTop: "15px" }}
        className="text-center mb-12 w-full max-w-4xl"
      >
        <h2 className="text-2xl font-bold text-white uppercase tracking-widest mb-2 mt-4">
          {t("sc2P")}
        </h2>
        <div className="h-1 bg-[#daa60b] dark:bg-yellow-700 rounded-full mb-4 w-full" />
        <h3 className="text-3xl sm:text-4xl font-bold text-[#daa60b] dark:text-yellow-700 uppercase mb-4">
          {t("sc2Title")}
        </h3>
      </div>

      {/* ✅ شبكة الكروت للشاشات الكبيرة */}
      <div className="hidden lg:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full max-w-screen-xl">
        {topTours.map((tour, index) => (
          <TourCard
            key={index}
            tour={tour}
            index={index}
            router={router}
            pathname={pathname}
          />
        ))}
      </div>

      {/* ✅ سليدر للشاشات الصغيرة */}
      <div className="lg:hidden w-full max-w-screen-sm">
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          modules={[Autoplay]} // ✅ هنا لازم تضيفه
          autoplay={{
            delay: 2000, // كل 4 ثواني
            disableOnInteraction: false,
          }}
          speed={1200} // ✅ حركة ناعمة
          loop={true} // ✅ دوران دائري مستمر
          loopFillGroupWithBlank={true}
        >
          {topTours.map((tour, index) => (
            <SwiperSlide
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TourCard
                tour={tour}
                index={index}
                router={router}
                pathname={pathname}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

// ✅ مكون الكارد المعاد استخدامه
function TourCard({ tour, index, router, pathname }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
      className="w-[92%] md:w-full group relative bg-[#fff] dark:bg-neutral-900 rounded-3xl overflow-hidden shadow-xl hover:shadow-yellow-500/40 transition duration-300"
    >
      {/* صورة الجولة */}
      <div className="relative">
        <Image
          width={300}
          height={200}
          src={
            tour.image?.[0]?.name
              ? `/assets/${tour.image[0].name}`
              : "/assets/default.jpg"
          }
          alt={tour.title}
          className="w-full h-[320px] object-cover transform group-hover:scale-110 transition duration-700 ease-in-out"
        />
        <div style={{padding:"5px"}} className="absolute top-3 left-3 bg-yellow-500 text-gray-700 text-sm font-bold rounded-full shadow-md flex items-center gap-1 px-2 py-1">
          <BiDollar className="text-gray-500 dark:text-gray-700" />
          {tour.price}
        </div>
        <button className="absolute top-3 right-3 text-yellow-600 text-xl rounded-full p-2 shadow-md hover:scale-110 transition">
          <FaHeart />
        </button>
      </div>

      {/* تفاصيل الجولة */}
      <div className="p-5 flex flex-col justify-between h-[170px] bg-gradient-to-br from-white via-yellow-50 to-yellow-100 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 rounded-b-3xl shadow backdrop-blur-sm border-t border-yellow-200 dark:border-yellow-800 transition-all duration-300">
        <div className="flex items-center justify-between mb-2">
          <p style={{paddingLeft:"5px"}} className="text-sm flex items-center gap-2 text-gray-600 dark:text-yellow-300">
            <FaMapMarkerAlt className="text-yellow-500 dark:text-yellow-400" />
            <span className="font-medium">{tour.city.name}</span>
          </p>
          <p style={{paddingRight:"5px"}} className="text-sm flex items-center gap-2 text-gray-600 dark:text-yellow-300">
            <MdOutlineReviews className="text-yellow-500 dark:text-yellow-400" />
            <span>{tour.reviews.length} Reviews</span>
          </p>
        </div>
        <h4 style={{padding:"6px"}} className="text-[1.05rem] font-semibold text-gray-800 dark:text-white leading-snug line-clamp-2 tracking-wide mt-3">
          {tour.title}
        </h4>

        <div className="flex items-center justify-between rounded-xl bg-white/70 dark:bg-neutral-800/60 shadow-inner backdrop-blur-md px-3 py-2 mt-3">
          <div style={{paddingLeft:"10px"}} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
            <FaCalendarAlt className="text-yellow-500 dark:text-yellow-400" />
            <span>{tour.theDate}</span>
          </div>
          <button
          style={{padding:"6px"}}
            onClick={() => {
              sessionStorage.setItem(
                `scroll-${pathname}`,
                window.scrollY.toString()
              );
              router.push(`/tours/${tour.id}`);
            }}
            className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white dark:text-gray-900 font-semibold rounded-full shadow-lg hover:scale-105 hover:shadow-yellow-400/50 transition-all duration-300 text-sm px-4 py-2"
          >
            Details →
          </button>
        </div>
      </div>
    </motion.div>
  );
}
