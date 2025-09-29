import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Box, Button } from "@mui/material";
const ControlPanelImages = ({ selectedImages,setSelectedImages }) => {
  // 📤 تحميل الصور من الجهاز
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const remainingSlots = 12 - selectedImages.length;

    if (
      selectedImages.length + files.length > 10 ||
      selectedImages.length + files.length < 2
    ) {
      toast.error("❌ يجب اختيار ما بين 2 إلى 10 صورة.");
      return;
    }

    const limitedFiles = files.slice(0, remainingSlots);
    const newImages = limitedFiles.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
      file,
    }));

    setSelectedImages((prev) => [...prev, ...newImages]);
  };
  return (
    <>
      {/* 🖼️ تحميل الصور */}
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
              backgroundColor: "#ff9800",
              color: "#ffffff",
              fontSize: "18px",
              fontWeight: "700",
            }}
          >
            اختر صور من جهازك
          </Button>
        </label>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 2 }}>
          {selectedImages.map((img, index) => (
            <Box key={index} position="relative" sx={{ width: "150px" }}>
              <Button
                size="small"
                onClick={() => {
                  setSelectedImages((prev) =>
                    prev.filter((_, i) => i !== index)
                  );
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
                alt={img.name}
                style={{ width: "100%", borderRadius: "8px" }}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default ControlPanelImages;
