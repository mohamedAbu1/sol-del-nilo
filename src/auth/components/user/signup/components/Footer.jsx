"use client"
import { motion } from "framer-motion"
import { Typography, Button } from "@mui/material"
import Link from "next/link"

export default function Footer({ muiTheme, t, itemVariants }) {
  return (
    <>
      <motion.h3 variants={itemVariants} style={{ zIndex: "9999", fontSize: "22px" }}>
        <Typography sx={{ color: muiTheme.palette.text.secondary }}>
          {t("SignUnForm.title2")}
        </Typography>
      </motion.h3>

      <motion.div variants={itemVariants}>
        <Link href={"/login"}>
          <Button sx={{ zIndex: "9999" }} variant="contained">
            {t("SignUnForm.btn2")}
          </Button>
        </Link>
      </motion.div>
    </>
  )
}
