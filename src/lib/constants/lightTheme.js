import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#2E2E2E", // ممكن تخليه رمادي غامق أو أي لون أساسي
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#f1b732", // ✅ الذهبي
      contrastText: "#ffffff",
    },
    background: {
      default: "#ffffff",
      paper: "#f9f9f9",
    },
    text: {
      primary: "#2E2E2E",
      secondary: "#cccccc",
    },
  },
  typography: {
    fontFamily: "Roboto, Cairo, sans-serif",
    h1: {
      fontWeight: 700,
      color: "#f1b732", // ✅ العنوان الكبير بالذهبي
    },
    h2: {
      fontWeight: 700,
      color: "#f1b732", // ✅ العنوان الثاني بالذهبي
    },
    h3: {
      fontWeight: 700,
      color: "#f1b732", // ✅ العنوان الثالث بالذهبي
    },
    h4: {
      fontWeight: 700,
      color: "#f1b732", // ✅ العنوان الرابع بالذهبي
    },
    h5: {
      fontWeight: 700,
      color: "#f1b732", // ✅ العنوان الخامس بالذهبي
    },
    h6: {
      fontWeight: 700,
      color: "#f1b732", // ✅ العنوان السادس بالذهبي
    },
    body1: {
      color: "#2E2E2E",
    },
  },
});

export default lightTheme;
