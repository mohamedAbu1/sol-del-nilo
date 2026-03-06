"use client"
import { motion } from "framer-motion"
import { useTheme } from "@mui/material/styles"

export default function Title({ t, itemVariants }) {
  const muiTheme = useTheme()
  return (
    <motion.h1
      variants={itemVariants}
      style={{
        color: muiTheme.palette.secondary.main,
        zIndex: "999",
        fontSize: "28px",
      }}
    >
      {t("LoginForm.LoginTitle")}
    </motion.h1>
  )
}
