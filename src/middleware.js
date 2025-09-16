import { NextRequest, NextResponse } from "next/server";
import { match } from "@formatjs/intl-localematcher";

const locales = ["en", "es", "fr", "de", "it"];
const defaultLocale = "en";

function getLocale(request) {
  const acceptLanguage = request.headers.get("accept-language");
  const languages = acceptLanguage?.split(",").map(lang => lang.split(";")[0]) || [];

  // نحاول مطابقة اللغة مع اللغات المدعومة
  const matched = match(languages, locales, defaultLocale);

  // إذا كانت اللغة غير مدعومة، نرجع اللغة الافتراضية
  return locales.includes(matched) ? matched : defaultLocale;
}

export function middleware(request) {
  const pathname = request.nextUrl.pathname;

  // استخراج اللغة من المسار الحالي إن وجدت
  const localeFromPath = locales.find(locale => pathname.startsWith(`/${locale}`));

  // تحديد لغة المتصفح أو اللغة الافتراضية
  const browserLocale = getLocale(request);

  // إذا كانت اللغة في المسار لا تطابق لغة المتصفح، نعيد التوجيه
  if (localeFromPath && localeFromPath !== browserLocale) {
    const newPath = pathname.replace(`/${localeFromPath}`, `/${browserLocale}`);
    const url = request.nextUrl.clone();
    url.pathname = newPath;
    return NextResponse.redirect(url);
  }

  // إذا لم يكن هناك لغة في المسار، نضيفها حسب لغة المتصفح أو الافتراضية
  if (!localeFromPath) {
    const url = request.nextUrl.clone();
    url.pathname = `/${browserLocale}${pathname}`;
    return NextResponse.redirect(url);
  }

  // إذا كانت اللغة في المسار مطابقة للغة المتصفح، نكمل عادي
  return NextResponse.next();
}

// ✅ هذا هو المكان الصحيح لوضع config
export const config = {
  matcher: ["/((?!_next|favicon.ico|assets|vercel.svg|api).*)"],
};