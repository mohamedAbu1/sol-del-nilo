"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useTripContext } from "@/context/TripContext";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@mui/material";

const AnimatedPictures = () => {
  const { tours } = useTripContext();
  const params = useParams();
  const tourId = params?.id;
  const router = useRouter();

  const tour = tours.find((t) => t.id === tourId);
  const [activeIndex, setActiveIndex] = useState(0);

  // ✅ تغيير تلقائي كل 5 ثواني
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) =>
        prevIndex === tour.image.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // مدة التبديل بالمللي ثانية

    return () => clearInterval(interval); // تنظيف عند الخروج
  }, [tour.image.length]);

  useEffect(() => {
    console.log("بيانات الرحلة:", tour);
    console.log("الصور:", tour?.image);
  }, [tour]);

  if (!tour || !Array.isArray(tour.image) || tour.image.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">
        No photos are available for this trip.
      </div>
    );
  }

  return (
    <div
      style={{ paddingTop: "40px" }}
      className="flex flex-col xl:flex-row gap-6 py-10 px-4 md:px-10"
    >
      {/* ✅ الصورة الرئيسية مع أنيميشن */}
      <div
        key={activeIndex}
        className="relative w-full md:w-[85%] h-[500px] rounded-xl overflow-hidden shadow-lg animate-fade-scale"
      >
        <Image
          src={`/assets/${tour.image[activeIndex].name}`}
          alt={tour.image[activeIndex].label || `صورة ${activeIndex}`}
          fill
          priority
          style={{ objectFit: "cover" }}
        />
        {tour.image[activeIndex].label && (
          <div className="absolute bottom-4 left-4 text-white text-2xl font-bold px-4 py-2 rounded">
            {tour.image[activeIndex].label}
          </div>
        )}
      </div>

      {/* ✅ الصور الجانبية المصغرة */}
      <div className="flex xl:flex-col gap-4 overflow-x-auto xl:overflow-y-auto xl:w-[15%]">
        {tour.image.map((img, index) => (
          <div
            key={index}
            className={`relative w-[200px] h-[120px] rounded-lg cursor-pointer border-2 ${
              index === activeIndex ? "border-[#ffc107]" : "border-transparent"
            }`}
            onClick={() => setActiveIndex(index)}
          >
            <Image
              src={`/assets/${img.name}`}
              alt={`Thumbnail ${index}`}
              fill
              style={{ objectFit: "cover", borderRadius: "8px" }}
            />
          </div>
        ))}
        <Button
          className="btn-next-section3"
          style={{
            marginBottom: "10px",
            color: "#000",
            overflow: "hidden",
            scroll: "none",
          }}
          onClick={() => {
            if (tour?.id) {
              router.push(`/tours/${tour.id}/image`);
            }
          }}
        >
          pictures
        </Button>
      </div>

      {/* ✅ تأثيرات CSS */}
      <style jsx>{`
        .animate-fade-scale {
          animation: fadeScale 0.8s ease-in-out;
        }

        @keyframes fadeScale {
          0% {
            opacity: 0;
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default AnimatedPictures;
