// app/layout.tsx
import "../styles/globals.css";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
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

export default function RootLayout({ children, params }) {
  const locale = params?.locale;

  return (
    <html lang={locale || "en"} className="geist-font montserrat-font">
      <body suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}
