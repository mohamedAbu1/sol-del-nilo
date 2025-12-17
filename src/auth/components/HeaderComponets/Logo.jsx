"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useScreenSize } from "../../hooks/screenSize";
const Logo = ({ path }) => {
  const { width } = useScreenSize();

  // ✅ منع التفاعل قبل تحميل المتصفح
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // ✅ قيم افتراضية لمنع اختلاف SSR
  const imageSize = hasMounted && width <= 540 ? 80 : 150;
  const paddingLeft = hasMounted && width >= 670 ? "110px" : "0px";

  return (
    <div
      style={{ paddingLeft }}
      className="md:w-3/12 lg:w-1/3 flex justify-start items-center"
    >
      <Link href={"/"}>
        <Image
          className="Logo"
          src={"/assets/Copilot_20251209_142706-removebg-preview.webp"}
          alt="logo img"
          width={imageSize}
          height={imageSize}
          priority
          loading="eager"
          placeholder="blur"
          blurDataURL="data:image/webp;base64,..."
          style={{ cursor: "pointer" }}
        />
      </Link>
    </div>
  );
};

export default Logo;
