"use client";
import { Divider } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Dividering = () => {
  const muiTheme = useTheme(); // ✅ يجيب الثيم الحالي

  return (
    <Divider
      sx={{
        backgroundColor: muiTheme.palette.primary.main, // ✅ اللون الأساسي من الثيم
        width: "45%",
        marginTop: "10px",
        height: "3px", // ممكن تزود السمك لو حابب
        borderRadius: "2px", // لمسة أنيقة
      }}
    />
  );
};

export default Dividering;
