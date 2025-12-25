"use client";
import React, { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const TourImagesContext = createContext();

export const TourImagesProvider = ({ children }) => {
  const [mainImages, setMainImages] = useState([]);
  const [activityImages, setActivityImages] = useState([]);

  // ✅ تجهيز الصور للإرسال (تخزين الاسم فقط واستخدامه لاحقًا عبر /assets/اسم-الصورة)
  const prepareImagesForSubmission = () => {

    if (mainImages.length < 4 || mainImages.length > 20) {
      toast.error("❌ يجب اختيار ما بين 4 إلى 12 صورة للرحلة.");
      return null;
    }

    // الصور الرئيسية
    const image = mainImages.map((img) => ({
      name: img.name,
      label: img.label?.trim() || "صورة بدون وصف",
      url: `/assets/${img.name}`, // ✅ المسار المحلي
    }));

    // صور الأنشطة
    const tourimage = activityImages.map((img) => ({
      name: img.name,
      label: img.label?.trim() || "صورة بدون وصف",
      url: `/assets/${img.name}`, // ✅ المسار المحلي
    }));

    const result = { image, tourimage };

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
