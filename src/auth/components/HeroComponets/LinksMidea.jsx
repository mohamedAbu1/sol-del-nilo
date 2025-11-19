"use client";
import React from "react";
import { motion } from "framer-motion";
import { MideaIcon } from "../../../lib/constants/FixedTexts";

const LinksMidea = () => {
  const boxVariants = {
    hidden: { opacity: 0, y: +100 },
    visible: { opacity: 1, y: 0 },
  };

  // 🎨 مصفوفة ألوان للخلفيات
  const bgColors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-pink-500",
    "bg-yellow-500",
    "bg-red-500",
  ];
// const bgColors = [
//     "bg-blue-500",
//     "bg-red-500",
//     "bg-green-500",
//     "bg-yellow-500",
//     "bg-purple-500",
//     "bg-pink-500",
//   ];
  return (
    <div
      style={{ marginTop: "40px" }}
      className="w-72 flex items-center justify-around flex-row"
    >
      {MideaIcon.map((i, index) => (
        <motion.a
          href={i.path}
          target="_blank"
          rel="noopener noreferrer"
          title={i.titleIcon}
          key={index}
          variants={boxVariants}
          initial="hidden"
          animate="visible"
          transition={{
            delay: index * 0.2,
            duration: 0.5,
          }}
          // ✅ إضافة خلفية مختلفة لكل أيقونة
          className={`SocialMediaIcon ${bgColors[index % bgColors.length]} 
                     text-white p-3 rounded-full shadow-md hover:scale-110 transition`}
        >
          {i.Icon}
        </motion.a>
      ))}
    </div>
  );
};

export default LinksMidea;
