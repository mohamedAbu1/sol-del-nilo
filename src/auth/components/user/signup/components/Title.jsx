"use client"
import { motion } from "framer-motion"

export default function Title({ muiTheme, t, itemVariants }) {
  return (
    <motion.h1
      variants={itemVariants}
      style={{
        color: muiTheme.palette.secondary.main,
        zIndex: "999",
        fontSize: "28px",
      }}
    >
      {t("SignUnForm.title")}
    </motion.h1>
  )
}
