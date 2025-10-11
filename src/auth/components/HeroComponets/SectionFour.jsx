"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useTranslations } from "next-intl";

const SectionFour = () => {
  const t = useTranslations("HomeHeroPage");

  return (
    <section
      style={{ marginTop: "15px", paddingBottom:'40px' }}
      id="section-four"
      className="relative w-full min-h-screen px-4 sm:py-10 md:py-12 lg:py-0 flex flex-col items-center justify-start text-white"
    >
      {/* ✅ المحتوى الرئيسي */}
      <div className="w-full max-w-screen-xl flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* ✅ السلايدر */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          spaceBetween={30}
          slidesPerView={1}
          className="w-full lg:w-1/2 rounded-3xl overflow-hidden shadow-xl"
        >
          {[
            "/assets/Copilot_20251003_110337.png",
            "/assets/Abu_Simbel.jpg",
            "/assets/Copilot_20251003_105620.png",
          ].map((imgSrc, index) => (
            <SwiperSlide key={index}>
              <div className="w-full h-[85vh]">
                <img
                  src={imgSrc}
                  alt={`Tuya Tours Slide ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* ✅ النص */}
        <div className="w-full lg:w-1/2 text-start gap-9">
          <p
            style={{ marginBottom: "20px" }}
            className="text-sm uppercase text-gray-500 dark:text-gray-300 mb-2 tracking-wide"
          >
            {t("sc4P")}
          </p>
          <h2
            style={{ marginBottom: "20px" }}
            className="text-3xl lg:text-4xl font-bold text-gray-700 dark:text-gray-200 mb-4 leading-snug"
          >
            {t("sc4Title")}
          </h2>
          <p
            style={{ marginBottom: "20px" }}
            className="text-gray-700 dark:text-gray-400 text-base mb-6 leading-relaxed"
          >
            {" "}
            {t("sc3PS")}
            <span className="text-yellow-600 font-semibold">{t("sc3PS1")}</span>
            ,{" "}
            <span className="text-yellow-600 font-semibold">{t("sc3PS2")}</span>{" "}
            {t("sc3PS3")}
            <span className="text-yellow-600 font-semibold">{t("sc3PS4")}</span>
            {t("sc3PS5")}
          </p>

          <button className="btn-next-section6">{t("sc3BTN")}</button>
        </div>
      </div>
    </section>
  );
};

export default SectionFour;
