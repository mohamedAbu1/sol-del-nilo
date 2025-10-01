"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "@/i18n/navigation";

const RegisterToBuy = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.5 });

  const boxVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div
      ref={ref}
      className="w-full flex items-center justify-center px-4 py-10"
      style={{ minHeight: "500px" }}
    >
      <motion.div
        variants={boxVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-[600px] flex flex-col items-center justify-center gap-6 rounded-xl border border-[#d4a85f] shadow-md bg-[#fdf8f3] text-[#ff9800] font-[Cairo] font-semibold p-6"
      >
        <h1 className="text-[clamp(1.5rem,4vw,2.2rem)] text-center">
          You must log in to book. 💡
        </h1>
        <Link
          href="/login"
          className="text-[clamp(1rem,2.5vw,1.4rem)] hover:text-black transition-colors duration-300"
        >
          Login
        </Link>
      </motion.div>
    </div>
  );
};

export default RegisterToBuy;
