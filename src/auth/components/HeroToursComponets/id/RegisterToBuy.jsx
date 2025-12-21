"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { useTheme } from "@mui/material/styles"; // ✅ استدعاء الثيم

const RegisterToBuy = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.5 });
  const muiTheme = useTheme(); // ✅ يجيب الثيم الحالي

  const boxVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div
      ref={ref}
      style={{ marginBottom: "20px" }}
      className="w-full flex items-center justify-center px-4 py-10"
    >
      <motion.div
        variants={boxVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-[600px] flex flex-col items-center justify-center gap-6 rounded-xl shadow-md font-[Cairo] font-semibold p-6"
        style={{
          border: `1px solid ${muiTheme.palette.secondary.main}`, // ✅ الحدود من الثيم
          color: muiTheme.palette.primary.main, // ✅ النصوص من الثيم
          backgroundColor: muiTheme.palette.background.paper, // ✅ الخلفية من الثيم
        }}
      >
        <h1 className="text-[clamp(1.5rem,4vw,2.2rem)] text-center">
          You must log in to book. 💡
        </h1>
        <Link
          href="/login"
          className="inline-block px-6 py-3 font-semibold rounded-lg text-[clamp(1rem,2.5vw,1.4rem)] transition-all duration-300 shadow-md"
          style={{
            marginBottom: "5px",
            padding: "5px",
            backgroundColor: muiTheme.palette.primary.main, // ✅ زر بلون أساسي
            color: muiTheme.palette.getContrastText(muiTheme.palette.primary.main), // ✅ نص متباين
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = muiTheme.palette.secondary.main;
            e.currentTarget.style.color = muiTheme.palette.getContrastText(
              muiTheme.palette.secondary.main
            );
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = muiTheme.palette.primary.main;
            e.currentTarget.style.color = muiTheme.palette.getContrastText(
              muiTheme.palette.primary.main
            );
          }}
        >
          Login
        </Link>
      </motion.div>
    </div>
  );
};

export default RegisterToBuy;
