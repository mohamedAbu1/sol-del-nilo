"use client";
import React, { useState } from "react";
import CommentsReviews from "@/auth/components/HeroToursComponets/id/CommentsReviews";
import RegisterToBuy from "@/auth/components/HeroToursComponets/id/RegisterToBuy";
import PaymentForm from "@/auth/components/HeroToursComponets/id/PaymentForm";
import InformationCard from "@/auth/components/HeroToursComponets/id/InformationCard";
import { useScreenSize } from "@/auth/hooks/screenSize";

const MainCardSC = ({ tour, user }) => {
  const { width, height } = useScreenSize();
  const [nan, setNan] = useState();
  const [tourGuidePrice, setTourGuidePrice] = useState({
    Spanish: 20,
    English: 15,
    German: 25,
    French: 35,
    Italian: 45,
    // باقي البيانات...
  });
  const [guidePriceTotal, setGuidePriceTotal] = useState(0);
  const [guideLanguages, setGuideLanguages] = useState({
    Spanish: false,
    English: false,
    German: false,
    Italian: false,
    French: false,
    // باقي البيانات...
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
    // باقي البيانات...
  });
  const city = tour.city.name; // 👈 يمكنك تغيير المدينة هنا حسب السياق
  console.log(city);
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
      {
        key: "4",
        label:
          "Guided access to Tutankhamun’s tomb in the Valley of the Kings 🏛️",
        price: 600,
      },
    ],
    Aswan: [
      {
        key: "1",
        label: "Felucca ride to the Botanical Garden or Elephantine Island 🚤",
        price: 500,
      },
      {
        key: "2",
        label: "Nile dinner cruise with live entertainment 🛶",
        price: 700,
      },
      {
        key: "3",
        label: "Khan El Khalili market walk with local food tasting 🛍️",
        price: 500,
      },
      {
        key: "4",
        label: "Cultural show at El Sawy Culture Wheel or Cairo Opera House 🎭",
        price: 700,
      },
    ],
    Giza: [
      {
        key: "1",
        label: "🐪 Camel or horseback ride around the pyramids",
        price: 800,
      },
      { key: "2", label: "🎧 Sound & Light Show at the Sphinx", price: 950 },
      {
        key: "3",
        label: "🏛️ Inside access to the Great Pyramid with expert guide",
        price: 800,
      },
      {
        key: "4",
        label: "📸 Professional photo session at the Giza Plateau",
        price: 950,
      },
    ],
    Hurghada: [
      {
        key: "1",
        label: "🐠 Snorkeling trip to Giftun Island or Orange Bay",
        price: 750,
      },
      {
        key: "2",
        label: "🐬 Dolphin House excursion with swim experience",
        price: 900,
      },
      {
        key: "3",
        label: "🏜️ Quad bike or 4×4 desert safari with Bedouin dinner",
        price: 750,
      },
      {
        key: "4",
        label: "🚤 Private boat trip with onboard barbecue and photo session",
        price: 900,
      },
    ],
    Alexandria: [
      { key: "1", label: "🏰 Guided tour of Qaitbay Citadel", price: 750 },
      {
        key: "2",
        label: "📚 Private access tour of the Library of Alexandria",
        price: 900,
      },
      {
        key: "3",
        label: "🍽️ Seafood tasting at a heritage restaurant on the Corniche",
        price: 750,
      },
      {
        key: "4",
        label: "🛶 Boat ride in Montaza Gardens or Eastern Harbor",
        price: 900,
      },
    ],
  };

  let selectedOptions2 = [];

  if (tour.city.name === "Marsa Alam") {
    selectedOptions2 = [
      { key: "1", label: "🐬 Dolphin swim at Satayah Reef", price: 750 },
      { key: "2", label: "🤿 Diving at Elphinstone Reef", price: 900 },
      {
        key: "3",
        label: "🏜️ Desert safari with Bedouin dinner and stargazing",
        price: 750,
      },
      {
        key: "4",
        label: "🧂 Visit to natural hot springs or salt lakes",
        price: 900,
      },
    ];
  } else if (tour.city.name === "Sharm El Sheikh") {
    selectedOptions2 = [
      {
        key: "1",
        label: "🤿 Snorkeling or diving at Ras Mohammed or Tiran Island",
        price: 750,
      },
      {
        key: "2",
        label: "🏜️ Desert safari with camel ride and Bedouin show",
        price: 900,
      },
      {
        key: "3",
        label: "🚤 Private yacht cruise with seafood lunch",
        price: 750,
      },
      {
        key: "4",
        label:
          "🎭 Evening entertainment: Tanoura dance, belly dancing, fire show",
        price: 900,
      },
    ];
  }

  const basePrice = parseFloat(tour.price) * nan;
  const selectedOptions = cityOptions[city] || [];
  const extrasFromSelectedOptions = [...selectedOptions, ...selectedOptions2]
    .filter((option) => bookingData[option.key])
    .reduce((total, option) => total + option.price, 0);

  const finalPrice = basePrice + guidePriceTotal + extrasFromSelectedOptions;

  const finalPriceAfterRival = finalPrice * (1 - tour.rival / 100);
  console.log(cityOptions);
  const selectedExtras = [...selectedOptions, ...selectedOptions2].filter(
    (option) => bookingData[option.key] === true
  );
  return (
    <div
      style={{
        width: "100%",
        paddingRight: width <= 600 ? "0px" : "60px",
        paddingLeft: width <= 600 ? "0px" : "60px",
      }}
      className="flex flex-col xl:flex-row justify-center"
    >
      {/* ✅ بطاقة معلومات الرحلة */}
      <div>
        <InformationCard
          tour={tour}
          nan={nan}
          tourGuidePrice={tourGuidePrice}
          guidePriceTotal={guidePriceTotal}
          finalPriceAfterRival={finalPriceAfterRival}
          selectedOptions={cityOptions[city] || []}
          selectedOptions2={selectedOptions2}
          bookingData={bookingData}
          setBookingData={setBookingData}
        />
        {user && (
          <CommentsReviews
            comments={tour.reviews}
            tour={tour.id}
            user={user.id}
            userName={user.name}
          />
        )}
      </div>
      {/* ✅ نموذج الدفع إذا كان المستخدم مسجل الدخول */}
      {user && (
        <PaymentForm
          tour={tour}
          user={user}
          setNan={setNan}
          tourGuidePrice={tourGuidePrice}
          setGuideLanguages={setGuideLanguages}
          setGuidePriceTotal={setGuidePriceTotal}
          selectedOptions={cityOptions[city] || []}
          selectedOptions2={selectedOptions2}
          bookingData={bookingData}
          setBookingData={setBookingData}
          finalPrice={finalPrice}
          finalPriceAfterRival={finalPriceAfterRival}
          selectedExtras={selectedExtras}
          nan={nan}
        />
      )}
      {!user && <RegisterToBuy />}
    </div>
  );
};

export default MainCardSC;
