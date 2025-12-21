"use client";
import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import { FaDollarSign } from "react-icons/fa6";
import { FaRegCalendarAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { useTheme } from "@mui/material/styles"; // ✅ استدعاء الثيم
// ✅ دالة التحقق من وجود حروف عربية
const containsArabic = (text) => /[\u0600-\u06FF]/.test(text);

const TopOfTheControlPanel2 = ({ formData, handleChange, setFormData }) => {
  // ✅ دالة تمنع اللغة العربية وتعرض Toast
  const handleEnglishOnlyChange = (e) => {
    const { name, value } = e.target;
    const textFields = ["title", "description", "rival", "TripDuration"];
    if (textFields.includes(name) && containsArabic(value)) {
      toast.error("❌ يجب الكتابة باللغة الإنجليزية فقط");
      return;
    }

    handleChange(e); // تحديث الحالة الأصلية
  };
  const muiTheme = useTheme(); // ✅ يجيب الثيم الحالي

  return (
    <>
      {/* عنوان الرحلة */}
      <TextField
        label="عنوان الرحلة"
        name="title"
        value={formData.title || ""}
        onChange={handleEnglishOnlyChange}
        fullWidth
        required
        sx={{
          width: "100%",
          input: {
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
      />

      {/* وصف المكان السياحي */}
      <TextField
        label="معلومات عن المعبد او المكان السياحي"
        name="description"
        value={formData.description || ""}
        onChange={handleEnglishOnlyChange}
        multiline
        rows={3}
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
      />

      <div className="flex flex-row gap-2">
      {/* السعر بالدولار */}
      <TextField
        label="ثمن الرحله للفرد بالدولار"
        name="price"
        type="number"
        value={formData.price || ""}
        onChange={handleChange}
        required
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <FaDollarSign
                style={{ color: muiTheme.palette.secondary.main, fontSize: "20px" }}
              />
            </InputAdornment>
          ),
        }}
        inputProps={{ max: 1000, min: 0 }}
        sx={{
          width: "18%",
          input: {
            color: muiTheme.palette.text.primary,
            fontSize: "18px",
            fontWeight: "bold",
            fontFamily: "Cairo, sans-serif",
          },
          "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
            WebkitAppearance: "none",
            margin: 0,
          },
          "& input": { MozAppearance: "textfield" },
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

      {/* نسبة الخصم */}
      <TextField
        label="نسبة الخصم %"
        name="rival"
        type="number"
        value={formData.rival || ""}
        onChange={(e) => {
          const value = e.target.value;
          setFormData((prev) => ({ ...prev, rival: value }));
        }}
        onBlur={(e) => {
          const value = e.target.value;
          const numericValue = parseFloat(value);
          if (numericValue > 100) {
            toast.error("❌ نسبة الخصم يجب أن تكون أقل من أو تساوي 100%");
            setFormData((prev) => ({ ...prev, rival: "" }));
          }
        }}
        required
        inputProps={{ min: 0, max: 100, step: 1 }}
        sx={{
          width: "25%",
          input: {
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
      />

      {/* التاريخ المقترح */}
      <TextField
        label="التاريخ المقترح"
        name="theDate"
        type="date"
        value={formData.theDate || ""}
        onChange={handleChange}
        focused
        required
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <FaRegCalendarAlt
                style={{ color: muiTheme.palette.primary.main, fontSize: "20px" }}
              />
            </InputAdornment>
          ),
        }}
        sx={{
          width: "20%",
          input: {
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
      />

      {/* عدد الأيام */}
      <TextField
        label="عدد الأيام"
        name="TripDuration"
        type="text"
        value={formData.TripDuration || ""}
        onChange={(e) => {
          const cleaned = e.target.value.replace(/[^0-9]/g, "");
          const limited = cleaned.slice(0, 2);
          const days = Number(limited);

          setFormData((prev) => {
            let updatedProgram;
            if (days <= 1) {
              updatedProgram = [{ id: 1, time: "", program: "" }];
            } else {
              updatedProgram = Array.from({ length: days }, (_, index) => ({
                day: index + 1,
                programs: [{ time: "", program: "" }],
              }));
            }
            return { ...prev, TripDuration: limited, tripprogram: updatedProgram };
          });
        }}
        inputProps={{ inputMode: "numeric", maxLength: 2 }}
        required
        sx={{
          width: "15%",
          input: {
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
      />
    </div>
    </>
  );
};

export default TopOfTheControlPanel2;
