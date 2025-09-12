"use client";
// ? $$$$$$$$$$$$$$$$$$$$$$$$
import Image from "next/image";
const logo = "/assets/Copilot_20250908_231338.png";
const logo2 = "/assets/Copilot_20250908_231423.png";
import { Link } from "@/i18n/navigation";
import { useScreenSize } from "../../hooks/screenSize";
import { motion } from "framer-motion";
import { ToursPathEn, ToursPathEs } from "@/lib/constants/FixedTexts";

// ? $$$$$$$$$$$$$$$$$$$$$$$$
const Logo = ({ path }) => {
    const { width, height } = useScreenSize();

  const boxVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
  };
  // ? $$$$$$$$$$$$$$$$$$$$$$
  return (
    <motion.div
      variants={boxVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 1.5 }}
      style={{paddingLeft: width >= 670 ?"110px" : "0px"}}
      className="md:w-3/12 lg:w-3/6 flex justify-start items-center"
    >
      <Link href={"/"}>
        <Image
          className="Logo"
          src={width <= 1023 ? logo2 : path ===  ToursPathEn ||ToursPathEs ? logo2 : logo}
          alt="logo img"
          width={width <= 540 ? 100 : 150}
          height={width <= 540 ? 100 : 150}
          priority
          loading="eager"
        />
      </Link>
    </motion.div>
  );
};

export default Logo;
