"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import Destination from "./components/Destination";
import PriceRange from "./components/PriceRange";
import DurationRange from "./components/DurationRange";
import Categories from "./components/Categories";
import { useAppContext } from "@/context/AppContext";
import { motion } from "framer-motion";

const SidebarFilters = () => {
  const { theme } = useAppContext();

  return (
    <motion.div
      className="hidden xl:block"
      style={{
        width: "25%",
        minWidth: "25%",
        borderRadius: "20px",
        backgroundColor: theme === "dark" ? "#030712" : "#fff",
        color: "#fff",
      }}
      initial={{ opacity: 0, x: -200 }}              // يبدأ خارج الشاشة من الشمال
      animate={{ opacity: 1, x: 0 }}                 // يدخل لمكانه الطبيعي
      transition={{ duration: 0.8, ease: "easeOut" }} // مدة الحركة وسلاستها
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
    </motion.div>
  );
};

export default SidebarFilters;
