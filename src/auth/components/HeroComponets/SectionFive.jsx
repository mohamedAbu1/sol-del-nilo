"use client";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { GetTours } from "@/lib/constants/FixedTexts";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useTheme } from "@mui/material/styles"; // ✅ استدعاء الثيم
import { Box, Button, Typography } from "@mui/material";
import { DirectionsCar } from "@mui/icons-material";
import { useRouter } from "next/navigation";
const SectionFive = () => {
  const t = useTranslations("HomeHeroPage");
  const muiTheme = useTheme(); // ✅ يجيب الثيم الحالي (light/dark)
const router = useRouter();
  const [hasMounted, setHasMounted] = useState(false);
  const [Car, setCar] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setHasMounted(true);
    const tours = GetTours(t);
    setCar(tours || []);
  }, [t]);

  // ✅ تغيير الكارد كل 6 ثواني
  useEffect(() => {
    if (Car.length === 0) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % Car.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [Car]);

  if (!hasMounted || Car.length === 0) return null;

  const current = Car[index];

  return (
    <section
      id="section-five"
      style={{ padding: "20px" }}
      className="relative w-full h-auto px-4 py-16 overflow-hidden flex flex-col items-center"
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: 800,
          mb: 2,
          color: muiTheme.palette.primary.main,
          textShadow: `2px 2px 6px ${muiTheme.palette.grey[900]}90`,
          display: "flex",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        {" "}
       
        Luxury Airport Transfers Across Egypt{" "}
      </Typography>{" "}
      {/* ✅ خط ديكوري تحت العنوان */}{" "}
      <Box
        sx={{
          width: "80px",
          height: "4px",
          background: `linear-gradient(90deg, ${muiTheme.palette.primary.main}, ${muiTheme.palette.secondary.main})`,
          borderRadius: "2px",
          mb: 3,
        }}
      />{" "}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          borderRadius: "16px",
          mb: 6,
        }}
      >
        {" "}
        {/* ✅ خلفية بصورة سيارة شفافة */}{" "}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/assets/caption-2.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.15,
            zIndex: 1,
          }}
        />{" "}
        {/* ✅ المحتوى الأمامي */}{" "}
        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
            p: 4,
          }}
        >
          {" "}
          {/* ✅ صورة السيارة الأمامية */}{" "}
          <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
            {" "}
            <Image
              src="/assets/car-png-39057.png"
              alt="Car Transfer"
              width={500}
              height={300}
              style={{ borderRadius: "12px" }}
            />{" "}
          </Box>{" "}
          {/* ✅ النص الاحترافي */}{" "}
          <Box sx={{ flex: 1, textAlign: { xs: "center", md: "left" } }}>
            {" "}
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                mb: 2,
                color: muiTheme.palette.primary.main,
                textShadow: `2px 2px 6px ${muiTheme.palette.grey[900]}90`,
              }}
            >
              {" "}
              Premium Airport Car Transfers{" "}
            </Typography>{" "}
            <Typography
              variant="body1"
              sx={{
                fontSize: "1.1rem",
                lineHeight: 1.8,
                mb: 3,
                color: muiTheme.palette.text.primary,
              }}
            >
              {" "}
            </Typography>{" "}
            <Button
              variant="contained"
              sx={{
                backgroundColor: muiTheme.palette.primary.main,
                color: muiTheme.palette.getContrastText(
                  muiTheme.palette.primary.main
                ),
                fontWeight: 600,
                px: 4,
                py: 1.5,
                borderRadius: "12px",
                "&:hover": { backgroundColor: muiTheme.palette.secondary.main },
              }}
              onClick={() => router.push("/car-booking")} // ✅ تحويل لصفحة الحجز
            >
              {" "}
              Book Your Transfer{" "}
            </Button>{" "}
          </Box>{" "}
        </Box>{" "}
      </Box>
    </section>
  );
};

export default SectionFive;
