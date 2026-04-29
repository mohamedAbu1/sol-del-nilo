"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import Content from "./components/Content";
import DownloadAppSection from "./components/DownloadAppSection";
import { useData } from "@/context/DataContext";
import SocialMediaIcons from "./components/SocialMediaIcons";
import LeftSocialIcons from "./components/LeftSocialIcons";
import LogoLetter from "./components/LogoLetter";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

// تحسين الصور عبر CDN
const optimize = (url) => {
  if (!url) return "/default-hero.jpg";
  if (!url.startsWith("http")) return url;
  return `${url}?width=1600&quality=70&format=webp`;
};

// دالة لتشفير الكويري
const encodeData = (obj) => btoa(JSON.stringify(obj));

export default function HeroSection() {
  const { theme, themeName } = useTheme();
  const { images, index } = useData();
  const router = useRouter();

  const [visible, setVisible] = useState(false);
  const heroRef = useRef(null);

  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setVisible(true);
      },
      { threshold: 0.1 },
    );
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  // دالة للتحويل مع الكويري
  const goToTours = (cityName) => {
    const queryObj = {
      city: [cityName],
      category: ["One Day Trips"],
      price: "Economy",
      popular: false,
    };
    router.push(`/trips?data=${encodeData(queryObj)}`);
  };

  return (
    <section
      ref={heroRef}
      style={{ paddingBottom: "0px" }}
      className={`relative h-[100vh] w-full overflow-hidden ${theme.background} ${theme.text}`}
    >
      {/* Background Image للموبايل */}
      <div className="absolute inset-0 block lg:hidden">
        <Image
          src={
            themeName === "dark"
              ? "/HomePageImage/swwqqqas.webp"
              : "/HomePageImage/sadsaqqwwwrrr.webp"
          }
          alt="Hero Mobile"
          fill
          loading="lazy"
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Background Image للديسكتوب */}
      <div className="absolute inset-0 hidden lg:block">
        <AnimatePresence>
          {visible && (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={optimize(images?.[index])}
                alt="Hero Slide"
                fill
                loading="lazy"
                sizes="100vw"
                placeholder="blur"
                blurDataURL="/blur-placeholder.jpg"
                className="object-cover"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Halo Light */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, scale: [1, 1.1, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gold/10 blur-[120px] rounded-full"
      />

      <SocialMediaIcons />
      <LeftSocialIcons />

      {/* Content + Logo */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative z-20 flex flex-col items-center justify-center h-full gap-4"
      >
        <Content />
        <DownloadAppSection />

        {/* Logo */}
        <motion.div
          initial="hidden"
          animate="visible"
          style={{ background: "rgba(0,0,0,0.4)", borderRadius: "6px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2 },
            },
          }}
          className="hidden lg:flex flex-wrap gap-4 justify-center font-[Cinzel] text-[32px] lg:text-[34px] xl:text-[60px]"
        >
          {["L", "U", "X", "O", "R", "𓂀", "A", "S", "W", "A", "N"].map(
            (char, i) => (
              <LogoLetter key={i} char={char} theme={theme} />
            ),
          )}
        </motion.div>

        {/* Title + Paragraph + Button */}
        <div className="text-left mt-36 p-6 rounded-lg max-w-lg lg:hidden">
          <h1 className="text-2xl md:text-3xl font-bold text-gold">
            Book your next adventure
          </h1>
          <p className="mt-4 text-base md:text-lg text-white">
            Embark on an unforgettable journey through the land of Pharaohs and
            Pyramids.
          </p>
          <button
            onClick={() => setShowOptions(!showOptions)}
            className="mt-6 px-6 py-2 bg-gold bg-amber-600 text-black font-semibold rounded hover:bg-yellow-500 transition"
          >
            One day trip
          </button>

          {/* خيارات الرحلة */}
          {showOptions && (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="mt-4 w-[180px] flex flex-col gap-2 bg-black/60 p-4 rounded-lg shadow-lg"
              >
                <motion.button
                  style={{ fontWeight: "600" }}
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 bg-amber-500 text-black rounded transition"
                  onClick={() => goToTours("Luxor")}
                >
                  Luxor
                </motion.button>
                <motion.button
                  style={{ fontWeight: "600" }}
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 bg-amber-500 text-black rounded transition"
                  onClick={() => goToTours("Aswan")}
                >
                  Aswan
                </motion.button>
                <motion.button
                  style={{ fontWeight: "600" }}
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 bg-amber-500 text-black rounded transition"
                  onClick={() => goToTours("Cairo")}
                >
                  Cairo
                </motion.button>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </motion.div>
    </section>
  );
}
