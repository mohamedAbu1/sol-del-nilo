"use client";
import { useState, useEffect } from "react";
import Header from "../HeaderComponets/Header";
import Hero from "./Hero";
import Image from "next/image";
import WelcomeMessageBubble from "../WelcomeMessage";
import { motion, AnimatePresence } from "framer-motion";
import SectionTow from "./SectionTow";
import SectionThree from "./SectionThree";
import SectionFour from "./SectionFour";
import SectionFive from "./SectionFive";
import SectionSix from "./SectionSix";
import { useTheme } from "next-themes";
import CitySection from "./CitySection";

const desktopImages = [
  "/assets/Copilot_20251003_102123.png",
  "/assets/Copilot_20251003_114530.png",
  "/assets/Copilot_20251003_105735.png",
  "/assets/Copilot_20251003_110337.png",
];
const desktopImagesMB = [
  "/assets/545371804_18083318650930067_5402798298470446398_n.jpg",
  "/assets/489671803_18068665750930067_7121276910165743367_n.jpg",
  "/assets/548898267_18083849644930067_2023880468351303706_n.jpg",
  "/assets/553312854_18084731197930067_1648342695818561037_n.jpg",
];

export default function ClientHome({ user }) {
  const [showWelcomeText, setShowWelcomeText] = useState(true);
  const [showHero, setShowHero] = useState(false);
  const [heroMoved, setHeroMoved] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentIndexMB, setCurrentIndexMB] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowWelcomeText(false), 1000);
    const timer2 = setTimeout(() => setShowHero(true), 2100);
    const timer3 = setTimeout(() => setHeroMoved(true), 6000);
    const timer4 = setTimeout(() => setShowBubble(true), 7500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % desktopImages.length);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndexMB((prev) => (prev + 1) % desktopImagesMB.length);
    }, 15000);
    return () => clearInterval(interval);
  }, []);
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    if (theme) {
      console.log("Current theme is:", theme);
    }
  }, [theme]);
  return (
    <>
      <main
        id="section-one"
        className="relative w-full h-screen overflow-hidden"
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 z-0 pointer-events-none" />

        {/* Mobile background */}
        <div className="lg:hidden absolute top-0 left-0 w-full h-full z-[-1]">
          <Image
            src={desktopImagesMB[currentIndexMB]}
            alt="Mobile background"
            fill
            className="object-cover"
          />
        </div>

        {/* Desktop background */}
        <div className="hidden lg:flex w-full h-full relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={desktopImages[currentIndex]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="absolute top-0 left-0 w-full h-full z-[-1]"
            >
              <Image
                src={desktopImages[currentIndex]}
                alt="Desktop background"
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </AnimatePresence>

          <AnimatePresence>
            {showWelcomeText && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 flex items-center justify-center z-20"
              >
                <h1 className="text-white text-5xl font-bold text-center">
                  Welcome to <span className="text-yellow-400">SolDelNilo</span>
                </h1>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="relative z-10 flex w-full h-full">
            <div className="flex-[0.77] h-full flex items-center justify-center px-4 relative overflow-hidden">
              {showHero && (
                <motion.div
                  initial={{ x: 0, scale: 1, rotateY: 0 }}
                  animate={
                    heroMoved
                      ? { x: 0, scale: 0.95, rotateY: -10 }
                      : { x: "15vw", scale: 1, rotateY: 0 }
                  }
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                  style={{ perspective: 1000, zIndex: 10 }}
                  className="w-full h-full flex items-center justify-center"
                >
                  <Hero showBubble={showBubble} />
                </motion.div>
              )}
            </div>

            <div className="flex-[0.3] h-full flex items-center justify-start px-4">
              {showBubble && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  <WelcomeMessageBubble />
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="container absolute top-0 left-1/2 transform -translate-x-1/2 z-50">
          <Header user={user} />
        </div>

        {/* Mobile layout with animation */}
        <div className="lg:hidden relative z-10 flex flex-col items-center justify-center h-full px-4 py-8 space-y-8 text-center">
          <AnimatePresence>
            {showWelcomeText && (
              <motion.h1
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="text-white text-3xl font-bold"
              >
                Welcome to <span className="text-yellow-400">SolDelNilo</span>
              </motion.h1>
            )}
          </AnimatePresence>

          {showHero && (
            <motion.div
              initial={{ x: 0, scale: 1, rotateY: 0 }}
              animate={
                heroMoved
                  ? { x: 0, scale: 0.95, rotateY: 0 }
                  : { x: 0, scale: 1, rotateY: 0 }
              }
              transition={{ duration: 1.2, ease: "easeInOut" }}
              style={{ perspective: 1000 }}
              className="w-full h-9/12 flex items-center justify-center"
            >
              <Hero showBubble={showBubble} />
            </motion.div>
          )}
        </div>
      </main>

      {/* الأقسام التالية */}
      <SectionTow theme={theme} />
      <SectionThree theme={theme} />
      <CitySection theme={theme}/>
      <SectionFour theme={theme} />
      <SectionFive theme={theme} />
      <SectionSix theme={theme} />
    </>
  );
}
