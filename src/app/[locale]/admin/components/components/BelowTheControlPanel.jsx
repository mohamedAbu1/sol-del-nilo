import React, { useState, useEffect } from "react";
import {
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useRouter } from "next/navigation";

const BelowTheControlPanel = ({
  categories,
  cities,
  categoryId,
  cityId,
  handleChange,
}) => {
  const router = useRouter();
console.log(categories)
  return (
    <>
      {/* 🏷️ اختيار التصنيف */}
      <FormControl
        fullWidth
        required
        sx={{
          "& .MuiInputBase-input": {
            color: "#d4a85f", // ✅ لون النص داخل الحقل
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
            color: "#d4a85f", // ✅ لون النص داخل الحقل
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
