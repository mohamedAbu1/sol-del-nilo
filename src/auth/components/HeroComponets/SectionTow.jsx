"use client";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import NextImage from "next/image";
import { useRouter } from "next/navigation";
import { useTripsContext } from "@/context/TripsContext";
import { useTripContext } from "@/context/TripContext";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { usePathname } from "next/navigation";
import { Autoplay } from "swiper/modules";
const animations = [
  {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  },
  {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
  },
  {
    initial: { opacity: 0, scale: 1.2 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  },
  {
    initial: { opacity: 0, rotate: 10 },
    animate: { opacity: 1, rotate: 0 },
    exit: { opacity: 0, rotate: -10 },
  },
];

const CategoryCard = ({ card, today, tours, router, toursCount }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [animIndex, setAnimIndex] = useState(0);
  const [hovered, setHovered] = useState();
  // ✅ تبديل الصور مع أنيميشن
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % (card.imges?.length || 1));
      setAnimIndex(Math.floor(Math.random() * animations.length));
    }, 10000);
    return () => clearInterval(interval);
  }, [card.imges]);
  const pathname = usePathname(); // ✅ هنا عرفنا المتغير

  const anim = animations[animIndex];

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative w-full h-[400px] max-w-[350px] md:max-w-[280px] rounded-[15px] overflow-hidden cursor-pointer
             bg-neutral-900 transform transition-all duration-500
             shadow-[0_8px_15px_rgba(0,0,0,0.3),0_15px_30px_rgba(0,0,0,0.4)]
             hover:shadow-[0_15px_25px_rgba(0,0,0,0.5),0_25px_50px_rgba(0,0,0,0.6)]
             hover:-rotate-x-2 hover:rotate-y-2"
      style={{ perspective: "1200px" }}
      onClick={() => {
        sessionStorage.setItem(`scroll-${pathname}`, window.scrollY.toString());

        const query = new URLSearchParams({
          destination: "ALL",
          category: card.name,
          date: today,
          duration: "All",
          minPrice: "0",
          maxPrice: "1400",
          search: "All",
        }).toString();
        router.push(`/tours?${query}`);
      }}
    >
      {/* ✅ صورة الكارد */}
      <AnimatePresence mode="sync">
        <motion.div
          key={card.imges?.[currentImageIndex]}
          initial={{ ...anim.initial, position: "absolute", inset: 0 }}
          animate={{ ...anim.animate, position: "absolute", inset: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <NextImage
            fill
            src={
              card.imges?.[currentImageIndex]
                ? `/assets/${card.imges[currentImageIndex]}`
                : "/assets/default.png"
            }
            alt={card.name}
            className="object-cover w-full h-full"
          />
        </motion.div>
      </AnimatePresence>

      {/* ✅ طبقة التدرج */}
      <div className="absolute inset-0 bg-gradient-to-t dark:from-black/70 to-transparent z-10" />

      {/* ✅ النص مع الأنيميشن */}
      <div className="absolute inset-0 flex flex-col items-center justify-end z-20">
        {/* العنوان */}
        <motion.h3
          initial={{ y: -20, opacity: 1 }}
          animate={hovered ? { y: -120, opacity: 1 } : { y: -20, opacity: 1 }}
          exit={{ delay: 0.6 }}
          transition={{ type: "spring", stiffness: 120, damping: 15 }}
          className="text-white drop-shadow-lg"
          style={{
            fontSize: "25px",
            fontFamily: "Prata, serif",
            fontWeight: "bold",
            letterSpacing: "0.05em",
            textAlign: "center",
            padding: "4px",
          }}
        >
          {card.name}
        </motion.h3>

        {/* النص مرحبا محمد */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 0.5, y: -90, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              transition={{ duration: 0.6, ease: "easeInOut", delay: 0.2 }} // ✅ تأخير بسيط
              className="text-white text-lg mt-2"
            >
              {`${toursCount} TOURS`}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const SectionTow = () => {
  const { categories } = useTripsContext();
  const { tours } = useTripContext();
  const t = useTranslations("HomeHeroPage");
  const router = useRouter();

  const [today, setToday] = useState("2025-01-01");

  useEffect(() => {
    setToday(new Date().toISOString().split("T")[0]);
  }, []);

  return (
    <section
      id="section-two"
      className="w-full min-h-auto px-4 py-10 flex flex-col items-center justify-start text-white relative"
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

      {/* ✅ سلايدر الوجهات */}
      <Swiper
        spaceBetween={20}
        breakpoints={{
          // الهواتف (أقل من 640px)
          0: {
            slidesPerView: 1,
          },
          // التابلت (من 640px إلى أقل من 1024px)
          640: {
            slidesPerView: 3,
          },
          // اللابتوب وما فوق (1024px وأكبر)
          1024: {
            slidesPerView: 4,
          },
          1400:{
            slidesPerView: 5,
          }
        }}
        modules={[Autoplay]} // ✅ هنا لازم تضيفه
        autoplay={{
          delay: 2000, // كل 4 ثواني
          disableOnInteraction: false,
        }}
        speed={1200} // ✅ حركة ناعمة
        loop={true} // ✅ دوران دائري مستمر
        // loopFillGroupWithBlank={true}
        className="w-[90%] h-1/2 flex justify-center items-center"
      >
        {categories.map((card, index) => {
          const toursCount = tours.filter((t) => {
            const categoryName = t.category?.name || t.category || "";
            return categoryName.toLowerCase() === card.name.toLowerCase();
          }).length;

          return (
            <SwiperSlide key={card.id || index} style={{display:"flex" ,alignItems:"center", justifyContent:"center"}}>
              <CategoryCard
                card={card}
                today={today}
                tours={tours}
                router={router}
                toursCount={toursCount} // ✅ نمرر العدد الصحيح
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default SectionTow;
