"use client";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { TextField, Button } from "@mui/material";
import { toast } from "react-toastify";

// ✅ منع اللغة العربية
const containsArabic = (text) => /[\u0600-\u06FF]/.test(text);

const TripProgram = ({ tripDuration, programs, setPrograms }) => {
  // ✅ تحديث قيمة الحقول
  const handleChange = (dayIndex, programIndex, field, value) => {
    const updated = [...programs];

    if (tripDuration > 1) {
      updated[dayIndex].programs[programIndex][field] = value;
    } else {
      updated[programIndex][field] = value;
    }

    setPrograms(updated);
  };

  // ✅ إضافة نشاط جديد
  const handleAddProgram = (dayIndex) => {
    const updated = [...programs];

    if (tripDuration > 1) {
      updated[dayIndex].programs.push({ time: "", program: "" });
    } else {
      updated.push({ time: "", program: "" });
    }

    setPrograms(updated);
  };

  return (
    <div className="space-y-10">
      {/* ✅ حالة يوم واحد */}
      {tripDuration <= 1 && (
        <div className="space-y-4">
          {programs.map((item, index) => (
            <div key={index} className="flex gap-4">
              {/* الوقت */}
              <TextField
                label="الوقت"
                type="time"
                value={item.time}
                onChange={(e) =>
                  handleChange(null, index, "time", e.target.value)
                }
                InputLabelProps={{ shrink: true }}
                sx={{
                  width: "18%",
                  input: {
                    color: "#d4a85f",
                    fontSize: "18px",
                    fontWeight: "bold",
                    fontFamily: "Cairo, sans-serif",
                  },
                }}
              />

              {/* النشاط */}
              <TextField
                label="النشاط"
                type="text"
                value={item.program}
                onInput={(e) => {
                  const value = e.target.value;
                  const cleanValue = value.replace(/[\u0600-\u06FF]/g, "");
                  if (value !== cleanValue)
                    toast.error("❌ يمنع استخدام العربية");
                  handleChange(null, index, "program", cleanValue);
                }}
                sx={{
                  width: "80%",
                  input: {
                    color: "#d4a85f",
                    fontSize: "18px",
                    fontWeight: "bold",
                    fontFamily: "Cairo, sans-serif",
                  },
                }}
              />
            </div>
          ))}

          <Button
            onClick={() => handleAddProgram(null)}
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
      )}

      {/* ✅ حالة عدة أيام */}
      {tripDuration > 1 &&
        programs.map((day, dayIndex) => (
          <div key={dayIndex} className="space-y-4">
            <h2 className="text-2xl font-bold text-[#d4a85f]">Day {day.day}</h2>

            {day.programs.map((item, programIndex) => (
              <div key={programIndex} className="flex gap-4">
                {/* الوقت */}
                <TextField
                  label="الوقت"
                  type="time"
                  value={item.time}
                  onChange={(e) =>
                    handleChange(dayIndex, programIndex, "time", e.target.value)
                  }
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    width: "18%",
                    input: {
                      color: "#d4a85f",
                      fontSize: "18px",
                      fontWeight: "bold",
                      fontFamily: "Cairo, sans-serif",
                    },
                  }}
                />

                {/* النشاط */}
                <TextField
                  label="النشاط"
                  type="text"
                  value={item.program}
                  onInput={(e) => {
                    const value = e.target.value;
                    const cleanValue = value.replace(/[\u0600-\u06FF]/g, "");
                    if (value !== cleanValue)
                      toast.error("❌ يمنع استخدام العربية");
                    handleChange(dayIndex, programIndex, "program", cleanValue);
                  }}
                  sx={{
                    width: "80%",
                    input: {
                      color: "#d4a85f",
                      fontSize: "18px",
                      fontWeight: "bold",
                      fontFamily: "Cairo, sans-serif",
                    },
                  }}
                />
              </div>
            ))}

            <Button
              onClick={() => handleAddProgram(dayIndex)}
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
              ➕ إضافة نشاط جديد لليوم {day.day}
            </Button>
          </div>
        ))}
    </div>
  );
};

export default TripProgram;
