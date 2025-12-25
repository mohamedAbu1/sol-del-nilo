"use client";
import React from "react";
import Header from "@/auth/components/HeaderComponets/Header";
import { useTheme } from "@mui/material/styles"; 
import { Typography } from "@mui/material";

const FaceAboutPage = ({ user }) => {
  const muiTheme = useTheme(); // ✅ يجيب الثيم الحالي

  return (
    <div
      className="w-full h-[550px] bg-cover bg-center relative"
      style={{ backgroundImage: `url('/assets/_9272_banner-aboutus.webp')` }}
    >
      {/* ✅ الهيدر */}
      <div className="w-full px-15 pt-6 flex items-center justify-center">
        <Header user={user} />
      </div>

      {/* ✅ المحتوى */}
      <div className="container relative z-20 flex flex-col h-full justify-between">
        <div className="flex flex-row items-center justify-center flex-1 text-center">
          {/* ✅ العنوان الرئيسي */}
          <Typography
            variant="h2"
            sx={{
              fontFamily: "Cairo, serif",
              fontWeight: 700,
              textAlign: "center",
              textTransform: "capitalize",
              fontSize: { xs: "2rem", lg: "4rem" },
              color: muiTheme.palette.primary.main, // ✅ العنوان بالبرتقالي الأساسي
              textShadow: `2px 2px 6px ${muiTheme.palette.background.default}`, // ✅ ظل من الخلفية السوداء
              WebkitTextStroke: `1px ${muiTheme.palette.secondary.main}`, // ✅ حدود رمادية/أبيض خفيف
            }}
          >
            About Luxor & Aswan Travel
          </Typography>

          {/* ✅ العنوان الفرعي */}
          <Typography
            variant="h3"
            sx={{
              width: { xs: "80%", md: "50%", lg: "34%" },
              fontFamily: "Cairo, serif",
              textTransform: "uppercase",
              fontSize: { xs: "1.2rem", lg: "2rem" },
              fontWeight: 500,
              color: muiTheme.palette.text.primary, // ✅ النصوص الأساسية أبيض خفيف
              opacity: 0.85, // لمسة أنيقة
            }}
          >
            Discover Egypt’s Timeless Beauty
          </Typography>
        </div>
      </div>

      {/* ✅ طبقة شفافة فوق الخلفية لإبراز النصوص */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.7))",
        }}
      />
    </div>
  );
};

export default FaceAboutPage;
