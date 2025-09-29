"use client";
import { TextField, Button } from "@mui/material";
import { toast } from "react-toastify";

// ✅ دالة التحقق من وجود حروف عربية
const containsArabic = (text) => /[\u0600-\u06FF]/.test(text);

const TourIncludes = ({ includes = [1], setIncludes }) => {
  // ✅ تحديث قيمة عنصر معين مع منع اللغة العربية
  const handleChange = (index, value) => {
    const cleanValue = value.replace(/[\u0600-\u06FF]/g, "");
    if (value !== cleanValue) {
      toast.error("❌ يمنع استخدام اللغة العربية");
    }

    const updated = [...includes];
    updated[index].text = cleanValue;
    setIncludes(updated);
  };

  // ✅ إضافة عنصر جديد
  const handleAdd = () => {
    setIncludes([...includes, { text: "" }]);
  };

  return (
    <div className="space-y-4">
      {includes.map((item, index) => (
        <TextField
          key={index}
          label={`يشمل البرنامج - ${index + 1}`}
          value={item.text || ""}
          onInput={(e) => handleChange(index, e.target.value)}
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
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#ff9800",
            },
          }}
        />
      ))}

      <Button
        onClick={handleAdd}
        variant="contained"
        sx={{
          mt: "10px",
          backgroundColor: "#ff9800",
          fontWeight: "bold",
          fontSize: "16px",
          fontFamily: "Cairo, sans-serif",
          "&:hover": { backgroundColor: "#d4a85f" },
        }}
      >
        ➕ إضافة بند جديد
      </Button>
    </div>
  );
};

export default TourIncludes;
