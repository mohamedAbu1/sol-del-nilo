"use client";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { TextField, Button } from "@mui/material";
import { toast } from "react-toastify";

// ✅ دالة التحقق من وجود حروف عربية
const containsArabic = (text) => /[\u0600-\u06FF]/.test(text);

const TripProgram = ({ programs, setPrograms }) => {
  // ✅ تحديث قيمة الحقول مع منع اللغة العربية في "النشاط"
  const handleChange2 = (index, field, value) => {
    const updated = [...programs];
    updated[index][field] = value;
    setPrograms(updated);
  };

  // ✅ إضافة مجموعة جديدة من الحقول
  const handleAdd = () => {
    setPrograms([...programs, { time: "", program: "" }]);
  };

  return (
    <div className="space-y-4">
      {programs.map((item, index) => (
        <div key={index} className="flex gap-4">
          {/* 🕒 حقل الوقت */}
          <TextField
            label="الوقت"
            type="time"
            value={item.time || ""}
            onChange={(e) => handleChange2(index, "time", e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{
              width: "18%",
              input: {
                color: "#d4a85f",
                fontSize: "18px",
                fontWeight: "bold",
                fontFamily: "Cairo, sans-serif",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#ff9800" },
                "&:hover fieldset": { borderColor: "#ff9800" },
                "&.Mui-focused fieldset": {
                  borderColor: "#d4a85f",
                  borderWidth: "2px",
                },
              },
              "& .MuiInputLabel-root": { color: "#d4a85f" },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#ff9800",
              },
            }}
          />

          {/* 📝 حقل النشاط مع منع اللغة العربية */}
          <TextField
            label="النشاط"
            type="text"
            value={item.program || ""}
            onInput={(e) => {
              const value = e.target.value;
              const cleanValue = value.replace(/[\u0600-\u06FF]/g, "");
              if (value !== cleanValue) {
                toast.error("❌ يمنع استخدام اللغة العربية");
              }
              handleChange2(index, "program", cleanValue);
            }}
            sx={{
              width: "80%",
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
        </div>
      ))}

      {/* ➕ زر إضافة نشاط جديد */}
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
        ➕ إضافة نشاط جديد
      </Button>
    </div>
  );
};

export default TripProgram;
