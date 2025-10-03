"use client";
import React, { useState, useEffect } from "react";
import { Box, TextField, Typography, Stack, Button } from "@mui/material";
import axios from "axios";
import { DOMAIN } from "@/lib/constants/FixedTexts";
import { ToastContainer, toast } from "react-toastify";
import BelowTheControlPanel from "./components/BelowTheControlPanel";
import ControlPanelImages from "./components/ControlPanelImages";
import TopOfTheControlPanel2 from "./components/TopOfTheControlPanel2";
import TripProgram from "./components/TripProgram";
import Preparation from "./components/Preparation";
import TourIncludes from "./components/TourIncludes";
import { supabase } from "../../../../lib/supabaseClient";
const CreateTripForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    days: "",
    people: "",
    categoryId: "",
    cityId: "",
    Destination: "", // ← أضف هذا
    theDate: "", // ← أضف هذا
    TripDuration: "", // ← أضف هذا
    image: [],
    tripprogram: [{ time: "", program: "" }],
    includes: [{ text: "" }], // ✅ أضف هذا السطر
  });

  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

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

  useEffect(() => {
    return () => {
      selectedImages.forEach((img) => {
        if (img.url) URL.revokeObjectURL(img.url);
      });
    };
  }, [selectedImages]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "price" && value > 5000) {
      toast.error("❌ لا يمكن أن يكون السعر أكبر من 5000 دولار");
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProgramChange = (updatedPrograms) => {
    setFormData((prev) => ({ ...prev, tripprogram: updatedPrograms }));
  };

  const isValid = () => {
    const requiredFields = [
      "title",
      "description",
      "price",
      "days",
      "people",
      "categoryId",
      "cityId",
      "Destination",
      "theDate",
      "TripDuration",
    ];

    for (let field of requiredFields) {
      const value = formData[field];
      if (
        value === undefined ||
        value === null ||
        (typeof value === "string" && value.trim() === "")
      ) {
        toast.error(`❌ الحقل "${field}" مطلوب ولا يمكن تركه فارغًا`);
        return false;
      }
    }

    if (selectedImages.length < 4 || selectedImages.length > 12) {
      toast.error("❌ يجب اختيار ما بين 4 إلى 12 صورة.");
      return false;
    }

    if (
      !formData.includes ||
      !Array.isArray(formData.includes) ||
      formData.includes.some((item, index) => {
        if (!item.text || item.text.trim() === "") {
          toast.error(`❌ بند المرفقات رقم ${index + 1} فارغ`);
          return true;
        }
        return false;
      })
    ) {
      return false;
    }

    if (
      !formData.tripprogram ||
      !Array.isArray(formData.tripprogram) ||
      formData.tripprogram.some((item, index) => {
        if (!item.time || item.time.trim() === "") {
          toast.error(`❌ وقت النشاط رقم ${index + 1} فارغ`);
          return true;
        }
        if (!item.program || item.program.trim() === "") {
          toast.error(`❌ وصف النشاط رقم ${index + 1} فارغ`);
          return true;
        }
        return false;
      })
    ) {
      return false;
    }

    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid()) {
      toast.error("❌ يرجى ملء جميع الحقول قبل الإرسال");
      return;
    }

    const DayPeople = `${formData.days}Day/${formData.people}People`;
    const payload = {
      ...formData,
      price: parseFloat(formData.price),
      DayPeople,
      image: selectedImages.map((img) => img.name),
    };

    try {
      const response = await axios.post("/api/tours", payload);
      if (response.status === 201) {
        toast.success("✅ تم حفظ الرحلة");
        setFormData({
          title: "",
          description: "",
          price: "",
          days: "",
          people: "",
          categoryId: "",
          cityId: "",
          Destination: "", // ← أضف هذا
          theDate: "", // ← أضف هذا
          TripDuration: "", // ← أضف هذا
          image: [],
          tripProgram: [{ time: "", program: "" }],
          includes: [{ text: "" }], // ✅ أضف هذا
        });
        setSelectedImages([]);
      } else {
        toast.error("❌ فشل في حفظ الرحلة");
      }
    } catch (error) {
      toast.error("❌ خطأ في الاتصال بـ API");
    }
  };

  return (
    <>
      <div
        className="w-full flex flex-col items-center justify-center"
        style={{ overflowY: "scroll", margin: "20px 0" }}
      >
        <h1
          style={{ fontWeight: "700", color: "#FFF" }}
          className="text-4xl capitalize"
        >
          Create <span style={{ color: "#ff9800" }}>a new</span> trip
        </h1>

        <Box
          sx={{
            width: "85%",
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
            إنشاء رحلة جديدة
          </Typography>

          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TopOfTheControlPanel2
                formData={formData}
                handleChange={handleChange}
              />
              <ControlPanelImages
                selectedImages={selectedImages}
                setSelectedImages={setSelectedImages}
              />
              <TripProgram
                programs={formData.tripprogram || []}
                setPrograms={handleProgramChange}
              />
              <TourIncludes
                includes={formData.includes || []}
                setIncludes={(data) =>
                  setFormData((prev) => ({ ...prev, includes: data }))
                }
              />{" "}
              <Preparation formData={formData} handleChange={handleChange} />
              <BelowTheControlPanel
                cities={cities}
                categories={categories}
                categoryId={formData.categoryId}
                cityId={formData.cityId}
                handleChange={handleChange}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  mt: "10px",
                  backgroundColor: "#ff9800",
                  fontWeight: "bold",
                  fontSize: "16px",
                  fontFamily: "Cairo, sans-serif",
                  "&:hover": { backgroundColor: "#d4a85f" },
                }}
              >
                ✅ حفظ الرحلة
              </Button>
            </Stack>
          </form>
        </Box>
      </div>
      <ToastContainer />
    </>
  );
};

export default CreateTripForm;
