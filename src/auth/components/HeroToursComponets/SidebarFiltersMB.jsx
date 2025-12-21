"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import Destination from "./components/Destination";
import PriceRange from "./components/PriceRange";
import DurationRange from "./components/DurationRange";
import Categories from "./components/Categories";
import { useTheme } from "@mui/material/styles"; // ✅ استدعاء الثيم

const SidebarFiltersMB = () => {
  const muiTheme = useTheme(); // ✅ يجيب الثيم الحالي

  return (
    <div
      className="flex"
      style={{
        width: "100%",
        minWidth: "25%",
        backgroundColor: muiTheme.palette.background.paper, // ✅ الخلفية من الثيم
        borderRadius: "20px",
        padding: "1rem",
        boxShadow: muiTheme.shadows[4], // ✅ ظل من الثيم
        color: muiTheme.palette.text.primary, // ✅ النصوص من الثيم
        zIndex: 99999,
      }}
    >
      <Box
        sx={{
          width: "100%",
          backgroundColor: muiTheme.palette.background.paper, // ✅ الخلفية من الثيم
          borderRadius: "20px",
          p: 3,
          boxShadow: muiTheme.shadows[4],
          color: muiTheme.palette.text.primary,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: muiTheme.palette.primary.main, // ✅ العنوان بلون أساسي من الثيم
            mb: 3,
            fontWeight: "bold",
          }}
        >
          Filter Tours
        </Typography>

        {/* Destination */}
        <Destination />

        {/* ✅ Price Range */}
        <PriceRange />

        {/* ✅ Duration Range */}
        <DurationRange />

        {/* Trip Types */}
        <Categories />
      </Box>
    </div>
  );
};

export default SidebarFiltersMB;
