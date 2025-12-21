// components/SideDecor.tsx
"use client";
import React from "react";
import { useTheme } from "@mui/material/styles"; // ✅ استدعاء الثيم

const SideDecor = () => {
  const muiTheme = useTheme(); // ✅ يجيب الثيم الحالي (light/dark)

  return (
    <>
      {/* الكتابة الفرعونية على اليسار */}
      <div
        className="fixed top-0 left-0 h-screen w-[80px] hidden sm:flex items-center justify-center z-10"
        style={{
          writingMode: "vertical-rl",
          color: muiTheme.palette.primary.main, // ✅ اللون الأساسي من الثيم
          fontSize: "54px",
          fontWeight: "bold",
          fontFamily: "Cairo, sans-serif",
        }}
      >
        𓂀𓆣𓏏𓊹𓂻𓃭𓇳𓋹𓁷𓂧
      </div>

      {/* الخط العمودي على اليمين */}
      <div
        className="fixed top-0 right-0 h-screen w-[2px] z-9999"
        style={{
          backgroundColor: muiTheme.palette.primary.main, // ✅ نفس اللون الأساسي من الثيم
        }}
      />
    </>
  );
};

export default SideDecor;
