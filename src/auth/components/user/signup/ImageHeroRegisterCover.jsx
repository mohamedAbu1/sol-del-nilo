"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles"; // ✅ استدعاء الثيم

const ImageHeroRegisterCover = () => {
  const muiTheme = useTheme(); // ✅ يجيب الثيم الحالي

  // ✅ اختيار الصور حسب الثيم
  const largeScreenImage =
    muiTheme.palette.mode === "dark"
      ? "/assets/Temple_of_the_Elephants.webp" // صورة للـ Dark Mode
      : "/assets/dmitrii-zhodzishskii-4rXHE9XeW_A-unsplash.webp"; // صورة للـ Light Mode

  const smallScreenImage =
    muiTheme.palette.mode === "dark"
      ? "/assets/Copilot_20250910_005440.webp" // صورة للـ Dark Mode
      : "/assets/nils-lr0qXcaJFik-unsplash.webp"; // صورة للـ Light Mode

  return (
    <>
      {/* صورة للشاشات الكبيرة */}
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="hidden lg:flex w-full h-full absolute inset-0"
      >
        <Image
          src={largeScreenImage} // ✅ الصورة حسب الثيم
          alt="background"
          fill
          loading="eager"
          className="object-cover"
        />
      </motion.div>

      {/* صورة للشاشات الصغيرة */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex lg:hidden w-full h-full absolute inset-0"
      >
        <Image
          src={smallScreenImage} // ✅ الصورة حسب الثيم
          alt="background"
          fill
          loading="eager"
          className="object-cover"
        />
      </motion.div>
    </>
  );
};

export default ImageHeroRegisterCover;
