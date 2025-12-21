"use client";
import React from "react";
import {
  Box,
  Typography,
  Stack,
  Button,
  CircularProgress,
} from "@mui/material";
import { ToastContainer } from "react-toastify";
import { useTripsContext } from "@/context/TripsContext";
import { useTourImages } from "@/context/TourImagesContext";
import BelowTheControlPanel from "./components/BelowTheControlPanel";
import ControlPanelImages from "./components/ControlPanelImages";
import TopOfTheControlPanel2 from "./components/TopOfTheControlPanel2";
import TripProgram from "./components/TripProgram";
import Preparation from "./components/Preparation";
import TourIncludes from "./components/TourIncludes";
import ImageCollection from "./components/ImageCollection";
import { useTheme } from "@mui/material/styles"; // ✅ استدعاء الثيم

const CreateTripForm = () => {
  const {
    formData,
    setFormData,
    handleChange,
    handleProgramChange,
    handleCreate,
    isSubmitting,
    cities,
    categories,
  } = useTripsContext();

  const {
    mainImages,
    setMainImages,
    activityImages,
    setActivityImages,
    prepareImagesForSubmission,
  } = useTourImages();

  const muiTheme = useTheme(); // ✅ يجيب الثيم الحالي

  // ✅ إرسال النموذج مع الصور الجاهزة
  const handleCreatea = async (e) => {
    e.preventDefault();

    const imagesData = prepareImagesForSubmission();
    if (!imagesData) return;

    await handleCreate(e, imagesData);
  };

  return (
    <>
      <Box
        className="w-full flex flex-col items-center justify-center"
        sx={{ overflowY: "scroll", my: 3 }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: "700",
            color: muiTheme.palette.text.primary, // ✅ النصوص من الثيم
            textAlign: "center",
          }}
        >
          Create{" "}
          <span style={{ color: muiTheme.palette.secondary.main }}>a new</span>{" "}
          trip
        </Typography>

        <Box
          sx={{
            width: "85%",
            mx: "auto",
            mt: 5,
            p: 3,
            boxShadow: muiTheme.shadows[3], // ✅ ظل من الثيم
            borderRadius: 4,
            border: `1px solid ${muiTheme.palette.divider}`, // ✅ حدود من الثيم
            color: muiTheme.palette.text.primary, // ✅ النصوص من الثيم
            backgroundColor: muiTheme.palette.background.paper, // ✅ خلفية من الثيم
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{ color: muiTheme.palette.text.primary }}
          >
            إنشاء رحلة جديدة
          </Typography>

          <form onSubmit={handleCreatea}>
            <Stack spacing={2}>
              <TopOfTheControlPanel2
                formData={formData}
                handleChange={handleChange}
                setFormData={setFormData}
              />
              <ControlPanelImages
                mainImages={mainImages}
                setMainImages={setMainImages}
              />
              <ImageCollection
                activityImages={activityImages}
                setActivityImages={setActivityImages}
              />
              <TripProgram
                tripDuration={Number(formData.TripDuration)}
                programs={formData.tripprogram}
                setPrograms={(p) =>
                  setFormData({ ...formData, tripprogram: p })
                }
              />
              <TourIncludes
                includes={formData.includes}
                setIncludes={(data) =>
                  setFormData((prev) => ({ ...prev, includes: data }))
                }
              />
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
                disabled={isSubmitting}
                sx={{
                  mt: 2,
                  backgroundColor: muiTheme.palette.secondary.main, // ✅ زر من الثيم
                  color: muiTheme.palette.getContrastText(
                    muiTheme.palette.secondary.main
                  ),
                  fontWeight: "bold",
                  fontSize: "16px",
                  fontFamily: "Cairo, sans-serif",
                  "&:hover": {
                    backgroundColor: muiTheme.palette.primary.main, // ✅ لون hover من الثيم
                  },
                }}
              >
                {isSubmitting ? (
                  <CircularProgress size={24} />
                ) : (
                  "✅ حفظ الرحلة"
                )}
              </Button>
            </Stack>
          </form>
        </Box>
      </Box>
      <ToastContainer />
    </>
  );
};

export default CreateTripForm;
