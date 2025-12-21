"use client";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { AiOutlineMenu } from "react-icons/ai";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { getNavPath } from "@/lib/constants/FixedTexts";
import LogoutBtn from "./LogoutBtn";
import { useTheme } from "@mui/material/styles"; // ✅ استدعاء الثيم من MUI

const MobilNav = ({ slug, user }) => {
  const t = useTranslations("Header");
  const NavPath = getNavPath(t);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const muiTheme = useTheme(); // ✅ يجيب الثيم الحالي (light/dark)

  // ✅ منع التفاعل قبل تحميل المتصفح
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  const today = hasMounted
    ? new Date().toISOString().split("T")[0]
    : "2025-01-01";

  return (
    <div className="w-14 flex items-center justify-center lg:hidden">
      <Button
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          zIndex: 9999,
          fontSize: "25px",
          color: muiTheme.palette.primary.main, // ✅ اللون الأساسي من الثيم
          "&:hover": {
            color: muiTheme.palette.secondary.main, // ✅ اللون الثانوي عند الـ hover
          },
        }}
      >
        <AiOutlineMenu className="text-2xl transition-all" />
      </Button>

      <Menu
        id="fade-menu"
        slotProps={{
          list: {
            "aria-labelledby": "fade-button",
          },
        }}
        slots={{ transition: Fade }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          zIndex: 9999,
          "& .MuiPaper-root": {
            backgroundColor: muiTheme.palette.background.paper, // ✅ خلفية القائمة من الثيم
            color: muiTheme.palette.text.primary, // ✅ النصوص من الثيم
          },
        }}
      >
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
                  search: "All",
                },
              }
            : i.path;

          return (
            <Link
              href={linkProps}
              key={index}
              style={{
                color:
                  slug === i.path
                    ? muiTheme.palette.primary.main // ✅ اللون الأساسي عند التفعيل
                    : muiTheme.palette.text.primary, // ✅ النصوص العادية
                textDecoration: "none",
              }}
            >
              <MenuItem
                onClick={handleClose}
                sx={{
                  "&:hover": {
                    backgroundColor: muiTheme.palette.action.hover, // ✅ خلفية hover من الثيم
                    color: muiTheme.palette.secondary.main, // ✅ النص يتغير للون الثانوي
                  },
                }}
              >
                {i.label}
              </MenuItem>
            </Link>
          );
        })}

        {user && <LogoutBtn />}
      </Menu>
    </div>
  );
};

export default MobilNav;
