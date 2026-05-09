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
     
    </main>
  );
}
