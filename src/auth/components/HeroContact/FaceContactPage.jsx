"use client";
import React from "react";
import Header from "@/auth/components/Header/Header";
import { useTheme } from "@mui/material/styles"; // ✅ استدعاء الثيم
import { Typography } from "@mui/material";

const FaceContactPage = ({ user }) => {
  const muiTheme = useTheme(); // ✅ يجيب الثيم الحالي

  return (
    <div
      className="w-full h-[550px] bg-cover bg-center"
      style={{
        backgroundImage: `url('/assets/travco-travel-cc524d40-e86e-420c-9a9d-648c07456bc4.webp')`,
      }}
    >
      <div className="w-full px-15 pt-6 flex items-center justify-center">
        <Header user={user} />
      </div>
      <div className="container relative z-20 flex flex-col h-full justify-between">
        {/* ✅ العنوان في منتصف الصورة */}
        <div className="flex flex-row items-center justify-center flex-1 text-center">
          <Typography
            variant="h2"
            sx={{
              fontFamily: "Cairo, serif",
              fontWeight: 600,
              textAlign: "center",
              textTransform: "capitalize",
              fontSize: { xs: "2rem", lg: "4rem" },
              color: muiTheme.palette.text.primary, // ✅ النصوص من الثيم
              textShadow: "2px 2px 6px rgba(0, 0, 0, 0.6)", // ظل ناعم
              WebkitTextStroke: `1px ${muiTheme.palette.background.default}`, // ✅ حدود للحروف من الثيم
            }}
          >
            Contact Us
          </Typography>

          <Typography
            variant="h3"
            sx={{
              width: "45%",
              fontFamily: "Cairo, serif",
              textTransform: "uppercase",
              fontSize: { xs: "1.5rem", lg: "3rem" },
              color: muiTheme.palette.secondary.main, // ✅ لون ثانوي من الثيم
            }}
          >
            {/* يمكن إضافة نص إضافي هنا إذا أردت */}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default FaceContactPage;
