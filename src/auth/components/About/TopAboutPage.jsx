"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { useTheme } from "@mui/material/styles";
import { Typography } from "@mui/material";

const TopAboutPage = () => {
  const t = useTranslations("AboutPage");
  const muiTheme = useTheme();

  return (
    <div
      style={{ marginTop: "22px" }}
      className="text-center animate-slideUp delay-100"
    >
      {/* ✅ العنوان */}
      <Typography
        variant="h3"
        sx={{
          fontWeight: "bold",
          fontSize: "clamp(24px, 5vw, 42px)",
          textAlign: "center",
          color: muiTheme.palette.primary.main, // العنوان بالبرتقالي الأساسي
          fontFamily: "Cairo, sans-serif",
          textShadow: `2px 2px 6px ${muiTheme.palette.background.default}`, // ظل من الخلفية السوداء
        }}
        className="animate-pulseSlow"
      >
        {t("title")}
      </Typography>

      {/* ✅ الشمس والديكور */}
      <div className="animate-rotateSunSlow">
        <svg
          width="300"
          height="300"
          viewBox="0 0 300 300"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="300" height="300" fill="none" />

          {/* ✅ الشمس بالبرتقالي */}
          <circle
            cx="150"
            cy="120"
            r="40"
            fill={muiTheme.palette.primary.main}
            stroke={muiTheme.palette.secondary.main}
            strokeWidth="3"
          />

          {/* ✅ أشعة الشمس */}
          <g stroke={muiTheme.palette.primary.light || "#FFB74D"} strokeWidth="3">
            {Array.from({ length: 16 }).map((_, i) => {
              const spread = 120;
              const startAngle = 180 - spread / 2;
              const angle = (startAngle + i * (spread / 12)) * (Math.PI / 60);
              const r1 = 70;
              const r2 = 20;
              const cx = 150;
              const cy = 120;
              const x1 = cx + r1 * Math.cos(angle);
              const y1 = cy + r1 * Math.sin(angle);
              const x2 = cx + r2 * Math.cos(angle);
              const y2 = cy + r2 * Math.sin(angle);
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
            })}
          </g>

          {/* ✅ خطوط زخرفية بالرمادي الكاتم */}
          <path
            d="M60 180 Q90 160 120 180 T180 180 T240 180"
            stroke={muiTheme.palette.secondary.main}
            strokeWidth="3"
            fill="none"
          />
          <path
            d="M60 200 Q90 180 120 200 T180 200 T240 200"
            stroke={muiTheme.palette.secondary.main}
            strokeWidth="3"
            fill="none"
          />
        </svg>
      </div>
    </div>
  );
};

export default TopAboutPage;
