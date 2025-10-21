"use client";
// ? $$$$$$$$$$$$
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ToursPathEn, ToursPathEs } from "@/lib/constants/FixedTexts";
import { useScreenSize } from "../../hooks/screenSize";
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
const Nav = ({ path, user, slug }) => {
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
    <div className="hidden lg:flex w-3/5 justify-start">
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
          className={slug === "" ? "text-[#d4a85f]" : "text-gray-400"}
        >
          <Link href={"/"} style={{cursor: "pointer"}} className="hover:text-[#d4a85f]">
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
          className={slug === "tours" ? "text-[#d4a85f]" : "text-gray-400"}
        >
          <Link
            href={{
              pathname: "/tours",
              query: {
                destination: "All",
                category: "All",
                date: new Date().toISOString().split("T")[0],
                duration: "61",
                minPrice: "0",
                maxPrice: "14000",
                search: "All",
              },
            }}
            className="hover:text-[#d4a85f]"
            style={{cursor: "pointer"}}
          >
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
          className={slug === "about" ? "text-[#d4a85f]" : "text-gray-400"}
        >
          <Link href={"/about"} style={{cursor: "pointer"}} className="hover:text-[#d4a85f]">
            {t("About")}
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
          className={slug === "contact" ? "text-[#d4a85f]" : "text-gray-400"}
        >
          <Link href={"/contact"} style={{cursor: "pointer"}} className="hover:text-[#d4a85f]">
            {t("Contact")}
          </Link>
        </motion.li>
        {!user || user.role !== "ADMIN" ? (
          ""
        ) : width <= 1279 ? (
          ""
        ) : (
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
            className={slug === "admin" ? "text-[#d4a85f]" : "text-gray-400"}
          >
            <Link href={"/admin"} style={{cursor: "pointer"}} className="hover:text-[#d4a85f]">
              {t("Admin")}
            </Link>
          </motion.li>
        )}
      </ul>
    </div>
  );
};

export default Nav;
