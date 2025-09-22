"use client";
// ? $$$$$$$$$$$$
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
// import { getNavPath } from "@/lib/constants/FixedTexts";
import { motion } from "framer-motion";
import { ToursPathEn, ToursPathEs } from "@/lib/constants/FixedTexts";
import { useScreenSize } from "../../hooks/screenSize";
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
const Nav = ({ path, user }) => {
  const { width, height } = useScreenSize();
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  const t = useTranslations("Header");
  // ? $$$$$$$$$$$$$$$$$$$
  const boxVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

  return (
    <div className="hidden md:flex w-3/6 justify-start ">
      <ul className="w-full flex flex-row items-center justify-around capitalize gap-2">
        <motion.li
          style={{
            fontWeight: "600",
            fontSize:
              width <= 1297
                ? path === ToursPathEs
                  ? "15px"
                  : "19px"
                : path === ToursPathEn
                ? "19px"
                : "19px",
          }}
          variants={boxVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5, duration: 0.5 }}
          className={"text-gray-400"}
        >
          <Link href={"/"} className="link">
          {t("Home")}
          </Link>
        </motion.li>
        <motion.li
          style={{
            fontWeight: "600",
            fontSize:
              width <= 1297
                ? path === ToursPathEs
                  ? "15px"
                  : "19px"
                : path === ToursPathEn
                ? "19px"
                : "19px",
          }}
          variants={boxVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5, duration: 0.5 }}
          className={"text-gray-400"}
        >
          <Link href={"/tours"} className="link">
          {t("Tours")}
          </Link>
        </motion.li>
        <motion.li
          style={{
            fontWeight: "600",
            fontSize:
              width <= 1297
                ? path === ToursPathEs
                  ? "15px"
                  : "19px"
                : path === ToursPathEn
                ? "19px"
                : "19px",
          }}
          variants={boxVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5, duration: 0.5 }}
          className={"text-gray-400"}
        >
          <Link href={"/about"} className="link">
          {t("About")}
          </Link>
        </motion.li>
        {!user || user.role !== "ADMIN" ?  "": width <= 1279 ? "":  <motion.li
          style={{
            fontWeight: "600",
            fontSize:
              width <= 1297
                ? path === ToursPathEs
                  ? "15px"
                  : "19px"
                : path === ToursPathEn
                ? "19px"
                : "19px",
          }}
          variants={boxVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5, duration: 0.5 }}
          className={"text-gray-400"}
        >
          <Link href={"/admin"} className="link">
          {t("Admin")}
          </Link>
        </motion.li> }
      
      </ul>
    </div>
  );
};

export default Nav;
