"use client";
import { Button } from "@mui/material";
import React, { useState } from "react";
import { FaHome } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { Link } from "@/i18n/navigation";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { MdOutlineBrowserUpdated } from "react-icons/md";
import { MdOutlineCreate } from "react-icons/md";
import { useTripsContext } from "@/context/TripsContext";
import { useScreenSize } from "@/auth/hooks/screenSize";
import { color } from "framer-motion";
const Sidebar = () => {
  const { width, height } = useScreenSize();
  const { setActiveSection, activeSection } = useTripsContext();
  const [hover, sitHover] = useState(null);
  return (
    <section
      style={{
        width: width * 0.25,
        height: "100vh",
        borderTopRightRadius: "80px",
        borderBottomRightRadius: "80px",
        backgroundColor: "#292c2e",
      }}
      className="container flex flex-col items-center pt-2"
    >
      <div
        style={{ color: "#FFFFFF" }}
        className="h-1/6 flex flex-row items-center justify-center gap-3"
      >
        <BsFillPersonFill style={{ fontSize: "27px" }} />
        <h1 className="text-2xl capitalize">mohamed ahmed</h1>
      </div>
      <ul className="h-3/4 flex flex-col gap-9" style={{ color: "#FFFFFF" }}>
        <li
          onMouseEnter={() => sitHover("Home")}
          onMouseLeave={() => sitHover(null)}
          style={{
            color:
              hover === "Home" || activeSection === "home"
                ? "#ff9800"
                : "#FFFFFF",
          }}
          className="flex items-center justify-center text-center"
        >
          <FaHome style={{ fontSize: "28px" }} />
          <Button
            style={{
              color:
                hover === "Home" || activeSection === "home"
                  ? "#ff9800"
                  : "#FFFFFF",
            }}
            onClick={() => setActiveSection("home")}
          >
            Home
          </Button>
        </li>
        <li
          className="flex items-center justify-center"
          onMouseEnter={() => sitHover("Create")}
          onMouseLeave={() => sitHover(null)}
          style={{
            color:
              hover === "Create" || activeSection === "CreateTrip"
                ? "#ff9800"
                : "#FFFFFF",
          }}
        >
          <MdOutlineCreate style={{ fontSize: "28px" }} />
          <Button
            style={{
              color:
                hover === "Create" || activeSection === "CreateTrip"
                  ? "#ff9800"
                  : "#FFFFFF",
            }}
            onClick={() => setActiveSection("CreateTrip")}
          >
            Create a trip
          </Button>
        </li>
        <li
          className="flex items-center justify-center"
          onMouseEnter={() => sitHover("information")}
          onMouseLeave={() => sitHover(null)}
          style={{
            color:
              hover === "information" || activeSection === "UserInformation"
                ? "#ff9800"
                : "#FFFFFF",
          }}
        >
          <HiOutlineInformationCircle style={{ fontSize: "28px" }} />
          <Button
            style={{
              color:
                hover === "information" || activeSection === "UserInformation"
                  ? "#ff9800"
                  : "#FFFFFF",
            }}
            onClick={() => setActiveSection("UserInformation")}
          >
            User information
          </Button>
        </li>
        <li
          className="flex items-center justify-center"
          onMouseEnter={() => sitHover("Update")}
          onMouseLeave={() => sitHover(null)}
          style={{
            color:
              hover === "Update" || activeSection === "UpdateTrip"
                ? "#ff9800"
                : "#FFFFFF",
          }}
        >
          <MdOutlineBrowserUpdated style={{ fontSize: "28px" }} />
          <Button
            style={{
              color:
                hover === "Update" || activeSection === "UpdateTrip"
                  ? "#ff9800"
                  : "#FFFFFF",
            }}
            onClick={() => setActiveSection("UpdateTrip")}
          >
            Update trip
          </Button>
        </li>
        <li
          className="flex items-center justify-center"
          onMouseEnter={() => sitHover("Reservation")}
          onMouseLeave={() => sitHover(null)}
          style={{
            color:
              hover === "Reservation" || activeSection === "Reservation"
                ? "#ff9800"
                : "#FFFFFF",
          }}
        >
          <HiOutlineInformationCircle style={{ fontSize: "28px" }} />
          <Button
            style={{
              color:
                hover === "Reservation" || activeSection === "Reservation"
                  ? "#ff9800"
                  : "#FFFFFF",
            }}
            onClick={() => setActiveSection("Reservation")}
          >
            Reservation information
          </Button>
        </li>
      </ul>
      <div className=" flex flex-row items-center justify-center gap-3">
        <FiSettings style={{ fontSize: "27px", color: "#ff9800" }} />
        <Link
          href={"/"}
          style={{
            color: hover === "SolDelNile" ? "#ff9800" : "#FFFFFF",
            fontWeight: "700",
          }}
          onMouseEnter={() => sitHover("SolDelNile")}
          onMouseLeave={() => sitHover(null)}
        >
          Back to SolDelNile
        </Link>
      </div>
    </section>
  );
};

export default Sidebar;
