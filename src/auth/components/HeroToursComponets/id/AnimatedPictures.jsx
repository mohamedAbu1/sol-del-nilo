"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const AnimatedPictures = ({ tour }) => {
  const includesTexts = tour.includes?.map((item) => item.text) || [];
  const [showGrid, setShowGrid] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowGrid((prev) => !prev);
    }, 20000); // تبديل كل 20 ثانية

    return () => clearInterval(interval);
  }, []);
  return (
    <div
      style={{
        width: "100vw",
        height: "80vh",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {showGrid ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "10px",
            padding: "20px",
            height: "100%",
            animation: "fadeIn 2s ease-in-out",
          }}
        >
          {tour.image.map((img, index) => (
            <div
              key={index}
              style={{ position: "relative", width: "100%", height: "100%" }}
            >
              <Image
                src={`/assets/${img.name}`}
                alt={`Grid ${index}`}
                fill
                style={{
                  objectFit: "cover",
                  borderRadius: "20px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                }}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          ))}
        </div>
      ) : (
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          loop={true}
          loopAdditionalSlides={tour.length}
          effect="fade"
          slidesPerView={1}
          watchSlidesProgress={true}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          style={{ width: "100%", height: "100%" }}
        >
          {tour.image.map((img, index) => (
            <SwiperSlide key={`${index}-${img}`}>
              <div
                style={{ position: "relative", width: "100%", height: "100%" }}
              >
                <Image
                  src={`/assets/${img.name}`}
                  alt={`Slide ${index}`}
                  fill
                  style={{
                    objectFit: "cover",
                    filter: "brightness(0.8)",
                    animation: "kenburns 8s ease-in-out forwards",
                  }}
                  sizes="100vw"
                />
                <div
                  key={`text-${index}`} // ✅ مفتاح فريد لإعادة بناء النص
                  className="text-animate"
                  style={{
                    position: "absolute",
                    bottom: "10%",
                    left: "5%",
                    color: "#fff",
                    fontSize: "40px",
                    fontWeight: "bold",
                    textShadow: "2px 2px 6px rgba(0,0,0,0.6)",
                    maxWidth: "90%",
                    textTransform: "capitalize",
                    opacity: 0,
                    animation: "fadeSlideIn 3s ease-in-out forwards",
                  }}
                >
                  {img.label}{" "}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* تأثيرات CSS */}
      <style jsx>{`
        @keyframes kenburns {
          0% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fadeSlideIn {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default AnimatedPictures;
