"use client";
import React from "react";
import Image from "next/image";
import { AdviceCard } from "@/lib/constants/FixedTexts";
import { motion } from "framer-motion";
import { useScreenSize } from "../hooks/screenSize";

const GeneralAdvice = () => {
  const { width, height } = useScreenSize();

  return (
    <div
      style={{ padding: "10px" }}
      className="w-full flex items-center flex-col px-4"
    >
      <h1
        style={{
          fontSize: "clamp(2rem, 4vw, 3.5rem)",
          textTransform: "capitalize",
          color: "#ff9800",
          fontWeight: "bold",
          marginBottom: "2rem",
        }}
      >
        General Advice
      </h1>

      <div className="flex flex-row flex-wrap gap-6 items-center justify-center w-full">
        {AdviceCard.map((i, index) => (
          <motion.div
            key={i.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            style={{
              display: "flex",
              flexDirection: width <= 1024 ? "column" : "row-reverse",
              alignItems: width <= 1024 ? "" : "center",
              // background: "linear-gradient(to left, #dcedc8, #fff8e1)",
              border:"1px solid #ff9800",
              borderRadius: "20px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
              overflow: "hidden",
              maxWidth: "700px",
              width: "100%",
              height:"100%",
              minHeight: "500px", // ✅ هنا التعديل
              transition: "box-shadow 0.3s ease",
            }}
          >
            <div
              style={{
                flex: "0 0 300px",
                position: "relative",
                zIndex: "8888",
              }}
            >
              <Image
                src={i.imageUrl}
                alt={i.title}
                width={width <= 1024 ? 700 : 500}
                height={250}
                style={{ objectFit: "cover", zIndex: "9999" }}
              />
            </div>

            <div
              style={{
                flex: 1,
                padding: "1.5rem",
                color: "#333",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                height: "100%", // ✅ هنا التعديل
              }}
            >
              <h2
                style={{
                  fontSize: "1.25rem",
                  marginBottom: "0.75rem",
                  color: "#ff9800",
                  fontWeight: "600",
                }}
              >
                {i.title}
              </h2>
              <p
                style={{
                  fontSize: "1rem",
                  lineHeight: "1.6",
                  color: "#999",
                }}
              >
                {i.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default GeneralAdvice;
