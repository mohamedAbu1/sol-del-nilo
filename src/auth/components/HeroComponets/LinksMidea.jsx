"use client";
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
import React from "react";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { MideaIcon } from "../../../lib/constants/FixedTexts";
//  ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
const LinksMidea = () => {
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$
  const boxVariants = {
    hidden: { opacity: 0, y: +100 },
    visible: { opacity: 1, y: 0 },
  };
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$

  return (
    <div
      style={{ marginTop: "40px", transition: "" }}
      className="w-72 flex items-center justify-around flex-row"
    >
      {MideaIcon.map((i, index) => {
        return (
          <motion.span
            key={index}
            variants={boxVariants}
            initial="hidden"
            animate="visible"
            className="SocialMediaIcon"
            transition={{ delay: index * 0.2, duration: 0.5 }}
          >
            <Link herf={i.path} target="_blank" title={i.titleIcon}>
              {i.Icon}
            </Link>
          </motion.span>
        );
      })}
    </div>
  );
};

export default LinksMidea;
