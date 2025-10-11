"use client";
import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import { FaDollarSign } from "react-icons/fa6";
import { FaRegCalendarAlt } from "react-icons/fa";
import { toast } from "react-toastify";

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

  return (
    <>
      <TextField
        label="عنوان الرحلة"
        name="title"
        value={formData.title || ""}
        onChange={handleEnglishOnlyChange}
        sx={{
          width: "100%",
          input: {
            color: "#d4a85f",
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
        fullWidth
        required
      />

      <TextField
        label="معلومات عن المعبد او المكان السياحي"
        name="description"
        value={formData.description || ""}
        onChange={handleEnglishOnlyChange}
        multiline
        rows={3}
        sx={{
          "& .MuiInputBase-input": {
            color: "#d4a85f",
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
        fullWidth
        required
      />

      <div className="flex flex-row gap-2">
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
                <FaDollarSign style={{ color: "#d4a85f", fontSize: "20px" }} />
              </InputAdornment>
            ),
          }}
          inputProps={{ max: 1000, min: 0 }}
          sx={{
            width: "18%",
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
        <TextField
          label="نسبة الخصم %"
          name="rival"
          type="number"
          value={formData.rival || ""}
          onChange={(e) => {
            const value = e.target.value;
            setFormData((prev) => ({
              ...prev,
              rival: value, // ✅ تخزين كنص
            }));
          }}
          onBlur={(e) => {
            const value = e.target.value;
            const numericValue = parseFloat(value);
            if (numericValue > 100) {
              toast.error("❌ نسبة الخصم يجب أن تكون أقل من أو تساوي 100%");
              setFormData((prev) => ({
                ...prev,
                rival: "", // ✅ مسح القيمة إذا كانت غير صالحة
              }));
            }
          }}
          required
          inputProps={{
            min: 0,
            max: 100,
            step: 1,
          }}
          sx={{
            width: "25%",
            input: {
              color: "#d4a85f",
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
        />

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
                  style={{ color: "#ff9800", fontSize: "20px" }}
                />
              </InputAdornment>
            ),
          }}
          sx={{
            width: "20%",
            input: {
              color: "#d4a85f",
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
        />
        <TextField
          label="عدد الأيام"
          name="TripDuration"
          type="text" // نستخدم "text" للتحكم الكامل في الإدخال
          value={formData.TripDuration || ""}
          onChange={(e) => {
            // إزالة أي رموز أو حروف غير رقمية
            const cleaned = e.target.value.replace(/[^0-9]/g, "");

            // تحديد الحد الأقصى (اختياري)
            const limited = cleaned.slice(0, 2); // مثلًا لا يزيد عن رقمين

            setFormData((prev) => ({
              ...prev,
              TripDuration: limited, // تخزين كنص رقمي فقط
            }));
          }}
          inputProps={{
            inputMode: "numeric",
            maxLength: 2,
          }}
          required
          sx={{
            width: "15%",
            input: {
              color: "#d4a85f",
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
        />
      </div>
    </>
  );
};

export default TopOfTheControlPanel2;
