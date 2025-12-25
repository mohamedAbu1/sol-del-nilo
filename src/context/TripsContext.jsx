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
  const { mainImages, setMainImages, activityImages, setActivityImages } =
    useTourImages();
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
    tripprogram: [{ day: 1, time: "", program: "" }], // ✅ هنا
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

    // ✅ تجهيز الصور
    const formattedImages =
      tour.image?.map((img) => ({
        name: img.name || img,
        label: img.label || "",
      })) || [];

    const formattedTourImages = (tour.tourimage || [])
      .filter(
        (img, idx, self) => idx === self.findIndex((t) => t.name === img.name)
      )
      .map((img) => ({
        id: img.id,
        name: img.name,
        label: img.label || "",
        url: img.url,
      }));

    // ✅ تجهيز برنامج الرحلة بناءً على TripDuration
    let tripprogramPayload = [];
    if (tour.tripprogram && tour.tripprogram.length > 0) {
      if (Number(tour.TripDuration) > 1) {
        // لو أكتر من يوم → نجمع البرامج حسب اليوم
        tripprogramPayload = tour.tripprogram.reduce((acc, item) => {
          let dayObj = acc.find((d) => d.day === item.day);
          if (!dayObj) {
            dayObj = { day: item.day, programs: [] };
            acc.push(dayObj);
          }
          dayObj.programs.push({
            time: item.time || "",
            program: item.program || "",
          });
          return acc;
        }, []);
      } else {
        // لو يوم واحد → مصفوفة بسيطة
        tripprogramPayload = tour.tripprogram.map((item) => ({
          time: item.time || "",
          program: item.program || "",
        }));
      }
    } else {
      // لو مفيش بيانات → أنشئ عناصر فارغة بعدد الأيام
      const duration = Number(tour.TripDuration) || 1;
      if (duration > 1) {
        tripprogramPayload = Array.from({ length: duration }, (_, i) => ({
          day: i + 1,
          programs: [],
        }));
      } else {
        tripprogramPayload = [{ time: "", program: "" }];
      }
    }

    // ✅ تجهيز المرفقات
    const includesPayload = (tour.includes || [])
      .filter(
        (inc, idx, self) => idx === self.findIndex((t) => t.text === inc.text)
      )
      .map((item) => ({ text: item.text || "" }));

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
      tripprogram: tripprogramPayload, // ✅ هنا البرنامج جاهز
      includes: includesPayload,
    };

    setFormData(() => formPayload);
    // ✅ تجهيز الصور للعرض
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
      url: `${DOMAIN}/assets/${img.name}`,
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
      formData.includes.some((item, idx) => {
        const invalid = !item.text?.trim();
       
        return invalid;
      })
    ) {
      toast.error("❌ جميع بنود المرفقات مطلوبة");
      return false;
    }

    // ✅ التحقق من برنامج الرحلة
    if (!formData.tripprogram || formData.tripprogram.length === 0) {
      toast.error("❌ يجب إضافة برنامج الرحلة");
      return false;
    }

    if (Number(formData.TripDuration) <= 1) {
      // ✅ برنامج يوم واحد
      const invalid = formData.tripprogram.some(
        (item) => !item.time?.trim() || !item.program?.trim()
      );
      if (invalid) {
        toast.error("❌ جميع بنود البرنامج مطلوبة");
        return false;
      }
    } else {
      // ✅ برنامج عدة أيام
      const invalid = formData.tripprogram.some((dayObj) =>
        dayObj.programs.some((p) => !p.time?.trim() || !p.program?.trim())
      );
      if (invalid) {
        toast.error("❌ جميع بنود البرنامج مطلوبة");
        return false;
      }
    }
    return true;
  };

  // ✅ إنشاء رحلة جديدة
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!isValid()) return;

    const imagesData = prepareImagesForSubmission();
    if (!imagesData) return;

    setIsSubmitting(true);

    try {
      // ✅ تجهيز الصور الرئيسية
      const uploadedMainImages = imagesData.image.map((img) => ({
        name: img.name,
        label: img.label,
        url: `/assets/${img.name}`,
      }));

      // ✅ إدخال بيانات الرحلة الأساسية في جدول tour
      const { data: newTour, error } = await supabase
        .from("tour")
        .insert([
          {
            title: formData.title,
            description: formData.description,
            price: Number(formData.price),
            TripDuration: formData.TripDuration,
            DayPeople: `${formData.people}`,
            cityId: formData.cityId,
            categoryId: formData.categoryId,
            rival: formData.rival,
            theDate: formData.theDate,
            image: uploadedMainImages,
          },
        ])
        .select()
        .single();

      if (error) throw error;
    
      // ✅ إدخال صور النشاطات في جدول tourimage
      const tourimageData = imagesData.tourimage
        .filter(
          (img, idx, self) => idx === self.findIndex((t) => t.name === img.name)
        )
        .map((img) => ({
          name: img.name,
          label: img.label,
          url: `/assets/${img.name}`,
          tourId: newTour.id, // ✅ استخدم newTour.id هنا
          created_at: new Date().toISOString(),
        }));

      if (tourimageData.length > 0) {
        await supabase.from("tourimage").insert(tourimageData);
      }

      // ✅ إدخال includes في جدول includes
      const includesData = formData.includes.map((inc) => ({
        text: inc.text,
        tourId: newTour.id,
      }));
      if (includesData.length > 0) {
        await supabase.from("includes").insert(includesData);
      }

      // ✅ إدخال tripprogram في جدول tripprogram
      const tripprogramData = formData.tripprogram.flatMap((dayObj, idx) =>
        dayObj.programs
          ? dayObj.programs
              .filter(
                (p, i, arr) =>
                  i ===
                  arr.findIndex(
                    (x) => x.time === p.time && x.program === p.program
                  )
              )
              .map((p) => ({
                day: dayObj.day,
                time: p.time,
                program: p.program,
                tourId: newTour.id, // ✅ استخدم newTour.id
              }))
          : [
              {
                day: dayObj.day || idx + 1,
                time: dayObj.time,
                program: dayObj.program,
                tourId: newTour.id, // ✅ هنا أيضًا
              },
            ]
      );

      if (tripprogramData.length > 0) {
        await supabase.from("tripprogram").insert(tripprogramData);
      }

      // ✅ رسالة نجاح + إعادة تهيئة الحقول
      toast.success("✅ تم إنشاء الرحلة بنجاح");
      resetForm();
    } catch (err) {
      console.error(err);
      toast.error("❌ فشل إنشاء الرحلة");
    }

    setIsSubmitting(false);
  };

  // ✅ تعديل رحلة موجودة
  // ✅ تعديل رحلة موجودة مع طباعة كل خطوة
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);

    if (!isValid()) {
      return;
    }

    if (!tour || !tour.id) {
      toast.error("❌ لا توجد رحلة محددة للتعديل");
      return;
    }

    const imagesData = prepareImagesForSubmission();
    if (!imagesData) {
      return;
    }

    setIsSubmitting(true);

    try {

      // ✅ تعديل بيانات الرحلة
      const { error } = await supabase
        .from("tour")
        .update({
          title: formData.title,
          description: formData.description,
          price: Number(formData.price),
          TripDuration: formData.TripDuration,
          DayPeople: `${formData.people}`,
          cityId: formData.cityId,
          categoryId: formData.categoryId,
          rival: formData.rival,
          theDate: formData.theDate,
          image: imagesData.image.map((img) => ({
            name: img.name,
            label: img.label,
            url: `/assets/${img.name}`,
          })),
        })
        .eq("id", tour.id);

      if (error) throw error;


      // ✅ صور النشاطات (حذف ثم إدخال الجديد فقط مع فلترة التكرار)
      const { error: deleteError } = await supabase
        .from("tourimage")
        .delete()
        .eq("tourId", tour.id);
      if (deleteError) throw deleteError;

      const tourimageData = imagesData.tourimage
        .filter(
          (img, idx, self) => idx === self.findIndex((t) => t.name === img.name)
        )
        .map((img) => ({
          name: img.name,
          label: img.label,
          url: `/assets/${img.name}`,
          tourId: tour.id,
          created_at: new Date().toISOString(),
        }));

      if (tourimageData.length > 0) {
        await supabase.from("tourimage").insert(tourimageData);
      }

      // ✅ includes مع فلترة التكرار
      await supabase.from("includes").delete().eq("tourId", tour.id);
      const includesData = formData.includes
        .filter(
          (inc, idx, self) => idx === self.findIndex((t) => t.text === inc.text)
        )
        .map((inc) => ({
          text: inc.text,
          tourId: tour.id,
        }));
      if (includesData.length > 0) {
        await supabase.from("includes").insert(includesData);
      }

      // ✅ tripprogram مع فلترة التكرار
      await supabase.from("tripprogram").delete().eq("tourId", tour.id);
      const tripprogramData = formData.tripprogram.flatMap((dayObj, idx) =>
        dayObj.programs
          ? dayObj.programs
              .filter(
                (p, i, arr) =>
                  i ===
                  arr.findIndex(
                    (x) => x.time === p.time && x.program === p.program
                  )
              )
              .map((p) => ({
                day: dayObj.day,
                time: p.time,
                program: p.program,
                tourId: tour.id,
              }))
          : [
              {
                day: dayObj.day || idx + 1,
                time: dayObj.time,
                program: dayObj.program,
                tourId: tour.id,
              },
            ]
      );
      if (tripprogramData.length > 0) {
        await supabase.from("tripprogram").insert(tripprogramData);
      }

      // ✅ تحديث الفورم بالبيانات الجديدة
      const updatedTour = await fetchTourById(tour.id);
      if (updatedTour) {
        const { mainImages } = populateFormFromTour(updatedTour);
        setTour(updatedTour);
        setMainImages(mainImages);
        // ⚠️ هنا نستخدم الصور الجديدة فقط بدل القديمة
        setActivityImages(imagesData.tourimage);
      }

      toast.success("✅ تم تعديل الرحلة بنجاح");
    } catch (err) {
      console.error("❌ خطأ أثناء تعديل الرحلة:", err);
      toast.error("❌ فشل تعديل الرحلة");
    }

    setIsSubmitting(false);
  };

  // ✅ دالة لإعادة تهيئة الحقول
  const resetForm = () => {
    setMainImages([]);
    setActivityImages([]);
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
        handleCreate,
        handleUpdate,
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
