"use client";
import { Button, Divider, Typography } from "@mui/material";
import React, { useState } from "react";
import { FaHome } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { Link } from "@/i18n/navigation";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { MdOutlineBrowserUpdated, MdOutlineCreate } from "react-icons/md";
import { useTripsContext } from "@/context/TripsContext";
import { useScreenSize } from "@/auth/hooks/screenSize";
import { useTheme } from "@mui/material/styles";

const Sidebar = () => {
  const { width } = useScreenSize();
  const { setActiveSection, activeSection } = useTripsContext();
  const [hover, setHover] = useState(null);
  const muiTheme = useTheme();

  const activeColor = muiTheme.palette.secondary.main;
  const defaultColor = muiTheme.palette.text.primary;
  const bgColor = muiTheme.palette.background.paper;

  const navItems = [
    { key: "home", label: "Home", icon: <FaHome /> },
    { key: "CreateTrip", label: "Create a trip", icon: <MdOutlineCreate /> },
    {
      key: "UserInformation",
      label: "User information",
      icon: <HiOutlineInformationCircle />,
    },
    {
      key: "UpdateTrip",
      label: "Update trip",
      icon: <MdOutlineBrowserUpdated />,
    },
    {
      key: "Reservation",
      label: "Reservation information",
      icon: <HiOutlineInformationCircle />,
    },
  ];

  return (
    <aside
      style={{
        width: width * 0.25,
        height: "100vh",
        borderTopRightRadius: "40px",
        borderBottomRightRadius: "40px",
        background: `linear-gradient(180deg, ${muiTheme.palette.background.default} 0%, ${muiTheme.palette.background.paper} 100%)`,
        boxShadow: muiTheme.shadows[6],
      }}
      className="flex flex-col items-center py-6"
    >
      {/* User Info */}
      <div style={{paddingTop:"25px"}} className="flex flex-row items-center justify-center gap-3 mb-6">
        <BsFillPersonFill style={{ fontSize: "30px", color: activeColor }} />
        <Typography
          variant="h6"
          sx={{ color: muiTheme.palette.text.primary, fontWeight: "600",}}
        >
          Mohamed Ahmed
        </Typography>
      </div>

      <Divider sx={{ width: "80%", mb: 4 }} />

      {/* Navigation */}
      <ul className="flex flex-col gap-2 w-full px-4">
        {navItems.map((item) => (
          <li
            key={item.key}
            onMouseEnter={() => setHover(item.key)}
            onMouseLeave={() => setHover(null)}
            className="flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer"
            style={{
              width:"80%",
              paddingLeft:"20px",
              transition: "all 0.3s ease",
              color:
                hover === item.key || activeSection === item.key
                  ? activeColor
                  : defaultColor,
            }}
          >
            <span style={{ fontSize: "22px" }}>{item.icon}</span>
            <Button
              variant="text" // ✅ زر بدون خلفية
              sx={{
                backgroundColor: "transparent", // ✅ بدون خلفية
                justifyContent: "flex-start",
                color:
                  hover === item.key || activeSection === item.key
                    ? activeColor
                    : defaultColor,
                fontWeight:
                  hover === item.key || activeSection === item.key
                    ? "700"
                    : "500",
                textTransform: "none",
                fontSize: "15px",
                "&:hover": {
                  textDecoration: "underline", // ✅ تأثير أنيق عند المرور
                  backgroundColor: "transparent", // ✅ بدون خلفية
                },
              }}
              onClick={() => setActiveSection(item.key)}
              fullWidth
            >
              {item.label}
            </Button>
          </li>
        ))}
      </ul>

      <Divider sx={{ width: "80%", mt: "auto", mb: 3 }} />

      {/* Footer */}
      <div  style={{paddingBottom:"25px"}}  className="flex flex-row items-center justify-center gap-3">
        <FiSettings style={{ fontSize: "22px", color: activeColor }} />
        <Link
          href={"/"}
          style={{
            color: hover === "SolDelNile" ? activeColor : defaultColor,
            fontWeight: "600",
            transition: "color 0.3s ease",
          }}
          onMouseEnter={() => setHover("SolDelNile")}
          onMouseLeave={() => setHover(null)}
        >
          Back to Luxor & Aswan
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
