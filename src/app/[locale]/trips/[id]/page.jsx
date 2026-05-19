"use client";
import { useTrip } from "@/context/TripContext";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { useEffect, useState } from "react";
import Footer from "@/components/layout/FooterSection";
import Header from "@/auth/components/header/Header";
import EgyptianBackground from "@/components/layout/EgyptianBackground";
import LoginModal from "@/auth/components/home/components/LoginModal";
import SignUpButton from "@/auth/components/home/components/SignUpButton";
import TripHeader from "./components/TripHeader";
import TripCities from "./components/TripCities";
import TripCategories from "./components/TripCategories";
import TripIncludes from "./components/TripIncludes";
import TripItinerary from "./components/TripItinerary";
import TripInfo from "./components/TripInfo";
import TripReviews from "./components/TripReviews";
import ChatWidget from "@/components/layout/ChatWidget";
import { useAuth } from "@/context/AuthContext";
import PurchaseButton from "./components/PurchaseButton";
import CancelButton from "./components/CancelButton";
import { usePurchase } from "@/context/PurchaseContext";
import AccessibilityInfo from "./components/AccessibilityInfo";

export default function TripPage({ params }) {
  const { id } = params; // ✅ استخدم params مباشرة بدل use()
  const { trips, fetchTrips, getTripById } = useTrip();
  const { lang } = useLanguage();
  const { themeName } = useTheme();
  const { user } = useAuth();
  const { purchases } = usePurchase();

  useEffect(() => {
    if (!trips.length) {
      fetchTrips();
    }
  }, []);

  const trip = getTripById(id);
  if (!trip) {
    return <p>Trip not found</p>;
  }

  const hasActivePurchase = purchases.some(
    (p) =>
      p.trip_id === trip.id &&
      p.user_id === user?.id &&
      p.status !== "Cancelled",
  );

  return (
    <main
      className={`w-full min-h-screen ${
        themeName === "dark"
          ? "bg-gradient-to-b from-black via-gray-900 to-black text-gold"
          : "bg-gradient-to-b from-[#fdf6e3] via-[#f5deb3] to-[#fdf6e3] text-[#3a2c0a]"
      }`}
    >
      <Header />
      <EgyptianBackground />

      <div
        style={{ paddingTop: "110px" }}
        className="lg:mx-auto lg:p-6 relative z-10 flex flex-col w-full gap-8 
             lg:max-w-7xl lg:grid lg:grid-cols-2 lg:auto-rows-min"
      >
        <div className="w-full flex lg:col-span-3">
          <TripHeader trip={trip} lang={lang} />
        </div>

        <div className="flex flex-col w-full gap-8 lg:flex-row lg:col-span-3">
          <div className="flex flex-col w-full gap-2.5 lg:col-span-3">
            <TripInfo trip={trip} lang={lang} />
            <TripCities trip={trip} lang={lang} />
            <TripCategories trip={trip} lang={lang} />
          </div>
          <AccessibilityInfo theme="dark" />
        </div>

        <div className="col-span-3 flex flex-row gap-8">
          <TripIncludes trip={trip} lang={lang} />
        </div>

        <div className="col-span-1 lg:col-span-3">
          <TripItinerary trip={trip} lang={lang} />
        </div>

        <div className="col-span-1 lg:col-span-3">
          <TripReviews trip={trip} lang={lang} />
          {user &&
            (hasActivePurchase ? (
              <CancelButton trip={trip} />
            ) : (
              <PurchaseButton trip={trip} />
            ))}
        </div>
      </div>

      <Footer />
      <SignUpButton />
      <LoginModal />
      {user && <ChatWidget />}
    </main>
  );
}
