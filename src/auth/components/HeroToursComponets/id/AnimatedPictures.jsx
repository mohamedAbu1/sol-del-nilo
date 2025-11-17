"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { useTripContext } from "@/context/TripContext";
import { useParams } from "next/navigation";
const AnimatedPictures = () => {
  const { tours } = useTripContext(); // ✅ تعديل هنا
  const params = useParams();
  const tourId = params?.id;

  const tour = tours.find((t) => t.id === tourId); // ✅ تعديل هنا

  const [showGrid, setShowGrid] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowGrid((prev) => !prev);
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    console.log("بيانات الرحلة:", tour);
    console.log("الصور:", tour?.image);
  }, [tour]);

  if (!tour || !Array.isArray(tour.image) || tour.image.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">
        لا توجد صور متاحة لهذه الرحلة.
      </div>
    );
  }
console.log(tour.image)
  return (
    <div
      style={{
        height: "80vh",
        overflow: "hidden",
        position: "relative",
        borderRadius: "20px",
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
          {Array.isArray(tour.image) &&
            tour.image.map((img, index) => (
              <div
                key={index}
                style={{ position: "relative", width: "100%", height: "100%" }}
              >
                <Image
                  src={`/assets/${img.name}`}
                  alt={`Grid ${index}`}
                  fill
                  loading="eager"
                  priority
                  placeholder="blur"
                  blurDataURL="data:image/webp;base64,..."
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
          loopAdditionalSlides={tour.image.length}
          effect="fade"
          slidesPerView={1}
          watchSlidesProgress={true}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          style={{ width: "100%", height: "100%" }}
        >
          {tour.image.map((img, index) => (
            <SwiperSlide key={`${index}-${img.name}`}>
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
                  loading="eager"
                  sizes="100vw"
                />
                <div
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
                  {img.label}
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
