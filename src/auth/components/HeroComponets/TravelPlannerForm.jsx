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
    setDuration,
    selectedDestinationId,
    setSelectedDestinationId,
  } = useAppQueryContext();
  const router = useRouter();
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  const [date, setDate] = useState("");
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
    if (!validateFields()) return; // ✅ يمنع البحث لو في حقل ناقص
    const query = new URLSearchParams({
      destination: selectedDestinationId.name || "", // ✅ استخدم id فقط
      duration: duration.toString(),
      category: selectedCategories || "", // ✅ استخدم id فقط
      date: date || "",
      minPrice: priceRange[0].toString(),
      maxPrice: priceRange[1].toString(),
      search: `${selectedDestinationId.name} ${selectedCategories}`,
    }).toString();

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
        border: `1px solid ${muiTheme.palette.divider}`, // ✅ الحدود من الثيم
        backgroundColor: muiTheme.palette.background.paper, // ✅ الخلفية من الثيم
        mx: "auto",
      }}
    >
      <Grid container spacing={3} sx={{ justifyContent: "center" }}>
        {/* Destination */}
        <Grid item xs={12} sm={6} md={4} lg={5}>
          <TextField
            select
            label="Destination"
            fullWidth
            value={selectedDestinationId}
            onChange={(e) => setSelectedDestinationId(e.target.value)}
            InputLabelProps={{
              style: { color: muiTheme.palette.text.secondary }, // ✅ النصوص الثانوية
            }}
            InputProps={{
              style: { color: muiTheme.palette.text.secondary }, // ✅ النصوص الأساسية
            }}
            SelectProps={{
              MenuProps: {
                PaperProps: {
                  sx: {
                    borderRadius: "20px",
                    backgroundColor: muiTheme.palette.background.default, // ✅ خلفية القائمة من الثيم
                    color: muiTheme.palette.text.primary, // ✅ النصوص من الثيم
                  },
                },
              },
            }}
            sx={{
              width:"200px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: muiTheme.palette.primary.main }, // ✅ اللون الأساسي
                "&:hover fieldset": {
                  borderColor: muiTheme.palette.secondary.main,
                }, // ✅ اللون الثانوي عند hover
                "&.Mui-focused fieldset": {
                  borderColor: muiTheme.palette.secondary.main,
                },
              },
            }}
          >
            {cities.map((dest) => (
              <MenuItem key={dest.id} value={dest}>
                {dest.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* زر البحث */}
       
        {/* Duration */}
       {/* Duration */}
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <TextField
          label="Duration (Days)"
          value={duration || ""}
          onClick={handleDurationClick}
          fullWidth
          readOnly
          InputLabelProps={{ style: { color: muiTheme.palette.text.secondary } }}
          InputProps={{ style: { color: muiTheme.palette.text.secondary } }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: muiTheme.palette.primary.main },
              "&:hover fieldset": { borderColor: muiTheme.palette.secondary.main },
              "&.Mui-focused fieldset": { borderColor: muiTheme.palette.secondary.main },
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
          <Box sx={{ width: 250 }}>
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
              sx={{
                mt: 2,
                backgroundColor: muiTheme.palette.primary.main,
                color: muiTheme.palette.getContrastText(muiTheme.palette.primary.main),
                "&:hover": { backgroundColor: muiTheme.palette.secondary.main },
              }}
              onClick={handleDurationClose}
            >
              Done
            </Button>
          </Box>
        </Popover>
      </Grid>

      {/* Price Range */}
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <TextField
          label="Price Range ($)"
          value={`$${priceRange[0]} - $${priceRange[1]}`}
          onClick={handlePriceClick}
          fullWidth
          readOnly
          InputLabelProps={{ style: { color: muiTheme.palette.text.secondary } }}
          InputProps={{ style: { color: muiTheme.palette.text.secondary } }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: muiTheme.palette.primary.main },
              "&:hover fieldset": { borderColor: muiTheme.palette.secondary.main },
              "&.Mui-focused fieldset": { borderColor: muiTheme.palette.secondary.main },
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
          <Box sx={{ width: 250 }}>
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
                  color: muiTheme.palette.getContrastText(muiTheme.palette.primary.main),
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
              sx={{
                mt: 2,
                backgroundColor: muiTheme.palette.primary.main,
                color: muiTheme.palette.getContrastText(muiTheme.palette.primary.main),
                "&:hover": { backgroundColor: muiTheme.palette.secondary.main },
              }}
              onClick={handlePriceClose}
            >
              Done
            </Button>
          </Box>
        </Popover>
      </Grid>
        {/* Category */}
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <TextField
          select
          label="Category"
          fullWidth
          value={selectedCategories}
          onChange={(e) => setSelectedCategories(e.target.value)}
          InputLabelProps={{ style: { color: muiTheme.palette.text.secondary } }}
          InputProps={{
            style: { color: muiTheme.palette.text.secondary },
          }}
          SelectProps={{
            MenuProps: {
              PaperProps: {
                sx: {
                  borderRadius: "20px",
                  backgroundColor: muiTheme.palette.background.paper, // ✅ خلفية القائمة من الثيم
                  color: muiTheme.palette.text.primary, // ✅ النصوص من الثيم
                },
              },
            },
          }}
          sx={{
            width:"200px",
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: muiTheme.palette.primary.main },
              "&:hover fieldset": { borderColor: muiTheme.palette.secondary.main },
              "&.Mui-focused fieldset": { borderColor: muiTheme.palette.secondary.main },
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
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Event
              sx={{
                color: muiTheme.palette.primary.main, // ✅ الأيقونة من اللون الأساسي
                display: { xs: "inline-flex", sm: "none" },
              }}
            />
            <input
              type="date"
              id="start-date"
              name="start-date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={today}
              style={{
                backgroundColor: muiTheme.palette.background.default, // ✅ خلفية من الثيم
                color: muiTheme.palette.text.secondary, // ✅ النصوص من الثيم
                border: `2px solid ${muiTheme.palette.primary.main}`, // ✅ الحدود من اللون الأساسي
                borderRadius: "8px",
                padding: "14px",
                fontSize: "16px",
                width: "100%",
                outline: "none",
              }}
            />
          </Box>
        </Box>
      </Grid>
        {/* Search Button */}
           <Grid item xs={12}>
      <Box display="flex" justifyContent="center">
        <Button
          onClick={handleSearch}
          variant="contained"
          size="large"
          disabled={
            !selectedDestinationId ||
            !duration ||
            !selectedCategories ||
            !date ||
            !priceRange
          }
          sx={{
            backgroundColor: muiTheme.palette.primary.main, // ✅ اللون الأساسي من الثيم
            color: muiTheme.palette.getContrastText(muiTheme.palette.primary.main), // ✅ النصوص متناسقة مع الخلفية
            fontWeight: "bold",
            borderRadius: "8px",
            px: 4,
            py: 1.5,
            textTransform: "none",
            boxShadow: `0 4px 10px ${muiTheme.palette.primary.main}50`, // ✅ ظل بنفس لون الثيم
            "&:hover": {
              backgroundColor: muiTheme.palette.secondary.main, // ✅ اللون الثانوي عند الـ hover
            },
          }}
        >
          <BiSearch style={{ fontSize: "18px", marginRight: "8px" }} /> Search
        </Button>
      </Box>
    </Grid>
      </Grid>
    </Box>
  );
}
