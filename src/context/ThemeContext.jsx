"use client";
import React, { createContext, useContext, useMemo } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { useTheme as useNextTheme } from "next-themes"; // ✅ نقرأ الوضع من next-themes
import lightTheme from "../lib/constants/lightTheme";
import darkTheme from "../lib/constants/darkTheme";

const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const { resolvedTheme } = useNextTheme(); // ✅ يجيب "light" أو "dark"

  const theme = useMemo(
    () => (resolvedTheme === "light" ? lightTheme : darkTheme),
    [resolvedTheme]
  );

  return (
    <ThemeContext.Provider value={{ mode: resolvedTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
