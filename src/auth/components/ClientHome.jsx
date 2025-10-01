"use client";
import { useState, useEffect } from "react";
import Header from "./Header";
import Hero from "./HeroComponets/Hero";
import Image from "next/image";

export default function ClientHome({ user }) {
  const [showWelcome, setShowWelcome] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [animateImage, setAnimateImage] = useState(false);

  useEffect(() => {
    const hasSeenImageAnimation = localStorage.getItem("hasSeenImageAnimation");

    if (!hasSeenImageAnimation) {
      setAnimateImage(true);
      localStorage.setItem("hasSeenImageAnimation", "true");
    }

    const timer = setTimeout(() => {
      setShowWelcome(false);
      setShowContent(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative w-full h-screen overflow-hidden">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-0 pointer-events-none" />

      {/* Mobile background */}
      <div className="lg:hidden absolute top-0 left-0 w-full h-full z-[-1]">
        <Image
          src="/assets/Copilot_20250909_113139.png"
          alt="Mobile background"
          fill
          className="object-cover"
        />
      </div>

      {/* Desktop background */}
      <div className="hidden lg:block w-full h-full">
        <Image
          src="/assets/Luxor Temple.png"
          alt="Desktop background"
          fill
          className={`absolute top-0 left-0 w-full h-full object-cover z-[-1] ${
            animateImage ? "animate-fold-in" : ""
          }`}
        />

        {/* Desktop Welcome Message */}
        {showWelcome && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <h1 className="text-white text-5xl font-bold animate-fade-in-up">
             Welcome to <span className="text-yellow-400">SolDelNilo</span>
            </h1>
          </div>
        )}

        {/* Desktop Hero */}
        {showContent && (
          <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-6 px-4">
            <Hero />
          </div>
        )}
      </div>

      {/* Header always visible */}
      <div className="container absolute top-0 left-1/2 transform -translate-x-1/2 z-50">
        <Header user={user} />
      </div>

      {/* Mobile Welcome Message */}
      {showWelcome && (
        <div className="lg:hidden absolute inset-0 flex items-center justify-center z-10">
          <h1 className="text-white text-4xl font-bold animate-fade-in-up text-center px-4 leading-snug">
            Welcome to <span className="text-yellow-400">SolDelNilo</span>
          </h1>
        </div>
      )}

      {/* Mobile Hero */}
      {showContent && (
        <div className="lg:hidden relative z-10 flex flex-col items-center justify-center h-full space-y-6 px-4">
          <Hero />
        </div>
      )}
    </main>
  );
}
