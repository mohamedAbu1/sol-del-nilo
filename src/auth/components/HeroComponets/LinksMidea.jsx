"use client";
import React from "react";
import { motion } from "framer-motion";
import { MideaIcon } from "../../../lib/constants/FixedTexts";

const LinksMidea = () => {
  const boxVariants = {
    hidden: { opacity: 0, y: +100 },
    visible: { opacity: 1, y: 0 },
  };

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
          className="SocialMediaIcon"
        >
          {i.Icon}
        </motion.a>
      ))}
    </div>
  );
};

export default LinksMidea;
