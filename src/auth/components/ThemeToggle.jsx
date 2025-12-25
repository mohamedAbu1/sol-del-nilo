"use client";
import { useTheme as useNextTheme } from "next-themes";
import { useTheme as useMuiTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { MdDarkMode } from "react-icons/md";
import { AiFillSun } from "react-icons/ai";
import { IconButton, Tooltip } from "@mui/material";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useNextTheme(); // من next-themes
  const muiTheme = useMuiTheme(); // من MUI
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <Tooltip
      title={`Switch to ${resolvedTheme === "light" ? "Dark" : "Light"} Mode`}
    >
      <IconButton
        onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
        sx={{
          color: muiTheme.palette.primary.main,
          zIndex: 9999,
          transition: "all 0.3s ease",
          "&:hover": {
            color: muiTheme.palette.secondary.main,
          },
        }}
      >
        {resolvedTheme === "dark" ? <AiFillSun /> : <MdDarkMode />}
      </IconButton>
    </Tooltip>
  );
}
