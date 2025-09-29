import React from "react";
import { TextField } from "@mui/material";

const Preparation = ({ formData, handleChange }) => {
  return (
    <div className="flex flex-row gap-8">
      {/* ℹ️ معلومات إضافية */}
      <TextField
        label="عدد السياح"
        name="NumberOfParticipants"
        value={formData.NumberOfParticipants || ""}
        type="number"
        onChange={handleChange}
        required
        rows={2}
        sx={{
          width: "25%",
          input: {
            color: "#d4a85f",
            fontSize: "18px",
            fontWeight: "bold",
            fontFamily: "Cairo, sans-serif",
          },
          "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
            {
              WebkitAppearance: "none",
              margin: 0,
            },
          "& input": {
            MozAppearance: "textfield",
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
      />
      {/* 📆 عدد الأيام */}
      <TextField
        label="عدد الأيام"
        type="number"
        name="days"
        value={formData.days || ""}
        onChange={handleChange}
        sx={{
          width: "35%",

          input: {
            color: "#d4a85f",
            fontSize: "18px",
            fontWeight: "bold",
            fontFamily: "Cairo, sans-serif",
          },
          "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
            {
              WebkitAppearance: "none",
              margin: 0,
            },
          "& input": {
            MozAppearance: "textfield",
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
        fullWidth
        required
      />

      {/* 👥 عدد الأشخاص */}
      <TextField
        label="عدد الأشخاص"
        type="number"
        name="people"
        value={formData.people || ""}
        onChange={handleChange}
        sx={{
          width: "35%",
          input: {
            color: "#d4a85f",
            fontSize: "18px",
            fontWeight: "bold",
            fontFamily: "Cairo, sans-serif",
          },
          "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
            {
              WebkitAppearance: "none",
              margin: 0,
            },
          "& input": {
            MozAppearance: "textfield",
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
        fullWidth
        required
      />
    </div>
  );
};

export default Preparation;
