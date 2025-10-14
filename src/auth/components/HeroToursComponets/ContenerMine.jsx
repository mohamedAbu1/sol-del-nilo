"use client";
import TourListings from "./TourListings";
import SidebarFilters from "./SidebarFilters";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import axios from "axios";

const ContenerMine = () => {
  const { theme, setTheme } = useTheme();
  const [tours, setTours] = useState([]);
  useEffect(() => {
    const fatchTour = async () => {
      try {
        const res = await axios.get("/api/tours");
        setTours(res.data.tours);
      } catch (error) {
        console.error("❌ فشل في جلب الرحلات:", error);
      }
    };
    fatchTour()
  }, []);
  useEffect(() => {
    if (theme) {
      console.log("Current theme is:", theme);
    }
  }, [theme]);
  return (
    <div className="w-full h-full flex flex-col lg:flex-row gap-8 mx-auto text-white">
      <SidebarFilters theme={theme} tours={tours}/>
      {/* ✅ Tour Listings */}
      <TourListings theme={theme} />
    </div>
  );
};

export default ContenerMine;
