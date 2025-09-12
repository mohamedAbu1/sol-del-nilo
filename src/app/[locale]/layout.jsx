import "../../styles/globals.css";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";

// ✅ تحميل الخطوط
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

// ✅ بيانات الميتا
export const metadata = {
  title: "SolDelNilo",
  description: "Discover Egypt through timeless beauty",
};

// ✅ توليد المسارات مسبقًا
export function generateStaticParams() {
  return ["en", "es", "ar"].map((locale) => ({ locale }));
}

// ✅ دالة التخطيط الرئيسية
export default async function LocaleLayout({ children, params }) {
  const locale = params.locale;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch {
    notFound();
  }

  return (
    <html
      lang={locale}
      className={`${geistMono.className} ${montserrat.className} ${geistSans.variable}`}
    >
      <body className="min-h-screen" style={{ margin: 0, padding: 0, width: "100vw", height: "100vh" }}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
