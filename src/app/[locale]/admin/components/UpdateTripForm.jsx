"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Stack,
  InputAdornment,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { DOMAIN } from "@/lib/constants/FixedTexts";
import { supabase } from "../../../../lib/supabaseClient";
import TopOfTheControlPanel2 from "./components/TopOfTheControlPanel2";
import ControlPanelImages from "./components/ControlPanelImages";
import TripProgram from "./components/TripProgram";
import TourIncludes from "./components/TourIncludes";
import Preparation from "./components/Preparation";
import BelowTheControlPanel from "./components/BelowTheControlPanel";
import axios from "axios";
import ImageCollection from "./components/ImageCollection";

// ✅ دالة التحقق من وجود حروف عربية
const containsArabic = (text) => /[\u0600-\u06FF]/.test(text);

const UpdateTripForm = () => {
  const router = useRouter();

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

  const [toursID, setToursID] = useState("");
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [toursData, setToursData] = useState([]);
  const [tour, setTour] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedImagesList, setSelectedImagesList] = useState([]);

  // ✅ تنظيف روابط الصور المؤقتة
  useEffect(() => {
    return () => {
      selectedImages.forEach((img) => {
        if (img.url) URL.revokeObjectURL(img.url);
      });
    };
  }, [selectedImages]);
  console.log(selectedImages);
  // ✅ تحميل المدن والتصنيفات
  useEffect(() => {
    const fetchData = async () => {
      const [cityRes, categoryRes] = await Promise.all([
        supabase.from("city").select("*"),
        supabase.from("category").select("*"),
      ]);

      if (cityRes.error || categoryRes.error) {
        toast.error("❌ فشل في تحميل المدن أو التصنيفات");
        return;
      }

      setCities(cityRes.data);
      setCategories(categoryRes.data);
    };

    fetchData();
  }, []);

  // ✅ تحميل جميع الرحلات
  useEffect(() => {
    const fetchTours = async () => {
      const { data, error } = await supabase.from("tour").select(`
        id, title, description, price, theDate, TripDuration, DayPeople,
        cityId, rival, categoryId, image, tripprogram(*), includes(*)
      `);

      if (error) {
        toast.error("❌ فشل في تحميل بيانات الرحلات");
        return;
      }

      setToursData(data);
    };

    fetchTours();
  }, []);

  // ✅ تحميل بيانات الرحلة المحددة
  useEffect(() => {
    const fetchTour = async () => {
      const { data, error } = await supabase
        .from("tour")
        .select(
          `
          id, title, description, price, theDate, TripDuration, rival,
          DayPeople, cityId, categoryId, image, tripprogram(*), includes(*)
        `
        )
        .eq("id", toursID)
        .single();

      if (error) {
        toast.error("❌ فشل في تحميل بيانات الرحلة");
        return;
      }

      setTour(data);
    };

    if (toursID) fetchTour();
  }, [toursID]);

  // ✅ تعبئة النموذج بالبيانات
  useEffect(() => {
    if (tour) {
      const [_, peoplePart] = tour.DayPeople?.split("/") || [];

      const formattedImages =
        tour.image?.map((img) => ({
          name: img.name || img,
          label: img.label || "",
        })) || [];

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

      const loadedImages =
        formattedImages.map((img) => ({
          ...img,
          url: `${DOMAIN}/assets/${img.name}`,
          file: null,
        })) || [];

      setSelectedImages(loadedImages);
    }
  }, [tour]);

  // ✅ تحديث الحقول النصية مع منع اللغة العربية
  const handleChange = (e) => {
    const { name, value } = e.target;

    const textFields = ["title", "description", "TripDuration"];
    if (textFields.includes(name) && containsArabic(value)) {
      toast.error("❌ يجب الكتابة باللغة الإنجليزية فقط");
      return;
    }

    if (name === "price" && value > 5000) {
      toast.error("❌ لا يمكن أن يكون السعر أكبر من 5000 دولار");
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ اختيار الرحلة
  const handleSelect = (e) => {
    setToursID(e.target.value);
  };

  // ✅ تحديث برنامج الرحلة
  const handleProgramChange = (data) => {
    setFormData((prev) => ({ ...prev, tripprogram: data }));
  };

  // // ✅ تحديث البنود المشمولة
  // const handleIncludesChange = (data) => {
  //   setFormData((prev) => ({ ...prev, includes: data }));
  // };

  // ✅ حفظ التعديلات
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   // ✅ تحقق من عدد الصور
  //   if (selectedImages.length < 4 || selectedImages.length > 12) {
  //     toast.error("❌ يجب اختيار ما بين 4 إلى 12 صورة قبل حفظ الرحلة");
  //     return;
  //   }

  //   // ✅ تحقق من وجود label لكل صورة
  //   const hasEmptyLabel = selectedImages.some(
  //     (img) => !img.label || img.label.trim() === ""
  //   );
  //   if (hasEmptyLabel) {
  //     toast.error("❌ يجب كتابة وصف (label) لكل صورة قبل الحفظ");
  //     return;
  //   }

  //   // ✅ تجهيز الصور بصيغة { name, label }
  //   const imageObjects = selectedImages.map((img) => ({
  //     name: img.name,
  //     label: img.label.trim(),
  //   }));

  //   // // ✅ تجهيز البيانات
  //   // const payload = {
  //   //   ...formData,
  //   //   price: parseFloat(formData.price),
  //   //   DayPeople: `${parseInt(formData.people, 10)}`,
  //   //   image: imageObjects,
  //   // };
  //   const { tripprogram, includes, image, ...cleanFormData } = formData;

  //   const payload = {
  //     ...cleanFormData,
  //     price: parseFloat(formData.price),
  //     DayPeople: `${formData.people}`,
  //     image: imageObjects,
  //   };
  //   console.log("🚀 Payload to Supabase:", payload);
  //   const uniqueIncludes = Array.from(
  //     new Set(formData.includes.map((i) => i.text.trim()))
  //   ).map((text) => ({ tourId: toursID, text }));
  //   try {
  //     // ✅ تحديث بيانات الرحلة
  //     const { error: tourError } = await supabase
  //       .from("tour")
  //       .update(payload)
  //       .eq("id", toursID);

  //     if (tourError) {
  //       toast.error("❌ فشل في حفظ الرحلة");
  //       return;
  //     }

  //     // ✅ حذف البنود القديمة
  //     await supabase.from("includes").delete().eq("tourId", toursID);

  //     // ✅ إدخال البنود الجديدة
  //     const includesData = formData.includes.map((item) => ({
  //       tourId: toursID,
  //       text: item.text,
  //     }));

  //     const { error: includesError } = await supabase
  //       .from("includes")
  //       .insert(includesData);

  //     if (includesError) {
  //       toast.error("❌ تم حفظ الرحلة لكن فشل حفظ البنود");
  //       return;
  //     }

  //     toast.success("✅ تم حفظ الرحلة والبنود بنجاح");

  //     // ✅ إعادة تعيين النموذج
  //     setFormData({
  //       title: "",
  //       description: "",
  //       price: "",
  //       TripDuration: "",
  //       people: "1",
  //       categoryId: "",
  //       cityId: "",
  //       rival: "",
  //       theDate: "",
  //       image: [],
  //       tripprogram: [{ time: "", program: "" }],
  //       includes: [{ text: "" }],
  //     });
  //     setSelectedImages([]);
  //     setToursID("");
  //     setTour(null);
  //   } catch (error) {
  //     toast.error("❌ خطأ في الاتصال بقاعدة البيانات");
  //   }
  // };
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    toast.info("📤 جاري تجهيز البيانات...");

    // ✅ تجهيز صور ControlPanelImages
    const imageObjects = selectedImages.map((img) => ({
      name: img.name,
      label: img.label,
    }));

    // ✅ تجهيز صور ImageCollection المعدلة
    const tourimagePayload = selectedImagesList.map((img) => ({
      name: img.name,
      url: img.url, // تأكد أنه رابط صالح
      label: img.label,
      tourId: toursID,
      created_at: new Date().toISOString(), // إذا كان مطلوبًا في الجدول
    }));

    // ✅ تجهيز بيانات الرحلة
    const payload = {
      ...formData,
      price: parseFloat(formData.price),
      DayPeople: `${formData.people}`,
      image: imageObjects,
    };

    console.log("📦 Payload:", payload);

    // ✅ تحديث بيانات الرحلة
    const response = await axios.patch(`/api/tours/${toursID}`, payload);
    if (response.status !== 200 && response.status !== 204) {
      toast.error("❌ فشل في حفظ الرحلة");
      return;
    }

    // ✅ التحقق من وجود صور قديمة قبل الحذف
    const { data: existingImages, error: fetchError } = await supabase
      .from("tourimage")
      .select("id")
      .eq("tourId", toursID);

    if (fetchError) {
      console.warn("⚠️ فشل في التحقق من الصور القديمة:", fetchError.message);
    } else if (existingImages.length > 0) {
      const { error: deleteError } = await supabase
        .from("tourimage")
        .delete()
        .eq("tourId", toursID);

      if (deleteError) {
        console.error("❌ خطأ في حذف الصور:", deleteError.message);
        toast.warn("⚠️ تم حفظ الرحلة لكن فشل حذف الصور القديمة");
      }
    }

    // ✅ إدخال الصور الجديدة
    const { error: insertError } = await supabase
      .from("tourimage")
      .insert(tourimagePayload);

    if (insertError) {
      console.error("❌ خطأ في حفظ الصور الجديدة:", insertError.message);
      toast.warn("⚠️ تم حفظ الرحلة لكن فشل حفظ الصور الجديدة");
    }

    toast.success("✅ تم حفظ الرحلة والصور بنجاح");

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

    setSelectedImages([]);
    setSelectedImagesList([]);
    setToursID("");
    setTour(null);
  } catch (error) {
    console.error("❌ API Error:", error.response?.data || error.message);
    toast.error(
      `❌ ${error.response?.data?.error || "خطأ في الاتصال بـ API"}`
    );
  }
};

  return (
    <>
      <div
        className="w-full flex flex-col items-center justify-center"
        style={{ overflowY: "scroll", margin: "20px 0", padding: "20px" }}
      >
        {/* 🔶 عنوان الصفحة */}
        <h1
          style={{ fontWeight: "700", color: "#FFF", marginBottom: "20px" }}
          className="text-4xl capitalize"
        >
          Updates <span style={{ color: "#ff9800" }}>a Trip</span>
        </h1>

        {/* 🏙️ اختيار الرحلة لتحديثها */}
        <FormControl
          required
          sx={{
            width: "70%",
            input: {
              color: "#d4a85f",
              fontSize: "18px",
              fontWeight: "bold",
              fontFamily: "Cairo, sans-serif",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#d4a85f" },
              "&:hover fieldset": { borderColor: "#ff9800" },
              "&.Mui-focused fieldset": {
                borderColor: "#ff9800",
                borderWidth: "2px",
              },
            },
            "& .MuiInputLabel-root": { color: "#d4a85f" },
            "& .MuiInputLabel-root.Mui-focused": { color: "#ff9800" },
          }}
        >
          <InputLabel id="city-select-label">
            اختر عنوان الرحله التي تريد تحديثها
          </InputLabel>
          <Select
            labelId="city-select-label"
            id="city-select"
            value={toursID}
            onChange={handleSelect}
            sx={{ color: "#d4a85f" }}
          >
            {toursData.map((i) => (
              <MenuItem key={i.id} value={i.id}>
                {i.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* 📦 نموذج التحديث الكامل */}
        <Box
          sx={{
            width: "70%",
            mx: "auto",
            mt: 5,
            p: 3,
            boxShadow: 3,
            borderRadius: 4,
            border: "1px solid grey",
            color: "#FFF",
          }}
        >
          <Typography variant="h5" gutterBottom>
            تحديث بيانات رحله
          </Typography>

          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              {/* 📝 الحقول النصية الأساسية */}
              <TopOfTheControlPanel2
                formData={formData}
                handleChange={handleChange}
                setFormData={setFormData}
              />

              {/* 🖼️ رفع الصور */}
              <ControlPanelImages
                selectedImages={selectedImages}
                setSelectedImages={setSelectedImages}
              />
              <ImageCollection
                selectedImagesList={selectedImagesList}
                setSelectedImagesList={setSelectedImagesList}
              />
              {/* 📋 برنامج الرحلة */}
              <TripProgram
                programs={formData.tripprogram}
                setPrograms={handleProgramChange}
              />

              {/* ✅ البنود التي يشملها البرنامج */}
              <TourIncludes
                includes={formData.includes}
                setIncludes={(data) =>
                  setFormData((prev) => ({ ...prev, includes: data }))
                }
              />

              {/* 🧾 التحضيرات */}
              <Preparation formData={formData} handleChange={handleChange} />

              {/* 🏙️ المدينة والتصنيف */}
              <BelowTheControlPanel
                cities={cities}
                categories={categories}
                categoryId={formData.categoryId}
                cityId={formData.cityId}
                handleChange={handleChange}
              />

              {/* ✅ زر الحفظ */}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  backgroundColor: "#ff9800",
                  color: "#ffffff",
                  fontSize: "18px",
                  fontWeight: "700",
                }}
              >
                تعديل بيانات الرحله
              </Button>
            </Stack>
          </form>
        </Box>
      </div>

      {/* ✅ Toast لعرض التنبيهات */}
      <ToastContainer />
    </>
  );
};

export default UpdateTripForm;
