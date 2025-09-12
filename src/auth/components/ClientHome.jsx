"use client";
import { useState, useEffect } from "react";
import Header from "./Header";
import Hero from "./HeroComponets/Hero";
import Image from "next/image";

export default function ClientHome() {
  const [showVideo, setShowVideo] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [startTransition, setStartTransition] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [animateImage, setAnimateImage] = useState(false);

  useEffect(() => {
    const hasSeenVideo = localStorage.getItem("hasSeenIntroVideo");
    const hasSeenImageAnimation = localStorage.getItem("hasSeenImageAnimation");

    if (!hasSeenVideo) {
      setShowVideo(true);
      localStorage.setItem("hasSeenIntroVideo", "true");
    }

    if (!hasSeenImageAnimation) {
      setAnimateImage(true);
      localStorage.setItem("hasSeenImageAnimation", "true");
    }

    if (hasSeenVideo) {
      setStartTransition(true);
      setTimeout(() => setShowContent(true), 1000);
    }
  }, []);

  useEffect(() => {
    if (videoEnded) {
      setStartTransition(true);
      setAnimateImage(true);
      setTimeout(() => setShowContent(true), 1000);
    }
  }, [videoEnded]);

  const handleReplay = () => {
    setShowVideo(true);
    setVideoEnded(false);
    setStartTransition(false);
    setShowContent(false);
    setAnimateImage(false);
    localStorage.removeItem("hasSeenIntroVideo");
    localStorage.removeItem("hasSeenImageAnimation");
  };

  const handleSkip = () => {
    setShowVideo(false);
    setVideoEnded(true);
  };

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

      {/* Desktop video and image */}
      <div className="hidden lg:block w-full h-full">
        {showVideo && !videoEnded && (
          <>
            <video
              autoPlay
              muted
              loop={false}
              playsInline
              onEnded={() => setVideoEnded(true)}
              className={`absolute top-0 left-0 w-full h-full object-cover z-[-2] ${
                startTransition ? "animate-fold-out" : ""
              }`}
            >
              <source src="/videos/This-is-Egypt.mp4" type="video/mp4" />
            </video>

            {/* Skip button */}
            <button
              onClick={handleSkip}
              style={{padding:"13px", cursor:"pointer"}}
              className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-10  bg-white/90 text-black font-semibold rounded-full shadow-lg hover:bg-white transition"
            >
              Skip
            </button>
          </>
        )}

        {(startTransition || !showVideo) && (
          <Image
            src="/assets/Copilot_20250902_145335.png"
            alt="Desktop background"
            fill
            className={`absolute top-0 left-0 w-full h-full object-cover z-[-2] ${
              animateImage ? "animate-fold-in" : ""
            }`}
          />
        )}

        {/* Hero + Replay button */}
        {showContent && (
          <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-6 px-4">
            <Hero handleReplay={handleReplay} />
          </div>
        )}
      </div>

      {/* Header always visible */}
      <div className="container absolute top-0 left-1/2 transform -translate-x-1/2 z-50">
        <Header />
      </div>

      {/* Mobile Hero + Replay button */}
      {showContent && (
        <div className="lg:hidden relative z-10 flex flex-col items-center justify-center h-full space-y-6 px-4">
          <Hero />
        </div>
      )}
    </main>
  );
}
