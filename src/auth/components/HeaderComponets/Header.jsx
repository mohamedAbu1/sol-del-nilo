"use client";
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$
import Logo from "./Logo";
import Nav from "./Nav";
import LeftNav from "./LeftNav";
import MobilNav from "./MobilNav";
import { usePathname } from "next/navigation";
import {
  ToursPathEn,
  ToursPathEs,
  AboutPathEn,
  AboutPathEs,
  ToursPathde,
  ToursPathfr,
  ToursPathit,
  AboutPathde,
  AboutPathfr,
  AboutPathit,
  ContactPathfr,
  ContactPathit,
  ContactPathde,
  ContactPathEn,
  ContactPathEs,
} from "@/lib/constants/FixedTexts";
import ThemeToggle from "../ThemeToggle";
import { useScreenSize } from "../../hooks/screenSize";

// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
const Header = ({ user }) => {
  const path = usePathname(); // مثل: "/en/about" أو "/ar/visaInfo"

  // ✅ تقسيم المسار إلى أجزاء
  const segments = path.split("/").filter(Boolean); // يحذف الفراغات الناتجة عن "/"

  // ✅ استخراج الجزء بعد اللغة
  const slug = segments.length > 1 ? segments.slice(1).join("/") : "";

  const { width, height } = useScreenSize();
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$
  return (
    <header
      style={{
        zIndex: "999",
        height: "120px",
        color: "var(--textLithe)",
        border: "1px solid #6543",
        borderRadius: "22px",
        marginTop: "8px",
      }}
      className={
        path === ToursPathEn ||
        path === ToursPathEs ||
        path === ToursPathde ||
        path === ToursPathfr ||
        path === ToursPathit ||
        path === AboutPathEn ||
        path === AboutPathEs ||
        path === AboutPathde ||
        path === AboutPathfr ||
        path === AboutPathit ||
        path === ContactPathEn ||
        path === ContactPathEs ||
        path === ContactPathfr ||
        path === ContactPathit ||
        path === ContactPathde
          ? "container flex items-center justify-between z-50"
          : "container flex items-center justify-around p-4 absolute top-0 z-50"
      }
    >
      <Logo path={path} />
      <Nav path={path} user={user} slug={slug} />
      <MobilNav slug={slug} user={user} />
      <LeftNav path={path} user={user} width={width} />
      <ThemeToggle />
    </header>
  );
};

export default Header;
