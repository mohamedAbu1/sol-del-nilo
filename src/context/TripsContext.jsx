"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { supabase } from "@/lib/supabaseClient";
import { DOMAIN } from "@/lib/constants/FixedTexts";

const TripsContext = createContext();

export const TripsContextProvider = ({ children }) => {
  const [activeSection, setActiveSection] = useState("home");
  const [newTour, setNewTour] = useState(null);
  const [tourError, setTourError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toursData, setToursData] = useState([]);
  const [tourImages, setTourImages] = useState([]);
  // ?$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
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
  // ?$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [mainImages, setMainImages] = useState([]);
  const [activityImages, setActivityImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [tour, setTour] = useState(null);
  // ?$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

  // ✅ تحميل المدن والتصنيفات
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cityRes, categoryRes] = await Promise.all([
          supabase.from("city").select("*"),
          supabase.from("category").select("*"),
        ]);

        if (cityRes.error || categoryRes.error) {
          throw new Error("فشل في جلب البيانات");
        }

        setCities(cityRes.data);
        setCategories(categoryRes.data);
      } catch (error) {
        toast.error("❌ خطأ في تحميل المدن أو التصنيفات");
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // ✅ تنظيف روابط الصور عند الخروج
  useEffect(() => {
    return () => {
      mainImages.forEach((img) => {
        if (img.url?.startsWith("blob:")) {
          URL.revokeObjectURL(img.url);
        }
      });
    };
  }, [mainImages]);
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

  // ?$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

  // ✅ قواعد التحقق لكل حقل
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

  // ?$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

  // ✅ handleChange الموحد
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

    // ✅ تجهيز الصور الرئيسية
    const formattedImages =
      tour.image?.map((img) => ({
        name: img.name || img,
        label: img.label || "",
      })) || [];


    // ✅ تجهيز صور الأنشطة
    const formattedTourImages =
      tour.tourimage?.map((img) => ({
        id: img.id,
        name: img.name,
        label: img.url || "",
        url: img.url,
      })) || [];

   

    // ✅ تعبئة النموذج الأساسي
    setFormData({
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
    });


    // ✅ توزيع الصور الرئيسية إلى الحالة
    const mainImageObjects = formattedImages.map((img) => ({
      name: img.name,
      label: img.label,
      url: `${DOMAIN}/assets/${img.name}`,
      file: null,
    }));

    setMainImages(mainImageObjects);

    // ✅ توزيع صور الأنشطة إلى الحالة
    const activityImageObjects = formattedTourImages.map((img) => ({
      id: img.id,
      name: img.name,
      label: img.label,
      url: `${DOMAIN}/assets/${img.url}`,
      file: null,
    }));

    setActivityImages(activityImageObjects);
 

    // ✅ تخزين صور الأنشطة الأصلية
    setTourImages(formattedTourImages);


    // ✅ إعادة الصور الرئيسية بصيغة قابلة للعرض
    return mainImageObjects;
  };

  const updateTour = async (
    toursID,
    formData,
    selectedImages,
    selectedImagesList
  ) => {
    try {
      toast.info("📤 جاري تجهيز البيانات...");

      const imageObjects = selectedImages.map((img) => ({
        name: img.name,
        label: img.label,
      }));

      const tourimagePayload = selectedImagesList.map((img) => ({
        name: img.name,
        url: img.url,
        tourId: toursID,
        created_at: new Date().toISOString(),
      }));

      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        DayPeople: `${formData.people}`,
        image: imageObjects,
      };

      const response = await axios.patch(`/api/tours/${toursID}`, payload);
      if (response.status !== 200 && response.status !== 204) {
        toast.error("❌ فشل في حفظ الرحلة");
        return false;
      }
      const { data: existingImages, error: fetchError } = await supabase
        .from("tourimage")
        .select("id")
        .eq("tourId", toursID);

      if (!fetchError && existingImages.length > 0) {
        await supabase.from("tourimage").delete().eq("tourId", toursID);
      }

      const { error: insertError } = await supabase
        .from("tourimage")
        .insert(tourimagePayload);

      if (insertError) {
        toast.warn("⚠️ تم حفظ الرحلة لكن فشل حفظ الصور الجديدة");
      }

      toast.success("✅ تم حفظ الرحلة والصور بنجاح");

      return true;
    } catch (error) {
      console.error("❌ API Error:", error.response?.data || error.message);
      toast.error(
        `❌ ${error.response?.data?.error || "خطأ في الاتصال بـ API"}`
      );
      return false;
    }
  };

  // ?$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

  // ✅ التحقق من صحة النموذج قبل الإرسال
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

    if (mainImages.length < 4 || mainImages.length > 12) {
      toast.error("❌ يجب اختيار ما بين 4 إلى 12 صورة للرحلة.");
      return false;
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
  // ?$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

  // ✅ استخراج الصور بصيغة { name, label }
  const extractImageObjects = (imagesArray) => {
    return imagesArray.map((img) => ({
      name: img.name,
      label: img.label?.trim() || "صورة بدون وصف",
    }));
  };

  // ✅ إرسال بيانات الرحلة
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid()) return;

    setIsSubmitting(true);

    // الصور الرئيسية
    const image = extractImageObjects(mainImages);

    // صور الأنشطة
    const tourimage = extractImageObjects(activityImages);

    // البيانات المرسلة
    const payload = {
      ...formData,
      price: Number(formData.price),
      image,
      tourimage,
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
        console.error(result.error);
      } else {
        toast.success("✅ تم حفظ الرحلة بنجاح");
        setNewTour(result.data || payload);
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
        setMainImages([]);
        setActivityImages([]);
        setTourError(null);
        setNewTour(null);
      }
    } catch (err) {
      toast.error("❌ حدث خطأ غير متوقع");
      setTourError(err);
      console.error(err);
    }

    setIsSubmitting(false);
  };
  // ?$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

  // ✅ إشعار بعد النجاح
  useEffect(() => {
    if (newTour) {
      toast.success("✅ تم إنشاء الرحلة بنجاح");
    }
  }, [newTour]);
  // ?$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

  return (
    <TripsContext.Provider
      value={{
        activeSection,
        setActiveSection,
        formData,
        setFormData,
        cities,
        categories,
        mainImages,
        setMainImages,
        activityImages,
        setActivityImages,
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
        updateTour,
        setTour,
        setSelectedImages,
        setCategories,
        setCities,
      }}
    >
      {children}
    </TripsContext.Provider>
  );
};

export const useTripsContext = () => useContext(TripsContext);
