"use client";
import TourListings from "./TourListings";
import SidebarFilters from "./SidebarFilters";
import { useTheme } from "next-themes";
import { useEffect } from "react";

const ContenerMine = () => {
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    if (theme) {
      console.log("Current theme is:", theme);
    }
  }, [theme]);
  return (
    <div className="w-full h-full flex flex-col lg:flex-row gap-8 mx-auto text-white">
      <SidebarFilters theme={theme} />
      {/* ✅ Tour Listings */}
      <TourListings theme={theme} />
    </div>
  );
};

export default ContenerMine;
