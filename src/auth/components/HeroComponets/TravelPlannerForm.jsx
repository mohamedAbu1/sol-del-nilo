"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  TextField,
  MenuItem,
  Popover,
  Slider,
  Button,
  Typography,
  InputAdornment,
} from "@mui/material";
import { BiSearch } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { LocationOn, Category, Event } from "@mui/icons-material";
import { useTripsContext } from "@/context/TripsContext";
import { useAppQueryContext } from "@/context/AppQueryContext";
import { useTheme } from "@mui/material/styles"; // ✅ استدعاء الثيم
import { toast } from "react-toastify"; // ✅ لو مش موجود
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
export default function TravelPlannerForm() {
  const { cities, categories } = useTripsContext();
  const {
    selectedCategories,
    setSelectedCategories,
    priceRange,
    setPriceRange,
    anchorElPrice,
    openPrice,
    openDuration,
    anchorElDuration,
    handlePriceClick,
    handlePriceClose,
    handleDurationClick,
    handleDurationClose,
    duration,
    date,
    setDate,
    setDuration,
    selectedDestinationId,
    setSelectedDestinationId,
  } = useAppQueryContext();
  const router = useRouter();
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  // const [date, setDate] = useState("");
  console.log({
    priceRange,
    selectedDestinationId,
    duration,
    date,
    selectedCategories,
  });
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  const today = new Date().toISOString().split("T")[0];
  const muiTheme = useTheme(); // ✅ يجيب الثيم الحالي
  const validateFields = () => {
    if (!selectedDestinationId || !selectedDestinationId.name) {
      toast.error("❌ برجاء اختيار الوجهة (Destination)");
      return false;
    }

    if (!duration) {
      toast.error("❌ برجاء اختيار مدة الرحلة (Duration)");
      return false;
    }

    if (!selectedCategories) {
      toast.error("❌ برجاء اختيار الفئة (Category)");
      return false;
    }

    if (!date) {
      toast.error("❌ برجاء اختيار التاريخ (Date)");
      return false;
    }

    if (!priceRange || priceRange.length !== 2) {
      toast.error("❌ برجاء تحديد نطاق السعر (Price Range)");
      return false;
    }

    return true;
  };

  const handleSearch = () => {
  console.log("Search clicked!");

  const query = new URLSearchParams({
    destination: selectedDestinationId || "",
    duration: duration?.toString() || "",
    category: selectedCategories || "",
    date: date || "",
    minPrice: priceRange[0]?.toString() || "0",
    maxPrice: priceRange[1]?.toString() || "14000",
    search: `${selectedDestinationId} ${selectedCategories}`,
  }).toString();

  console.log("Query:", query); // ✅ اطبع الكويري للتأكد

  router.push(`/tours?${query}`);
};

  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1350px",
        p: { xs: 2, sm: 3, md: 4 },
        borderRadius: 4,
        boxShadow: 3,
        border: `1px solid ${muiTheme.palette.divider}`,
        // backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5))`,
        mx: "auto",
      }}
    >
      <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} justifyContent="center">
        {/* Destination */}
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <TextField
            select
            label="Destination"
            fullWidth
            value={selectedDestinationId}
            onChange={(e) => setSelectedDestinationId(e.target.value)}
            InputLabelProps={{
              style: { color: "#FF9800" }, // نص ثانوي
            }}
            InputProps={{ style: { color: "#fff" } }} // نص أساسي
            SelectProps={{
              MenuProps: {
                PaperProps: {
                  sx: {
                    borderRadius: "20px",
                    backgroundColor: muiTheme.palette.background.paper, // خلفية الكارد
                    color: muiTheme.palette.text.primary,
                  },
                },
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                height: { xs: 48, sm: 52, md: 56, lg: 60 },
                "& fieldset": { borderColor: muiTheme.palette.primary.main },
                "&:hover fieldset": {
                  borderColor: muiTheme.palette.primary.light,
                },
                "&.Mui-focused fieldset": {
                  borderColor: muiTheme.palette.primary.light,
                },
              },
            }}
          >
            {cities.map((dest) => (
              <MenuItem key={dest.id} value={dest.name}>
                {dest.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* Duration */}
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <TextField
            label="Duration (Days)"
            value={duration || ""}
            onClick={handleDurationClick}
            fullWidth
            readOnly
            InputLabelProps={{
              style: { color: "#FF9800" },
            }}
            InputProps={{ style: { color: "#fff" } }}
            sx={{
              "& .MuiOutlinedInput-root": {
                height: { xs: 48, sm: 52, md: 56, lg: 60 },
                "& fieldset": { borderColor: muiTheme.palette.primary.main },
                "&:hover fieldset": {
                  borderColor: muiTheme.palette.primary.light,
                },
                "&.Mui-focused fieldset": {
                  borderColor: muiTheme.palette.primary.light,
                },
              },
            }}
          />
          <Popover
            open={openDuration}
            anchorEl={anchorElDuration}
            onClose={handleDurationClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            PaperProps={{
              sx: {
                backgroundColor: muiTheme.palette.background.paper,
                color: muiTheme.palette.text.primary,
                borderRadius: "20px",
                p: 2,
              },
            }}
          >
            <Box sx={{ width: { xs: "100%", sm: 250 } }}>
              <Typography gutterBottom>Choose Duration</Typography>
              <Slider
                value={duration}
                onChange={(e, val) => setDuration(val)}
                valueLabelDisplay="auto"
                step={1}
                min={1}
                max={15}
                marks={[
                  { value: 1, label: "1" },
                  { value: 5, label: "5" },
                  { value: 10, label: "10" },
                  { value: 15, label: "15" },
                ]}
                sx={{ color: muiTheme.palette.primary.main }}
              />
              <Button
                variant="contained"
                size="small"
                fullWidth={{ xs: true, sm: false }}
                sx={{
                  mt: 2,
                  backgroundColor: muiTheme.palette.primary.main,
                  color: muiTheme.palette.getContrastText(
                    muiTheme.palette.primary.main
                  ),
                  "&:hover": {
                    backgroundColor: muiTheme.palette.primary.light,
                  },
                }}
                onClick={handleDurationClose}
              >
                Done
              </Button>
            </Box>
          </Popover>
        </Grid>

        {/* Price Range */}
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <TextField
            label="Price Range ($)"
            value={`$${priceRange[0]} - $${priceRange[1]}`}
            onClick={handlePriceClick}
            fullWidth
            readOnly
            InputLabelProps={{
              style: { color: "#FF9800" },
            }}
            InputProps={{ style: { color: "#fff" } }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: muiTheme.palette.primary.main },
                "&:hover fieldset": {
                  borderColor: muiTheme.palette.primary.light,
                },
                "&.Mui-focused fieldset": {
                  borderColor: muiTheme.palette.primary.light,
                },
              },
            }}
          />
          <Popover
            open={openPrice}
            anchorEl={anchorElPrice}
            onClose={handlePriceClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            PaperProps={{
              sx: {
                backgroundColor: muiTheme.palette.background.paper,
                color: muiTheme.palette.text.primary,
                borderRadius: "20px",
                p: 2,
              },
            }}
          >
            <Box sx={{ width: { xs: "100%", sm: 250 } }}>
              <Typography gutterBottom>Adjust Price Range</Typography>
              <Slider
                value={priceRange}
                onChange={(e, newValue) => setPriceRange(newValue)}
                valueLabelDisplay="auto"
                min={0}
                max={14000}
                sx={{
                  color: muiTheme.palette.primary.main,
                  "& .MuiSlider-valueLabel": {
                    color: muiTheme.palette.getContrastText(
                      muiTheme.palette.primary.main
                    ),
                    backgroundColor: muiTheme.palette.primary.main,
                    borderRadius: "4px",
                    fontWeight: "bold",
                  },
                  "& .MuiSlider-markLabel": {
                    color: muiTheme.palette.text.secondary,
                  },
                }}
              />
              <Button
                variant="contained"
                size="small"
                fullWidth={{ xs: true, sm: false }}
                sx={{
                  mt: 2,
                  backgroundColor: muiTheme.palette.primary.main,
                  color: muiTheme.palette.getContrastText(
                    muiTheme.palette.primary.main
                  ),
                  "&:hover": {
                    backgroundColor: muiTheme.palette.primary.light,
                  },
                }}
                onClick={handlePriceClose}
              >
                Done
              </Button>
            </Box>
          </Popover>
        </Grid>

        {/* Category */}
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <TextField
            select
            label="Category"
            fullWidth
            value={selectedCategories}
            onChange={(e) => setSelectedCategories(e.target.value)}
            InputLabelProps={{
              style: { color: "#FF9800" },
            }}
            InputProps={{ style: { color: "#fff" } }}
            SelectProps={{
              MenuProps: {
                PaperProps: {
                  sx: {
                    borderRadius: "20px",
                    backgroundColor: muiTheme.palette.background.paper,
                    color: muiTheme.palette.text.primary,
                  },
                },
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                height: { xs: 48, sm: 52, md: 56, lg: 60 },
                "& fieldset": { borderColor: muiTheme.palette.primary.main },
                "&:hover fieldset": {
                  borderColor: muiTheme.palette.secondary.main,
                },
                "&.Mui-focused fieldset": {
                  borderColor: muiTheme.palette.secondary.main,
                },
              },
            }}
          >
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.name}>
                {cat.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* Date Picker */}
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <Box sx={{ width: "100%" }}>
            <input
              type="date"
              id="start-date"
              name="start-date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={today}
              style={{
                width: "100%", // ✅ عرض كامل على جميع الشاشات
                color: "#fff",
                border: `2px solid ${muiTheme.palette.primary.main}`,
                borderRadius: "8px",
                padding: "14px",
                fontSize: "16px",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </Box>
        </Grid>

        {/* Search Button */}
        <Grid item xs={12}>
          <Box display="flex" justifyContent="center">
            <Button
              onClick={handleSearch}
              variant="contained"
              size="large"
              disabled={false}
              sx={{
                backgroundColor: muiTheme.palette.primary.main, // ✅ برتقالي أساسي
                color: muiTheme.palette.getContrastText(
                  muiTheme.palette.primary.main
                ), // ✅ نص واضح
                fontWeight: "bold",
                borderRadius: "8px",
                px: { xs: 2, sm: 4 }, // ✅ متجاوب
                py: { xs: 1, sm: 1.5 },
                textTransform: "none",
                boxShadow: `0 4px 10px ${muiTheme.palette.primary.main}50`, // ✅ ظل برتقالي شفاف
                "&:hover": { backgroundColor: muiTheme.palette.primary.light }, // ✅ درجة أخف عند الـ hover
                "&:disabled": {
                  backgroundColor: muiTheme.palette.action.disabledBackground,
                  color: muiTheme.palette.text.disabled,
                },
                width: { xs: "100%", sm: "auto" }, // ✅ زر بعرض كامل على الموبايل
              }}
            >
              <BiSearch style={{ fontSize: "18px", marginRight: "8px" }} />{" "}
              Search
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
