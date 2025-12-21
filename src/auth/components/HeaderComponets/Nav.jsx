"use client";
import React, { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ToursPathEs } from "@/lib/constants/FixedTexts";
import { useScreenSize } from "../../hooks/screenSize";
import { useTheme } from "@mui/material/styles"; // ✅ استدعاء الثيم

const Nav = ({ path, user, slug }) => {
  const { width } = useScreenSize();
  const t = useTranslations("Header");
  const muiTheme = useTheme(); // ✅ يجيب الثيم الحالي (light/dark)

  const boxVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  const fontSize =
    hasMounted && width <= 1297 && path === ToursPathEs ? "15px" : "19px";

  const today = hasMounted
    ? new Date().toISOString().split("T")[0]
    : "2025-01-01";

  const navItems = [
    { label: "Home", href: "/", active: slug === "" },
    {
      label: "Tours",
      href: {
        pathname: "/tours",
        query: {
          destination: "All",
          category: "All",
          date: today,
          duration: "61",
          minPrice: "0",
          maxPrice: "14000",
          search: "All",
        },
      },
      active: slug === "tours",
    },
    { label: "About", href: "/about", active: slug === "about" },
    { label: "Contact", href: "/contact", active: slug === "contact" },
  ];

  return (
    <div className="hidden lg:flex w-3/5 justify-start">
      <ul className="w-full flex flex-row items-center justify-around capitalize gap-2">
        {navItems.map((item, index) => (
          <motion.li
            key={index}
            variants={boxVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5, duration: 0.5 }}
            style={{
              // textShadow: "2px 2px 6px rgba(0, 0, 0, 0.6)",
              fontWeight: "600",
              fontSize,
              color: item.active
                ? muiTheme.palette.primary.main // ✅ اللون الأساسي عند التفعيل
                : muiTheme.palette.text.primary, // ✅ النص الأساسي من الثيم
            }}
          >
            <Link
              href={item.href}
              style={{ cursor: "pointer" }}
              className="hover:text-[var(--mui-secondary)]"
            >
              {t(item.label)}
            </Link>
          </motion.li>
        ))}

        {user?.role === "ADMIN" && hasMounted && width > 1279 && (
          <motion.li
            variants={boxVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5, duration: 0.5 }}
            style={{
              // textShadow: "2px 2px 6px rgba(0, 0, 0, 0.6)",
              fontWeight: "600",
              fontSize,
              color:
                slug === "admin"
                  ? muiTheme.palette.primary.main
                  : muiTheme.palette.text.primary,
            }}
          >
            <Link
              href="/admin"
              style={{ cursor: "pointer" }}
              className="hover:text-[var(--mui-secondary)]"
            >
              {t("Admin")}
            </Link>
          </motion.li>
        )}
      </ul>
    </div>
  );
};

export default Nav;
