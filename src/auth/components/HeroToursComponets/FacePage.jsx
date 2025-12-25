"use client";
import React from "react";
import Header from "@/auth/components/HeaderComponets/Header";
import { useAppQueryContext } from "@/context/AppQueryContext";
import { useTheme } from "@mui/material/styles"; // ✅ استدعاء الثيم

const FacePage = ({ user }) => {
  const { cityFromQuery, categoryFromQuery } = useAppQueryContext();
  const muiTheme = useTheme(); // ✅ يجيب الثيم الحالي

  // 🗺️ خريطة المدن والصور
  const cityImages = {
    Luxor: "/assets/banner-luxor.webp",
    Cairo: "/assets/_17505_2.webp",
    Aswan: "/assets/_17610_1.webp",
    Alexandria: "/assets/mohanad-ayman-gpZExi4OrVg-unsplash.webp",
    "Sharm El Sheikh": "/assets/_16934_1.webp",
    "Marsa Alam": "/assets/_16601_1.webp",
    Hurghada: "/assets/_15990_1.webp",
    Giza: "/assets/_2182_1.webp",
  };

  const categoryImages = {
    "Cultural & Historical": "/assets/_2182_1.webp",
    "Adventure Trips": "/assets/banner-adventure.webp",
    "Night Tours": "/assets/nathan-anderson-kujXUuh1X0o-unsplash.webp",
    "Luxury Tours": "/assets/_16332_Untitled-1.webp",
    "Boat & Nile Cruises": "/assets/_16106_Untitled-1.webp",
    "Family Friendly": "/assets/banner-Cruises-&-Sailing.webp",
    "One Day Trips": "/assets/_7583_banner-daytours.webp",
    "Eco & Nature Tours": "/assets/david-knieradl-dX6p6tGCWEo-unsplash.webp",
    "Wellness & Medical": "/assets/photo-1575923640658-37d9c2ad9f92.webp",
    "Shopping Tours": "/assets/_16668_2.webp",
    Spirituality: "/assets/bernd-dittrich-YFF5YC7HLo0-unsplash.webp",
    "Group Tours": "/assets/_8651_Untitled-1.webp",
    "Options Tours": "/assets/_9822_1.webp",
  };

  const defaultImage =
    "/assets/travco-travel-c4259777-fab7-4d77-bd9f-d99e1d3fc377.webp";

  const city = cityFromQuery;
  const category = categoryFromQuery;

  let imagePath;

  if (city === "All" && category === "All") {
    imagePath = defaultImage;
  } else if (city === "All") {
    imagePath = categoryImages[category] || defaultImage;
  } else if (category === "All") {
    imagePath = cityImages[city] || defaultImage;
  } else {
    imagePath = cityImages[city] || categoryImages[category] || defaultImage;
  }

  return (
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url('${imagePath}')` }}
    >
      <div className="w-full px-15 pt-6 flex items-center justify-center">
        <Header user={user} />
      </div>
      <div className="container relative z-20 flex flex-col h-full justify-between">
        {/* ✅ العنوان في منتصف الصورة */}
        <div className="flex flex-row items-center justify-center flex-1 text-center">
          <h1
            className="text-4xl lg:text-7xl font-serif tracking-widest capitalize text-center"
            style={{
              color: muiTheme.palette.text.primary, // ✅ النص الأساسي أبيض خفيف
              textShadow: `2px 2px 6px ${muiTheme.palette.grey[900]}90`, // ✅ ظل ناعم رمادي داكن
              WebkitTextStroke: `1px ${muiTheme.palette.background.default}`, // ✅ حدود للحروف من الخلفية الداكنة
              fontWeight: "600",
            }}
          >
            {cityFromQuery === "All" && categoryFromQuery === "All"
              ? "All Trips"
              : cityFromQuery === "All"
              ? categoryFromQuery
              : categoryFromQuery === "All"
              ? cityFromQuery
              : `${cityFromQuery} - ${categoryFromQuery}`}
          </h1>

          <h1
            style={{
              width: categoryFromQuery !== "All" ? "30%" : "45%",
              color: muiTheme.palette.secondary.main, // ✅ نص ثانوي رمادي/برتقالي فاتح
            }}
            className="text-2xl lg:text-6xl font-serif tracking-widest uppercase"
          ></h1>
        </div>
      </div>
    </div>
  );
};

export default FacePage;
