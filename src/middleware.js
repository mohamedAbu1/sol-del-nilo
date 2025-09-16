import { NextRequest, NextResponse } from "next/server";
import { match } from "@formatjs/intl-localematcher";

// ✅ اللغات المدعومة في موقعك
const locales = ["en", "es", "fr", "de", "it"];
const defaultLocale = "en";

// ✅ دالة تحديد اللغة من المتصفح
function getLocale(request) {
  const acceptLanguage = request.headers.get("accept-language");
  const languages = acceptLanguage?.split(",").map(lang => lang.split(";")[0]) || [];

  const matched = match(languages, locales, defaultLocale);
  return locales.includes(matched) ? matched : defaultLocale;
}

// ✅ دالة middleware الرئيسية
export function middleware(request) {
  const pathname = request.nextUrl.pathname;

  // ✅ استثناء مسارات API من التوجيه
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // ✅ استثناء صفحات التسجيل وتسجيل الدخول من التوجيه
  if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
    return NextResponse.next();
  }

  // ✅ استخراج اللغة من المسار الحالي إن وجدت
  const localeFromPath = locales.find(locale => pathname.startsWith(`/${locale}`));

  // ✅ تحديد لغة المتصفح أو اللغة الافتراضية
  const browserLocale = getLocale(request);

  // ✅ إذا كانت اللغة في المسار لا تطابق لغة المتصفح، نعيد التوجيه
  if (localeFromPath && localeFromPath !== browserLocale) {
    const newPath = pathname.replace(`/${localeFromPath}`, `/${browserLocale}`);
    const url = request.nextUrl.clone();
    url.pathname = newPath;
    return NextResponse.redirect(url);
  }

  // ✅ إذا لم يكن هناك لغة في المسار، نضيفها حسب لغة المتصفح أو الافتراضية
  if (!localeFromPath) {
    const url = request.nextUrl.clone();
    url.pathname = `/${browserLocale}${pathname}`;
    return NextResponse.redirect(url);
  }

  // ✅ إذا كانت اللغة في المسار مطابقة للغة المتصفح، نكمل عادي
  return NextResponse.next();
}

// ✅ إعدادات المطابقة لمسارات التوجيه
export const config = {
  matcher: ["/((?!_next|favicon.ico|assets|vercel.svg|api).*)"],
};
