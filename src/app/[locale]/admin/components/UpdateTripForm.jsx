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
import { supabase } from "@/lib/supabaseClient";
import TopOfTheControlPanel2 from "./components/TopOfTheControlPanel2";
import ControlPanelImages from "./components/ControlPanelImages";
import TripProgram from "./components/TripProgram";
import TourIncludes from "./components/TourIncludes";
import Preparation from "./components/Preparation";
import BelowTheControlPanel from "./components/BelowTheControlPanel";

// ✅ دالة التحقق من وجود حروف عربية
const containsArabic = (text) => /[\u0600-\u06FF]/.test(text);

const UpdateTripForm = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    Destination: "",
    theDate: "",
    TripDuration: "",
    days: "",
    people: "",
    cityId: "",
    categoryId: "",
    image: [],
    tripprogram: [{ time: "", program: "" }],
    includes: [{ text: "" }],
    NumberOfParticipants: "",
    toursID: "",
  });

  const [toursID, setToursID] = useState("");
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [toursData, setToursData] = useState([]);
  const [tour, setTour] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);

  // ✅ تنظيف روابط الصور المؤقتة
  useEffect(() => {
    return () => {
      selectedImages.forEach((img) => {
        if (img.url) URL.revokeObjectURL(img.url);
      });
    };
  }, [selectedImages]);

  // ✅ تحميل المدن والتصنيفات
  useEffect(() => {
    const fetchData = async () => {
      const [cityRes, categoryRes] = await Promise.all([
        supabase.from("city").select("*"),
        supabase.from("category").select("*"),
      ]);

      if (cityRes.error || categoryRes.error) {
        toast.error("❌ فشل في تحميل المدن أو التصنيفات");
        console.error("Supabase Error:", cityRes.error || categoryRes.error);
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
      const { data, error } = await supabase
        .from("tour")
        .select(`
          id,
          title,
          description,
          price,
          Destination,
          theDate,
          TripDuration,
          DayPeople,
          cityId,
          categoryId,
          image,
          tripprogram(*),
          includes(*),
          NumberOfParticipants
        `);

      if (error) {
        console.error("❌ خطأ في جلب الرحلات:", error.message);
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
        .select(`
          id,
          title,
          description,
          price,
          Destination,
          theDate,
          TripDuration,
          DayPeople,
          cityId,
          categoryId,
          image,
          tripprogram(*),
          includes(*),
          NumberOfParticipants
        `)
        .eq("id", toursID)
        .single();

      if (error) {
        console.error("❌ فشل في جلب بيانات الرحلة:", error.message);
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
      const [dayPart, peoplePart] = tour.DayPeople?.split("/") || [];

      setFormData({
        title: tour.title || "",
        description: tour.description || "",
        price: tour.price?.toString() || "",
        Destination: tour.Destination || "",
        theDate: tour.theDate || "",
        TripDuration: tour.TripDuration || "",
        days: dayPart?.replace("Day", "") || "",
        people: peoplePart?.replace("People", "") || "",
        cityId: tour.cityId || "",
        categoryId: tour.categoryId || "",
        image: tour.image || [],
        NumberOfParticipants: tour.NumberOfParticipants || "",
        tripprogram:
          tour.tripprogram?.map((item) => ({
            time: item.time || "",
            program: item.program || "",
          })) || [],
        includes:
          tour.includes?.map((item) => ({
            text: item.text || "",
          })) || [],
        toursID: tour.id || "",
      });

      const loadedImages =
        tour.image?.map((imgName) => ({
          name: imgName,
          url: `${DOMAIN}/assets/${imgName}`,
          file: null,
        })) || [];
      setSelectedImages(loadedImages);
    }
  }, [tour]);

  // ✅ تحديث الحقول النصية مع منع اللغة العربية
  const handleChange = (e) => {
    const { name, value } = e.target;

    const textFields = [
      "title",
      "description",
      "Destination",
      "TripDuration",
      "NumberOfParticipants",
    ];
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
    const selectedId = e.target.value;
    setToursID(selectedId);
  };

  // ✅ تحديث برنامج الرحلة
  const handleProgramChange = (data) => {
    setFormData((prev) => ({ ...prev, tripprogram: data }));
  };

  // ✅ تحديث البنود المشمولة
  const handleIncludesChange = (data) => {
    setFormData((prev) => ({ ...prev, includes: data }));
  };

  // ✅ حفظ التعديلات
 const handleSubmit = async (e) => {
  e.preventDefault();

  if (selectedImages.length < 4 || selectedImages.length > 12) {
    toast.error("❌ يجب اختيار ما بين 4 إلى 12 صورة قبل حفظ الرحلة");
    return;
  }

  const { days, people, includes, tripprogram, toursID, ...cleanData } = formData;
  const DayPeople = `${days}Day/${people}People`;

  try {
    // ✅ تحديث جدول tour فقط
    const { error: tourError } = await supabase
      .from("tour")
      .update({
        ...cleanData,
        price: parseFloat(formData.price),
        DayPeople,
        image: selectedImages.map((img) => img.name),
      })
      .eq("id", toursID);

    if (tourError) {
      console.error("❌ خطأ أثناء تحديث الرحلة:", tourError.message);
      toast.error("❌ فشل في حفظ الرحلة");
      return;
    }

    // ✅ حذف البنود القديمة من جدول includes
    await supabase.from("includes").delete().eq("tourId", toursID);

    // ✅ إدخال البنود الجديدة في جدول includes
    const includesData = includes.map((item) => ({
      tourId: toursID,
      text: item.text,
    }));

    const { error: includesError } = await supabase
      .from("includes")
      .insert(includesData);

    if (includesError) {
      console.error("❌ خطأ أثناء تحديث البنود:", includesError.message);
      toast.error("❌ تم حفظ الرحلة لكن فشل حفظ البنود");
      return;
    }

    toast.success("✅ تم حفظ الرحلة والبنود بنجاح");

    // ✅ إعادة تعيين النموذج
    setFormData({
      title: "",
      description: "",
      price: "",
      Destination: "",
      theDate: "",
      TripDuration: "",
      days: "",
      people: "",
      cityId: "",
      categoryId: "",
      image: [],
      tripprogram: [{ time: "", program: "" }],
      includes: [{ text: "" }],
      NumberOfParticipants: "",
      toursID: "",
    });
    setSelectedImages([]);
    setToursID("");
  } catch (error) {
    console.error("❌ خطأ في الاتصال بـ Supabase:", error);
    toast.error("❌ خطأ في الاتصال بقاعدة البيانات");
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
              />

              {/* 🖼️ رفع الصور */}
              <ControlPanelImages
                selectedImages={selectedImages}
                setSelectedImages={setSelectedImages}
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
