import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2", // الأزرق الأساسي
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#2196f3", // الأزرق الفاتح
      contrastText: "#ffffff",
    },
    background: {
      default: "#ffffff", // خلفية بيضاء
      paper: "#f9f9f9",   // أبيض أنعم للكروت
    },
    text: {
      primary: "#2E2E2E",   // ✅ رمادي غامق أنيق بدل الأسود
      secondary: "#666666", // ✅ رمادي متوسط للنصوص الثانوية
    },
  },
  typography: {
    fontFamily: "Roboto, Cairo, sans-serif",
    h6: {
      fontWeight: 700,
      color: "#1A3A6D", // ✅ عناوين بأزرق داكن أنيق
    },
    body1: {
      color: "#2E2E2E", // ✅ نصوص أساسية واضحة ومريحة
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          fontWeight: 600,
          backgroundColor: "#1976d2",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#2196f3",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#f9f9f9",
          border: "1px solid #1976d2",
          boxShadow: "0 4px 12px rgba(25, 118, 210, 0.2)",
          color: "#2E2E2E", // ✅ نص واضح داخل الكارت
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "#1976d2",
          "&:hover": {
            color: "#2196f3",
          },
        },
      },
    },
  },
});

export default lightTheme;
