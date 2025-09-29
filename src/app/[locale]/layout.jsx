import "../../styles/globals.css";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { DashboardProvider } from "@/context/Information";
import { ThemeProvider } from "next-themes";

// ✅ تحميل الرسائل حسب اللغة
export function generateStaticParams() {
  return ["en", "es", "fs","de","it"].map((locale) => ({ locale }));
}

// ✅ التخطيط المحلي بدون عناصر html/head/body
export default async function LocaleLayout({ children, params }) {
  const locale = params.locale;

  // ✅ التحقق من اللغة المدعومة
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // ✅ تحميل ملفات الترجمة
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch {
    notFound();
  }

  // ✅ إرجاع التخطيط بدون عناصر html/head/body
  return (
    <DashboardProvider>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </NextIntlClientProvider>
    </DashboardProvider>
  );
}
