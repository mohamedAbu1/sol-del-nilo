"use client";
import React, { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import { supabase } from "@/lib/supabaseClient";
import axios from "axios";

const TourEditContext = createContext();

export const TourEditProvider = ({ children }) => {
  const [formData, setFormData] = useState(null); // بيانات الرحلة الحالية
  const [mainImages, setMainImages] = useState([]);
  const [activityImages, setActivityImages] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState(null);

  // ✅ استخراج الصور بصيغة { name, label }
  const extractImageObjects = (imagesArray) => {
    return imagesArray.map((img) => ({
      name: img.name,
      label: img.label?.trim() || "صورة بدون وصف",
    }));
  };

  // ✅ تعديل الرحلة
  const updateTour = async (tourId, { image, tourimage }) => {
        console.log("🚀 دخلنا فعلاً دالة updateTour");

    if (!formData) {
      toast.error("❌ لا توجد بيانات لتعديلها");
      return false;
    }

    setIsUpdating(true);

    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        DayPeople: `${formData.people}`,
        image,
      };

      console.log("📤 إرسال البيانات إلى API:", payload);

      const response = await axios.patch(`/api/tours/${tourId}`, payload);

      console.log("📡 حالة الاستجابة:", response.status);
      console.log("📡 بيانات الاستجابة:", response.data);

      if (response.status !== 200 && response.status !== 204) {
        toast.error("❌ فشل في تعديل الرحلة");
        return false;
      }

      // حذف الصور القديمة
      const { data: existingImages, error: fetchError } = await supabase
        .from("tourimage")
        .select("id")
        .eq("tourId", tourId);

      if (!fetchError && existingImages.length > 0) {
        await supabase.from("tourimage").delete().eq("tourId", tourId);
      }

      // إدراج الصور الجديدة
      const tourimageWithMeta = tourimage.map((img) => ({
        ...img,
        url: img.name,
        tourId,
        created_at: new Date().toISOString(),
      }));

      const { error: insertError } = await supabase
        .from("tourimage")
        .insert(tourimageWithMeta);

      if (insertError) {
        toast.warn("⚠️ تم تعديل الرحلة لكن فشل حفظ صور الأنشطة");
      } else {
        toast.success("✅ تم تعديل الرحلة والصور بنجاح");
      }

      return true;
    } catch (error) {
      console.error("❌ خطأ أثناء التعديل:", error.message);
      toast.error("❌ حدث خطأ أثناء تعديل الرحلة");
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <TourEditContext.Provider
      value={{
        formData,
        setFormData,
        mainImages,
        setMainImages,
        activityImages,
        setActivityImages,
        updateTour,
        isUpdating,
        updateError,
      }}
    >
      {children}
    </TourEditContext.Provider>
  );
};

export const useTourEdit = () => useContext(TourEditContext);
