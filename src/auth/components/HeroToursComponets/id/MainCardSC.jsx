"use client";
import React, { useState, useEffect } from "react";
import CommentsReviews from "@/auth/components/HeroToursComponets/id/CommentsReviews";
import RegisterToBuy from "@/auth/components/HeroToursComponets/id/RegisterToBuy";
import PaymentForm from "@/auth/components/HeroToursComponets/id/PaymentForm";
import InformationCard from "@/auth/components/HeroToursComponets/id/InformationCard";
import { useScreenSize } from "@/auth/hooks/screenSize";
import YourBookingDetails from "./YourBookingDetails";
import { useTripContext } from "@/context/TripContext";
import { useParams } from "next/navigation";
import AddOnTours from "./AddOnTours";

const MainCardSC = ({ user }) => {
  const { tours } = useTripContext();
  const params = useParams();
  const tourId = params?.id;
  const tour = tours.find((t) => t.id === tourId);
  const { width } = useScreenSize(); // ✅ يجب أن يبقى هنا
  const [tourGuidePrice, setTourGuidePrice] = useState({
    Spanish: 50,
    English: 50,
    German: 50,
    French: 50,
    Italian: 50,
  });
  const [guidePriceTotal, setGuidePriceTotal] = useState(0);
  const [selectedExtras2, setSelectedExtras2] = useState([]);
  const [guideLanguages, setGuideLanguages] = useState({
    Spanish: false,
    English: false,
    German: false,
    Italian: false,
    French: false,
  });
  const [bookingData, setBookingData] = useState({
    hotAirBalloon: false,
    bananaIsland: false,
    people: "2",
    hasChildren: "no",
    childrenCount: "",
    childrenAges: [],
    hasPets: "no",
    petType: "",
    needsTaxi: "no",
    vehicleType: "",
    guideRequired: false,
    guideLanguages: [],
  });

  const [hasBooked, setHasBooked] = useState(false);

  const city = tour?.city?.name || "غير محددة";
  const cityOptions = {
    Luxor: [
      {
        key: "1",
        label: "Sound & Light Show at Karnak Temple 🎧",
        price: 1200,
      },
      {
        key: "2",
        label: "Horse carriage ride along the Nile at sunset 🐎",
        price: 600,
      },
      {
        key: "3",
        label: "Private felucca trip to Banana Island 🚤",
        price: 1200,
      },
      { key: "4", label: "Guided access to Tutankhamun’s tomb 🏛️", price: 600 },
    ],
    Aswan: [
      { key: "1", label: "Nubian village 🏘️", price: 50 },
      { key: "2", label: "Obelisk and High Dam 🗿", price: 60 },
      { key: "3", label: "Elephantine and Botanical Island 🌴", price: 50 },
      { key: "4", label: "Nubian Museum 🏛️", price: 40 },
      { key: "5", label: "Sound and light of the elephant 🎆", price: 60 },
    ],
    Giza: [
      { key: "1", label: "🐪 Camel ride around pyramids", price: 800 },
      { key: "2", label: "🎧 Sound & Light Show at Sphinx", price: 950 },
      { key: "3", label: "🏛️ Inside Great Pyramid", price: 800 },
      { key: "4", label: "📸 Photo session at Plateau", price: 950 },
    ],
    Hurghada: [
      { key: "1", label: "🐠 Snorkeling trip", price: 750 },
      { key: "2", label: "🐬 Dolphin House swim", price: 900 },
      { key: "3", label: "🏜️ Desert safari", price: 750 },
      { key: "4", label: "🚤 Private boat BBQ", price: 900 },
    ],
    Alexandria: [
      { key: "1", label: "🏰 Qaitbay Citadel tour", price: 750 },
      { key: "2", label: "📚 Library of Alexandria", price: 900 },
      { key: "3", label: "🍽️ Seafood tasting", price: 750 },
      { key: "4", label: "🛶 Boat ride in Montaza", price: 900 },
    ],
    Cairo: [
      { key: "1", label: "🏛 NMEC Museum", price: 750 },
      { key: "2", label: "🌅 Sunset Nile Cruise", price: 900 },
      { key: "3", label: "Islamic Cairo tour", price: 750 },
      { key: "4", label: "🎭 Opera House show", price: 900 },
    ],
  };

  let selectedOptions2 = [];

  if (city === "Marsa Alam") {
    selectedOptions2 = [
      { key: "1", label: "🐬 Dolphin swim", price: 750 },
      { key: "2", label: "🤿 Diving", price: 900 },
      { key: "3", label: "🏜️ Desert safari", price: 750 },
      { key: "4", label: "🧂 Hot springs visit", price: 900 },
    ];
  } else if (city === "Sharm El Sheikh") {
    selectedOptions2 = [
      { key: "1", label: "🤿 Snorkeling or diving", price: 750 },
      { key: "2", label: "🏜️ Desert safari + show", price: 900 },
      { key: "3", label: "🚤 Yacht cruise", price: 750 },
      { key: "4", label: "🎭 Evening entertainment", price: 900 },
    ];
  }

  // const nanValue = parseInt(bookingData.people) || 1;
  // const tourPrice = parseFloat(tour?.price || "0");
  // const basePrice = tourPrice * nanValue;
  // const selectedOptions = cityOptions[city] || [];
  // const extrasFromSelectedOptions = [...selectedOptions, ...selectedOptions2]
  //   .filter((option) => bookingData[option.key])
  //   .reduce((total, option) => total + option.price, 0);

  // const finalPrice = basePrice + guidePriceTotal + extrasFromSelectedOptions;
  // const finalPriceAfterRival = finalPrice * (1 - (tour?.rival || 0) / 100);
const nanValue = parseInt(bookingData.people) || 1;
const tourPrice = parseFloat(tour?.price || "0");

// 🟡 المعادلة: كل شخص إضافي ينقص 15 دولار من سعر الفرد
const discountPerPerson = 15;
const adjustedPricePerPerson = Math.max(
  tourPrice - (nanValue - 1) * discountPerPerson,
  tourPrice * 0.6 // ✅ حد أدنى (مثلاً 60% من السعر الأصلي) علشان ما تخسرش
);

// 🟡 السعر الأساسي بعد التعديل
const TTbasePrice = adjustedPricePerPerson * nanValue;
  const basePrice = tourPrice;

const selectedOptions = cityOptions[city] || [];
const extrasFromSelectedOptions = [...selectedOptions, ...selectedOptions2]
  .filter((option) => bookingData[option.key])
  .reduce((total, option) => total + option.price, 0);

const finalPrice = basePrice + guidePriceTotal + extrasFromSelectedOptions;
const TTfinalPrice = TTbasePrice + guidePriceTotal + extrasFromSelectedOptions;

// 🟡 تطبيق الخصم المنافس (rival)
const finalPriceAfterRival = finalPrice * (1 - (tour?.rival || 0) / 100);
const TTfinalPriceAfterRival = TTfinalPrice * (1 - (tour?.rival || 0) / 100);

  const selectedExtras = [...selectedOptions, ...selectedOptions2].filter(
    (option) => bookingData[option.key] === true
  );

  useEffect(() => {
    if (!user || !tour || !tour.payments) return;
    const userHasBooking = tour.payments.some(
      (booking) => booking.userId === user.id
    );
    setHasBooked(userHasBooking);
  }, [tour, user]);
  if (!tour) {
    return <div>Loading trip details... ⏳</div>;
  }

  const addOnTours = tours.filter(
    (t) => t.category.name === "Options Tours" && t.city?.name === city
  );
  console.log(addOnTours);
  return (
    <div
      style={{
        paddingRight: width <= 600 ? "0px" : "60px",
        paddingLeft: width <= 600 ? "0px" : "60px",
      }}
      className="w-full flex flex-col  justify-center"
    >
      <div className="w-full">
        <InformationCard
          tour={tour}
          nan={nanValue}
          tourGuidePrice={tourGuidePrice}
          guidePriceTotal={guidePriceTotal}
          finalPriceAfterRival={finalPriceAfterRival}
          selectedOptions={selectedOptions}
          selectedOptions2={selectedOptions2}
          bookingData={bookingData}
          setBookingData={setBookingData}
        />
        {tour.category.name !== "Options Tours" && (
          <AddOnTours
            addons={addOnTours}
            selectedExtras={selectedExtras2}
            setSelectedExtras={setSelectedExtras2}
          />
        )}

        {user && (
          <CommentsReviews
            comments={tour.reviews}
            tour={tour.id}
            user={user.id}
            userName={user.name || "ميدو"}
          />
        )}
      </div>

      {user &&
        (hasBooked ? (
          <YourBookingDetails
            tour={tour}
            user={user}
            hasBooked={hasBooked}
            setHasBooked={setHasBooked}
          />
        ) : (
          <PaymentForm
            tour={tour}
            user={user}
            setNan={() => ""}
            tourGuidePrice={tourGuidePrice}
            setGuideLanguages={setGuideLanguages}
            setGuidePriceTotal={setGuidePriceTotal}
            selectedOptions={selectedOptions}
            selectedOptions2={selectedOptions2}
            bookingData={bookingData}
            setBookingData={setBookingData}
            finalPrice={finalPrice}
            TTfinalPriceAfterRival={TTfinalPriceAfterRival}
            selectedExtras={selectedExtras}
            nan={nanValue}
            setHasBooked={setHasBooked} // ✅ أضف هذا
          />
        ))}

      {!user && <RegisterToBuy />}
    </div>
  );
};

export default MainCardSC;
