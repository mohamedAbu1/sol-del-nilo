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
          setNan={setNan}
          tourGuidePrice={tourGuidePrice}
          setGuideLanguages={setGuideLanguages}
          setGuidePriceTotal={setGuidePriceTotal} // ✅ هذا هو المطلوب
        />
      )}
      {!user && <RegisterToBuy />}
    </div>
  );
};

export default MainCardSC;
