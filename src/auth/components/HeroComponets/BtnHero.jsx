"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material"; // ✅ استخدم زر MUI بدل زر مخصص
import { BiSearch } from "react-icons/bi";
import { AiOutlineLock } from "react-icons/ai";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useTheme } from "@mui/material/styles"; // ✅ استدعاء الثيم

const BtnHero = () => {
  const t = useTranslations("HomeHeroPage");
  const router = useRouter();
  const muiTheme = useTheme(); // ✅ يجيب الثيم الحالي (light/dark)

  const boxVariants = {
    hidden: { opacity: 0, x: +100 },
    visible: { opacity: 1, x: 0 },
  };
  const boxVariants2 = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
  };

  const [hasMounted, setHasMounted] = useState(false);
  const [today, setToday] = useState("2025-01-01");

  useEffect(() => {
    setHasMounted(true);
    setToday(new Date().toISOString().split("T")[0]);
  }, []);

  if (!hasMounted) return null;

  return (
    <div style={{ marginLeft: "20px" }} className="divBtnHero flex gap-4">
      {/* زر البحث */}
      <motion.span
        variants={boxVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2, duration: 0.5 }}
        onClick={() => {
          const query = new URLSearchParams({
            destination: "All",
            category: "All",
            date: today,
            duration: "5",
            minPrice: "0",
            maxPrice: "14000",
            search: "All",
          }).toString();

          router.push(`/tours?${query}`, { scroll: false, shallow: true });
        }}
      >
        <Button
          variant="contained"
          startIcon={<BiSearch />}
          sx={{
            backgroundColor: muiTheme.palette.primary.main, // ✅ اللون الأساسي
            color: muiTheme.palette.getContrastText(muiTheme.palette.primary.main),
            fontWeight: 600,
            "&:hover": {
              backgroundColor: muiTheme.palette.secondary.main, // ✅ اللون الثانوي عند الـ hover
            },
          }}
        >
          {t("btn1")}
        </Button>
      </motion.span>

      {/* زر الفيزا */}
      <motion.span
        variants={boxVariants2}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2, duration: 0.5 }}
        onClick={() => router.push("/visaInfo")}
      >
        <Button
          variant="outlined"
          startIcon={<AiOutlineLock />}
          sx={{
            color: muiTheme.palette.text.primary, // ✅ النص من الثيم
            borderColor: muiTheme.palette.primary.main, // ✅ الإطار من الثيم
            fontWeight: 600,
            "&:hover": {
              color: muiTheme.palette.secondary.main,
              borderColor: muiTheme.palette.secondary.main,
            },
          }}
        >
          {t("btn2")}
        </Button>
      </motion.span>
    </div>
  );
};

export default BtnHero;
