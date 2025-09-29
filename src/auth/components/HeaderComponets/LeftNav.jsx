"use client";
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
import { Link } from "@/i18n/navigation";
import { FaDollarSign } from "react-icons/fa";
import { BsDoorOpenFill } from "react-icons/bs";
import { color, motion } from "framer-motion";
import { BsFillPersonVcardFill } from "react-icons/bs";
import LogoutBtn from "./LogoutBtn";
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
const LeftNav = ({ path, user, }) => {
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
      {user ? (
        <div className="flex gap-8.5">
          <h3
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textTransform: "capitalize",
              fontSize: "18px",
              gap: "10px",
              color: "#d4a85f",
            }}
          >
            <BsFillPersonVcardFill />
            {user.name}
          </h3>
          <LogoutBtn />
         
        </div>
      ) : (
        <>
          <FaDollarSign
            style={{ color: path === "/en/tours" ? "#ff9800" : "#d4a85f" }}
            className="hidden xl:flex text-2xl "
          />
          <Link
            href={"/register"}
            style={{":hover":{color:"#d4a85f"}}}
            className="flex items-center justify-center gap-2 flex-row link"
          >
            Sign Up <BsDoorOpenFill />
          </Link>
        </>
      )}
    </motion.div>
  );
};

export default LeftNav;
