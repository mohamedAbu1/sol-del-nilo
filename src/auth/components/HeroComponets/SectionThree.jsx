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
          // loopFillGroupWithBlank={true}
        >
          {topTours.map((tour, index) => (
            <SwiperSlide
              key={index}
              breakpoints={{
                0: { slidesPerView: 1.25 }, // ⭐ يظهر كارد + جزء من الكارد التالي
                480: { slidesPerView: 1.4 }, // ⭐ أفضل للهواتف الكبيرة
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1400: { slidesPerView: 4 },
              }}
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
      className="relative w-full h-[400px] rounded-xl overflow-hidden shadow-lg border border-neutral-800 group"
    >
      {/* ✅ الصورة كخلفية للكارد بالكامل + تأثير الاقتراب */}
      <Image
        src={
          tour.image?.[0]?.name
            ? `/assets/${tour.image[0].name}`
            : "/assets/default.jpg"
        }
        alt={tour.title}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />

      {/* ✅ طبقة تعتيم لتحسين وضوح النص */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* ✅ المحتوى فوق الصورة بالكامل */}
      <div className="absolute inset-0 z-20 flex flex-col justify-between p-4">
        {/* ✅ السعر | المدينة | المراجعات */}
        <div
          style={{ padding: "10px", marginTop: "215px" }}
          className="flex items-center gap-3 text-gray-200 text-sm"
        >
          <span className="font-bold text-yellow-500 px-2 py-1 rounded">
            ${tour.price}
          </span>

          <span className="text-gray-200 flex items-center gap-1 px-2 py-1 rounded">
            <FaMapMarkerAlt className="text-yellow-500" />
            {tour.city.name}
          </span>

          <span className="flex items-center gap-1 text-gray-200 px-2 py-1 rounded">
            ⭐ {tour.reviews.length} Review
          </span>
        </div>

        {/* ✅ العنوان + التاريخ + الزر */}
        <div
          style={{ padding: "10px" }}
          className="flex flex-col gap-3 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-3 rounded-xl"
        >
          {/* ✅ العنوان */}
          <h4 className="text-lg font-semibold text-white leading-snug line-clamp-2">
            {tour.title}
          </h4>

          {/* ✅ التاريخ */}
          <p className="text-gray-200 text-sm flex items-center gap-2">
            <FaCalendarAlt className="text-yellow-500" />
            {tour.theDate}
          </p>

          {/* ✅ زر VIEW TOUR */}
          <button
            onClick={() => {
              sessionStorage.setItem(
                `scroll-${pathname}`,
                window.scrollY.toString()
              );
              router.push(`/tours/${tour.id}`);
            }}
            style={{ padding: "5px", cursor: "pointer" }}
            className="bg-yellow-500 text-neutral-900 font-semibold rounded-md px-4 py-2 text-sm hover:bg-yellow-600 transition"
          >
            VIEW TOUR
          </button>
        </div>
      </div>
    </motion.div>
  );
}
