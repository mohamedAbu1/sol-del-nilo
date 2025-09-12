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
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
const MobilNav = () => {
  const t = useTranslations("Header");
  const CityName = getNavPath(t);

  const [anchorEl, setAnchorEl] = useState("");
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="flex items-center justify-center md:hidden">
      <Button
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <AiOutlineMenu className="text-2xl text-amber-50 hover:scale-110 transition-all" />
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
      >
        {CityName.map((i, index) => {
          return (
            <Link href={i.path} key={index}>
              <MenuItem onClick={handleClose}>{i.label}</MenuItem>
            </Link>
          );
        })}
      </Menu>
    </div>
  );
};

export default MobilNav;
