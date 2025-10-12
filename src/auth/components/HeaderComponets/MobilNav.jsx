"use client";
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
import React, { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { AiOutlineMenu } from "react-icons/ai";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { getNavPath } from "@/lib/constants/FixedTexts";
import LogoutBtn from "./LogoutBtn";
import { useTheme } from "next-themes";
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
const MobilNav = ({ slug, user }) => {
  const t = useTranslations("Header");
  const CityName = getNavPath(t);
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  const [anchorEl, setAnchorEl] = useState("");
  const open = Boolean(anchorEl);
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  const handleClose = () => {
    setAnchorEl(null);
  };
    const { theme, setTheme } = useTheme("dark");

  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  return (
    <div className="w-14 flex items-center justify-center lg:hidden">
      <Button
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        style={{ zIndex: "9999", fontSize: "25px",color:theme === "dark" ? "#fff" :"#ff9800" }}
        
      >
        <AiOutlineMenu className="text-2xl  hover:scale-110 transition-all" />
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
        style={{ zIndex: "9999" }}
      >
        {CityName.map((i, index) => {
          const isTours = i.path === "/tours";
          const today = new Date().toISOString().split("T")[0];

          const linkProps = isTours
            ? {
                pathname: "/tours",
                query: {
                  destination: "Alexandria",
                  category: "Wellness & Medical",
                  date: today,
                  duration: "61",
                  minPrice: "10000",
                  maxPrice: "14000",
                },
              }
            : i.path;

          return (
            <Link
              href={linkProps}
              key={index}
              style={{ color: slug === i.path ? "#ff9800" : "#000" }}
            >
              <MenuItem onClick={handleClose}>{i.label}</MenuItem>
            </Link>
          );
        })}

        {!user ? "" : <LogoutBtn />}
      </Menu>
    </div>
  );
};

export default MobilNav;
