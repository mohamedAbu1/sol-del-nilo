"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Logo({ muiTheme, itemVariants }) {
  return (
    <motion.div variants={itemVariants} style={{ zIndex: "9999" }}>
      <Image
        src={
          muiTheme.palette.mode === "dark"
            ? "/assets/Copilot_20251209_142706-removebg-preview.webp"
            : "/assets/Copilot_20251209_142706-removebg-preview.webp"
        }
        alt="Logo"
        width={110}
        height={110}
        loading="eager"
        priority
        placeholder="blur"
        blurDataURL="data:image/webp;base64,..."
        className="flex lg:hidden"
        style={{ zIndex: "9999" }}
      />
    </motion.div>
  );
}
