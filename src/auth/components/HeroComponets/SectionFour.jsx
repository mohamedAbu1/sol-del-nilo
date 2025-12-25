"use client";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles"; // ✅ استدعاء الثيم

const SectionFour = () => {
  const t = useTranslations("HomeHeroPage");
  const router = useRouter();
  const muiTheme = useTheme(); // ✅ يجيب الثيم الحالي (light/dark)

  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return (
    <section
      id="section-four"
      style={{ marginTop: "15px", paddingBottom: "40px" }}
      className="relative w-full min-h-screen px-4 sm:py-10 md:py-12 lg:py-0 flex flex-col items-center justify-start"
    >
      <div className="w-full max-w-screen-xl flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* ✅ السلايدر مع أنيمشن من الشمال */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full lg:w-1/2 rounded-3xl overflow-hidden shadow-xl"
          style={{
            boxShadow: `0 6px 20px ${muiTheme.palette.primary.main}40`, // ✅ ظل برتقالي من الثيم الجديد
          }}
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            spaceBetween={30}
            slidesPerView={1}
            className="w-full h-full"
          >
            {[
              "/assets/ahmed-shabana-ADa9bb3tqR4-unsplash.webp",
              "/assets/calin-stan-Mv15X2n8JVE-unsplash.webp",
              "/assets/osama-elsayed-BbBiTUnFlxk-unsplash.webp",
              "/assets/osama-elsayed-M7ij157xsOs-unsplash.webp",
              "/assets/alex-azabache-V8zu2yXPFF8-unsplash.webp",
              "/assets/mounir-abdi-q2PA7sfj8z8-unsplash.webp",
              "/assets/chris-andrawes-15wKOQqZNt4-unsplash.webp",
              "/assets/temps-SunriseBalloonFlight_-Colorful-hot-air--balloons….webp",
            ].map((imgSrc, index) => (
              <SwiperSlide key={index}>
                <div className="w-full h-[85vh]">
                  <Image
                    src={imgSrc}
                    fill
                    alt={`Tuya Tours Slide ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    priority={false}
                    placeholder="blur"
                    blurDataURL="data:image/webp;base64,..."
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* ✅ النص مع أنيمشن من اليمين */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full lg:w-1/2 text-start gap-9"
          style={{ paddingLeft: "13px" }}
        >
          <p
            className="text-sm uppercase mb-2 tracking-wide"
            style={{ color: muiTheme.palette.text.secondary }} // ✅ النص الثانوي (برتقالي/رمادي فاتح)
          >
            {t("sc4P")}
          </p>

          <h2
            className="text-3xl lg:text-4xl font-bold mb-4 leading-snug"
            style={{ color: muiTheme.palette.text.primary }} // ✅ النص الأساسي أبيض خفيف
          >
            {t("sc4Title")}
          </h2>

          <p
            className="text-base mb-6 leading-relaxed"
            style={{ color: muiTheme.palette.text.secondary }} // ✅ النصوص الثانوية
          >
            {t("sc3PS")}
            <span
              style={{ color: muiTheme.palette.primary.main, fontWeight: 600 }}
            >
              {t("sc3PS1")}
            </span>
            ,{" "}
            <span
              style={{ color: muiTheme.palette.primary.main, fontWeight: 600 }}
            >
              {t("sc3PS2")}
            </span>{" "}
            {t("sc3PS3")}
            <span
              style={{ color: muiTheme.palette.primary.main, fontWeight: 600 }}
            >
              {t("sc3PS4")}
            </span>
            {t("sc3PS5")}
          </p>

          <button
            onClick={() => router.push("/about")}
            style={{
              background: `linear-gradient(90deg, ${muiTheme.palette.primary.main}, ${muiTheme.palette.secondary.main})`, // ✅ زر متدرج برتقالي → أبيض خفيف
              color: muiTheme.palette.getContrastText(muiTheme.palette.primary.main),
              padding: "10px 20px",
              borderRadius: "8px",
              fontWeight: 600,
              boxShadow: `0 4px 12px ${muiTheme.palette.primary.main}50`,
              transition: "transform 0.3s ease",
            }}
            className="hover:scale-105"
          >
            {t("sc3BTN")}
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default SectionFour;
