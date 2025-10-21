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

import BelowTheControlPanel from "./components/BelowTheControlPanel";
import ControlPanelImages from "./components/ControlPanelImages";
import TopOfTheControlPanel2 from "./components/TopOfTheControlPanel2";
import TripProgram from "./components/TripProgram";
import Preparation from "./components/Preparation";
import TourIncludes from "./components/TourIncludes";
import ImageCollection from "./components/ImageCollection";

const CreateTripForm = () => {
  const {
    formData,
    setFormData,
    mainImages,
    setMainImages,
    activityImages,
    setActivityImages,
    handleChange,
    handleProgramChange,
    handleSubmit,
    isSubmitting,
    cities,
    categories,
  } = useTripsContext();

  return (
    <>
      <Box
        className="w-full flex flex-col items-center justify-center"
        sx={{ overflowY: "scroll", my: 3 }}
      >
        <Typography
          variant="h3"
          sx={{ fontWeight: "700", color: "#FFF", textAlign: "center" }}
        >
          Create <span style={{ color: "#ff9800" }}>a new</span> trip
        </Typography>

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
                programs={formData.tripprogram}
                setPrograms={handleProgramChange}
              />

              <TourIncludes
                includes={formData.includes}
                setIncludes={(data) =>
                  setFormData((prev) => ({ ...prev, includes: data }))
                }
              />

              <Preparation
                formData={formData}
                handleChange={handleChange}
              />

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
                  backgroundColor: "#ff9800",
                  fontWeight: "bold",
                  fontSize: "16px",
                  fontFamily: "Cairo, sans-serif",
                  "&:hover": { backgroundColor: "#d4a85f" },
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
