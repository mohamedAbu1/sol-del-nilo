"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MdDarkMode } from "react-icons/md";
import { AiFillSun } from "react-icons/ai";
import { Typography } from "@mui/material";
export default function ThemeToggle() {
  const { theme, setTheme } = useTheme("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <>
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="flex flex-row items-center justify-center gap-2.5 px-4 py-2 rounded text-black dark:text-white"
        style={{ zIndex: "9999", cursor: "pointer", width: "5%" }}
      >
        {/* <Typography style={{fontSize:"18px"}}>{theme === "dark" ? "Light" : "Dark"}</Typography> */}
        {theme === "dark" ? (
          <AiFillSun style={{ fontSize: "20px" }} />
        ) : (
          <MdDarkMode style={{ fontSize: "25px", color: "#ff9800" }} />
        )}
      </button>
    </>
  );
}
