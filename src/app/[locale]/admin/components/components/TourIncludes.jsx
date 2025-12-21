"use client";
import { TextField, Button } from "@mui/material";
import { toast } from "react-toastify";
import { useTheme } from "@mui/material/styles"; // ✅ استدعاء الثيم

// ✅ دالة التحقق من وجود حروف عربية
const containsArabic = (text) => /[\u0600-\u06FF]/.test(text);

const TourIncludes = ({ includes = [1], setIncludes }) => {
  const muiTheme = useTheme(); // ✅ يجيب الثيم الحالي

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
      ))}

      <Button
        onClick={handleAdd}
        variant="contained"
        sx={{
          mt: "10px",
          backgroundColor: muiTheme.palette.secondary.main, // ✅ زر من الثيم
          color: muiTheme.palette.getContrastText(muiTheme.palette.secondary.main),
          fontWeight: "bold",
          fontSize: "16px",
          fontFamily: "Cairo, sans-serif",
          "&:hover": { backgroundColor: muiTheme.palette.primary.main },
        }}
      >
        ➕ إضافة بند جديد
      </Button>
    </div>
  );
};

export default TourIncludes;
