"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles"; // ✅ استدعاء الثيم

export default function AddOnTours({
  addons,
  selectedExtras,
  setSelectedExtras,
}) {
  const muiTheme = useTheme(); // ✅ يجيب الثيم الحالي

  const toggleAddOn = (addon) => {
    const exists = selectedExtras.find((a) => a.id === addon.id);
    if (exists) {
      setSelectedExtras(selectedExtras.filter((a) => a.id !== addon.id));
    } else {
      setSelectedExtras([...selectedExtras, addon]);
    }
  };

  return (
    <div style={{ marginBottom: "25px" }} className="w-full mt-10 mb-10">
      <h2
        style={{ marginBottom: "15px" }}
        className="text-2xl font-bold mb-6"
      >
        <span style={{ color: muiTheme.palette.primary.main }}>
          Additional trips you can add
        </span>
      </h2>

      <Swiper
        spaceBetween={20}
        modules={[Autoplay]}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        loop={true}
        speed={900}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 1.2 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {addons.map((addon) => {
          const isSelected = selectedExtras.some((a) => a.id === addon.id);

          const [imgIndex, setImgIndex] = useState(0);

          useEffect(() => {
            if (!addon.image || addon.image.length === 0) return;

            const interval = setInterval(() => {
              setImgIndex((prev) => (prev + 1) % addon.image.length);
            }, 3000);

            return () => clearInterval(interval);
          }, [addon.image]);

          return (
            <SwiperSlide key={addon.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative rounded-xl overflow-hidden shadow-lg cursor-pointer h-[350px]"
                style={{
                  border: `2px solid ${
                    isSelected
                      ? muiTheme.palette.secondary.main
                      : muiTheme.palette.divider
                  }`,
                  backgroundColor: muiTheme.palette.background.paper,
                }}
                onClick={() => toggleAddOn(addon)}
              >
                {/* ✅ الصورة */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={addon.image?.[imgIndex]?.url}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={addon.image?.[imgIndex]?.url}
                      alt={addon.title}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* ✅ طبقة تظليل */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                {/* ✅ المحتوى */}
                <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                  <h3
                    className="text-lg font-semibold mb-2 drop-shadow-lg"
                    style={{ color: muiTheme.palette.common.white }}
                  >
                    {addon.title}
                  </h3>

                  <p
                    className="font-bold text-lg drop-shadow-lg"
                    style={{ color: muiTheme.palette.primary.main }}
                  >
                    ${addon.price}
                  </p>

                  <button
                    className="mt-3 w-full py-2 rounded-md font-semibold transition backdrop-blur-sm"
                    style={{
                      backgroundColor: isSelected
                        ? muiTheme.palette.secondary.main
                        : muiTheme.palette.primary.main,
                      color: muiTheme.palette.getContrastText(
                        isSelected
                          ? muiTheme.palette.secondary.main
                          : muiTheme.palette.primary.main
                      ),
                    }}
                  >
                    {isSelected ? "✓ تمت الإضافة" : "إضافة الرحلة"}
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
