import "../../styles/globals.css";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import ClientLayout from "./ClientLayout";
import { ThemeProvider as NextThemeProvider } from "next-themes"; // ✅ من next-themes
import { ThemeContextProvider } from "@/context/ThemeContext";   // ✅ الكونتكست الخاص بالثيم

export function generateStaticParams() {
  return ["en", "es", "fs", "de", "it", "ar"].map((locale) => ({ locale }));
}

export default function LocaleLayout({ children, params }) {
  const locale = params.locale;

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  let messages;
  try {
    messages = require(`../../messages/${locale}.json`);
  } catch {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        {/* ✅ NextThemeProvider يضيف class light/dark على <html> */}
        <NextThemeProvider attribute="class" defaultTheme="light">
          {/* ✅ ThemeContextProvider يبدّل بين lightTheme و darkTheme */}
          <ThemeContextProvider>
            <NextIntlClientProvider locale={locale} messages={messages}>
              <ClientLayout>{children}</ClientLayout>
            </NextIntlClientProvider>
          </ThemeContextProvider>
        </NextThemeProvider>
      </body>
    </html>
  );
}
