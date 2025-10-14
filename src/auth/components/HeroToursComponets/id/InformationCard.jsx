"use client";
import React, { useRef, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import Dividering from "./Divider/Divider";
import { BsCalendarDate } from "react-icons/bs";
import { HiOutlineUserGroup } from "react-icons/hi";
import { AiOutlineClockCircle } from "react-icons/ai";
import { FaCircle } from "react-icons/fa6";
import { motion, useInView } from "framer-motion";
import { Link } from "@/i18n/navigation";
import HikingIcon from "@mui/icons-material/Hiking";
import { useScreenSize } from "@/auth/hooks/screenSize";
import { BiDollar } from "react-icons/bi";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useRouter } from "next/navigation";

const AnimatedSection = ({ children }) => {
  const ref = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const inView = useInView(ref, { amount: 0.3 });

  React.useEffect(() => {
    if (inView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [inView, hasAnimated]);

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
const InformationCard = ({ tour, nan, guidePriceTotal }) => {
  const { width2 } = useScreenSize();
  const [bookingData, setBookingData] = useState({
    hotAirBalloon: false,
    bananaIsland: false,
    // باقي البيانات...
  });
  const [bookingDataPrice, setBookingDataPrice] = useState({
    hotAirBalloon: 20,
    bananaIsland: 15,
    // باقي البيانات...
  });
  const router = useRouter();

  const city = tour.city.name; // 👈 يمكنك تغيير المدينة هنا حسب السياق

  const cityOptions = {
    Luxor: [
      {
        key: "1",
        label: "Sound & Light Show at Karnak Temple 🎧",
        price: 1200,
      },
      {
        key: "2",
        label: "Horse carriage ride along the Nile at sunset 🐎",
        price: 600,
      },
      {
        key: "3",
        label: "Private felucca trip to Banana Island 🚤",
        price: 1200,
      },
      {
        key: "4",
        label:
          "Guided access to Tutankhamun’s tomb in the Valley of the Kings 🏛️",
        price: 600,
      },
    ],
    Aswan: [
      {
        key: "1",
        label: "Felucca ride to the Botanical Garden or Elephantine Island 🚤",
        price: 500,
      },
      {
        key: "2",
        label: "Nile dinner cruise with live entertainment 🛶",
        price: 700,
      },
      {
        key: "3",
        label: "Khan El Khalili market walk with local food tasting 🛍️",
        price: 500,
      },
      {
        key: "4",
        label: "Cultural show at El Sawy Culture Wheel or Cairo Opera House 🎭",
        price: 700,
      },
    ],
    Giza: [
      {
        key: "1",
        label: "🐪 Camel or horseback ride around the pyramids",
        price: 800,
      },
      { key: "2", label: "🎧 Sound & Light Show at the Sphinx", price: 950 },
      {
        key: "3",
        label: "🏛️ Inside access to the Great Pyramid with expert guide",
        price: 800,
      },
      {
        key: "4",
        label: "📸 Professional photo session at the Giza Plateau",
        price: 950,
      },
    ],
    Hurghada: [
      {
        key: "1",
        label: "🐠 Snorkeling trip to Giftun Island or Orange Bay",
        price: 750,
      },
      {
        key: "2",
        label: "🐬 Dolphin House excursion with swim experience",
        price: 900,
      },
      {
        key: "3",
        label: "🏜️ Quad bike or 4×4 desert safari with Bedouin dinner",
        price: 750,
      },
      {
        key: "4",
        label: "🚤 Private boat trip with onboard barbecue and photo session",
        price: 900,
      },
    ],
    Alexandria: [
      { key: "1", label: "🏰 Guided tour of Qaitbay Citadel", price: 750 },
      {
        key: "2",
        label: "📚 Private access tour of the Library of Alexandria",
        price: 900,
      },
      {
        key: "3",
        label: "🍽️ Seafood tasting at a heritage restaurant on the Corniche",
        price: 750,
      },
      {
        key: "4",
        label: "🛶 Boat ride in Montaza Gardens or Eastern Harbor",
        price: 900,
      },
    ],
  };

  let selectedOptions2 = [];

  if (tour.city.name === "Marsa Alam") {
    selectedOptions2 = [
      { key: "1", label: "🐬 Dolphin swim at Satayah Reef", price: 750 },
      { key: "2", label: "🤿 Diving at Elphinstone Reef", price: 900 },
      {
        key: "3",
        label: "🏜️ Desert safari with Bedouin dinner and stargazing",
        price: 750,
      },
      {
        key: "4",
        label: "🧂 Visit to natural hot springs or salt lakes",
        price: 900,
      },
    ];
  } else if (tour.city.name === "Sharm El Sheikh") {
    selectedOptions2 = [
      {
        key: "1",
        label: "🤿 Snorkeling or diving at Ras Mohammed or Tiran Island",
        price: 750,
      },
      {
        key: "2",
        label: "🏜️ Desert safari with camel ride and Bedouin show",
        price: 900,
      },
      {
        key: "3",
        label: "🚤 Private yacht cruise with seafood lunch",
        price: 750,
      },
      {
        key: "4",
        label:
          "🎭 Evening entertainment: Tanoura dance, belly dancing, fire show",
        price: 900,
      },
    ];
  }

  const basePrice = parseFloat(tour.price) * nan;
  const selectedOptions = cityOptions[city] || [];
  const extrasFromSelectedOptions = [...selectedOptions, ...selectedOptions2]
    .filter((option) => bookingData[option.key])
    .reduce((total, option) => total + option.price, 0);

  const finalPrice = basePrice + guidePriceTotal + extrasFromSelectedOptions;

  const finalPriceAfterRival = finalPrice * (1 - tour.rival / 100);
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
          {tour.description}
        </Typography>
        <Button className="btn-next-section3" style={{marginBottom:"20px", color:"#000"}} onClick={() => router.push(`/tours/${tour.id}/image`)}>
          last trip
        </Button>
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
                label: "Number of participants",
                icon: <HiOutlineUserGroup style={{ fontSize: "20px" }} />,
                value:
                  typeof nan === "number" && !isNaN(nan)
                    ? nan
                    : parseInt(tour.DayPeople),
                style: {
                  fontSize: "clamp(12px, 2vw, 18px)",
                },
              },
              {
                label: "the price",
                icon: <BiDollar style={{ fontSize: "20px" }} />,
                value: parseFloat(finalPriceAfterRival).toFixed(2),
                style: { fontSize: "clamp(14px, 2vw, 18px)" },
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
                value:`${tour.TripDuration} Day`,
                style: { fontSize: "clamp(14px, 2vw, 20px)" },
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
        <div className="w-full flex flex-row">
          <div className="w-[50%]">
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
                  flexDirection: "row",
                  flexWrap: "wrap",
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
          <div
            style={{
              borderLeft: "2px dotted #FF9800",
              padding: "10px",
            }}
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
                {selectedOptions.map((option) => (
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
                          color: "#FF9800",
                          "&.Mui-checked": {
                            color: "#FF9800",
                          },
                        }}
                      />
                    }
                    label={option.label}
                    sx={{ color: "#d4a85f", fontWeight: "bold" }}
                    value={option.price}
                  />
                ))}
              </FormGroup>
              <FormGroup sx={{ gap: "20px" }}>
                {selectedOptions2.map((option) => (
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
                          color: "#FF9800",
                          "&.Mui-checked": {
                            color: "#FF9800",
                          },
                        }}
                      />
                    }
                    label={option.label}
                    sx={{ color: "#d4a85f", fontWeight: "bold" }}
                    value={option.price}
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
