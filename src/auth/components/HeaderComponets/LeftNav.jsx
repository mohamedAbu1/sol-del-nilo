"use client";
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
import { Link } from "@/i18n/navigation";
import { FaDollarSign } from "react-icons/fa";
import { BsDoorOpenFill } from "react-icons/bs";
import { motion } from "framer-motion";
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
const LeftNav = ({ path }) => {

  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

  const boxVariants = {
    hidden: { opacity: 0, scale: 0.1 },
    visible: { opacity: 1, scale: 1 },
  };


  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

  return (
    <motion.div
      variants={boxVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay: 1, duration: 1 }}
      className={
        " text-gray-400 md:w-1/6 lg:w-3/12 flex flex-row items-center justify-around"
      }
    >
      <FaDollarSign
        style={{ color: path === "/en/tours" ? "#ff9800" : "#d4a85f" }}
        className="hidden xl:flex text-2xl "
      />
      <Link
        href={"/register"}
        className="flex items-center justify-center gap-2 flex-row link"
      >
        Sign Up <BsDoorOpenFill />
      </Link>
    </motion.div>
  );
};

export default LeftNav;
