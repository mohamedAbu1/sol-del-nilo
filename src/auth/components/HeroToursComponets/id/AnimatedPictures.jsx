"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useTripContext } from "@/context/TripContext";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@mui/material";
import { useTheme } from "@mui/material/styles"; // ✅ استدعاء الثيم

const AnimatedPictures = () => {
  const { tours } = useTripContext();
  const params = useParams();
  const tourId = params?.id;
  const router = useRouter();
  const muiTheme = useTheme(); // ✅ يجيب الثيم الحالي

  const tour = tours.find((t) => t.id === tourId);
  const [activeIndex, setActiveIndex] = useState(0);

  // ✅ تغيير تلقائي كل 3 ثواني
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) =>
        prevIndex === tour.image.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [tour.image.length]);

  if (!tour || !Array.isArray(tour.image) || tour.image.length === 0) {
    return (
      <div
        className="text-center py-10"
        style={{ color: muiTheme.palette.text.secondary }} // ✅ النصوص من الثيم
      >
        No photos are available for this trip.
      </div>
    );
  }

  return (
    <div
      style={{ paddingTop: "40px" }}
      className="flex flex-col xl:flex-row gap-6 py-10 px-4 md:px-10"
    >
      {/* ✅ الصورة الرئيسية */}
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
          <div
            className="absolute bottom-4 left-4 text-2xl font-bold px-4 py-2 rounded"
            style={{
              color: muiTheme.palette.common.white, // ✅ النص أبيض من الثيم
           
            }}
          >
            {tour.image[activeIndex].label}
          </div>
        )}
      </div>

      {/* ✅ الصور الجانبية المصغرة */}
      <div className="flex xl:flex-col gap-4 overflow-x-auto xl:overflow-y-auto xl:w-[15%]">
        {tour.image.map((img, index) => (
          <div
            key={index}
            className={`relative w-[200px] h-[120px] rounded-lg cursor-pointer border-2`}
            style={{
              borderColor:
                index === activeIndex
                  ? muiTheme.palette.secondary.main // ✅ اللون الثانوي عند التحديد
                  : "transparent",
            }}
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
          variant="outlined"
          sx={{
            mt: 1,
            color: muiTheme.palette.text.primary, // ✅ النصوص من الثيم
            borderColor: muiTheme.palette.primary.main, // ✅ الحدود من الثيم
            "&:hover": {
              backgroundColor: muiTheme.palette.primary.main,
              color: muiTheme.palette.getContrastText(
                muiTheme.palette.primary.main
              ),
            },
          }}
          onClick={() => {
            if (tour?.id) {
              router.push(`/tours/${tour.id}/image`);
            }
          }}
        >
          Pictures
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
