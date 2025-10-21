"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import Destination from "./components/Destination";
import PriceRange from "./components/PriceRange";
import DurationRange from "./components/DurationRange";
import Categories from "./components/Categories";
import { useAppContext } from "@/context/AppContext";
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
const SidebarFilters = () => {
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  const { theme } = useAppContext();
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  return (
    <div
      className="hidden xl:block"
      style={{
        width: "25%",
        display: { xs: "none", xl: "flex" },
        minWidth: { lg: "25%" },
        borderRadius: "20px",
        backgroundColor: theme === "dark" ? "#030712" : "#fff",
        p: 3,
        boxShadow: 4,
        color: "#fff",
      }}
    >
      <Box
        sx={{
          width: "100%",
          borderRadius: "20px",
          p: 3,
          backgroundColor: theme === "dark" ? "#030712" : "#fff",
          boxShadow: 4,
          color: "#fff",
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

        {/* Categories */}
        <Categories />
      </Box>
    </div>
  );
};

export default SidebarFilters;
