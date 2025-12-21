"use client";
import { Button } from "@mui/material";
import React from "react";
import { BsDoorOpenFill } from "react-icons/bs";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import { useTheme } from "@mui/material/styles"; // ✅ استدعاء الثيم

const LogoutBtn = () => {
  const router = useRouter();
  const t = useTranslations("Header");
  const muiTheme = useTheme(); // ✅ يجيب الثيم الحالي (light/dark)

  const LogoutHandler = async () => {
    try {
      await axios.get("/api/logout");
      localStorage.removeItem("user");
      router.push("/");
      router.refresh();
    } catch (error) {
      toast.warning("في حاجه غلط ياد");
      console.error(error);
    }
  };

  return (
    <Button
      className="hidden lg:flex items-center justify-center gap-2 flex-row link"
      variant="outlined"
      endIcon={<BsDoorOpenFill />}
      onClick={LogoutHandler}
      sx={{
        color: muiTheme.palette.text.primary, // ✅ النص من الثيم
        borderColor: muiTheme.palette.primary.main, // ✅ الإطار من الثيم
        fontWeight: 600,
        "&:hover": {
          color: muiTheme.palette.secondary.main, // ✅ يتغير للون الثانوي عند الـ hover
          borderColor: muiTheme.palette.secondary.main,
          backgroundColor: "transparent",
        },
      }}
    >
      {t("Btn2")}
    </Button>
  );
};

export default LogoutBtn;
