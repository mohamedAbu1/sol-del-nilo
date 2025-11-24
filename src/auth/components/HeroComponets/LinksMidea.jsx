"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { SiTiktok, SiGmail } from "react-icons/si";
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
const LinksMidea = () => {
  const boxVariants = {
    hidden: { opacity: 0, y: +100 },
    visible: { opacity: 1, y: 0 },
  };
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  const MideaIcon = [
    {
      titleIcon: "Facebook",
      path: "https://facebook.com",
      Icon: <FaFacebookF />,
      color: "#1877F2",
    },
    {
      titleIcon: "Instagram",
      path: "https://instagram.com",
      Icon: <FaInstagram />,
      gradient: "linear-gradient(45deg, #feda75, #d62976, #962fbf, #4f5bd5)",
    },
    {
      titleIcon: "TikTok",
      path: "https://tiktok.com",
      Icon: <SiTiktok />,
      color: "#25F4EE",
    },
    {
      titleIcon: "WhatsApp",
      path: "https://wa.me",
      Icon: <FaWhatsapp />,
      color: "#25D366",
    },
    {
      titleIcon: "Gmail",
      path: "https://mail.google.com",
      Icon: <SiGmail />,
      color: "#D14836",
    },
  ];
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

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
          style={{
            background: i.gradient || i.color,
            color: "white",
          }}
          className="SocialMediaIcon p-3 rounded-full shadow-md hover:scale-110 transition"
        >
          {i.Icon}
        </motion.a>
      ))}
    </div>
  );
};

export default LinksMidea;
