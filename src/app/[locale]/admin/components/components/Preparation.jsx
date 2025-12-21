"use client";
import React from "react";
import { TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles"; // ✅ استدعاء الثيم

const Preparation = ({ formData, handleChange }) => {
  const muiTheme = useTheme(); // ✅ يجيب الثيم الحالي

  return (
    <div className="flex flex-row gap-8">
      {/* 👥 عدد الأشخاص */}
      <TextField
        label="عدد الأشخاص"
        type="number"
        name="people"
        value={formData.people || "0"}
        disabled
        onChange={handleChange}
        fullWidth
        required
        sx={{
          width: "35%",
          input: {
            color: muiTheme.palette.text.primary, // ✅ النصوص من الثيم
            fontSize: "18px",
            fontWeight: "bold",
            fontFamily: "Cairo, sans-serif",
          },
          "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
            WebkitAppearance: "none",
            margin: 0,
          },
          "& input": {
            MozAppearance: "textfield",
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
      />
    </div>
  );
};

export default Preparation;
