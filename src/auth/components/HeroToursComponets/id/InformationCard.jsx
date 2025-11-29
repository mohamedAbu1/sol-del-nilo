"use client";
import React, { useRef, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import Dividering from "./Divider/Divider";
import Dividering2 from "./Divider/Divider2";
import { BsCalendarDate } from "react-icons/bs";
import { HiOutlineUserGroup } from "react-icons/hi";
import { AiOutlineClockCircle } from "react-icons/ai";
import { FaCircle } from "react-icons/fa6";
import { motion, useInView } from "framer-motion";
import { useScreenSize } from "@/auth/hooks/screenSize";
import { BiDollar } from "react-icons/bi";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import AnimatedPictures from "./AnimatedPictures";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import PersonIcon from "@mui/icons-material/Person";
import PlaceName from "@/auth/components/HeroToursComponets/id/PlaceName";
import CategoryIcon from "@mui/icons-material/Category";
import MapIcon from "@mui/icons-material/Map";
const AnimatedSection = ({ children }) => {
  const ref = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const inView = useInView(ref, { amount: 0.3 });

  React.useEffect(() => {
    if (inView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [inView, hasAnimated]);
  // ✅ لو الرحلة يوم واحد

  return (
    <div ref={ref}>
      {hasAnimated && (
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {children}
        </motion.div>
      )}
    </div>
  );
};
const InformationCard = ({
  tour,
  nan,
  finalPriceAfterRival,
  selectedOptions,
  selectedOptions2,
  bookingData,
  setBookingData,
}) => {
  const { width2 } = useScreenSize();
  console.log(tour?.TripDuration);
  const isOneDay = tour?.TripDuration <= 1;

  // ✅ لو الرحلة عدة أيام → نجمع الأنشطة حسب اليوم
  let groupedProgram = {};

  if (!isOneDay) {
    tour?.tripprogram?.forEach((item) => {
      if (!groupedProgram[item.day]) {
        groupedProgram[item.day] = [];
      }
      groupedProgram[item.day].push({
        time: item.time,
        program: item.program,
      });
    });
  }
  console.log(tour?.tripprogram);

  const days = Object.keys(groupedProgram);
  const [currentDayIndex, setCurrentDayIndex] = useState(0);

  const showPagination = days.length > 3;

  const currentDay = days[currentDayIndex];
  const archaeologicalPlaces = [
    "Philae Temple",
    "Philae",
    "Karnak Temple",
    "Karnak",
    "sphinx",
    "Luxor Temple",
    "Luxor",
    "Abu Simbel Temple",
    "Abu Simbel",
    "Valley of the Kings",
    "Hatshepsut",
  ];

  const parseDescription = (text) => {
    let parts = text.split(
      /(Philae Temple|Philae|Hatshepsut|Karnak Temple|Karnak|sphinx|Luxor Temple|Luxor|Valley of the Kings|Abu Simbel Temple|Abu Simbel)/g
    ); // Regex يلتقط أسماء الأماكن
    return parts.map((part, idx) => {
      if (archaeologicalPlaces.includes(part.trim())) {
        return <PlaceName key={idx} name={part.trim()} />;
      }
      return part;
    });
  };
  const paxOptions = [
    {
      title: "single",
      dec: "Price per person for single",
      prise: parseFloat(finalPriceAfterRival).toFixed(2),
    },
    {
      title: "2-3 pax",
      dec: "Price per person for 2-3 pax",
      prise: parseFloat(finalPriceAfterRival).toFixed(2) / 2,
    },
    {
      title: "4-8 pax",
      dec: "Price per person for 4-8 pax",
      prise: parseFloat(finalPriceAfterRival).toFixed(2) / 3,
    },
    {
      title: "9-15 pax",
      dec: "Price per person for 9-15 pax",
      prise: parseFloat(finalPriceAfterRival).toFixed(2) / 4,
    },
    {
      title: "16-50 pax",
      dec: "Price per person for 16-50 pax",
      prise: parseFloat(finalPriceAfterRival).toFixed(2) / 5,
    },
  ];
  return (
    <Box
      sx={{
        width: "100%",
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
              fontSize: "clamp(32px, 6vw, 45px)",
              fontWeight: "700",
              color: "#FF9800",
            }}
          >
            {tour.title}
          </Typography>
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
            fontSize: "clamp(14px, 2vw, 16px)",
            textTransform: "capitalize",
            pb: 2,
          }}
          className="text-gray-600 dark:text-gray-400"
        >
          {parseDescription(tour.description)}
        </Typography>
      </AnimatedSection>

      <Dividering />
      <Dividering />
      <Dividering />
      <AnimatedPictures />

      <Dividering2 />
      <Dividering2 />
      <Dividering2 />
      <AnimatedSection>
        <div style={{padding:"20px"}} className="w-full flex flex-col md:flex-row items-center justify-around gap-4">
          <div className="flex flex-col w-full md:w-1/2">
            <h1
              style={{
                fontWeight: "700",
                color: "#FF9800",
                marginBottom: "12px",
                fontSize: "clamp(20px, 4vw, 36px)",
              }}
              className="capitalize"
            >
              Overview
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                // {
                //   label: "Number of participants",
                //   icon: <HiOutlineUserGroup style={{ fontSize: "20px" }} />,
                //   value:
                //     typeof nan === "number" && !isNaN(nan)
                //       ? nan
                //       : parseInt(tour.DayPeople),
                //   style: {
                //     fontSize: "clamp(12px, 2vw, 18px)",
                //   },
                // },
                // {
                //   label: "the price",
                //   icon: <BiDollar style={{ fontSize: "20px" }} />,
                //   value: "سشي",
                //   style: { fontSize: "clamp(14px, 2vw, 18px)" },
                // },
                {
                  label: "Age Range",
                  icon: <PersonIcon style={{ fontSize: "20px" }} />,
                  value: "All ages",
                  style: { fontSize: "clamp(14px, 2vw, 18px)" },
                },
                {
                  label: "Run",
                  icon: <MapIcon style={{ fontSize: "20px" }} />,
                  value: "Daily",
                  style: { fontSize: "clamp(14px, 2vw, 18px)" },
                },
                {
                  label: "Category",
                  icon: <CategoryIcon style={{ fontSize: "20px" }} />,
                  value: tour?.category?.name,
                  style: { fontSize: "clamp(14px, 2vw, 18px)" },
                },
                {
                  label: "Duration",
                  icon: <AiOutlineClockCircle style={{ fontSize: "22px" }} />,
                  value: `${tour.TripDuration} Day`,
                  style: { fontSize: "clamp(14px, 2vw, 20px)" },
                },
              ]?.map((item, index) => (
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

          {isOneDay ? (
            <div
              style={{ borderRadius: "6px" }}
              className="w-full md:w-1/2 overflow-x-auto mt-6"
            >
              <table className="w-full border border-[#d4a85f] text-left bg-white">
                <tbody>
                  {tour?.tripprogram?.map((i) => (
                    <tr key={i.id} className="border-b border-[#d4a85f]">
                      <th
                        style={{
                          borderBottom: "1px solid #ffff",
                          padding: "10px",
                        }}
                        className="bg-[#d4a85f] text-white px-6 py-4 w-1/5"
                      >
                        🕒 {i.time}
                      </th>
                      <td
                        style={{ padding: "10px" }}
                        className="px-6 py-4 text-gray-600 capitalize dark:bg-[#1a1b1b] dark:text-gray-400"
                      >
                        {i.program}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="w-full md:w-1/2 mt-10 space-y-12">
              {/* ✅ جدول اليوم الحالي */}
              <div
                key={currentDay}
                className="border border-[#d4a85f] rounded-xl shadow-md bg-white dark:bg-[#1a1b1b] overflow-hidden"
              >
                <div
                  style={{ paddingLeft: "12px" }}
                  className="bg-[#d4a85f] text-white px-6 py-4 text-xl font-bold"
                >
                  Day {currentDay}
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-[#f7f3eb] dark:bg-[#222]">
                        <th
                          style={{ paddingLeft: "6px" }}
                          className="px-6 py-3 text-[#d4a85f] font-semibold w-1/4"
                        >
                          Time
                        </th>
                        <th
                          style={{ paddingLeft: "6px" }}
                          className="px-6 py-3 text-[#d4a85f] font-semibold"
                        >
                          Activity
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {groupedProgram[currentDay].map((i, idx) => (
                        <tr
                          key={idx}
                          className="border-t border-[#d4a85f]/40 hover:bg-[#fff7e6] dark:hover:bg-[#2a2a2a]"
                        >
                          <td
                            style={{
                              borderBottom: "1px solid #ffff",
                              padding: "10px",
                            }}
                            className="px-6 py-4 font-medium text-gray-700 dark:text-gray-300"
                          >
                            🕒 {i.time}
                          </td>
                          <td
                            style={{ padding: "10px" }}
                            className="px-6 py-4 text-gray-600 dark:text-gray-400 capitalize"
                          >
                            {i.program}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* ✅ أرقام التنقل في الأسفل */}
              <div
                style={{ marginTop: "15px" }}
                className="flex justify-center space-x-2 mt-4"
              >
                {days.map((day, idx) => (
                  <button
                    style={{
                      width: "25px",
                      height: "25px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      marginRight: "5px",
                      padding: "6px",
                      borderRadius: "50%",
                    }}
                    key={day}
                    onClick={() => setCurrentDayIndex(idx)}
                    className={`px-3 py-1 rounded ${
                      currentDayIndex === idx
                        ? "bg-[#d4a85f] text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </AnimatedSection>

      <Dividering2 />
      <Dividering2 />
      <Dividering2 />

      <AnimatedSection>
        <div
          style={{ marginTop: "35px" }}
          className="w-full flex flex-col md:flex-row gap-6"
        >
          <div className="w-full md:w-1/2">
            <h1
              style={{
                fontWeight: "700",
                color: "#FF9800",
                marginBottom: "12px",
                fontSize: "clamp(20px, 4vw, 36px)",
              }}
              className="capitalize"
            >
              Tour Prices
            </h1>
            <div style={{ padding: "20px" }}>
              <ul
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flexWrap: "wrap",
                  gap: "16px",
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                }}
              >
                {paxOptions.map((i, index) => (
                  <li
                    style={{ padding: "15px" }}
                    key={index}
                    className="flex items-center gap-3 border border-gray-300 rounded-2xl p-4 
             transition-all duration-300 ease-in-out 
             hover:bg-[#FF9800] hover:text-white cursor-pointer"
                  >
                    {/* ✅ الأيقونة */}
                    <PersonIcon className="text-[#FF9800] text-[28px] transition-colors duration-300 group-hover:text-white" />

                    {/* ✅ المحتوى */}
                    <div className="w-full flex flex-row items-center justify-between">
                      <div className="flex flex-col gap-1">
                        <span className="text-[clamp(14px,2vw,18px)] font-semibold capitalize">
                          {i.title}
                        </span>
                        <p className="text-gray-600 group-hover:text-white">
                          {i.dec}
                        </p>
                      </div>

                      {/* ✅ السعر */}
                      <span className="flex flex-row items-center font-bold">
                        {Math.floor(i.prise)}
                        <BiDollar className="ml-1 text-[20px]" />
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>{" "}
          <div className="w-full md:w-1/2">
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
                  flexDirection: "column",
                  flexWrap: "wrap",
                  gap: "16px",
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                }}
              >
                {Array.isArray(tour?.includes) &&
                  tour.includes.map((i) => (
                    <li
                      key={i.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        border: "1px solid gray",
                        borderRadius: "20px",
                        padding: "15px",
                        transition: "all 0.3s ease",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#FF9800";
                        e.currentTarget.style.color = "#fff";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color = "initial";
                      }}
                    >
                      <FaCircle
                        style={{
                          color: "#FF9800",
                          fontSize: "10px",
                          transition: "color 0.3s ease",
                        }}
                      />
                      <span
                        style={{
                          fontSize: "clamp(14px, 2vw, 18px)",
                          transition: "color 0.3s ease",
                        }}
                      >
                        {i.text}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          {/* <Dividering /> */}
          <div
            style={
              {
                // borderLeft: "2px dotted #FF9800",
                // padding: "10px",
              }
            }
            className="w-full md:w-1/2"
          >
            <h1
              style={{
                fontWeight: "700",
                color: "#FF9800",
                marginBottom: "12px",
                fontSize: "clamp(20px, 4vw, 36px)",
              }}
              className="capitalize"
            >
              Options
            </h1>
            <div>
              <FormGroup sx={{ gap: "20px" }}>
                {selectedOptions?.map((option) => (
                  <FormControlLabel
                    key={option.key}
                    control={
                      <Checkbox
                        checked={bookingData[option.key] === true}
                        onChange={(e) =>
                          setBookingData((prev) => ({
                            ...prev,
                            [option.key]: e.target.checked,
                          }))
                        }
                        sx={{
                          color: "gray",
                          "&.Mui-checked": {
                            color: "#FF9800",
                          },
                        }}
                      />
                    }
                    label={option.label}
                    value={option.price}
                    sx={{
                      color: "#d4a85f",
                      fontWeight: "bold",
                      border: "1px solid gray",
                      borderRadius: "12px",
                      padding: "10px 15px",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "#FF9800",
                        color: "#fff",
                      },
                    }}
                  />
                ))}
              </FormGroup>

              <FormGroup sx={{ gap: "20px" }}>
                {(selectedOptions2 || [])?.map((option) => (
                  <FormControlLabel
                    key={option.key}
                    control={
                      <Checkbox
                        checked={bookingData[option.key] === true}
                        onChange={(e) =>
                          setBookingData((prev) => ({
                            ...prev,
                            [option.key]: e.target.checked,
                          }))
                        }
                        sx={{
                          color: "gray",
                          "&.Mui-checked": {
                            color: "#FF9800",
                          },
                        }}
                      />
                    }
                    label={option.label}
                    value={option.price}
                    sx={{
                      color: "#d4a85f",
                      fontWeight: "bold",
                      border: "1px solid gray",
                      borderRadius: "12px",
                      padding: "10px 15px",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "#FF9800",
                        color: "#fff",
                      },
                    }}
                  />
                ))}
              </FormGroup>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </Box>
  );
};

export default InformationCard;
