"use client";
import { useTranslations } from "next-intl";
import SectionTitle from "./SectionTitle ";
import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles"; // ✅ استدعاء الثيم

const Mission = () => {
  const t = useTranslations("AboutPage");
  const muiTheme = useTheme(); // ✅ يجيب الثيم الحالي

  return (
    <section className="mb-12 text-center">
      <SectionTitle title={t("title1")} />
      <Typography
        variant="body1"
        sx={{
          fontSize: "1.125rem", // text-lg
          color: muiTheme.palette.text.secondary, // ✅ النصوص من الثيم
          maxWidth: "48rem", // max-w-3xl
          marginX: "auto",
          fontFamily: "Cairo, sans-serif",
        }}
      >
        {t("p1")}
      </Typography>
    </section>
  );
};

export default Mission;
