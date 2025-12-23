import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#FFD700", // الذهبي الأساسي
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#FFC107",
      contrastText: "#ffffff", // درجة ذهبي أفتح
    },
    background: {
      default: "#000000", // خلفية سوداء
      paper: "#121212", // أسود أنعم للكروت
    },
    text: {
      primary: "#ffffff", // نص أبيض
      secondary: "#cccccc", // نص رمادي فاتح
    },
  },
  typography: {
    fontFamily: "Roboto, Cairo, sans-serif",
    h6: {
      fontWeight: 700,
      color: "#FFD700", // العناوين بالذهبي
    },
    body1: {
      color: "#cccccc",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          fontWeight: 600,
          backgroundColor: "#FFD700",
          color: "#000",
          "&:hover": {
            backgroundColor: "#FFC107",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#121212",
          border: "1px solid #FFD700",
          boxShadow: "0 4px 12px rgba(255, 215, 0, 0.3)",
        },
      },
    },
  },
});

export default darkTheme;
