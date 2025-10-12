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
      style={{ marginTop: "40px" }}
      className="w-72 flex items-center justify-around flex-row"
    >
      {MideaIcon.map((i, index) => {
        return (
          <a
            href={i.path}
            target="_blank"
            rel="noopener noreferrer"
            title={i.titleIcon}
            key={index}
            variants={boxVariants}
            initial="hidden"
            animate="visible"
            className="SocialMediaIcon"
            transition={{
              delay: index * 0.2,
              duration: 0.5,
              zIndex: "9999",
            }}
          >
            {i.Icon}
          </a>
        );
      })}
    </div>
  );
};

export default LinksMidea;
