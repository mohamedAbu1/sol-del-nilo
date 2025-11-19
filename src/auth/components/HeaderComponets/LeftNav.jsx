"use client";
import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import { FaDollarSign } from "react-icons/fa";
import { BsDoorOpenFill, BsFillPersonVcardFill } from "react-icons/bs";
import { motion } from "framer-motion";
import LogoutBtn from "./LogoutBtn";
import { Button } from "@mui/material";
import { useTranslations } from "next-intl";

const LeftNav = ({ path, user, width }) => {
  const boxVariants = {
    hidden: { opacity: 0, scale: 0.1 },
    visible: { opacity: 1, scale: 1 },
  };
  const t = useTranslations("Header");

  // ✅ منع التفاعل قبل تحميل المتصفح
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <motion.div
      variants={boxVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay: 1, duration: 1 }}
      className="text-gray-400 md:w-2/4 lg:w-6/12 flex flex-row items-center justify-around"
    >
      {user ? (
        <div className="flex gap-8.5">
          {/* <h3
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textTransform: "capitalize",
              fontSize: "14px",
              gap: "10px",
              color: "#d4a85f",
            }}
          >
            <BsFillPersonVcardFill />
            {user.name}
          </h3> */}
          {hasMounted && width > 1024 && <LogoutBtn />}
        </div>
      ) : (
        <>
          <FaDollarSign
            style={{ color: path === "/en/tours" ? "#ff9800" : "#d4a85f" }}
            className="hidden xl:flex text-2xl"
          />
          <Link
            href={"/register"}
            className="flex items-center justify-center gap-2 flex-row"
          >
            <Button
              variant="outlined"
              color="warning"
              endIcon={<BsDoorOpenFill />}
              style={{ color: "#fff" }}
              className="hover:text-gray-400"
            >
              {t("Btn1")}
            </Button>
          </Link>
        </>
      )}
    </motion.div>
  );
};

export default LeftNav;
