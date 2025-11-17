"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { supabase } from "@/lib/supabaseClient";
import { DOMAIN } from "@/lib/constants/FixedTexts";
import { useTourImages } from "@/context/TourImagesContext"; // ✅ استدعاء السياق

const TripsContext = createContext();

export const TripsContextProvider = ({ children }) => {
  const [activeSection, setActiveSection] = useState("home");
  const [newTour, setNewTour] = useState(null);
  const [tourError, setTourError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toursData, setToursData] = useState([]);
  const { setMainImages, setActivityImages } = useTourImages();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    TripDuration: "",
    people: "1",
    categoryId: "",
    cityId: "",
    rival: "",
    theDate: "",
    image: [],
    tripprogram: [{ time: "", program: "" }],
    includes: [{ text: "" }],
  });
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tour, setTour] = useState(null);

  const { prepareImagesForSubmission } = useTourImages(); // ✅ استخدام السياق

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cityRes, categoryRes] = await Promise.all([
          supabase.from("city").select("*"),
          supabase.from("category").select("*"),
        ]);
        if (cityRes.error || categoryRes.error)
          throw new Error("فشل في جلب البيانات");
        setCities(cityRes.data);
        setCategories(categoryRes.data);
      } catch (error) {
        toast.error("❌ خطأ في تحميل المدن أو التصنيفات");
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchTours = async () => {
      const { data, error } = await supabase.from("tour").select(`
        id, title, description, price, theDate, TripDuration, DayPeople,
        cityId, rival, categoryId, image, tripprogram(*), includes(*),payments(*),reviews(*),tourimage(*)
      `);
      if (error) {
        toast.error("❌ فشل في تحميل بيانات الرحلات");
        return;
      }
      setToursData(data);
    };
    fetchTours();
  }, []);

  const fieldValidators = {
    price: (value) => {
      if (Number(value) > 5000) {
        toast.error("❌ لا يمكن أن يكون السعر أكبر من 5000 دولار");
        return false;
      }
      return true;
    },
    people: (value) => {
      if (Number(value) < 1) {
        toast.error("❌ عدد الأشخاص يجب أن يكون 1 أو أكثر");
        return false;
      }
      return true;
    },
  };

  const fetchTourById = async (id) => {
    const { data, error } = await supabase
      .from("tour")
      .select(
        `
        id, title, description, price, theDate, TripDuration, rival,
        DayPeople, cityId, categoryId, image, tripprogram(*), includes(*),payments(*),reviews(*),tourimage(*)
      `
      )
      .eq("id", id)
      .single();
    if (error) {
      toast.error("❌ فشل في تحميل بيانات الرحلة");
      return null;
    }
    return data;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (fieldValidators[name]) {
      const isValid = fieldValidators[name](value);
      if (!isValid) return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const populateFormFromTour = (tour) => {
    const [_, peoplePart] = tour.DayPeople?.split("/") || [];

    const formattedImages =
      tour.image?.map((img) => ({
        name: img.name || img,
        label: img.label || "",
      })) || [];

    // const formattedTourImages =
    //   tour.tourimage?.map((img) => ({
    //     id: img.id,
    //     name: img.name,
    //     label: img.label || "",
    //     url: img.url,
    //   })) || [];
    const formattedTourImages =
      tour.tourimage?.map((img) => ({
        id: img.id,
        name: img.name, // ← هذا هو اسم الملف الفعلي
        label: img.label || "", // ← هذا هو الوصف
        url: img.url
      })) || [];
    const formPayload = {
      title: tour.title || "",
      description: tour.description || "",
      price: tour.price?.toString() || "",
      theDate: tour.theDate || "",
      TripDuration: tour.TripDuration || "",
      people: peoplePart?.replace("People", "") || "1",
      cityId: tour.cityId || "",
      categoryId: tour.categoryId || "",
      rival: tour.rival || "",
      image: formattedImages,
      tripprogram:
        tour.tripprogram?.map((item) => ({
          time: item.time || "",
          program: item.program || "",
        })) || [],
      includes:
        tour.includes?.map((item) => ({
          text: item.text || "",
        })) || [],
    };

    setFormData(formPayload);

    const mainImageObjects = formattedImages.map((img) => ({
      name: img.name,
      label: img.label,
      url: `${DOMAIN}/assets/${img.name}`,
      file: null,
    }));

    const activityImageObjects = formattedTourImages.map((img) => ({
      id: img.id,
      name: img.name,
      label: img.label,
      url: `${DOMAIN}/assets/${img.label}`,
      file: null,
    }));

    return {
      mainImages: mainImageObjects,
      activityImages: activityImageObjects,
    };
  };

  const isValid = () => {
    const requiredFields = [
      "title",
      "description",
      "price",
      "TripDuration",
      "people",
      "categoryId",
      "cityId",
      "rival",
      "theDate",
    ];

    for (let field of requiredFields) {
      const value = formData[field];
      if (!value || (typeof value === "string" && value.trim() === "")) {
        toast.error(`❌ الحقل "${field}" مطلوب ولا يمكن تركه فارغًا`);
        return false;
      }
    }

    if (
      !formData.includes ||
      formData.includes.some((item) => !item.text?.trim())
    ) {
      toast.error("❌ جميع بنود المرفقات مطلوبة");
      return false;
    }

    if (
      !formData.tripprogram ||
      formData.tripprogram.some(
        (item) => !item.time?.trim() || !item.program?.trim()
      )
    ) {
      toast.error("❌ جميع بنود البرنامج مطلوبة");
      return false;
    }

    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid()) return;

    const imagesData = prepareImagesForSubmission();
    if (!imagesData) return;

    setIsSubmitting(true);

    const payload = {
      ...formData,
      price: Number(formData.price),
      image: imagesData.image,
      tourimage: imagesData.tourimage,
    };

    try {
      const res = await fetch("/api/tours", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error("❌ فشل حفظ الرحلة");
        setTourError(result.error || "Unknown error");
      } else {
        toast.success("✅ تم حفظ الرحلة بنجاح");
        setNewTour(result.data || payload);

        // ✅ تفريغ الصور بعد الإرسال
        setMainImages([]);
        setActivityImages([]);

        // ✅ إعادة تعيين النموذج
        setFormData({
          title: "",
          description: "",
          price: "",
          TripDuration: "",
          people: "1",
          categoryId: "",
          cityId: "",
          rival: "",
          theDate: "",
          image: [],
          tripprogram: [{ time: "", program: "" }],
          includes: [{ text: "" }],
        });

        setTourError(null);
        setNewTour(null);
      }
    } catch (err) {
      toast.error("❌ حدث خطأ غير متوقع");
      setTourError(err);
    }

    setIsSubmitting(false);
  };

  useEffect(() => {
    if (newTour) {
      toast.success("✅ تم إنشاء الرحلة بنجاح");
    }
  }, [newTour]);
  return (
    <TripsContext.Provider
      value={{
        activeSection,
        setActiveSection,
        formData,
        setFormData,
        cities,
        categories,
        handleChange,
        handleProgramChange: (data) =>
          setFormData((prev) => ({ ...prev, tripprogram: data })),
        handleSubmit,
        isSubmitting,
        newTour,
        tourError,
        toursData,
        fetchTourById,
        populateFormFromTour,
        setTour,
        setCategories,
        setCities,
      }}
    >
      {children}
    </TripsContext.Provider>
  );
};

export const useTripsContext = () => useContext(TripsContext);
