"use client";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Box, Button, TextField } from "@mui/material";
import { toast } from "react-toastify";
import { useTheme } from "@mui/material/styles"; // ✅ استدعاء الثيم

const ControlPanelImages = ({ mainImages, setMainImages }) => {
  const muiTheme = useTheme(); // ✅ يجيب الثيم الحالي

  // 📤 تحميل الصور من الجهاز
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const remainingSlots = 12 - mainImages.length;

    if (
      mainImages.length + files.length > 10 ||
      mainImages.length + files.length < 2
    ) {
      toast.error("❌ يجب اختيار ما بين 2 إلى 10 صورة.");
      return;
    }

    const limitedFiles = files.slice(0, remainingSlots);
    const newImages = limitedFiles.map((file) => ({
      name: file.name,
      label: "",
      url: `/assets/${file.name}`,
    }));

    const updatedImages = [...mainImages, ...newImages];
    setMainImages(updatedImages);
  };

  return (
    <Box>
      <input
        accept="image/*"
        type="file"
        multiple
        onChange={handleImageChange}
        style={{ display: "none" }}
        id="upload-multiple-images"
      />
      <label htmlFor="upload-multiple-images">
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
          اختر صور من جهازك
        </Button>
      </label>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 2 }}>
        {Array.isArray(mainImages) &&
          mainImages.map((img, index) => (
            <Box key={index} position="relative" sx={{ width: "150px" }}>
              <Button
                size="small"
                onClick={() => {
                  setMainImages((prev) => prev.filter((_, i) => i !== index));
                }}
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
                alt={`image-${index}`}
                style={{
                  width: "100%",
                  borderRadius: "8px",
                  border: `1px solid ${muiTheme.palette.divider}`,
                }}
              />

              {/* حقل اسم الصورة */}
              <TextField
                value={img.label}
                onChange={(e) => {
                  const newName = e.target.value;
                  setMainImages((prev) =>
                    prev.map((item, i) =>
                      i === index ? { ...item, label: newName } : item
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

              {/* حقل الاسم الخاص للصورة */}
              <TextField
                value={img.name}
                onChange={(e) => {
                  const newLabel = e.target.value;
                  setMainImages((prev) =>
                    prev.map((item, i) =>
                      i === index ? { ...item, name: newLabel } : item
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

export default ControlPanelImages;
