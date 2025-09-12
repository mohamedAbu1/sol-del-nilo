"use client";
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
import { Link } from "@/i18n/navigation";
import { FaDollarSign } from "react-icons/fa";
import { HiLanguage } from "react-icons/hi2";
import { BsDoorOpenFill } from "react-icons/bs";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { ToursPathEn, ToursPathEs } from "@/lib/constants/FixedTexts";
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
const LeftNav = ({ path }) => {

  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  const locale = useLocale();

  const boxVariants = {
    hidden: { opacity: 0, scale: 0.1 },
    visible: { opacity: 1, scale: 1 },
  };

  function getTargetHref(path) {
    if (path === ToursPathEn || path === ToursPathEs) {
      return "/tours"; // بدون لغة
    }
    return "/";
  }

  function getTargetLocale(locale) {
    return locale === "en" ? "es" : "en";
  }
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

  return (
    <motion.div
      variants={boxVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay: 1, duration: 1 }}
      className={
        " text-gray-400 md:w-1/6 lg:w-3/12 flex flex-row items-center justify-around"
      }
    >
      <FaDollarSign
        style={{ color: path === "/en/tours" ? "#ff9800" : "#d4a85f" }}
        className="hidden xl:flex text-2xl "
      />
      <Link
        href={getTargetHref(path)}
        locale={getTargetLocale(locale)}
        title={locale}
      >
        {" "}
        <HiLanguage
          style={{ color: path === "/en/tours" ? "#ff9800" : "#d4a85f" }}
          className="flex text-2xl "
        />
      </Link>
      <Link
        href={"/register"}
        className="flex items-center justify-center gap-2 flex-row link"
      >
        Sign Up <BsDoorOpenFill />
      </Link>
    </motion.div>
  );
};

export default LeftNav;
