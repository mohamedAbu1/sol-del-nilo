"use client"
import { motion } from "framer-motion"
import { Button } from "@mui/material"
import Link from "next/link"
import { useTheme } from "@mui/material/styles"

export default function Footer({ t, itemVariants }) {
  const muiTheme = useTheme()
  return (
    <>
      <motion.h3 variants={itemVariants} style={{ zIndex: "9999", fontSize: "22px" }}>
        <span style={{ color: muiTheme.palette.text.secondary }}>{t("LoginForm.account")}</span>
      </motion.h3>
      <motion.div variants={itemVariants}>
        <Link href={"/register"}>
          <Button sx={{ zIndex: "999" }} size="large" variant="contained">
            {t("LoginForm.Btn2")}
          </Button>
        </Link>
      </motion.div>
    </>
  )
}
