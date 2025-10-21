"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import Destination from "./components/Destination";
import PriceRange from "./components/PriceRange";
import DurationRange from "./components/DurationRange";
import Categories from "./components/Categories";
import { useAppContext } from "@/context/AppContext";
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
const SidebarFiltersMB = () => {
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  const { theme } = useAppContext();
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  return (
    <div
      className="flex"
      style={{
        width: "100%",
        minWidth: { lg: "25%" },
        backgroundColor: theme === "dark" ? "#212121" : "#fff",
        borderRadius: "20px",
        p: 3,
        boxShadow: 4,
        color: theme === "dark" ? "#fff" : "#212121",
        zIndex: "99999",
      }}
    >
      <Box
        sx={{
          width: "100%",
          backgroundColor: theme === "dark" ? "#212121" : "#fff",
          borderRadius: "20px",
          p: 3,
          boxShadow: 4,
          color: theme === "dark" ? "#fff" : "#212121",
        }}
      >
        <Typography
          variant="h6"
          sx={{ color: "#ffb300", mb: 3, fontWeight: "bold" }}
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
