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
const SectionFour = () => {
  const t = useTranslations("HomeHeroPage");
  const router = useRouter();

  // ✅ منع التفاعل قبل تحميل المتصفح
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return (
    <section
      id="section-four"
      style={{ marginTop: "15px", paddingBottom: "40px" }}
      className="relative w-full min-h-screen px-4 sm:py-10 md:py-12 lg:py-0 flex flex-col items-center justify-start text-white"
    >
      <div className="w-full max-w-screen-xl flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* ✅ السلايدر مع أنيمشن من الشمال */}
        <motion.div
          initial={{ opacity: 0, x: -100 }} // يبدأ خارج الشاشة من الشمال
          whileInView={{ opacity: 1, x: 0 }} // يدخل لمكانه الطبيعي
          viewport={{ once: true, amount: 0.2 }} // يحدث مرة واحدة فقط عند دخول 20% من العنصر
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full lg:w-1/2 rounded-3xl overflow-hidden shadow-xl"
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
              "/assets/Copilot_20251003_110337.webp",
              "/assets/Abu_Simbel.webp",
              "/assets/Copilot_20251003_105620.webp",
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
          initial={{ opacity: 0, x: 100 }} // يبدأ خارج الشاشة من اليمين
          whileInView={{ opacity: 1, x: 0 }} // يدخل لمكانه الطبيعي
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full lg:w-1/2 text-start gap-9"
          style={{paddingLeft:"13px"}}
        >
          <p className="text-sm uppercase text-gray-500 dark:text-gray-300 mb-2 tracking-wide">
            {t("sc4P")}
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-700 dark:text-gray-200 mb-4 leading-snug">
            {t("sc4Title")}
          </h2>
          <p className="text-gray-700 dark:text-gray-400 text-base mb-6 leading-relaxed">
            {t("sc3PS")}
            <span className="text-yellow-600 font-semibold">{t("sc3PS1")}</span>
            ,{" "}
            <span className="text-yellow-600 font-semibold">{t("sc3PS2")}</span>{" "}
            {t("sc3PS3")}
            <span className="text-yellow-600 font-semibold">{t("sc3PS4")}</span>
            {t("sc3PS5")}
          </p>

          <button
            className="btn-next-section6"
            onClick={() => router.push("/about")}
          >
            {t("sc3BTN")}
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default SectionFour;
