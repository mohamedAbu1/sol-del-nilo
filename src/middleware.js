// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import { verifyToken } from "@/lib/utils/JWToken";

// 🌐 إعدادات اللغة
const locales = ["en", "es", "fr", "de", "it", "pt", "ar"];
const defaultLocale = "en";

// ✅ تحديد لغة المتصفح
function getLocale(request) {
  const acceptLanguage = request.headers.get("accept-language");
  const languages =
    acceptLanguage?.split(",").map((lang) => lang.split(";")[0]) || [];

  const matched = match(languages, locales, defaultLocale);
  return locales.includes(matched) ? matched : defaultLocale;
}

// ✅ التحقق من صلاحية الوصول لمسارات محمية
async function protectRoute(request) {
  const authHeader = request.headers.get("authorization");

  if (!authHeader) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  const token = authHeader.replace("Bearer ", "");
  const session = await verifyToken(token);

  if (!session || session.role?.toLowerCase() !== "admin") {
    return NextResponse.json({ error: "ممنوع الوصول" }, { status: 403 });
  }

  return null; // ✅ المرور مسموح
}

export async function middleware(request) {
  const pathname = request.nextUrl.pathname;

  // ✅ استثناء مسارات API من التوجيه الدولي
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // ✅ التوجيه حسب اللغة
  const localeFromPath = locales.find((locale) =>
    pathname.startsWith(`/${locale}`)
  );
  const browserLocale = getLocale(request);

  if (localeFromPath && localeFromPath !== browserLocale) {
    const newPath = pathname.replace(
      `/${localeFromPath}`,
      `/${browserLocale}`
    );
    const url = request.nextUrl.clone();
    url.pathname = newPath;
    return NextResponse.redirect(url);
  }

  if (!localeFromPath) {
    const url = request.nextUrl.clone();
    url.pathname = `/${browserLocale}${pathname}`;
    return NextResponse.redirect(url);
  }

  // ✅ حماية المسارات الإدارية فقط
  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    const authResult = await protectRoute(request);
    if (authResult instanceof NextResponse) return authResult;
  }

  return NextResponse.next();
}

// ✅ Matcher
export const config = {
  matcher: [
    "/((?!_next|favicon.ico|assets|vercel.svg).*)",
    "/api/admin/:path*",
    "/admin/:path*",
  ],
};
