"use client";
import React, { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const TourImagesContext = createContext();

export const TourImagesProvider = ({ children }) => {
  const [mainImages, setMainImages] = useState([]);
  const [activityImages, setActivityImages] = useState([]);

  // ✅ استخراج الصور بصيغة { name, label }
  const extractImageObjects = (imagesArray) => {
    return imagesArray.map((img) => ({
      name: img.name,
      label: img.label?.trim() || "صورة بدون وصف",
    }));
  };

  // ✅ تجهيز الصور للإرسال
  const prepareImagesForSubmission = () => {
    if (mainImages.length < 4 || mainImages.length > 12) {
      toast.error("❌ يجب اختيار ما بين 4 إلى 12 صورة للرحلة.");
      return null;
    }

    const image = extractImageObjects(mainImages);
    const tourimage = activityImages.map((img) => ({
      name: img.name,
      label: img.label?.trim() || "صورة بدون وصف",
    }));

    return { image, tourimage };
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
