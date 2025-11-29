"use client";
import React, { useState } from "react";
import WikiCard from "./WikiCard";

const PlaceName = ({ name }) => {
  const [showCard, setShowCard] = useState(false);

  return (
    <span
      className="relative cursor-pointer text-[#FF9800] underline inline-block"
      onMouseEnter={() => setShowCard(true)}
      onMouseLeave={() => setShowCard(false)}
    >
      {name}
      {showCard && (
        <span className="absolute top-full left-0 mt-2 inline-block z-50">
          <WikiCard placeName={name} />
        </span>
      )}
    </span>
  );
};

export default PlaceName;
