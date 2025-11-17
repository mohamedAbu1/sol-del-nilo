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
  const handleSearch = () => {
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
        border: "1px solid #fff",
        backgroundColor: "rgba(0,0,0,0.4)",
        mx: "auto",
      }}
    >
      <Grid
        container
        spacing={3}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {/* Destination */}
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
          sx={{
            flex: "60px", // ✅ عرض مرن يبدأ من 220px
            minWidth: "60px",
            maxWidth: "100%",
          }}
        >
          <TextField
            select
            label="Destination"
            fullWidth
            value={selectedDestinationId}
            placeholder={"mohamed"}
            onChange={(e) => setSelectedDestinationId(e.target.value)}
            InputLabelProps={{ style: { color: "#f5f5f5" } }}
            InputProps={{
              style: { color: "#ffffff" },
              // startAdornment: (
              //   <InputAdornment
              //     position="start"
              //     sx={{ display: { xs: "inline-flex", sm: "none" } }}
              //   >
              //     <LocationOn sx={{ color: "#ff9800" }} />
              //   </InputAdornment>
              // ),
            }} 
            SelectProps={{
              IconComponent: () => (
                <svg
                  style={{ fill: "#ff9800" }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M7 10l5 5 5-5z" />
                </svg>
              ),
              MenuProps: {
                PaperProps: {
                  sx: {
                    borderRadius: "20px",
                    backgroundColor: "#212121",
                    color: "#fff",
                  },
                },
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#ff9800" },
                "&:hover fieldset": { borderColor: "#ff9800" },
                "&.Mui-focused fieldset": { borderColor: "#ff9800" },
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
        {/* Duration */}
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
          sx={{
            flex: "120px", // ✅ عرض مرن يبدأ من 220px
            minWidth: "120px",
            maxWidth: "100%",
          }}
        >
          <TextField
            label="Duration (Days)"
            value={duration || ""}
            onClick={handleDurationClick}
            fullWidth
            readOnly
            InputLabelProps={{ style: { color: "#f5f5f5" } }} // لون label
            InputProps={{ style: { color: "#ffffff" } }} // لون النص
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#ff9800", // الحدود العادية
                },
                "&:hover fieldset": {
                  borderColor: "#ff9800", // عند المرور
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#ff9800", // عند التحديد
                },
              },
            }}
          />

          <Popover
            open={openDuration}
            anchorEl={anchorElDuration}
            onClose={handleDurationClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            PaperProps={{
              sx: {
                backgroundColor: "#212121", // خلفية داكنة
                color: "#fff", // نص أبيض
                borderRadius: "20px", // حواف ناعمة
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
                sx={{
                  color: "#ff9800", // لون الـ Slider
                }}
              />
              <Button
                variant="contained"
                size="small"
                sx={{
                  mt: 2,
                  backgroundColor: "#ff9800",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#ffa726",
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
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
          sx={{
            flex: "120px", // ✅ عرض مرن يبدأ من 220px
            minWidth: "120px",
            maxWidth: "100%",
          }}
        >
          <TextField
            label="Price Range ($)"
            value={`$${priceRange[0]} - $${priceRange[1]}`}
            onClick={handlePriceClick}
            fullWidth
            readOnly
            InputLabelProps={{ style: { color: "#f5f5f5" } }} // لون label
            InputProps={{ style: { color: "#ffffff" } }} // لون النص
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#ff9800", // ✅ الحدود العادية
                },
                "&:hover fieldset": {
                  borderColor: "#ff9800", // ✅ عند المرور
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#ff9800", // ✅ عند التحديد
                },
              },
            }}
          />

          <Popover
            open={openPrice}
            anchorEl={anchorElPrice}
            onClose={handlePriceClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            PaperProps={{
              sx: {
                backgroundColor: "#212121", // ✅ خلفية داكنة
                color: "#fff", // ✅ نص أبيض
                borderRadius: "20px", // ✅ حواف ناعمة
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
                  color: "#ff9800", // ✅ لون الشريط والمؤشر
                  "& .MuiSlider-valueLabel": {
                    color: "#fff", // ✅ لون الرقم داخل الفقاعة
                    backgroundColor: "#ff9800",
                    borderRadius: "4px",
                    fontWeight: "bold",
                  },
                  "& .MuiSlider-markLabel": {
                    color: "#fff", // ✅ لون الأرقام الثابتة تحت الشريط
                  },
                }}
              />
              <Button
                variant="contained"
                size="small"
                sx={{
                  mt: 2,
                  backgroundColor: "#ff9800",
                  color: "#000",
                  "&:hover": {
                    backgroundColor: "#ffa726",
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
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
          sx={{
            flex: "60px", // ✅ عرض مرن يبدأ من 220px
            minWidth: "60px",
            maxWidth: "100%",
          }}
        >
          <TextField
            select
            label="Category"
            fullWidth
            value={selectedCategories}
            onChange={(e) => setSelectedCategories(e.target.value)}
            InputLabelProps={{ style: { color: "#f5f5f5" } }}
            InputProps={{
              style: { color: "#ffffff" },
              // startAdornment: (
              //   <InputAdornment
              //     position="start"
              //     sx={{ display: { xs: "inline-flex", sm: "none" } }}
              //   >
              //     <Category sx={{ color: "#ff9800" }} />
              //   </InputAdornment>
              // ),
            }}
            SelectProps={{
              IconComponent: () => (
                <svg
                  style={{ fill: "#ff9800" }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M7 10l5 5 5-5z" />
                </svg>
              ),
              MenuProps: {
                PaperProps: {
                  sx: {
                    borderRadius: "20px",
                    backgroundColor: "#212121",
                    color: "#fff",
                  },
                },
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#ff9800" },
                "&:hover fieldset": { borderColor: "#ff9800" },
                "&.Mui-focused fieldset": { borderColor: "#ff9800" },
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
          <Box className="custom-date-wrapper" sx={{ width: "100%" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Event
                sx={{
                  color: "#ff9800",
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
                  backgroundColor: "transparent",
                  color: "#ffffff",
                  border: "2px solid #ff9800",
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
              sx={{
                backgroundColor: "#ff9800",
                color: "#fff",
                fontWeight: "bold",
                borderRadius: "8px",
                px: 4,
                py: 1.5,
                textTransform: "none",
                boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                "&:hover": {
                  backgroundColor: "#ffa726",
                },
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
