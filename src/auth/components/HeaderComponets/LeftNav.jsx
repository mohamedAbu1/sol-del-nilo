"use client";
import { useEffect, useState } from "react";
import { FaDollarSign } from "react-icons/fa";
import { BsDoorOpenFill } from "react-icons/bs";
import { motion } from "framer-motion";
import LogoutBtn from "./LogoutBtn";
import { Button } from "@mui/material";
import { useTranslations } from "next-intl";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { useTheme } from "@mui/material/styles"; // ✅ استدعاء الثيم

const LeftNav = ({ path, user, width }) => {
  const boxVariants = {
    hidden: { opacity: 0, scale: 0.1 },
    visible: { opacity: 1, scale: 1 },
  };
  const t = useTranslations("Header");
  const router = useRouter();
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  const { setOpen } = useAppContext();
  const muiTheme = useTheme(); // ✅ يجيب الثيم الحالي (light/dark)

  return (
    <motion.div
      variants={boxVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay: 1, duration: 1 }}
      className="md:w-2/4 lg:w-6/12 flex flex-row items-center justify-around"
      style={{ color: muiTheme.palette.text.secondary }} // ✅ النصوص من الثيم
    >
      {user ? (
        <div className="flex gap-8.5">
          {hasMounted && width > 1024 && <LogoutBtn />}
        </div>
      ) : (
        <>
          <FaDollarSign
            style={{
              color:
                path === "/en/tours"
                  ? muiTheme.palette.secondary.main // ✅ اللون الثانوي عند اختيار الصفحة
                  : muiTheme.palette.primary.main, // ✅ اللون الأساسي
            }}
            className="hidden xl:flex text-2xl"
          />
          <Button
            variant="outlined"
            endIcon={<BsDoorOpenFill />}
            sx={{
              color: muiTheme.palette.text.primary, // ✅ النص من الثيم
              borderColor: muiTheme.palette.primary.main, // ✅ الإطار من الثيم
              "&:hover": {
                color: muiTheme.palette.secondary.main,
                borderColor: muiTheme.palette.secondary.main,
              },
            }}
            onClick={() => router.push("/register")}
          >
            {t("Btn1")}
          </Button>
        </>
      )}
    </motion.div>
  );
};

export default LeftNav;
