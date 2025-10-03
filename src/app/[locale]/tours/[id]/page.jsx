"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AnimatedPictures from "@/auth/components/HeroToursComponets/id/AnimatedPictures";
import InformationCard from "@/auth/components/HeroToursComponets/id/InformationCard";
import PaymentForm from "@/auth/components/HeroToursComponets/id/PaymentForm";
import Lodaing from "../../lodaing";
import RegisterToBuy from "@/auth/components/HeroToursComponets/id/RegisterToBuy";
import SideDecor from "@/auth/components/SideDecor ";
import RightSideDecor from "@/auth/components/RightSideDecor";
import { supabase } from "../../../../lib/supabaseClient";
import { toast } from "react-toastify";
import { useScreenSize } from "@/auth/hooks/screenSize";

const CardID = () => {
  const [tour, setTour] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { width } = useScreenSize();

  // ✅ جلب بيانات الرحلة
  useEffect(() => {
    const fetchTour = async () => {
      try {
        const { data, error } = await supabase
          .from("tour")
          .select(
            `
    *,
    category(*),
    city(*),
    "tripprogram"(*),
    "includes"(*)
  `
          )
          .eq("id", id)
          .single();
          setTour(data)
        if (error || !data) {
          console.error("❌ فشل في جلب بيانات الرحلة:", error?.message);
          toast.error("❌ الرحلة غير موجودة أو حدث خطأ");
          return;
        }
      } catch (err) {
        console.error("❌ خطأ في الاتصال بـ Supabase:", err.message);
        toast.error("❌ فشل في تحميل بيانات الرحلة");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchTour();
  }, [id]);
  // ✅ جلب بيانات المستخدم من localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser);
  }, []);

  if (loading) return <Lodaing />;
  if (!tour) return <p>الرحلة غير موجودة</p>;

  return (
    <main
      style={{ width: "100vw", paddingBottom: "30px" }}
      className="flex flex-col justify-center dark:bg-[#1a1b1b]"
    >
      <SideDecor />

      {/* ✅ صور متحركة للرحلة */}
      <AnimatedPictures tour={tour} />

      <div
        style={{ width: "100%", paddingRight:width <= 600 ? "0px" :"60px", paddingLeft:width <= 600 ? "0px" :"60px" }}
        className="flex flex-col xl:flex-row justify-center"
      >
        {/* ✅ بطاقة معلومات الرحلة */}
        <InformationCard tour={tour} />

        {/* ✅ نموذج الدفع إذا كان المستخدم مسجل الدخول */}
        {user === "token" ? <PaymentForm tour={tour} /> : <RegisterToBuy />}
      </div>
      <RightSideDecor />
    </main>
  );
};

export default CardID;
