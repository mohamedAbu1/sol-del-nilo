"use client"
import Header from "@/auth/components/Header/Header";
import ImageSection from "@/auth/components/VISA/ImageSection";
import ContentSection from "@/auth/components/VISA/ContentSection";
import GeneralAdvice from "@/auth/components/VISA/GeneralAdvice";
import SocialFloatingButton from "@/components/layout/SocialFloatingButton";
import ChatWidget from "@/components/layout/ChatWidget";
import { useAuth } from "@/context/AuthContext";

export default function EgyptVisaPage() {
    const { user } = useAuth();

  return (
    <main className="w-full flex flex-col items-center justify-center bg-white dark:bg-[#1a1b1b] text-[#002147] dark:text-[#d2cec8] font-sans animate-fadeIn">
      <Header user={user || ""} />
      <ImageSection />
      <ContentSection />
      <GeneralAdvice />
      <SocialFloatingButton />
      {user && <ChatWidget user={user || ""} />}
    </main>
  );
}
