"use client";
import { useEffect, useState } from "react";
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

const Header = ({ user }) => {
  const path = usePathname();
  const segments = path.split("/").filter(Boolean);
  const slug = segments.length > 1 ? segments.slice(1).join("/") : "";

  const { width, height } = useScreenSize();

  // ✅ منع التفاعل قبل تحميل المتصفح
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) return null;

  const isStaticPath =
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
    path === ContactPathde;

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
        isStaticPath
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
