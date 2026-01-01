"use client";
import { useEffect, useState } from "react";
import LinksMidea from "./LinksMidea";
import BtnHero from "./BtnHero";
import TextHero from "./TextHero";
import TravelPlannerForm from "./TravelPlannerForm";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";

const Hero = ({ showBubble }) => {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  const muiTheme = useTheme();

  return (
    <section
      style={{ color: muiTheme.palette.text.primary }}
      className="w-full h-full flex flex-col items-center justify-end md:justify-center gap-5 z-20"
    >
      <TextHero />
      <TravelPlannerForm />
      <motion.div
        initial="hidden"
        animate="visible"
        style={{ borderRadius: "6px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
          },
        }}
        className="flex flex-wrap gap-4 justify-center font-[Cinzel] text-[32px] lg:text-[64px]"
      >
        {["L", "U", "X", "O", "R", "𓂀", "A", "S", "W", "A", "N"].map(
          (char, i) => (
            <LogoLetter key={i} char={char} theme={muiTheme} />
          )
        )}
      </motion.div>
      {/* <BtnHero /> */}
    </section>
  );
};

export default Hero;

/* Logo Letter Component */
function LogoLetter({ char, theme }) {
  return (
    <motion.span
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={{
        scale: 1.2,
        textShadow: `0 0 20px ${theme.palette.primary.main}`,
      }}
      style={{
        borderColor: theme.palette.primary.main,
        backgroundImage: `linear-gradient(to bottom right, ${theme.palette.primary.light}, ${theme.palette.primary.dark})`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
      className="relative px-[8px] text-center font-extrabold border-2 rounded-lg transition-transform duration-500"
    >
      {char}
    </motion.span>
  );
}
