"use client";
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
import { motion } from "framer-motion";
import Image from "next/image";
import { useTheme } from "@mui/material/styles"; // ✅ استدعاء الثيم
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

const SignUpTextHero = () => {
  const muiTheme = useTheme(); // ✅ يجيب الثيم الحالي

  // ✅ اختيار الصورة حسب الثيم
  const logoSrc =
    muiTheme.palette.mode === "dark"
      ? "/assets/Copilot_20251209_142706-removebg-preview.webp" // صورة خاصة بالـ Dark Mode
      : "/assets/Copilot_20251208_084907.webp"; // صورة خاصة بالـ Light Mode

  return (
    <motion.section
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="hidden lg:flex w-1/2 h-full items-center justify-center flex-col z-20"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <Image
          src={logoSrc} // ✅ الصورة تتغير حسب الثيم
          alt="Logo"
          width={500}
          height={200}
          loading="eager"
          priority
          placeholder="blur"
          blurDataURL="data:image/webp;base64,..."
        />
      </motion.div>
    </motion.section>
  );
};

export default SignUpTextHero;
