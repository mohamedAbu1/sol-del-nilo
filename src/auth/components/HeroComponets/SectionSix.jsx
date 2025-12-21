"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import React from "react";
import { useRouter } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { getNavPath } from "@/lib/constants/FixedTexts";
import LinksMidea from "./LinksMidea";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles"; // ✅ استدعاء الثيم
const img = "/assets/Copilot_20251005_003854.webp";

const SectionSix = () => {
  const t = useTranslations("HomeHeroPage");
  const router = useRouter();
  const muiTheme = useTheme(); // ✅ يجيب الثيم الحالي (light/dark)

  const [hasMounted, setHasMounted] = useState(false);
  const [today, setToday] = useState("2025-01-01");
  const [NavPath, setNavPath] = useState([]);

  useEffect(() => {
    setHasMounted(true);
    setToday(new Date().toISOString().split("T")[0]);
    setNavPath(getNavPath(t));
  }, [t]);

  if (!hasMounted) return null;

  return (
    <section
      id="section-six"
      className="relative w-full h-screen flex flex-col items-center justify-center px-6 lg:px-20 overflow-hidden"
      style={{ color: muiTheme.palette.text.primary }} // ✅ النصوص من الثيم
    >
      {/* المحتوى */}
      <motion.div
        style={{ padding: "25px" }}
        className="max-w-3xl text-center z-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h2
          style={{
            padding: "15px",
            color: muiTheme.palette.primary.main, // ✅ العنوان من اللون الأساسي
          }}
          className="text-3xl lg:text-4xl font-bold mb-4"
        >
          {t("sc5Title")}
        </h2>
        <p
          style={{
            padding: "5px",
            color: muiTheme.palette.text.secondary, // ✅ النص الثانوي
          }}
          className="text-base lg:text-lg mb-8 leading-relaxed"
        >
          {t("sc5P")}
        </p>
        <div
          className="h-1 rounded-full mb-4 w-full"
          style={{ backgroundColor: muiTheme.palette.secondary.main }} // ✅ خط من اللون الثانوي
        />

        <button
          onClick={() => router.push("/contact")}
          style={{
            cursor: "pointer",
            marginTop: "14px",
            background: `linear-gradient(90deg, ${muiTheme.palette.primary.main}, ${muiTheme.palette.secondary.main})`, // ✅ زر متدرج من ألوان الثيم
            color: muiTheme.palette.getContrastText(muiTheme.palette.primary.main),
            padding: "10px 20px",
            borderRadius: "9999px",
            fontWeight: 600,
            boxShadow: `0 4px 12px ${muiTheme.palette.primary.main}50`,
            transition: "transform 0.3s ease",
          }}
          className="hover:scale-95"
        >
          {t("sc5BTN")}
        </button>
      </motion.div>

      {/* خلفية الأعمدة الفرعونية */}
      <section className="relative w-full h-[81vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${img})` }}
        />
        <div className="absolute inset-0 bg-black opacity-60" />

        {/* محتوى الفوتر */}
        <motion.footer
          className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-6"
          style={{ color: muiTheme.palette.text.primary }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h2
            className="text-xl lg:text-2xl font-bold mb-2"
            style={{ color: muiTheme.palette.secondary.main }} // ✅ العنوان من اللون الثانوي
          >
            Luxor & Aswan © 2025
          </h2>
          <p
            className="text-sm mb-4 max-w-xl"
            style={{ color: muiTheme.palette.text.secondary }} // ✅ النصوص الثانوية
          >
            {t("sc5P2")}
          </p>

          {/* روابط الفوتر */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            {NavPath.map((i, index) => {
              const isTours = i.path === "/tours";
              const linkProps = isTours
                ? {
                    pathname: "/tours",
                    query: {
                      destination: "All",
                      category: "All",
                      date: today,
                      duration: "61",
                      minPrice: "0",
                      maxPrice: "14000",
                      search: "",
                    },
                  }
                : i.path;

              return (
                <Link
                  href={linkProps}
                  key={index}
                  style={{
                    color: muiTheme.palette.primary.main, // ✅ الروابط من اللون الأساسي
                    cursor: "pointer",
                  }}
                >
                  {i.label}
                </Link>
              );
            })}
          </div>
          <LinksMidea />
        </motion.footer>
      </section>
    </section>
  );
};

export default SectionSix;
