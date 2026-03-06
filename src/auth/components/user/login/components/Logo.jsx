"use client"
import Image from "next/image"
import { motion } from "framer-motion"
import { useTheme } from "@mui/material/styles"

export default function Logo({ itemVariants }) {
  const muiTheme = useTheme()
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
      />
    </motion.div>
  )
}
