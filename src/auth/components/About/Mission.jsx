"use client";
import { useTranslations } from "next-intl";
import SectionTitle from "./SectionTitle ";
import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Mission = () => {
  const t = useTranslations("AboutPage");
  const muiTheme = useTheme();

  return (
    <section className="mb-12 text-center">
      {/* ✅ العنوان بالبرتقالي الأساسي */}
      <SectionTitle title={t("title1")} color={muiTheme.palette.primary.main} />

      {/* ✅ النصوص بالرمادي الكاتم من الثيم */}
      <Typography
        variant="body1"
        sx={{
          fontSize: "1.125rem", // text-lg
          color: muiTheme.palette.text.secondary,
          maxWidth: "48rem", // max-w-3xl
          marginX: "auto",
          fontFamily: "Cairo, sans-serif",
          lineHeight: 1.8,
          transition: "color 0.3s ease",
          "&:hover": {
            color: muiTheme.palette.primary.light || "#FFB74D", // درجة أفتح عند الـ hover
          },
        }}
      >
        {t("p1")}
      </Typography>
    </section>
  );
};

export default Mission;
