"use client";
import Image from "next/image";
import SectionTitle from "./SectionTitle ";
import { useTranslations } from "next-intl";
import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const WhoWeAre = () => {
  const t = useTranslations("AboutPage");
  const muiTheme = useTheme();

  // ✅ اختيار الصورة حسب الثيم
  const imageSrc =
    muiTheme.palette.mode === "dark"
      ? "/assets/Copilot_20251209_142706-removebg-preview.webp"
      : "/assets/Copilot_20251209_142706-removebg-preview.webp";

  return (
    <section className="mb-12 flex flex-col lg:flex-row items-center gap-10">
      {/* ✅ النصوص */}
      <div className="flex-1">
        <SectionTitle title={t("title2")} color={muiTheme.palette.primary.main} />
        <Typography
          variant="body1"
          sx={{
            fontSize: "1.125rem",
            color: muiTheme.palette.text.secondary, // النصوص الثانوية من الثيم
            fontFamily: "Cairo, sans-serif",
            lineHeight: 1.8,
            maxWidth: "48rem",
            marginX: "auto",
            transition: "color 0.3s ease",
            "&:hover": {
              color: muiTheme.palette.primary.light || "#FFB74D", // درجة أفتح عند الـ hover
            },
          }}
        >
          {t("p2")}
        </Typography>
      </div>

      {/* ✅ الصورة */}
      <div className="flex-1 flex justify-center">
        <Image
          src={imageSrc}
          alt="Egyptian Woman"
          width={400}
          height={600}
          loading="eager"
          priority
          placeholder="blur"
          blurDataURL="data:image/webp;base64,..."
          className="w-full max-w-sm h-auto rounded-lg shadow-lg"
          style={{
            border: `2px solid ${muiTheme.palette.primary.main}`, // ✅ حدود برتقالية من الثيم
            boxShadow: `0 6px 20px ${muiTheme.palette.primary.main}40`, // ✅ ظل برتقالي خفيف
          }}
        />
      </div>
    </section>
  );
};

export default WhoWeAre;
