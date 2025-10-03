"use client"
import React, { useRef } from "react";
import { Box, Button, Typography } from "@mui/material";
import Dividering from "./Divider/Divider";
import { GiEgyptianTemple } from "react-icons/gi";
import { BsCalendarDate } from "react-icons/bs";
import { HiOutlineUserGroup } from "react-icons/hi";
import { AiOutlineClockCircle } from "react-icons/ai";
import { FaCircle } from "react-icons/fa6";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Link } from "@/i18n/navigation";
import HikingIcon from "@mui/icons-material/Hiking";
import { useScreenSize } from "@/auth/hooks/screenSize";

const AnimatedSection = ({ children }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.3 });

  return (
    <div ref={ref}>
      <AnimatePresence>
        {inView && (
          <motion.div
            key="content"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.6 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const InformationCard = ({ tour }) => {
    const { width2 } = useScreenSize();

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "900px",
        mt: 6,
        textAlign: "start",
        px: 2,
      }}
    >
      <AnimatedSection>
        <div className="flex flex-row items-center justify-between flex-wrap gap-4">
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              textTransform: "uppercase",
              fontSize: "clamp(32px, 6vw, 80px)",
              fontWeight: "700",
              color: "#FF9800",
            }}
          >
            {tour.title}
          </Typography>
          <Link href={"/tours"}>
            <Button variant="contained" style={{margin:"10px", backgroundColor:"#FF9800"}} endIcon={<HikingIcon />}>
              Another trip
            </Button>
          </Link>
        </div>
      </AnimatedSection>

      <Dividering />
      <Dividering />
      <Dividering />

      <AnimatedSection>
        <Typography
          variant="body1"
          sx={{
            mt: 2,
            // color: "grey",
            fontSize: "clamp(14px, 2vw, 18px)",
            textTransform: "capitalize",
            pb: 2,
          }}
          className="text-gray-600 dark:text-gray-400"
        >
          {tour.description}
        </Typography>
      </AnimatedSection>

      <Dividering />
      <Dividering />
      <Dividering />

      <AnimatedSection>
        <div className="flex flex-col">
          <h1
            style={{
              fontWeight: "700",
              color: "#FF9800",
              marginBottom: "12px",
              fontSize: "clamp(20px, 4vw, 36px)",
            }}
            className="capitalize"
          >
            Full day trip
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                label: "Destination",
                icon: <GiEgyptianTemple style={{ fontSize: "20px" }} />,
                value: tour.Destination,
                style: {
                  fontSize: "clamp(12px, 2vw, 18px)",
                },
              },
              {
                label: "Proposed date",
                icon: <BsCalendarDate style={{ fontSize: "20px" }} />,
                value: tour.theDate,
                style: { fontSize: "clamp(14px, 2vw, 18px)" },
              },
              {
                label: "Trip duration",
                icon: <AiOutlineClockCircle style={{ fontSize: "22px" }} />,
                value: tour.TripDuration,
                style: { fontSize: "clamp(14px, 2vw, 20px)" },
              },
              {
                label: "Number of participants",
                icon: <HiOutlineUserGroup style={{ fontSize: "20px" }} />,
                value: tour.NumberOfParticipants,
                style: { fontSize: "clamp(14px, 2vw, 18px)" },
              },
            ].map((item, index) => (
              <div
                key={index}
                style={{
                  padding: "10px",
                  borderLeft: "2px solid #FF9800",
                  borderBottom: "2px solid #FF9800",
                  borderRight:
                    index % 2 === 1 ? "2px solid #FF9800" : undefined,
                }}
              >
                <h1
                  style={{
                    fontWeight: "700",
                    color: "#d4a85f",
                    fontSize: "clamp(16px, 2vw, 24px)",
                  }}
                  className="capitalize text-gray-400"
                >
                  {item.label}
                </h1>
                <div className="flex items-center justify-center text-gray-600 uppercase gap-2">
                  {item.icon}
                  <p
                    style={item.style}
                    className="text-gray-600 dark:text-gray-400"
                  >
                    {item.value}
                  </p>
                  {item.icon}
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>
      <AnimatedSection>
        <div
          style={{
            marginTop: "10px",
            marginBottom: "10px",
            borderTopLeftRadius: "10px",
            borderBottomLeftRadius: "10px",
          }}
          className="overflow-x-auto mt-6"
        >
          <table className="w-full border border-[#d4a85f] text-left bg-white">
            <tbody>
              {tour.tripprogram.map((i) => (
                <tr key={i.id} className="border-b border-[#d4a85f]">
                  <th
                    className="bg-[#d4a85f] text-white px-6 py-4 w-1/5"
                    style={{
                      padding: "15px",
                      fontSize: "clamp(14px, 2vw, 18px)",
                    }}
                  >
                    🕒 {i.time}
                  </th>
                  <td
                    className="px-6 py-4 text-gray-600 capitalize  dark:bg-[#1a1b1b]  dark:text-gray-400"
                    style={{
                      textAlign: "start",
                      paddingLeft: "20px",
                      fontSize: "clamp(14px, 2vw, 18px)",
                    }}
                  >
                    {i.program}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedSection>

      <Dividering />
      <Dividering />
      <Dividering />

      <AnimatedSection>
        <div>
          <h1
            style={{
              fontWeight: "700",
              color: "#FF9800",
              marginBottom: "12px",
              fontSize: "clamp(20px, 4vw, 36px)",
            }}
            className="capitalize"
          >
            The program includes
          </h1>
          <div style={{ padding: "20px" }}>
            <ul
              style={{
                display: "flex",
                flexDirection:"row",
                flexWrap:"wrap",
                gap: "16px",
                listStyle: "none",
                padding: 0,
                margin: 0,
              }}
            >
              {tour.includes.map((i) => (
                <li
                  key={i.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <FaCircle style={{ color: "#FF9800", fontSize: "8px" }} />
                  <span
                    style={{
                      fontSize: "clamp(14px, 2vw, 18px)",
                    }}
                    className="px-6 py-4 text-gray-600 capitalize dark:text-gray-400 flex flex-wrap"
                  >
                    {i.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </AnimatedSection>
    </Box>
  );
};

export default InformationCard;
