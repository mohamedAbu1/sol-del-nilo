"use client";
import React, { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const TourImagesContext = createContext();

export const TourImagesProvider = ({ children }) => {
  const [mainImages, setMainImages] = useState([]);
  const [activityImages, setActivityImages] = useState([]);

  // ✅ استخراج الصور بصيغة { name, label }
  const extractImageObjects = (imagesArray) => {
    console.log("📦 بدء استخراج الصور من المصفوفة:", imagesArray);

    const extracted = imagesArray.map((img, index) => {
      const result = {
        name: img.name,
        label: img.label?.trim() || "صورة بدون وصف",
      };
      console.log(`📸 [${index}] تم استخراج:`, result);
      return result;
    });

    console.log("✅ تم استخراج الصور:", extracted);
    return extracted;
  };

  // ✅ تجهيز الصور للإرسال بدون روابط أو ملفات
  const prepareImagesForSubmission = () => {
    console.log("🚀 بدء تجهيز الصور للإرسال...");
    console.log("🖼️ الصور الرئيسية:", mainImages);
    console.log("🎯 صور الأنشطة:", activityImages);

    if (mainImages.length < 4 || mainImages.length > 12) {
      console.warn("⚠️ عدد الصور الرئيسية غير مناسب:", mainImages.length);
      toast.error("❌ يجب اختيار ما بين 4 إلى 12 صورة للرحلة.");
      return null;
    }

    const image = extractImageObjects(mainImages);
    const tourimage = extractImageObjects(activityImages);

    const result = { image, tourimage };
    console.log("📤 الصور الجاهزة للإرسال:", result);

    return result;
  };

  return (
    <TourImagesContext.Provider
      value={{
        mainImages,
        setMainImages,
        activityImages,
        setActivityImages,
        prepareImagesForSubmission,
      }}
    >
      {children}
    </TourImagesContext.Provider>
  );
};

export const useTourImages = () => useContext(TourImagesContext);
