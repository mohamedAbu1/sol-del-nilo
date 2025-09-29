"use client";
import React from 'react'

const RightSideDecor = () => {
  return (
    <>
      {/* الكتابة الفرعونية على اليسار */}
      <div
        className="fixed top-0 right-0 h-screen w-[80px] hidden sm:flex items-center justify-center z-10"
        style={{ writingMode: "vertical-rl", color: "#ff9800", fontSize: "54px", fontWeight:"900", fontFamily: "Cairo, sans-serif" }}
      >
        𓂀𓆣𓏏𓊹𓂻𓃭𓇳𓋹𓁷𓂧
      </div>

      {/* الخط العمودي على اليمين */}
      <div
        className="fixed top-0 right-0 h-screen w-[2px] bg-[#ff9800] z-999"
      />
    </>
  )
}

export default RightSideDecor
