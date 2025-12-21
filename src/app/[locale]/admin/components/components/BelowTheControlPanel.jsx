"use client";
import React from "react";
import {
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useTheme } from "@mui/material/styles"; // ✅ استدعاء الثيم

const BelowTheControlPanel = ({
  categories,
  cities,
  categoryId,
  cityId,
  handleChange,
}) => {
  const router = useRouter();
  const muiTheme = useTheme(); // ✅ يجيب الثيم الحالي

  return (
    <>
      {/* 🏷️ اختيار التصنيف */}
      <FormControl
        fullWidth
        required
        sx={{
          "& .MuiInputBase-input": {
            color: muiTheme.palette.text.primary, // ✅ النصوص من الثيم
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
        <InputLabel id="category-select-label">اختر التصنيف</InputLabel>
        <Select
          labelId="category-select-label"
          id="category-select"
          name="categoryId"
          value={categoryId}
          onChange={handleChange}
        >
          {categories.map((cat) => (
            <MenuItem key={cat.id} value={cat.id}>
              {cat.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* 🏙️ اختيار المدينة */}
      <FormControl
        fullWidth
        required
        sx={{
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
        <InputLabel id="city-select-label">اختر المدينة</InputLabel>
        <Select
          labelId="city-select-label"
          id="city-select"
          name="cityId"
          value={cityId}
          onChange={handleChange}
        >
          {cities.map((city) => (
            <MenuItem key={city.id} value={city.id}>
              {city.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default BelowTheControlPanel;
