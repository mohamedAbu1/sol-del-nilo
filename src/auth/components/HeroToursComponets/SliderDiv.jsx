"use client";
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
import { getSliderToursDiv } from "@/lib/constants/FixedTexts";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
export default function HeroSlider() {
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  const t = useTranslations("ToursHeroPage");
  const ToursHeroSlider = getSliderToursDiv(t);
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

  return (
    <div className="w-full h-2/4 overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop={true}
        slidesPerView={1}
        centeredSlides={true}
        className="h-2/4"
      >
        {ToursHeroSlider.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative PhotoContainer">
              <Image
                src={slide.image}
                fill
                alt="SwiperSlide"
                className="absolute inset-0 w-full h-full object-cover rounded-[28px]"
              />
              <div className="absolute inset-0 flex items-center justify-center flex-col gap-4 text-white bg-black/30 rounded-[28px]">
                <h1 className="text-4xl font-bold capitalize">{slide.title}</h1>
                <p className="text-lg">{slide.subtitle}</p>
                <button style={{padding:"8px", cursor:"pointer", background:"#ff9800"}} className="rounded-full text-white font-semibold hover:scale-100 transition">
                  Live the legend
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
