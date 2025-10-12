"use client";
// ? $$$$$$$$$$$$$$$$$$$$$$$$
import Image from "next/image";
// const logo = "/assets/Copilot_20250908_231423.png";
import { Link } from "@/i18n/navigation";
import { useScreenSize } from "../../hooks/screenSize";
import { motion } from "framer-motion";
import { ToursPathEn, ToursPathEs } from "@/lib/constants/FixedTexts";

// ? $$$$$$$$$$$$$$$$$$$$$$$$
const Logo = ({ path }) => {
    const { width, height } = useScreenSize();
  // ? $$$$$$$$$$$$$$$$$$$$$$
  return (
    <div    
      style={{paddingLeft: width >= 670 ?"110px" : "0px"}}
      className="md:w-3/12 lg:w-1/3 flex justify-start items-center"
    >
      <Link href={"/"}>
        <Image
          className="Logo"
          src={"/assets/Copilot_20250908_2314232.png"}
          alt="logo img"
          width={width <= 540 ? 100 : 150}
          height={width <= 540 ? 100 : 150}
          priority
          loading="eager"
        />
      </Link>
    </div>
  );
};

export default Logo;
