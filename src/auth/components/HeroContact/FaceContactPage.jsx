"use client";
import React from "react";
import Header from "@/auth/components/HeaderComponets/Header";

const FaceContactPage = ({ user }) => {
  return (
    <div
      className="w-full h-[550px] bg-cover bg-center"
      style={{
        backgroundImage: `url('/assets/travco-travel-cc524d40-e86e-420c-9a9d-648c07456bc4.webp')`,
      }}
    >
      <div className="w-full px-15 pt-6 flex items-center justify-center">
        <Header user={user} />
      </div>
      <div className="container relative z-20 flex flex-col h-full justify-between">
        {/* ✅ الهيدر */}

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
            Contact Us
          </h1>

          <h1
            style={{ width: "45%" }}
            className="text-2xl lg:text-6xl font-serif tracking-widest uppercase text-[#fff]"
          ></h1>
        </div>
      </div>
    </div>
  );
};

export default FaceContactPage;
