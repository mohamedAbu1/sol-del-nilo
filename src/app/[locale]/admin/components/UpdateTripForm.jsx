"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Stack,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import TopOfTheControlPanel2 from "./components/TopOfTheControlPanel2";
import ControlPanelImages from "./components/ControlPanelImages";
import TripProgram from "./components/TripProgram";
import TourIncludes from "./components/TourIncludes";
import Preparation from "./components/Preparation";
import BelowTheControlPanel from "./components/BelowTheControlPanel";
import ImageCollection from "./components/ImageCollection";
import { useTripsContext } from "@/context/TripsContext";

// ✅ دالة التحقق من وجود حروف عربية
const containsArabic = (text) => /[\u0600-\u06FF]/.test(text);

const UpdateTripForm = () => {
  const {
    formData,
    setFormData,
    cities,
    categories,
    handleChange,
    handleProgramChange,
    toursData,
    fetchTourById,
    populateFormFromTour,
    updateTour,
    mainImages,
    setMainImages,
    activityImages,
    setActivityImages,
    setSelectedImages,
    setTour,
  } = useTripsContext();
  const [toursID, setToursID] = useState("");

  // ✅ تنظيف روابط الصور المؤقتة
  useEffect(() => {
    if (toursID) {
      fetchTourById(toursID).then((data) => {
        if (data) {
          setTour(data);
          const loadedImages = populateFormFromTour(data);
          setSelectedImages(loadedImages);
        }
      });
    }
  }, [toursID]);
  const handleSelect = (e) => {
    setToursID(e.target.value);
  };
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!toursID) {
      toast.error("❌ يجب اختيار رحلة لتحديثها");
      return;
    }

    const success = await updateTour(
      toursID,
      formData,
      mainImages,
      activityImages
    );

    if (success) {
      toast.success("✅ تم تحديث الرحلة بنجاح");
      // إعادة تعيين النموذج أو التنقل إذا أردت
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

          <form onSubmit={handleUpdate}>
            <Stack spacing={2}>
              {/* 📝 الحقول النصية الأساسية */}
              <TopOfTheControlPanel2
                formData={formData}
                handleChange={handleChange}
                setFormData={setFormData}
              />

              {/* 🖼️ رفع الصور */}
              <ControlPanelImages
                mainImages={mainImages}
                setMainImages={setMainImages}
              />
              <ImageCollection
                activityImages={activityImages}
                setActivityImages={setActivityImages}
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
