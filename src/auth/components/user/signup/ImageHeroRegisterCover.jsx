"use client";
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
import Image from "next/image";
import { motion } from "framer-motion";
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
const imag2 = "/assets/Copilot_20250910_005440.png";
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
const ImageHeroRegisterCover = () => {
  return (
    <>
      {/* صورة تظهر فقط على الشاشات الكبيرة */}
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="hidden lg:flex w-full h-full absolute inset-0"
      >
        <Image
          src={"/assets/Temple_of_the_Elephants.png"}
          alt="background"
          fill
          loading="eager"
          className="object-cover"
        />
      </motion.div>

      {/* صورة تظهر فقط على الشاشات الصغيرة */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex lg:hidden w-full h-full absolute inset-0"
      >
        <Image
          src={imag2}
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
