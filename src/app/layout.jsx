// app/layout.tsx
import "../styles/globals.css";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export const metadata = {
  title: "SolDelNilo",
  description: "Contact form and tourism platform",
  icons: {
    icon: "./favicon.ico", // ✅ هذا يضمن تحميل الأيقونة بشكل صحيح
  },
};
import { Prata } from "next/font/google";

const prata = Prata({
  subsets: ["latin"],
  weight: "400",
});
export default function RootLayout({ children, params }) {
  const lng = params?.locale || "ar"; // 👈 هنا نأخذ اللغة من الـ params
  console.log(lng);
  return (
    <html
      lang={lng || "ar"}
      // dir={lng === "ar" ? "rtl" : "ltr"}
      className="geist-font montserrat-font"
    >
      <body suppressHydrationWarning={true} className="prata.className">{children}</body>
    </html>
  );
}
