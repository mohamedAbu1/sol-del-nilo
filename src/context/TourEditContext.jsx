"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { supabase } from "@/lib/supabaseClient";
import axios from "axios";
import { useTripsContext } from "./TripsContext";
import { useTourImages } from "@/context/TourImagesContext";
import { DOMAIN } from "@/lib/constants/FixedTexts";

const TourEditContext = createContext();

export const TourEditProvider = ({ children }) => {
  const {
    prepareImagesForSubmission,
    setMainImages,
    activityImages,
    setActivityImages,
  } = useTourImages();

  const [formData, setFormData] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState(null);
  const [isLoadingTour, setIsLoadingTour] = useState(false);
  const [toursID, setToursID] = useState("");

  const { fetchTourById, populateFormFromTour, setTour } = useTripsContext();

  // تحميل بيانات الرحلة عند اختيار ID
  useEffect(() => {
    if (!toursID) return;

    const loadData = async () => {
      const data = await fetchTourById(toursID);
      if (!data) return;
      setTour(data);

      const { mainImages: loadedMain, activityImages: loadedActivity } =
        populateFormFromTour(data);

      setMainImages(loadedMain);
      setActivityImages(loadedActivity);

      const [_, peoplePart] = data.DayPeople?.split("/") || [];
      setFormData({
        title: data.title || "",
        description: data.description || "",
        price: data.price?.toString() || "",
        TripDuration: data.TripDuration || "",
        people: peoplePart || "1",
        categoryId: data.categoryId || "",
        cityId: data.cityId || "",
        rival: data.rival || "",
        theDate: data.theDate || "",
        image: data.image || [],
        tripprogram: data.tripprogram || [],
        includes: data.includes || [],
      });
    };

    loadData();
  }, [toursID]);

  // اختيار الرحلة
  const handleSelect = (e) => {
    setToursID(e.target.value);
  };

  // تعديل الحقول
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // تجهيز الصور للإرسال
  const extractImageObjects = (imagesArray) =>
    imagesArray.map((img) => ({
      name: img.name,
      label: img.label?.trim() || "صورة بدون وصف",
    }));

  // تنفيذ التعديل
  const handleUpdate = async (e) => {
    if (e && e.preventDefault) e.preventDefault();

    if (!toursID) {
      toast.error("❌ يجب اختيار رحلة لتحديثها");
      return;
    }

    if (!formData) {
      toast.error("❌ لا توجد بيانات لتعديلها");
      console.warn("formData is invalid:", formData);
      return;
    }

    const imagesData = prepareImagesForSubmission();
    if (!imagesData) return;

    setIsUpdating(true);

    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        DayPeople: `${formData.people}`,
        image: imagesData.image,
      };

      const response = await axios.patch(`/api/tours/${toursID}`, payload);

      if (response.status !== 200 && response.status !== 204) {
        toast.error("❌ فشل في تعديل الرحلة");
        return false;
      }

      // حذف الصور القديمة أولًا
      const { data: existingImages, error: fetchError } = await supabase
        .from("tourimage")
        .select("id")
        .eq("tourId", toursID);

      if (existingImages?.length > 0) {
        const { error: deleteError } = await supabase
          .from("tourimage")
          .delete()
          .eq("tourId", toursID);

        if (deleteError) {
          console.warn("⚠️ فشل حذف الصور القديمة:", deleteError);
        } else {
        }
      }

      // إدراج الصور الجديدة
      const tourimageWithMeta = imagesData.tourimage.map((img) => ({
        name: img.name, // اسم الملف
        label: img.label, // الوصف
        url: `/assets/${img.name}`, // المسار المحلي

        tourId: toursID,
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
      toast.error("❌ حدث خطأ أثناء تعديل الرحلة");
      setUpdateError(error.message);
      console.error("updateTour error:", error);
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
        handleChange,
        isLoadingTour,
        setActivityImages,
        extractImageObjects,
        handleUpdate,
        isUpdating,
        updateError,
        handleSelect,
        toursID,
      }}
    >
      {children}
    </TourEditContext.Provider>
  );
};

export const useTourEdit = () => useContext(TourEditContext);
