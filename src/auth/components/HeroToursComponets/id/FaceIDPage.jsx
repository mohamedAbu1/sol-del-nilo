"use client";
import React from "react";
import Header from "@/auth/components/HeaderComponets/Header";
import { useAppQueryContext } from "@/context/AppQueryContext";
import { useTripContext } from "@/context/TripContext";
import { useParams } from "next/navigation";

const FaceIDPage = ({ user }) => {
  const { tours } = useTripContext();
  const params = useParams();
  const tourId = params?.id;
  const tour = tours.find((t) => t.id === tourId);

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
  const defaultImage =
    "/assets/travco-travel-c4259777-fab7-4d77-bd9f-d99e1d3fc377.webp";

 const city = tour?.city?.name || "All";

let imagePath;
if (city === "All") {
  imagePath = defaultImage;
} else {
  imagePath = cityImages[city] || defaultImage;
}
  return (
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url('${imagePath}')` }}
    >
      <div className="container relative z-20 flex flex-col h-full justify-between">
        {/* ✅ الهيدر */}
        <div className="w-full px-6 pt-6 lg:ml-[190px]">
          <Header user={user} />
        </div>

        {/* ✅ العنوان في منتصف الصورة */}
        <div
          //   style={{ marginTop: "160px" }}
          className="flex flex-row items-center justify-center flex-1 text-center"
        >
          <h1
            className="text-4xl lg:text-7xl font-serif tracking-widest capitalize text-white text-center"
            style={{
              textShadow: "2px 2px 6px rgba(0, 0, 0, 0.6)", // ظل ناعم
              WebkitTextStroke: "1px #000", // حدود للحروف
              fontWeight: "600",
            }}
          >
            {city === "All" 
              ? "All Trips"
              : city === "All"
              ? city
              : `${city}`}
          </h1>

          <h1
            style={{ width:"45%" }}
            className="text-2xl lg:text-6xl font-serif tracking-widest uppercase text-[#fff]"
          ></h1>
        </div>
      </div>
    </div>
  );
};

export default FaceIDPage;
