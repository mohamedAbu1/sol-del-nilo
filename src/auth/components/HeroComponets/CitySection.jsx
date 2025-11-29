"use client";
import { useTranslations } from "next-intl";
import { FaHeart, FaMapMarkerAlt } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTripsContext } from "@/context/TripsContext";
import { useState, useEffect } from "react";
import { useTripContext } from "@/context/TripContext";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { usePathname } from "next/navigation";
const CityCard = ({ city, index, today, router, toursCount }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const pathname = usePathname(); // ✅ هنا عرفنا المتغير
  console.log(toursCount);
  // ✅ تبديل الصور داخل الكارد كل 8 ثواني
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % (city.imges?.length || 1));
    }, 8000);
    return () => clearInterval(interval);
  }, [city.imges]);

  return (
    <div
      key={city.id || index}
      className="group relative bg-[#fff] dark:bg-neutral-900 rounded-3xl overflow-hidden shadow-xl hover:shadow-yellow-500/40 transition duration-300 cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => {
        sessionStorage.setItem(`scroll-${pathname}`, window.scrollY.toString());
        const query = new URLSearchParams({
          destination: city.name,
          category: "All",
          date: today,
          duration: "All",
          minPrice: "0",
          maxPrice: "1400",
          search: "All",
        }).toString();
        router.push(`/tours?${query}`);
      }}
    >
      <div className="relative w-full h-[350px]">
        <AnimatePresence mode="sync">
          <motion.div
            key={city.imges?.[currentImageIndex]}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <Image
              fill
              src={
                city.imges?.[currentImageIndex]
                  ? `/assets/${city.imges[currentImageIndex]}`
                  : "/assets/default.png"
              }
              alt={city.name}
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
            />
          </motion.div>
        </AnimatePresence>

        {/* ✅ اسم المدينة */}

        {/* ✅ زر القلب */}
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
            {city.name}
          </motion.h3>

          {/* النص مرحبا محمد */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 0.7, y: -90, scale: 1 }}
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
    </div>
  );
};

const CitySection = () => {
  const [today, setToday] = useState("2025-01-01");
  useEffect(() => {
    setToday(new Date().toISOString().split("T")[0]);
  }, []);

  const { cities } = useTripsContext();
  const { tours } = useTripContext();
  const t = useTranslations("HomeHeroPage");
  const router = useRouter();

  return (
    <section
      id="section-three"
      style={{ marginTop: "30px" }}
      className="w-full min-h-auto py-10 flex flex-col items-center justify-start text-white px-4 sm:py-10 md:py-12 lg:py-0"
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

      {/* ✅ سلايدر المدن */}
      <Swiper
        modules={Autoplay}
        spaceBetween={20}
        slidesPerView={1}
        centeredSlides={true}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        autoplay={{
          delay: 2000, // كل 4 ثواني
          disableOnInteraction: false,
        }}
        speed={1200} // ✅ حركة ناعمة
        loop={true} // ✅ دوران دائري مستمر
        loopFillGroupWithBlank={true}
        className="w-[90%] h-1/2 flex justify-center items-center"
      >
        {cities.map((city, index) => {
          console.log("City:", city.name);
          tours.forEach((t) => {
            console.log("Tour destination:", t.destination);
          });
          const toursCount = tours.filter((t) => {
            const destinationName = (
              t.city?.name ||
              t.city ||
              ""
            ).toLowerCase();
            return destinationName.includes(city.name.toLowerCase());
          }).length;

          return (
            <SwiperSlide key={city.id || index}>
              <CityCard
                city={city}
                index={index}
                today={today}
                router={router}
                toursCount={toursCount}
              />
            </SwiperSlide>
          );
        })}
        <div
          style={{ marginTop: "60px" }}
          className="h-1 bg-[#daa60b] dark:bg-yellow-700 rounded-full mb-4 w-full"
        />
      </Swiper>
    </section>
  );
};

export default CitySection;
