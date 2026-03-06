"use client"
import { motion } from "framer-motion"
import { useTheme } from "@mui/material/styles"

export default function Subtitle({ t, itemVariants }) {
  const muiTheme = useTheme()
  return (
    <motion.h3 variants={itemVariants} style={{ zIndex: "999" }} className="text-center">
      <span style={{ color: muiTheme.palette.text.secondary }}>{t("LoginForm.LoginP")}</span>
    </motion.h3>
  )
}
