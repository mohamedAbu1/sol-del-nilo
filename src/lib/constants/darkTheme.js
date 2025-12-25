import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#FF9800",        // البرتقالي الأساسي
      light: "#FFB74D",       // درجة أفتح للـ hover
      dark: "#F57C00",        // درجة أغمق للـ active
      contrastText: "#f5f5f5" // النص أبيض خفيف
    },
    secondary: {
      main: "#f5f5f5",        // الأبيض الخفيف
      light: "#eeeeee",       // درجة أفتح للـ hover
      dark: "#bdbdbd",        // درجة أغمق للـ active
      contrastText: "#FF9800" // النص برتقالي
    },
    background: {
      default: "#000000",     // خلفية سوداء
      paper: "#121212"        // أسود أنعم للكروت
    },
    text: {
      primary: "#f5f5f5",     // النص الأساسي أبيض خفيف
      secondary: "#FF9800",   // النصوص الثانوية برتقالي
      disabled: "#9e9e9e"     // نصوص معطلة رمادي فاتح
    }
  },
  typography: {
    fontFamily: "Roboto, Cairo, sans-serif",
    h1: { fontWeight: 700, color: "#FF9800" },
    h2: { fontWeight: 700, color: "#FF9800" },
    h3: { fontWeight: 700, color: "#FF9800" },
    h4: { fontWeight: 700, color: "#FF9800" },
    h5: { fontWeight: 700, color: "#FF9800" },
    h6: { fontWeight: 700, color: "#FF9800" },
    body1: { color: "#f5f5f5" }, // النصوص العادية أبيض خفيف
    body2: { color: "#bdbdbd" }  // النصوص الثانوية رمادي أفتح
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          fontWeight: 600,
          textTransform: "none",
          backgroundColor: "#FF9800",
          color: "#000000",
          "&:hover": {
            backgroundColor: "#FFB74D", // درجة أفتح عند الـ hover
            color: "#000000"
          },
          "&:active": {
            backgroundColor: "#F57C00", // درجة أغمق عند الضغط
            color: "#f5f5f5"
          },
          "&:disabled": {
            backgroundColor: "#424242", // رمادي غامق عند التعطيل
            color: "#9e9e9e"
          }
        }
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: "#f5f5f5",            // الغير Active أبيض خفيف
          "&.Mui-selected": {
            color: "#FF9800",          // الـ Active برتقالي
            fontWeight: 700
          },
          "&:hover": {
            color: "#FFB74D"           // درجة أفتح عند الـ hover
          }
        }
      }
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          color: "#f5f5f5",            // الغير Active أبيض خفيف
          "&.Mui-selected": {
            color: "#FF9800",          // الـ Active برتقالي
            fontWeight: 700
          },
          "&:hover": {
            color: "#FFB74D"           // درجة أفتح عند الـ hover
          }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#121212",              // خلفية كارت أسود أنعم
          border: "1px solid #FF9800",             // حدود برتقالية
          boxShadow: "0 4px 12px rgba(255,152,0,0.25)", // ظل برتقالي خفيف
          borderRadius: "12px"
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#000000", // ناف بار أسود
          color: "#f5f5f5"
        }
      }
    }
  }
});

export default darkTheme;
