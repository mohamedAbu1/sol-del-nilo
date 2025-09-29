import React, { useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Link } from "@/i18n/navigation";

const RegisterToBuy = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.5 }); // يظهر عندما يكون نصف العنصر داخل الشاشة

  return (
    <div ref={ref} className="w-1/2 flex items-center justify-center" style={{ height: "800px" }}>
      <AnimatePresence>
        {inView && (
          <motion.div
            key="register"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
              background: "#fdf8f3",
              borderRadius: "12px",
              padding: "20px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              border: "1px solid #d4a85f",
              marginLeft: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "Cairo, sans-serif",
              fontWeight: "600",
              color: "#ff9800",
              width: "80%",
              height: "30%",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <h1 style={{ fontSize: "33px" }}>You must log in to book. 💡</h1>
            <Link href={"/Login"} style={{ fontSize: "22px" }} className="hover:text-[black]">
              Login
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RegisterToBuy;
