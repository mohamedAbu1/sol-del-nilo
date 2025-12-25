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
import CheckIcon from "@mui/icons-material/Check";
import { useTheme } from "@mui/material/styles";
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
    "Pyramids",
    "Edfu",
    "the Sphinx",
    "Egyptian Museum",
    "catacombs of Kom El Shoqafa",
    "Qaitbay",
    "Lighthouse of Alexandria,",
  ];
  const muiTheme = useTheme(); // ✅ يجيب الثيم الحالي
  const parseDescription = (text) => {
    let parts = text.split(
      /(Philae Temple|Lighthouse of Alexandria|Philae|Qaitbay|catacombs of Kom El Shoqafa|Egyptian Museum|Hatshepsut|the Sphinx|Pyramids|Edfu|Karnak Temple|Karnak|sphinx|Luxor Temple|Luxor|Valley of the Kings|Abu Simbel Temple|Abu Simbel)/g
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
      prise: parseFloat(finalPriceAfterRival).toFixed(2) - 50,
    },
    {
      title: "4-8 pax",
      dec: "Price per person for 4-8 pax",
      prise: parseFloat(finalPriceAfterRival).toFixed(2) - 100,
    },
    {
      title: "9-15 pax",
      dec: "Price per person for 9-15 pax",
      prise: parseFloat(finalPriceAfterRival).toFixed(2) - 150,
    },
    {
      title: "16-50 pax",
      dec: "Price per person for 16-50 pax",
      prise: parseFloat(finalPriceAfterRival).toFixed(2) - 200,
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
              color: muiTheme.palette.primary.main, // ✅ اللون الأساسي من الثيم
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
          component="div"
          sx={{
            mt: 2,
            fontSize: "clamp(14px, 2vw, 16px)",
            textTransform: "capitalize",
            pb: 2,
            color: muiTheme.palette.text.disabled, // ✅ النصوص من الثيم
          }}
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
        <div
          style={{ padding: "20px" }}
          className="w-full flex flex-col md:flex-row items-center justify-around gap-4"
        >
          <div className="flex flex-col w-full md:w-1/2">
            <Typography
              variant="h4"
              sx={{
                fontWeight: "700",
                color: muiTheme.palette.primary.main, // ✅ العنوان من الثيم
                marginBottom: "12px",
                fontSize: "clamp(20px, 4vw, 36px)",
                textTransform: "capitalize",
              }}
            >
              Overview
            </Typography>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  label: "Age Range",
                  icon: <PersonIcon fontSize="small" />,
                  value: "All ages",
                  style: { fontSize: "clamp(14px, 2vw, 18px)" },
                },
                {
                  label: "Run",
                  icon: <MapIcon fontSize="small" />,
                  value: "Daily",
                  style: { fontSize: "clamp(14px, 2vw, 18px)" },
                },
                {
                  label: "Category",
                  icon: <CategoryIcon fontSize="small" />,
                  value: tour?.category?.name,
                  style: { fontSize: "clamp(14px, 2vw, 18px)" },
                },
                {
                  label: "Duration",
                  icon: <AiOutlineClockCircle style={{ fontSize: "22px" }} />,
                  value: `${tour.TripDuration} Day`,
                  style: { fontSize: "clamp(14px, 2vw, 20px)" },
                },
              ].map((item, index) => (
                <div
                  key={index}
                  style={{
                    padding: "10px",
                    borderLeft: `2px solid ${muiTheme.palette.primary.main}`,
                    borderBottom: `2px solid ${muiTheme.palette.primary.main}`,
                    borderRight:
                      index % 2 === 1
                        ? `2px solid ${muiTheme.palette.primary.main}`
                        : undefined,
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: "700",
                      color: muiTheme.palette.primary.main, // ✅ النصوص الثانوية من الثيم
                      fontSize: "clamp(16px, 2vw, 24px)",
                      textTransform: "capitalize",
                    }}
                  >
                    {item.label}
                  </Typography>
                  <div
                    className="flex items-center justify-center uppercase gap-2"
                    style={{ color: muiTheme.palette.secondary.main }}
                  >
                    {item.icon}
                    <p style={item.style}>{item.value}</p>
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
              <table
                className="w-full text-left"
                style={{
                  border: `1px solid ${muiTheme.palette.primary.main}`,
                  backgroundColor: muiTheme.palette.background.paper,
                }}
              >
                <tbody>
                  {tour?.tripprogram?.map((i) => (
                    <tr
                      key={i.id}
                      style={{
                        borderBottom: `1px solid ${muiTheme.palette.divider}`,
                      }}
                    >
                      <th
                        style={{
                          backgroundColor: muiTheme.palette.secondary.main,
                          color: muiTheme.palette.primary.light,
                          padding: "10px",
                        }}
                        className="px-6 py-4 w-1/5"
                      >
                        🕒 {i.time}
                      </th>
                      <td
                        style={{
                          padding: "10px",
                          color: muiTheme.palette.text.secondary,
                          backgroundColor: muiTheme.palette.background.default,
                        }}
                        className="px-6 py-4 capitalize"
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
              <div
                key={currentDay}
                style={{
                  border: `1px solid ${muiTheme.palette.secondary.main}`,
                  backgroundColor: muiTheme.palette.background.paper,
                }}
                className="rounded-xl shadow-md overflow-hidden"
              >
                <div
                  style={{
                    backgroundColor: muiTheme.palette.secondary.main,
                    color: muiTheme.palette.text.disabled,
                    padding: "12px",
                  }}
                  className="px-6 py-4 text-xl font-bold"
                >
                  Day {currentDay}
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr
                        style={{
                          backgroundColor: muiTheme.palette.action.hover,
                        }}
                      >
                        <th
                          style={{
                            paddingLeft: "6px",
                            color: muiTheme.palette.secondary.main,
                          }}
                          className="px-6 py-3 font-semibold w-1/4"
                        >
                          Time
                        </th>
                        <th
                          style={{
                            padding: "6px",
                            color: muiTheme.palette.secondary.main,
                          }}
                          className="px-6 py-3 font-semibold"
                        >
                          Activity
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {groupedProgram[currentDay].map((i, idx) => (
                        <tr
                          key={idx}
                          style={{
                            borderTop: `1px solid ${muiTheme.palette.divider}`,
                          }}
                          className="hover:bg-gray-50 dark:hover:bg-[#2a2a2a]"
                        >
                          <td
                            style={{
                              padding: "10px",
                              color: muiTheme.palette.text.secondary,
                            }}
                            className="px-6 py-4 font-medium"
                          >
                            🕒 {i.time}
                          </td>
                          <td
                            style={{
                              padding: "10px",
                              color: muiTheme.palette.text.secondary,
                            }}
                            className="px-6 py-4 capitalize"
                          >
                            {i.program}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* ✅ أرقام التنقل */}
              <div
                style={{ marginTop: "15px" }}
                className="flex justify-center space-x-2 mt-4"
              >
                {days.map((day, idx) => (
                  <button
                    key={day}
                    onClick={() => setCurrentDayIndex(idx)}
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
                      backgroundColor:
                        currentDayIndex === idx
                          ? muiTheme.palette.secondary.main
                          : muiTheme.palette.action.hover,
                      color:
                        currentDayIndex === idx
                          ? muiTheme.palette.text.disabled
                          : muiTheme.palette.text.primary,
                    }}
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
          {/* ✅ Tour Prices */}
          <div className="w-full md:w-1/2">
            <Typography
              variant="h4"
              sx={{
                fontWeight: "700",
                color: muiTheme.palette.primary.main, // ✅ العنوان من الثيم
                marginBottom: "12px",
                fontSize: "clamp(20px, 4vw, 36px)",
                textTransform: "capitalize",
              }}
            >
              Tour Prices
            </Typography>
            <div style={{ padding: "20px" }}>
              <ul
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                }}
              >
                {paxOptions.map((i, index) => (
                  <li
                    key={index}
                    style={{
                      padding: "15px",
                      border: `1px solid ${muiTheme.palette.divider}`,
                      borderRadius: "16px",
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                    }}
                    className="flex items-center gap-3 hover:shadow-md"
                  >
                    {/* ✅ الأيقونة */}
                    <PersonIcon
                      sx={{
                        color: muiTheme.palette.primary.main,
                        fontSize: "28px",
                        transition: "color 0.3s ease",
                      }}
                    />

                    {/* ✅ المحتوى */}
                    <div className="w-full flex flex-row items-center justify-between">
                      <div className="flex flex-col gap-1">
                        <span className="text-[clamp(14px,2vw,18px)] font-semibold capitalize">
                          {i.title}
                        </span>
                        <Typography
                          variant="body2"
                          sx={{
                            color: muiTheme.palette.text.secondary,
                            transition: "color 0.3s ease",
                          }}
                        >
                          {i.dec}
                        </Typography>
                      </div>

                      {/* ✅ السعر */}
                      <span className="flex flex-row items-center font-bold">
                        {Math.floor(i.prise)}
                        <BiDollar
                          style={{
                            marginLeft: "4px",
                            fontSize: "20px",
                            color: muiTheme.palette.text.primary,
                          }}
                        />
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ✅ Program Includes */}
          <div className="w-full md:w-1/2">
            <Typography
              variant="h4"
              sx={{
                fontWeight: "700",
                color: muiTheme.palette.primary.main, // ✅ العنوان من الثيم
                marginBottom: "12px",
                fontSize: "clamp(20px, 4vw, 36px)",
                textTransform: "capitalize",
              }}
            >
              The program includes
            </Typography>
            <div style={{ padding: "20px" }}>
              <ul
                style={{
                  display: "flex",
                  flexDirection: "column",
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
                        border: `1px solid ${muiTheme.palette.divider}`,
                        borderRadius: "20px",
                        padding: "15px",
                        transition: "all 0.3s ease",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                          muiTheme.palette.primary.main;
                        e.currentTarget.style.color =
                          muiTheme.palette.common.white;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color =
                          muiTheme.palette.text.primary;
                      }}
                    >
                      <CheckIcon
                        sx={{
                          color: muiTheme.palette.primary.main,
                          fontSize: "24px",
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
        </div>
      </AnimatedSection>
    </Box>
  );
};

export default InformationCard;
