"use client";
import React from "react";
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
import { ToastContainer } from "react-toastify";
import TopOfTheControlPanel2 from "./components/TopOfTheControlPanel2";
import ControlPanelImages from "./components/ControlPanelImages";
import TripProgram from "./components/TripProgram";
import TourIncludes from "./components/TourIncludes";
import Preparation from "./components/Preparation";
import BelowTheControlPanel from "./components/BelowTheControlPanel";
import ImageCollection from "./components/ImageCollection";
import { useTripsContext } from "@/context/TripsContext";
import { useTourEdit } from "@/context/TourEditContext";
import { useTourImages } from "@/context/TourImagesContext";
import { useTheme } from "@mui/material/styles"; // ✅ استدعاء الثيم

const UpdateTripForm = () => {
  const {
    formData,
    setFormData,
    cities,
    categories,
    handleChange,
    handleProgramChange,
    toursData,
    handleUpdate,
  } = useTripsContext();

  const { handleSelect, toursID } = useTourEdit();

  const { mainImages, setMainImages, activityImages, setActivityImages } =
    useTourImages();

  const muiTheme = useTheme(); // ✅ يجيب الثيم الحالي

  return (
    <>
      <div
        className="w-full flex flex-col items-center justify-center"
        style={{ overflowY: "scroll", margin: "20px 0", padding: "20px" }}
      >
        {/* 🔶 عنوان الصفحة */}
        <h1
          style={{
            fontWeight: "700",
            color: muiTheme.palette.text.primary,
            marginBottom: "20px",
          }}
          className="text-4xl capitalize"
        >
          Updates{" "}
          <span style={{ color: muiTheme.palette.secondary.main }}>a Trip</span>
        </h1>

        {/* 🏙️ اختيار الرحلة لتحديثها */}
        <FormControl
          required
          sx={{
            width: "70%",
            "& .MuiInputBase-input": {
              color: muiTheme.palette.text.primary,
              fontSize: "18px",
              fontWeight: "bold",
              fontFamily: "Cairo, sans-serif",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: muiTheme.palette.secondary.main },
              "&:hover fieldset": { borderColor: muiTheme.palette.primary.main },
              "&.Mui-focused fieldset": {
                borderColor: muiTheme.palette.secondary.main,
                borderWidth: "2px",
              },
            },
            "& .MuiInputLabel-root": { color: muiTheme.palette.secondary.main },
            "& .MuiInputLabel-root.Mui-focused": {
              color: muiTheme.palette.primary.main,
            },
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
            sx={{ color: muiTheme.palette.text.primary }}
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
            boxShadow: muiTheme.shadows[4],
            borderRadius: 4,
            border: `1px solid ${muiTheme.palette.divider}`,
            color: muiTheme.palette.text.primary,
            backgroundColor: muiTheme.palette.background.paper,
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{ color: muiTheme.palette.secondary.main }}
          >
            تحديث بيانات رحله
          </Typography>

          <form>
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

              <Preparation formData={formData} handleChange={handleChange} />

              <BelowTheControlPanel
                cities={cities}
                categories={categories}
                categoryId={formData.categoryId}
                cityId={formData.cityId}
                handleChange={handleChange}
              />

              <Button
                type="button"
                variant="contained"
                onClick={handleUpdate}
                sx={{
                  backgroundColor: muiTheme.palette.secondary.main,
                  color: muiTheme.palette.getContrastText(
                    muiTheme.palette.secondary.main
                  ),
                  fontSize: "18px",
                  fontWeight: "700",
                  "&:hover": {
                    backgroundColor: muiTheme.palette.primary.main,
                  },
                }}
              >
                تعديل بيانات الرحله
              </Button>
            </Stack>
          </form>
        </Box>
      </div>

      <ToastContainer />
    </>
  );
};

export default UpdateTripForm;
