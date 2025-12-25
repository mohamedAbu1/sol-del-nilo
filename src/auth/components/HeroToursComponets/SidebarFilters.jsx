"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import Destination from "./components/Destination";
import PriceRange from "./components/PriceRange";
import DurationRange from "./components/DurationRange";
import Categories from "./components/Categories";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles"; // ✅ استدعاء الثيم

const SidebarFilters = () => {
  const muiTheme = useTheme(); // ✅ يجيب الثيم الحالي

  return (
    <motion.div
      className="hidden xl:block"
      style={{
        width: "25%",
        minWidth: "25%",
        borderRadius: "20px",
        backgroundColor: muiTheme.palette.background.paper, // ✅ خلفية من الثيم
        color: muiTheme.palette.text.primary, // ✅ النصوص الأساسية
        boxShadow: `0 6px 20px ${muiTheme.palette.primary.main}30`, // ✅ ظل برتقالي شفاف
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
          backgroundColor: muiTheme.palette.background.paper, // ✅ خلفية من الثيم
          color: muiTheme.palette.text.primary, // ✅ النصوص الأساسية
          border: `1px solid ${muiTheme.palette.primary.main}`, // ✅ حدود برتقالية أساسية
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: muiTheme.palette.primary.main, // ✅ العنوان برتقالي أساسي
            mb: 3,
            fontWeight: "bold",
            letterSpacing: "0.5px",
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

        {/* Categories */}
        <Categories />
      </Box>
    </motion.div>
  );
};

export default SidebarFilters;
