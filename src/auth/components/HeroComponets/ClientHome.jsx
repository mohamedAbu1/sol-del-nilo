"use client";
import { useState, useEffect } from "react";
import Header from "../HeaderComponets/Header";
import Hero from "./Hero";
import Image from "next/image";
import WelcomeMessageBubble from "./WelcomeMessage";
import { motion, AnimatePresence } from "framer-motion";
import SectionTow from "./SectionTow";
import SectionThree from "./SectionThree";
import SectionFour from "./SectionFour";
import SectionFive from "./SectionFive";
import SectionSix from "./SectionSix";
import CitySection from "./CitySection";
import { desktopImages, desktopImagesMB } from "@/lib/constants/FixedTexts";
import ScrollRestoration from "../ScrollRestoration";
export default function ClientHome({ user }) {
  const [hasMounted, setHasMounted] = useState(false);
  const [showWelcomeText, setShowWelcomeText] = useState(true);
  const [showHero, setShowHero] = useState(false);
  const [heroMoved, setHeroMoved] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentIndexMB, setCurrentIndexMB] = useState(0);
  const [isBottom, setIsBottom] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;

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
  }, [hasMounted]);
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.body.scrollHeight;

      setIsBottom(scrollY + windowHeight >= fullHeight - 50);
      setShowScrollTop(scrollY > 50); // ✅ يظهر زر الصعود بعد 50 بكسل
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % desktopImages.length);
    }, 15000);
    return () => clearInterval(interval);
  }, [hasMounted]);

  useEffect(() => {
    if (!hasMounted) return;

    const interval = setInterval(() => {
      setCurrentIndexMB((prev) => (prev + 1) % desktopImagesMB.length);
    }, 15000);
    return () => clearInterval(interval);
  }, [hasMounted]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.body.scrollHeight;
      setIsBottom(scrollY + windowHeight >= fullHeight - 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!hasMounted) return null;

  return (
    <>
      <ScrollRestoration />

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
            className="object-cover bg-no-repeat bg-center"
            priority
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
                placeholder="blur"
                blurDataURL="data:image/webp;base64,..."
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

        {/* 🔽 زر السهم للأسفل */}
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          className={`absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 transition-opacity duration-500 ${
            isBottom ? "opacity-0" : "opacity-100"
          }`}
        >
          <button
            style={{ cursor: "pointer" }}
            onClick={() =>
              document
                .getElementById("section-two")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="w-11 h-11 rounded-full bg-[#ff9800] border border-white/20 flex items-center justify-center hover:bg-white/20 transition duration-300"
            aria-label="Scroll down"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-11 h-5 "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </motion.div>
      </main>

      {/* الأقسام التالية */}
      <section id="section-two">
        <SectionTow />
      </section>
      <SectionThree />
      <CitySection />
      <SectionFour />
      <SectionFive />
      <SectionSix />
      {showScrollTop && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{ cursor: "pointer" }}
            className="w-10 h-10 rounded-full bg-[#ff9800] border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition duration-300"
            aria-label="Scroll to top"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 15l7-7 7 7"
              />
            </svg>
          </button>
        </motion.div>
      )}
    </>
  );
}
