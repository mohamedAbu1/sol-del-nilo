"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollRestoration() {
  const pathname = usePathname();

  useEffect(() => {
    const savedScroll = sessionStorage.getItem(`scroll-${pathname}`);
    console.log("📦 المكان المحفوظ لهذه الصفحة:", savedScroll);

    if (savedScroll) {
      setTimeout(() => {
        window.scrollTo(0, parseInt(savedScroll, 10));
        console.log("✅ تم الاسترجاع إلى:", savedScroll);
      }, 100); // تأخير بسيط لضمان أن المحتوى مرسوم
    }
  }, [pathname]);

  return null;
}
