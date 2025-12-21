"use client";
import Image from "next/image";
import SectionTitle from "./SectionTitle ";
import { useTranslations } from "next-intl";
import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles"; // ✅ استدعاء الثيم

const WhoWeAre = () => {
  const t = useTranslations("AboutPage");
  const muiTheme = useTheme(); // ✅ يجيب الثيم الحالي

  // ✅ اختيار الصورة حسب الثيم
  const imageSrc =
    muiTheme.palette.mode === "dark"
      ? "/assets/Copilot_20251209_142706-removebg-preview.webp" // صورة خاصة بالـ Dark Mode
      : "/assets/Copilot_20251209_142706-removebg-preview.webp"; // صورة خاصة بالـ Light Mode

  return (
    <section className="mb-12 flex flex-col lg:flex-row items-center gap-10">
      <div className="flex-1">
        <SectionTitle title={t("title2")} />
        <Typography
          variant="body1"
          sx={{
            fontSize: "1.125rem", // text-lg
            color: muiTheme.palette.text.secondary, // ✅ النصوص من الثيم
            fontFamily: "Cairo, sans-serif",
          }}
        >
          {t("p2")}
        </Typography>
      </div>
      <div className="flex-1">
        <Image
          src={imageSrc} // ✅ الصورة تتغير حسب الثيم
          alt="Egyptian Woman"
          width={400}
          height={600}
          loading="eager"
          priority
          placeholder="blur"
          blurDataURL="data:image/webp;base64,..."
          className="w-full max-w-sm mx-auto h-auto rounded-lg shadow-md"
        />
      </div>
    </section>
  );
};

export default WhoWeAre;
