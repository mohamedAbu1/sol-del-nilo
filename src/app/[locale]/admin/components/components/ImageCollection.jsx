"use client";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Box, Button, TextField } from "@mui/material";
import { toast } from "react-toastify";

const ImageCollection = ({ activityImages, setActivityImages }) => {
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    console.log("🟠 [handleImageChange] raw files:", files);

    const remainingSlots = 25 - activityImages.length;
    const totalAfter = activityImages.length + files.length;

    if (totalAfter < 2) {
      toast.error("❌ يجب أن تختار أكثر من صورتين");
      return;
    }

    const limitedFiles = files.slice(0, Math.max(0, remainingSlots));

    const newImages = limitedFiles.map((file, idx) => {
      const obj = {
        name: file.name,       // اسم الصورة فقط
        label: "",             // وصف أو اسم مخصص
        url: `/assets/${file.name}`, // المسار المحلي للعرض والاستخدام لاحقًا
      };
      console.log(`🟢 [handleImageChange] newImage[${idx}]:`, obj);
      return obj;
    });

    const nextState = [...activityImages, ...newImages];
    console.log("🟢 [handleImageChange] next activityImages:", nextState);

    setActivityImages(nextState);
  };

  const handleRemoveImage = (index) => {
    const imageToRemove = activityImages[index];
    console.log("🟠 [handleRemoveImage] remove index:", index, imageToRemove);
    const next = activityImages.filter((_, i) => i !== index);
    console.log("🟢 [handleRemoveImage] next activityImages:", next);
    setActivityImages(next);
  };

  const handleChangeName = (index, newName) => {
    setActivityImages((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, name: newName } : item
      )
    );
  };

  const handleChangeLabel = (index, newLabel) => {
    setActivityImages((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, label: newLabel } : item
      )
    );
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
          اختر مجموعة الصور التي تريدها للرحلة
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
              onClick={() => handleRemoveImage(index)}
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
              alt={`preview-${index}`}
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "12px",
                objectFit: "contain",
              }}
            />

            <TextField
              value={img.name}
              onChange={(e) => handleChangeName(index, e.target.value)}
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
              onChange={(e) => handleChangeLabel(index, e.target.value)}
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
