import "../../styles/globals.css";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { TripsContextProvider } from "@/context/TripsContext";
import { ThemeProvider } from "next-themes";
import { AppProvider } from "@/context/AppContext";
import { TripContextProvider } from "@/context/TripContext";
import { AppQueryContextProvider } from "@/context/AppQueryContext";
import { TourEditProvider } from "@/context/TourEditContext";
import { TourImagesProvider } from "@/context/TourImagesContext";

// ✅ تحميل الرسائل حسب اللغة
export function generateStaticParams() {
  return ["en", "es", "fs", "de", "it","ar"].map((locale) => ({ locale }));
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
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <TourImagesProvider>
          <TripContextProvider>
            <TripsContextProvider>
              <TourEditProvider>
                {" "}
                {/* ✅ يجب أن يسبق AppQueryContextProvider */}
                <AppQueryContextProvider>
                  <AppProvider>{children}</AppProvider>
                </AppQueryContextProvider>
              </TourEditProvider>
            </TripsContextProvider>
          </TripContextProvider>
        </TourImagesProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
