"use client";
import { useTheme } from "@mui/material/styles";

const DecorativeBorder = () => {
  const muiTheme = useTheme();

  return (
    <div style={{ marginBottom: "12px" }} className="w-full pt-6">
      {/* ✅ خط علوي بالبرتقالي الأساسي */}
      <div
        style={{
          borderTop: `3px solid ${muiTheme.palette.primary.main}`,
        }}
        className="w-full"
      />

      {/* ✅ زخارف */}
      <div className="flex justify-center gap-4 mt-4">
        {[...Array(15)].map((_, i) => (
          <svg
            key={i}
            style={{ color: muiTheme.palette.primary.main }}
            className="w-6 h-6 transition-colors duration-300 hover:text-orange-400"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C10 6 6 10 2 12c4 2 8 6 10 10 2-4 6-8 10-10-4-2-8-6-10-10z" />
          </svg>
        ))}
      </div>

      {/* ✅ خط سفلي بالرمادي الكاتم */}
      <div
        style={{
          borderBottom: `2px solid ${muiTheme.palette.secondary.main}`,
          marginTop: "12px",
        }}
        className="w-full"
      />
    </div>
  );
};

export default DecorativeBorder;
