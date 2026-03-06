"use client"
import { useParams } from "next/navigation";
import NextLink from "next/link";
export function Link({ href, children, ...props }) {
  const params = useParams();
  const locale = params?.locale || "en";

  let localizedHref;

  if (typeof href === "string") {
    // ✅ لو string نضيف الـ locale
    localizedHref = href.startsWith("/") ? `/${locale}${href}` : href;
  } else if (typeof href === "object" && href.pathname) {
    // ✅ لو object نضيف locale للـ pathname
    localizedHref = {
      ...href,
      pathname: `/${locale}${href.pathname}`,
    };
  } else {
    localizedHref = href;
  }

  return (
    <NextLink href={localizedHref} {...props}>
      {children}
    </NextLink>
  );
}
