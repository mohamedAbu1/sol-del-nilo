"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import React from "react";
import { useRouter } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { getNavPath } from "@/lib/constants/FixedTexts";

const img = "/assets/Copilot_20251005_003854.png";

const SectionSix = () => {
  const t = useTranslations("HomeHeroPage");
  const router = useRouter();

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
      className="relative w-full h-screen text-gray-600 dark:text-white flex flex-col items-center justify-center px-6 lg:px-20 overflow-hidden"
    >
      {/* المحتوى */}
      <div
        style={{ marginTop: "60px", marginBottom: "60px" }}
        className="max-w-3xl text-center z-10"
      >
        <h2 className="text-3xl lg:text-4xl font-bold mb-4">
          {t("sc5Title")}
        </h2>
        <p className="text-base lg:text-lg text-gray-400 dark:text-gray-300 mb-8 leading-relaxed">
          {t("sc5P")}
        </p>
        <button
          onClick={() => router.push("/contact")}
          className="px-6 py-3 text-gray-600 dark:text-white font-semibold rounded-full transition hover:scale-90 hover:text-yellow-400"
        >
          {t("sc5BTN")}
        </button>
      </div>

      {/* خلفية الأعمدة الفرعونية */}
      <section className="relative w-full h-[81vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${img})` }}
        />
        <div className="absolute inset-0 bg-black opacity-60" />

        {/* محتوى الفوتر */}
        <footer className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center text-white px-6">
          <h2 className="text-xl lg:text-2xl font-bold mb-2 text-yellow-400">
            SolDelNilo © 2025
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-xl">{t("sc5P2")}</p>

          {/* روابط الفوتر */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
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
                <Link href={linkProps} key={index} style={{ color: "#ff9800" }}>
                  {i.label}
                </Link>
              );
            })}
          </div>

          {/* سوشيال ميديا */}
          <div className="mt-6 flex gap-4 text-white">
            <i className="fab fa-facebook-f hover:text-yellow-400 cursor-pointer" />
            <i className="fab fa-twitter hover:text-yellow-400 cursor-pointer" />
            <i className="fab fa-instagram hover:text-yellow-400 cursor-pointer" />
            <i className="fab fa-youtube hover:text-yellow-400 cursor-pointer" />
          </div>
        </footer>
      </section>
    </section>
  );
};

export default SectionSix;
