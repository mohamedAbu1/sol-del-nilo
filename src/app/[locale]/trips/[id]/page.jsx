"use client";
import { useTrip } from "@/context/TripContext";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { useEffect } from "react";
import { use } from "react";
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
import CancelButton from "./components/CancelButton"; // ✅ زر جديد للإلغاء
import { usePurchase } from "@/context/PurchaseContext"; // ✅ جلب الحجوزات
import AccessibilityInfo from "./components/AccessibilityInfo";

export default function TripPage({ params }) {
  const { id } = use(params);
  const { trips, fetchTrips, getTripById, loadingTrips } = useTrip();
  const { lang } = useLanguage();
  const { themeName } = useTheme();
  const { user, openLoginModal ,handleOpen,isLoggedIn} = useAuth();
  const { purchases } = usePurchase(); // ✅ جلب الحجوزات

  useEffect(() => {
    if (!trips.length) {
      fetchTrips();
    }
  }, []);

  const trip = getTripById(id);
  if (!trip) {
    return <p>Trip not found</p>;
  }

  // تحقق إذا كان المستخدم اشترى الرحلة ولم يقم بإلغائها
  const hasActivePurchase = purchases.some(
    (p) =>
      p.trip_id === trip.id &&
      p.user_id === user?.id &&
      p.status !== "Cancelled",
  );

  return (
    <main
      className={`min-h-screen w-full lg:container lg:flex lg:items-center lg:justify-center flex-col lg:m-auto ${
        themeName === "dark"
          ? "bg-gradient-to-b from-black via-gray-900 to-black text-gold"
          : "bg-gradient-to-b from-[#fdf6e3] via-[#f5deb3] to-[#fdf6e3] text-[#3a2c0a]"
      }`}
    >
      <Header />
      <EgyptianBackground />

      <div
        style={{ paddingTop: "190px" }}
        className="w-full mt-9 lg:mt-0 mx-auto relative z-10 gap-8 auto-rows-min "
      >
        <EgyptianBackground />

        <div className="w-full">
          <TripHeader trip={trip} lang={lang} />
        </div>

        <div className="col-span-3 flex flex-col lg:flex-row gap-8">
          <div className="col-span-3 ">
            <TripInfo trip={trip} lang={lang} />
            <TripCities trip={trip} lang={lang} />
            <TripCategories trip={trip} lang={lang} />
          </div>
          <AccessibilityInfo theme="dark" />
        </div>

        <div className="col-span-3 flex flex-row gap-8">
          <TripIncludes trip={trip} lang={lang} />
        </div>

        <div className="col-span-3 lg:col-span-3">
          <TripItinerary trip={trip} lang={lang} />
        </div>

        <div className="col-span-3 lg:col-span-3">
          <TripReviews trip={trip} lang={lang} />

          {/* زر الإلغاء يظهر فقط إذا كان فيه شراء */}
          {hasActivePurchase && <CancelButton trip={trip} />}

          {/* زر الشراء يظهر دائمًا */}
          <PurchaseButton
            trip={trip}
          
          />
        </div>
      </div>

      <Footer />
      <SignUpButton />
      <LoginModal />
      {user && <ChatWidget />}
    </main>
  );
}
