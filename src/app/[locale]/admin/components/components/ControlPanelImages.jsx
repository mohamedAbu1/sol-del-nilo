import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Box, Button, TextField } from "@mui/material";
import { toast } from "react-toastify";

const ControlPanelImages = ({ selectedImages, setSelectedImages }) => {
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
      name: file.name, // ✅ تعبئة تلقائية باسم الصورة    
      label: "", // ✅ وصف خاص للصورة
      url: URL.createObjectURL(file),
      file,
    }));

    setSelectedImages((prev) => [...prev, ...newImages]);
  };
console.log(selectedImages)
  return (

    <>
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
                alt={`image-${index}`}
                style={{ width: "100%", borderRadius: "8px" }}
              />

              {/* حقل اسم الصورة */}
              <TextField
                value={img.name}
                onChange={(e) => {
                  const newName = e.target.value;
                  setSelectedImages((prev) =>
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

              {/* حقل الاسم الخاص للصورة */}
              <TextField
                value={img.label}
                onChange={(e) => {
                  const newLabel = e.target.value;
                  setSelectedImages((prev) =>
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
    </>
  );
};

export default ControlPanelImages;
