"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useTripContext } from "@/context/TripContext";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useTheme } from "@mui/material/styles";

export default function SectionThree() {
  const { tours } = useTripContext();
  const t = useTranslations("HomeHeroPage");
  const router = useRouter();
  const pathname = usePathname();
  const muiTheme = useTheme();

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
      className="w-full min-h-auto py-10 flex flex-col items-center justify-start px-4 sm:py-10 md:py-12 lg:py-0"
      style={{ color: muiTheme.palette.text.primary }} // ✅ النصوص الأساسية أبيض خفيف من الثيم الجديد
    >
      {/* ✅ العنوان */}
      <div className="text-center mb-12 w-full max-w-4xl" style={{ padding: "15px 0" }}>
        <h2
          className="text-lg sm:text-xl font-semibold tracking-widest mb-2"
          style={{ color: muiTheme.palette.text.secondary }} // ✅ النصوص الثانوية (برتقالي/رمادي فاتح)
        >
          {t("sc2P")}
        </h2>
        <div
          className="h-1 w-full mx-auto mb-4 rounded-full"
          style={{ backgroundColor: muiTheme.palette.primary.main }} // ✅ خط برتقالي أساسي
        />
        <h3
          className="text-3xl sm:text-4xl font-bold uppercase mb-6"
          style={{ color: muiTheme.palette.primary.main }} // ✅ العنوان بالبرتقالي الأساسي
        >
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
            muiTheme={muiTheme}
          />
        ))}
      </div>

      {/* ✅ سليدر للشاشات الصغيرة */}
      <div className="lg:hidden w-full max-w-screen-sm">
        <Swiper
          spaceBetween={20}
          centeredSlides={true}
          slidesPerView={"auto"}
          modules={[Autoplay]}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          speed={1000}
          loop={true}
          className="w-[90%] flex justify-center items-center"
        >
          {topTours.map((tour, index) => (
            <SwiperSlide
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "280px",
              }}
            >
              <TourCard
                tour={tour}
                index={index}
                router={router}
                pathname={pathname}
                muiTheme={muiTheme}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

// ✅ مكون الكارد
function TourCard({ tour, index, router, pathname, muiTheme }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
      className="relative w-full h-[420px] rounded-xl overflow-hidden shadow-lg border group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
      style={{ borderColor: muiTheme.palette.divider }} // ✅ الحدود من الثيم الجديد
    >
      {/* ✅ الصورة */}
      <Image
        src={tour.image?.[0]?.name ? `/assets/${tour.image[0].name}` : "/assets/default.jpg"}
        alt={tour.title}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />

      {/* ✅ طبقة تعتيم */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10" />

      {/* ✅ المحتوى */}
      <div style={{paddingLeft:"8px"}} className="absolute inset-0 z-20 flex flex-col justify-between p-4">
        {/* ✅ السعر | المدينة | المراجعات */}
        <div style={{marginTop:"auto", marginBottom:"20px"}} className="flex items-center gap-3 text-sm mt-[215px] px-2">
          <span className="font-bold px-2 py-1 rounded" style={{ color: muiTheme.palette.primary.contrastText }}>
            ${tour.price}
          </span>

          <span className="flex items-center gap-1 px-2 py-1 rounded" style={{ color: muiTheme.palette.primary.contrastText }}>
            <FaMapMarkerAlt style={{ color: muiTheme.palette.primary.main }} /> {/* ✅ أيقونة بالبرتقالي الأساسي */}
            {tour.city.name}
          </span>

          <span className="flex items-center gap-1 px-2 py-1 rounded" style={{ color: muiTheme.palette.primary.contrastText }}>
            ⭐ {tour.reviews.length} Review
          </span>
        </div>

        {/* ✅ العنوان + التاريخ + الزر */}
        <div style={{marginBottom:"8px"}} className="flex flex-col gap-3 p-3 rounded-xl">
          <h4 className="text-lg font-semibold leading-snug line-clamp-2" style={{ color: muiTheme.palette.primary.main }}>
            {tour.title}
          </h4>

          <p className="text-sm flex items-center gap-2" style={{ color: muiTheme.palette.primary.contrastText }}>
            <FaCalendarAlt style={{ color: muiTheme.palette.primary.main }} /> {/* ✅ أيقونة بالبرتقالي الأساسي */}
            {tour.theDate}
          </p>

          <button
            onClick={() => {
              sessionStorage.setItem(`scroll-${pathname}`, window.scrollY.toString());
              router.push(`/tours/${tour.id}`);
            }}
            className="font-semibold rounded-md text-sm px-4 py-2 transition-all duration-300 hover:shadow-lg"
            style={{
              margin:"auto",
              width:"80%",
              padding:"8px",
              cursor: "pointer",
              background: `linear-gradient(135deg, ${muiTheme.palette.primary.main}, ${muiTheme.palette.secondary.main})`, // ✅ زر متدرج برتقالي → أبيض خفيف
              color: muiTheme.palette.getContrastText(muiTheme.palette.primary.main),
            }}
          >
            VIEW TOUR
          </button>
        </div>
      </div>
    </motion.div>
  );
}
