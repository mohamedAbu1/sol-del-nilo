import "../../styles/globals.css";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import ClientLayout from "./ClientLayout";

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
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ClientLayout>{children}</ClientLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
