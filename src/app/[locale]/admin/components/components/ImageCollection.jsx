"use client";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Box, Button, TextField } from "@mui/material";
import { toast } from "react-toastify";
import { useTheme } from "@mui/material/styles"; // ✅ استدعاء الثيم

const ImageCollection = ({ activityImages, setActivityImages }) => {
  const muiTheme = useTheme(); // ✅ يجيب الثيم الحالي

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const remainingSlots = 25 - activityImages.length;
    const totalAfter = activityImages.length + files.length;

    if (totalAfter < 2) {
      toast.error("❌ يجب أن تختار أكثر من صورتين");
      return;
    }

    const limitedFiles = files.slice(0, Math.max(0, remainingSlots));

    const newImages = limitedFiles.map((file) => ({
      name: file.name,
      label: "",
      url: `/assets/${file.name}`,
    }));

    setActivityImages([...activityImages, ...newImages]);
  };

  const handleRemoveImage = (index) => {
    setActivityImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleChangeName = (index, newName) => {
    setActivityImages((prev) =>
      prev.map((item, i) => (i === index ? { ...item, name: newName } : item))
    );
  };

  const handleChangeLabel = (index, newLabel) => {
    setActivityImages((prev) =>
      prev.map((item, i) => (i === index ? { ...item, label: newLabel } : item))
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
            backgroundColor: muiTheme.palette.secondary.main,
            color: muiTheme.palette.getContrastText(muiTheme.palette.secondary.main),
            fontSize: "18px",
            fontWeight: "700",
            "&:hover": {
              backgroundColor: muiTheme.palette.primary.main,
            },
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
            sx={{
              width: "auto",
              maxWidth: "300px",
              border: `1px solid ${muiTheme.palette.divider}`,
              borderRadius: "12px",
              p: 1,
            }}
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
                color: muiTheme.palette.secondary.main,
                borderRadius: "50%",
                zIndex: 1,
                "&:hover": {
                  color: muiTheme.palette.primary.main,
                },
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

            {/* اسم الصورة */}
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
                  color: muiTheme.palette.text.primary,
                  fontSize: "14px",
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

            {/* اسم خاص للصورة */}
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
                  color: muiTheme.palette.text.primary,
                  fontSize: "14px",
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
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ImageCollection;
