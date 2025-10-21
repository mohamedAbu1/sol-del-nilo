"use client";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Box, Button, TextField } from "@mui/material";
import { toast } from "react-toastify";
const ImageCollection = ({ activityImages, setActivityImages }) => {
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const remainingSlots = 12 - activityImages.length;

    if (activityImages.length + files.length < 2) {
      toast.error("❌ يجب ان تختار اكثر من صورتين");
      return;
    }

    const limitedFiles = files.slice(0, remainingSlots);
    const newImages = limitedFiles.map((file) => ({
      name: file.name, // ✅ اسم الملف الأصلي
      label: "", // ✅ وصف خاص إن أردت
      url: URL.createObjectURL(file), // ✅ للعرض
      file,
    }));

    setActivityImages((prev) => [...prev, ...newImages]);
  };

  return (
    <Box>
      <input
        accept="image/*"
        type="file"
        multiple
        onChange={handleImageChange}
        style={{ display: "none" }}
        id="upload-images-collection"
      />
      <label htmlFor="upload-images-collection">
        <Button
          variant="contained"
          component="span"
          sx={{
            backgroundColor: "#ff9800",
            color: "#ffffff",
            fontSize: "18px",
            fontWeight: "700",
          }}
        >
          اختر مجوعة الصور التي تريدها للرحله
        </Button>
      </label>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, mt: 3 }}>
        {activityImages.map((img, index) => (
          <Box
            key={index}
            position="relative"
            sx={{ width: "auto", maxWidth: "300px" }}
          >
            <Button
              size="small"
              onClick={() => {
                setActivityImages((prev) => prev.filter((_, i) => i !== index));
                URL.revokeObjectURL(img.url);
              }}
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                minWidth: "30px",
                padding: "2px",
                color: "#ff9800",
                borderRadius: "50%",
                zIndex: 1,
              }}
            >
              <AiOutlineClose style={{ fontSize: "22px" }} />
            </Button>

            <img
              src={img.url}
              alt={`image-${index}`}
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "12px",
                objectFit: "contain",
              }}
            />

            <TextField
              value={img.name}
              onChange={(e) => {
                const newName = e.target.value;
                setActivityImages((prev) =>
                  prev.map((item, i) =>
                    i === index ? { ...item, name: newName } : item
                  )
                );
              }}
              placeholder="اسم الصورة"
              variant="outlined"
              size="small"
              sx={{
                mt: 1,
                width: "100%",
                input: {
                  color: "#d4a85f",
                  fontSize: "14px",
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
              }}
            />

            <TextField
              value={img.label}
              onChange={(e) => {
                const newLabel = e.target.value;
                setActivityImages((prev) =>
                  prev.map((item, i) =>
                    i === index ? { ...item, label: newLabel } : item
                  )
                );
              }}
              placeholder="اسم خاص للصورة"
              variant="outlined"
              size="small"
              sx={{
                mt: 1,
                width: "100%",
                input: {
                  color: "#d4a85f",
                  fontSize: "14px",
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
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ImageCollection;
