"use client";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { TextField, Button, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { useTheme } from "@mui/material/styles"; // ✅ استدعاء الثيم

// ✅ منع اللغة العربية
const containsArabic = (text) => /[\u0600-\u06FF]/.test(text);

const TripProgram = ({ tripDuration, programs, setPrograms }) => {
  const muiTheme = useTheme(); // ✅ يجيب الثيم الحالي

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
                    color: muiTheme.palette.text.primary,
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
                    color: muiTheme.palette.text.primary,
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
            </div>
          ))}

          <Button
            onClick={() => handleAddProgram(null)}
            variant="contained"
            sx={{
              mt: "10px",
              backgroundColor: muiTheme.palette.secondary.main,
              color: muiTheme.palette.getContrastText(muiTheme.palette.secondary.main),
              fontWeight: "bold",
              fontSize: "16px",
              fontFamily: "Cairo, sans-serif",
              "&:hover": { backgroundColor: muiTheme.palette.primary.main },
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
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: muiTheme.palette.secondary.main,
              }}
            >
              Day {day.day}
            </Typography>

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
                      color: muiTheme.palette.text.primary,
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
                      color: muiTheme.palette.text.primary,
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
              </div>
            ))}

            <Button
              onClick={() => handleAddProgram(dayIndex)}
              variant="contained"
              sx={{
                mt: "10px",
                backgroundColor: muiTheme.palette.secondary.main,
                color: muiTheme.palette.getContrastText(muiTheme.palette.secondary.main),
                fontWeight: "bold",
                fontSize: "16px",
                fontFamily: "Cairo, sans-serif",
                "&:hover": { backgroundColor: muiTheme.palette.primary.main },
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
