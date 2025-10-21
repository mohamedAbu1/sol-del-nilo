"use client";
import TourListings from "./TourListings";
import SidebarFilters from "./SidebarFilters";

const ContenerMine = () => {

  return (
    <div className="container w-full h-full flex flex-col lg:flex-row gap-8 mx-auto text-white">
      <SidebarFilters />
      {/* ✅ Tour Listings */}
      <TourListings />
    </div>
  );
};

export default ContenerMine;
