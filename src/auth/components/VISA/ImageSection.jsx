"use client";
import React from "react";
import Image from "next/image";
import { useScreenSize } from "@/auth/hooks/screenSize";
import { useTranslations } from "next-intl";

const ImageSection = () => {
  const { width, height } = useScreenSize();
  const t = useTranslations("Visa");

  return (
    <section className="relative w-full h-[600px] bg-gradient-to-b from-blue-100 to-white">
      <Image
        src={
          width <= 911
            ? "/assets/Copilot_20250922_151508.png"
            : "/assets/Copilot_20250922_151913.png"
        }
        alt="Egypt Visa Banner"
        fill
        className="object-cover bg-bottom z-0"
        priority
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black/30 z-10" />
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-6 animate-slideUp delay-200">
        <h1 className="text-white text-6xl font-bold tracking-wide animate-pulseSlow">
          {t("VISA")}
        </h1>
        <p className="mt-4 text-white text-2xl font-semibold animate-fadeIn delay-400">
          {t("VISA_P")}
        </p>
      </div>
    </section>
  );
};

export default ImageSection;
