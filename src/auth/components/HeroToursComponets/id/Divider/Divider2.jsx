"use client";
import React from "react";
import { Divider } from "@mui/material";
import { useTheme } from "@mui/material/styles"; // ✅ استدعاء الثيم

const Dividering2 = () => {
  const muiTheme = useTheme(); // ✅ يجيب الثيم الحالي

  return (
    <Divider
      sx={{
        backgroundColor: muiTheme.palette.primary.main, // ✅ اللون الأساسي من الثيم
        width: "78%",
        marginTop: "10px",
        height: "3px", // لمسة أنيقة لزيادة السمك
        borderRadius: "2px", // حواف ناعمة
      }}
    />
  );
};

export default Dividering2;
