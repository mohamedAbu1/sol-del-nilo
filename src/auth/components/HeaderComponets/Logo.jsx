"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useScreenSize } from "../../hooks/screenSize";
import { useTheme as useNextTheme } from "next-themes"; // ✅ نقرأ الوضع الحالي

const Logo = ({ path }) => {
  const { width } = useScreenSize();
  const { resolvedTheme } = useNextTheme(); // ✅ يجيب "light" أو "dark"

  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // ✅ قيم افتراضية لمنع اختلاف SSR
  const imageSize = hasMounted && width <= 540 ? 80 : 150;
  const paddingLeft = hasMounted && width >= 670 ? "110px" : "0px";

  // ✅ اختيار اللوجو حسب الثيم
  const logoSrc =
    resolvedTheme === "dark"
      ? "/assets/Copilot_20251209_142706-removebg-preview.webp" // اللوجو الخاص بالدارك مود
      : "/assets/Copilot_20251208_084907.webp"; // اللوجو الخاص باللايت مود

  return (
    <div
      style={{ paddingLeft }}
      className="md:w-3/12 lg:w-1/3 flex justify-start items-center"
    >
      <Link href={"/"}>
        {hasMounted && (
          <Image
            className="Logo"
            src={logoSrc}
            alt="logo img"
            width={imageSize}
            height={imageSize}
            priority
            loading="eager"
            style={{ cursor: "pointer" }}
          />
        )}
      </Link>
    </div>
  );
};

export default Logo;
