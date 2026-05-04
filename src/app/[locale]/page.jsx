"use client";
import Footer from "@/components/layout/FooterSection";
import Header from "@/auth/components/header/Header";
import CarBookingSection from "@/auth/components/home/CarBookingSection";
import CategoriesSection from "@/auth/components/home/CategoriesSection";
import CitiesSection from "@/auth/components/home/CitiesSection";
import HeroSection from "@/auth/components/home/HeroSection";
import OurSection from "@/auth/components/home/OurSection";
import TopTripsSection from "@/auth/components/home/TopTripsSection";
import LoginModal from "@/auth/components/home/components/LoginModal";
import SignUpButton from "@/auth/components/home/components/SignUpButton";
import TopReviewsSection from "@/auth/components/home/components/TopReviewsSection";
import ChatWidget from "@/components/layout/ChatWidget";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import AdminDashboardButton from "@/components/layout/AdminDashboardButton";
import { motion } from "framer-motion";
import { Button } from "@mui/material";
import { FaSignOutAlt, FaUserPlus } from "react-icons/fa";

function ScrollSaver() {
  const pathname = usePathname();

  // مراقبة الاسكرول وتخزينه باستمرار (يعمل على الموبايل والديسكتوب)
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      localStorage.setItem(`scroll-${pathname}`, currentScroll.toString());
      console.log("📌 Scroll saved:", currentScroll);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  // عند الدخول لأي صفحة، استرجاع المكان
  useEffect(() => {
    const savedY = localStorage.getItem(`scroll-${pathname}`);
    if (savedY) {
      // استرجاع المكان بعد تحميل الصفحة بالكامل
      setTimeout(() => {
        window.scrollTo({ top: parseInt(savedY) / 2, behavior: "instant" });
        console.log("📌 Restored scroll:", savedY);
      }, 0);
    }
  }, [pathname]);

  return null;
}

export default function Home() {
  const { user } = useAuth();
  const { lang } = useLanguage();
  const { isLoggedIn, logout, handleOpen } = useAuth();

  return (
    <main
      className={`
        w-full flex flex-col items-center justify-center
        min-h-screen font-sans bg-white transition-colors duration-300
        overflow-hidden
      `}
    >
      <ScrollSaver />

      <Header />
      <HeroSection />
      <CategoriesSection />
      <TopTripsSection />
      <CitiesSection />
      <OurSection />
      <TopReviewsSection />
      <CarBookingSection />
      <Footer />
      <SignUpButton />
      <LoginModal />
      {user && <ChatWidget />}
      {user && <AdminDashboardButton />}
      <div
        className={`fixed bottom-2 left-6 p-4 rounded-full shadow-lg flex items-center justify-center`}
      >
        <motion.div whileHover={{ scale: 1.1 }} className="flex lg:hidden">
          <Button
            onClick={isLoggedIn ? logout : handleOpen}
            style={{
              padding: "12px 24px",
              background: "linear-gradient(to right, #FF9800, #eab308)",
              color: "#fff",
              fontWeight: "600",
              letterSpacing: "0.05em",
              borderRadius: "0.5rem",
              boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
              transition: "all 0.3s ease",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            {isLoggedIn ? (
              <FaSignOutAlt size={20} /> // أيقونة خروج
            ) : (
              <FaUserPlus size={20} /> // أيقونة تسجيل
            )}
          </Button>
        </motion.div>
      </div>
    </main>
  );
}
