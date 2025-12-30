"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation"; // ✅ استدعاء الرواتر

export default function AddOnTours({ addons,name,city, selectedExtras, setSelectedExtras }) {
  const muiTheme = useTheme();
  const router = useRouter(); // ✅

  return (
    <div className="w-full mt-16 mb-16">
      <h2
        className="text-3xl font-extrabold mb-10 text-center tracking-wide"
        style={{ color: muiTheme.palette.primary.main ,paddingBottom:"25px", paddingTop:"25px"}}
      >
        ✨ Other Trips In {city} And {name} ✨
      </h2>

      <Swiper
        spaceBetween={30}
        modules={[Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        speed={1000}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 1.2 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {addons.map((addon) => {
          const [imgIndex, setImgIndex] = useState(0);

          useEffect(() => {
            if (!addon.image || addon.image.length === 0) return;
            const interval = setInterval(() => {
              setImgIndex((prev) => (prev + 1) % addon.image.length);
            }, 4000);
            return () => clearInterval(interval);
          }, [addon.image]);

          return (
            <SwiperSlide key={addon.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative rounded-xl overflow-hidden shadow-lg cursor-pointer h-[280px] group"
                onClick={() => router.push(`/tours/${addon.id}`)} // ✅ التحويل للرحلة
              >
                {/* Background image */}
                <Image
                  src={addon.image?.[0]?.url}
                  alt={addon.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-end opacity-0 group-hover:opacity-100 transition duration-500 backdrop-blur-md bg-black/40 p-5">
                  <h3
                    className="text-lg font-bold mb-2 text-center"
                    style={{ color: muiTheme.palette.common.white }}
                  >
                    {addon.title}
                  </h3>
                  <p
                    className="font-semibold text-md mb-4"
                    style={{ color: muiTheme.palette.primary.main }}
                  >
                    ${addon.price}
                  </p>
                  <button
                    className="px-5 py-2 rounded-lg font-semibold shadow-md w-full"
                    style={{
                      background: `linear-gradient(45deg, ${muiTheme.palette.primary.light}, ${muiTheme.palette.primary.dark})`,
                      color: muiTheme.palette.getContrastText(muiTheme.palette.primary.main),
                    }}
                  >
                    See Trip
                  </button>
                </div>
              </motion.div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
