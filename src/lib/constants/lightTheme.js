import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#FF9800",        // البرتقالي الأساسي
      light: "#FFB74D",       // درجة أفتح للـ hover
      dark: "#F57C00",        // درجة أغمق للـ active
      contrastText: "#FFFFFF" // النص أبيض
    },
    secondary: {
      main: "#616161",        // الرمادي الكاتم
      light: "#757575",       // درجة أفتح للـ hover
      dark: "#424242",        // درجة أغمق للـ active
      contrastText: "#FFFFFF" // النص أبيض
    },
    background: {
      default: "#FFFFFF",     // الخلفية بيضاء
      paper: "#FAFAFA"        // خلفية الكروت أفتح شوية
    },
    text: {
      primary: "#212121",     // النص الأساسي أسود فاتح (أوضح للقراءة)
      secondary: "#616161",   // النصوص الثانوية رمادي كاتم
      disabled: "#9E9E9E"     // النصوص المعطلة رمادي فاتح
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
    body1: { color: "#616161" }, // النصوص تحت العناوين بالرمادي
    body2: { color: "#212121" }  // النصوص الثانوية بالأسود الفاتح
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          fontWeight: 600,
          textTransform: "none",
          backgroundColor: "#FF9800",
          color: "#FFFFFF",
          "&:hover": {
            backgroundColor: "#FFB74D", // درجة أفتح عند الـ hover
          },
          "&:active": {
            backgroundColor: "#F57C00", // درجة أغمق عند الضغط
          },
          "&:disabled": {
            backgroundColor: "#E0E0E0", // رمادي فاتح عند التعطيل
            color: "#9E9E9E"
          }
        }
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: "#616161",            // الغير Active رمادي
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
          color: "#616161",            // الغير Active رمادي
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
          backgroundColor: "#FAFAFA",  // خلفية الكارت أفتح
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
        }
      }
    }
  }
});

export default lightTheme;
