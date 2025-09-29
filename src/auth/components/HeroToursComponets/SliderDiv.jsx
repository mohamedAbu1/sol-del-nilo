"use client";
import { getSliderToursDiv } from "@/lib/constants/FixedTexts";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";

export default function HeroSlider() {
  const t = useTranslations("ToursHeroPage");
  const ToursHeroSlider = getSliderToursDiv(t);

  return (
    <div className="w-full h-[70vh] overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop={true}
        slidesPerView={1}
        centeredSlides={true}
        className="h-full"
      >
        {ToursHeroSlider.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <Image
                src={slide.image}
                fill
                alt="SwiperSlide"
                className="absolute inset-0 w-full h-full object-cover rounded-[28px]"
              />
              <div className="absolute inset-0 flex items-center justify-center text-center px-4 bg-black/40 rounded-[28px]">
                <div className="w-11/12 flex flex-col gap-4 text-white animate-fadeIn items-center">
                  <h1 className="text-[clamp(1.8rem,4vw,3rem)] font-bold capitalize animate-slideUp">
                    {slide.title}
                  </h1>
                  <p className="text-[clamp(1rem,2vw,1.4rem)] animate-slideUp delay-200">
                    {slide.subtitle}
                  </p>
                  <button
                  style={{width:"30%"}}
                    className="px-6 py-6 bg-[#ff9800] rounded-full text-white font-semibold hover:scale-105 transition duration-300 animate-slideUp delay-400"
                  >
                    Live the legend
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
