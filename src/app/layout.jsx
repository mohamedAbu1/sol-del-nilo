import { ThemeContextProvider } from "@/context/ThemeContext";
export default function RootLayout({ children }) {
  return (
    <html lang="ar">
      <body>
        {" "}
        <ThemeContextProvider>{children} </ThemeContextProvider>
      </body>
    </html>
  );
}
