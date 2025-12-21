"use client";
import { useTheme } from "@mui/material/styles";

const DecorativeBorder = () => {
  const muiTheme = useTheme(); // ✅ يجيب الثيم الحالي

  return (
    <div
      style={{ marginBottom: "12px" }}
      className="w-full pt-6"
    >
      {/* ✅ خط علوي بلون من الثيم */}
      <div
        style={{
          borderTop: `2px solid ${muiTheme.palette.secondary.main}`, // ✅ الحدود من الثيم
        }}
        className="w-full"
      />

      <div className="flex justify-center gap-4 mt-4">
        {[...Array(15)].map((_, i) => (
          <svg
            key={i}
            style={{ color: muiTheme.palette.secondary.main }} // ✅ اللون من الثيم
            className="w-8 h-8"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C10 6 6 10 2 12c4 2 8 6 10 10 2-4 6-8 10-10-4-2-8-6-10-10z" />
          </svg>
        ))}
      </div>
    </div>
  );
};

export default DecorativeBorder;
