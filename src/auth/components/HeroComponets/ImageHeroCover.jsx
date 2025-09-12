"use client";

import Image from "next/image";
const imag = "/assets/Copilot_20250902_145335.png";
const imag2 = "/assets/Copilot_20250909_113139.png";
import ReactPlayer from "react-player";
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$


export default function TestVideo() {
  return (
    <main className="relative w-full h-screen overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
      >
        <source src="/videos/This-is-Egypt.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 bg-black/40 z-0"></div>

      <h1 className="relative z-10 text-white text-4xl font-bold">
        تجربة تشغيل الفيديو
      </h1>
    </main>
  );
}
