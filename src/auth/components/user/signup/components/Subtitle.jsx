"use client"
import { motion } from "framer-motion"
import { Typography } from "@mui/material"

export default function Subtitle({ muiTheme, t, itemVariants }) {
  return (
    <motion.h3
      variants={itemVariants}
      style={{ zIndex: "999" }}
      className="text-center"
    >
      <Typography variant="body1" sx={{ color: muiTheme.palette.text.secondary }}>
        {t("SignUnForm.p")}
      </Typography>
    </motion.h3>
  )
}
