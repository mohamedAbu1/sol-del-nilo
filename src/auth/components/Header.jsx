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
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
const Header = () => {
  const path = usePathname();
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
          ? "container flex items-center justify-between "
          : "container flex items-center justify-around p-4 absolute top-0 z-50"
      }
    >
      <Logo path={path} />
      <Nav path={path} />
      <MobilNav />
      <LeftNav path={path} />
    </header>
  );
};

export default Header;
