"use client";
import React from "react";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { MdOutlineCreate } from "react-icons/md";
import { FaUsersCog } from "react-icons/fa";
import { useTripsContext } from "@/context/TripsContext";
import { useScreenSize } from "@/auth/hooks/screenSize";
import { useTheme } from "@mui/material/styles"; // ✅ استدعاء الثيم
import { Typography } from "@mui/material";

const HomePage = () => {
  const { width } = useScreenSize();
  const { activeSection } = useTripsContext();
  const muiTheme = useTheme(); // ✅ يجيب الثيم الحالي

  return (
    <section
      style={{ width: width * 0.83 }}
      className="flex flex-col items-center justify-center"
    >
      <Typography
        variant="h4"
        sx={{
          fontFamily: "sans-serif",
          color: muiTheme.palette.text.primary, // ✅ النصوص من الثيم
          textAlign: "center",
          mb: 4,
        }}
      >
        Welcome to the{" "}
        <span style={{ color: muiTheme.palette.secondary.main }}>
          Luxor & Aswan
        </span>{" "}
        control panel
      </Typography>

      <div className="w-full h-9/12 flex flex-col gap-5 items-center justify-center">
        <ul className="flex flex-row gap-20 w-full" style={{ padding: "20px" }}>
          {/* Information */}
          <li
            style={{
              width: "32%",
              padding: "22px",
              borderRadius: "22px",
              boxShadow: muiTheme.shadows[5], // ✅ ظل من الثيم
              border: `2px solid ${muiTheme.palette.divider}`, // ✅ حدود من الثيم
            }}
            className="flex flex-col gap-6"
          >
            <HiOutlineInformationCircle
              className="text-4xl"
              style={{ color: muiTheme.palette.secondary.main }}
            />
            <Typography
              variant="h5"
              sx={{ color: muiTheme.palette.text.secondary }}
            >
              Information
            </Typography>
            <Typography sx={{ color: muiTheme.palette.text.secondary }}>
              Here you can monitor the site in terms of views, visits and most
              important interactions.
            </Typography>
          </li>

          {/* Create Trip */}
          <li
            style={{
              width: "32%",
              padding: "22px",
              borderRadius: "22px",
              boxShadow: muiTheme.shadows[5],
              border: `2px solid ${muiTheme.palette.divider}`,
            }}
            className="flex flex-col gap-6"
          >
            <MdOutlineCreate
              className="text-4xl"
              style={{ color: muiTheme.palette.secondary.main }}
            />
            <Typography
              variant="h5"
              sx={{ color: muiTheme.palette.text.secondary }}
            >
              Create a trip
            </Typography>
            <Typography sx={{ color: muiTheme.palette.text.secondary }}>
              Here you will be able to create new trips for users and you can
              edit any trip.
            </Typography>
          </li>

          {/* User Information */}
          <li
            style={{
              width: "32%",
              padding: "22px",
              borderRadius: "22px",
              boxShadow: muiTheme.shadows[5],
              border: `2px solid ${muiTheme.palette.divider}`,
            }}
            className="flex flex-col gap-6"
          >
            <FaUsersCog
              className="text-4xl"
              style={{ color: muiTheme.palette.secondary.main }}
            />
            <Typography
              variant="h5"
              sx={{ color: muiTheme.palette.text.secondary }}
            >
              User information
            </Typography>
            <Typography sx={{ color: muiTheme.palette.text.secondary }}>
              Here you can also know the number of clients and the most
              important information about them and control the removal of those
              you want from them.
            </Typography>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default HomePage;
