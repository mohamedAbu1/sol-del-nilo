"use client";
import { useTranslations } from "next-intl";
import SectionTitle from "./SectionTitle ";
import { Typography, Divider } from "@mui/material";
import { useTheme } from "@mui/material/styles";
const WhySolDelNilo = () => {
  const t = useTranslations("AboutPage");
  const muiTheme = useTheme();
  return (
    <section className="mb-16 text-center">
      {" "}
      {/* ✅ العنوان بالبرتقالي الأساسي */}{" "}
      <SectionTitle title={t("title3")} color={muiTheme.palette.primary.main} />{" "}
      {/* ✅ النصوص بالرمادي الكاتم مع لمسة hover */}{" "}
      <Typography
        variant="body1"
        sx={{
          fontSize: "1.125rem",
          color: muiTheme.palette.text.secondary,
          maxWidth: "48rem",
          marginX: "auto",
          fontFamily: "Cairo, sans-serif",
          lineHeight: 1.8,
          transition: "color 0.3s ease",
          "&:hover": { color: muiTheme.palette.primary.light || "#FFB74D" },
        }}
      >
        {" "}
        {t("p3")}{" "}
      </Typography>{" "}
      {/* ✅ خط فاصل أنيق بالبرتقالي */}{" "}
      <Divider
        sx={{
          marginTop: "20px",
          width: "60%",
          marginX: "auto",
          backgroundColor: muiTheme.palette.primary.main,
          height: "3px",
          borderRadius: "2px",
        }}
      />{" "}
    </section>
  );
};
export default WhySolDelNilo;
