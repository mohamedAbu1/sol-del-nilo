"use client";
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$
import Logo from "./HeaderComponets/Logo";
import Nav from "./HeaderComponets/Nav";
import LeftNav from "./HeaderComponets/LeftNav";
import MobilNav from "./HeaderComponets/MobilNav";
import { usePathname } from "next/navigation";
import {
  ToursPathEn,
  ToursPathEs,
  AboutPathEn,
  AboutPathEs,
} from "@/lib/constants/FixedTexts";
import ThemeToggle from "./ThemeToggle";

// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
const Header = ({ user }) => {
  const path = usePathname(); // مثل: "/en/about" أو "/ar/visaInfo"

  // ✅ تقسيم المسار إلى أجزاء
  const segments = path.split("/").filter(Boolean); // يحذف الفراغات الناتجة عن "/"

  // ✅ استخراج الجزء بعد اللغة
  const slug = segments.length > 1 ? segments.slice(1).join("/") : "";

 
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$
  return (
    <header
      style={{
        zIndex: "9000",
        height: "120px",
        color: "var(--textLithe)",
        border: "1px solid #6543",
        borderRadius: "22px",
        marginTop: "8px",
      }}
      className={
        path === ToursPathEn ||
        path === ToursPathEs ||
        path === AboutPathEn ||
        path === AboutPathEs
          ? "container flex items-center justify-between z-50"
          : "container flex items-center justify-around p-4 absolute top-0 z-50"
      }
    >
      <Logo path={path} />
      <Nav path={path} user={user} slug={slug}/>
      <MobilNav slug={slug}/>
      <LeftNav path={path} user={user} />
      <ThemeToggle />
    </header>
  );
};

export default Header;
