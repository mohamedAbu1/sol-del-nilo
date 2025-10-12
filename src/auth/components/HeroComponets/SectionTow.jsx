"use client";
import { useTranslations } from "next-intl";
import React, { forwardRef, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SectionTow = forwardRef(() => {
  const t = useTranslations("HomeHeroPage");
  const [cards, setCards] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();

        if (res.ok) {
          setCards(data);
        } else {
          console.error("❌ خطأ في جلب البيانات:", data.error);
        }
      } catch (err) {
        console.error("❌ فشل الاتصال:", err);
      }
    };
    console.log(cards);
    fetchCards();
  }, []);

  return (
    <section
      id="section-two"
      style={{ marginTop: "10px" }}
      className="w-full min-h-screen px-4 py-10 flex flex-col items-center justify-start text-white relative"
    >
      {/* ✅ العنوان */}
      <div className="text-center mb-12 w-full max-w-4xl">
        <div className="h-1 bg-[#daa60b] dark:bg-yellow-500 rounded-full mb-4 w-full" />
        <h2
          style={{ marginBottom: "15px" }}
          className="text-3xl sm:text-4xl font-bold text-[#daa60b] dark:text-yellow-700 tracking-wide uppercase"
        >
          {t("sc1Title")}
        </h2>
      </div>

      {/* ✅ شبكة الكروت المتجاوبة */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full max-w-7xl flex-wrap">
        {cards.map((card, index) => (
          <div
            key={card.id || index}
            className="relative rounded-3xl overflow-hidden shadow-2xl group hover:shadow-yellow-500/40 transition duration-500"
          >
            <Image
              width={400}
              height={200}
              src={card.img ? `/assets/${card.img}` : "/assets/default.png"}
              alt={card.name}
              className="w-full h-[320px] object-cover transform group-hover:scale-110 transition duration-700 ease-in-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t dark:from-black/70 to-transparent z-10" />
            <div className="absolute bottom-6 left-6 z-20">
              <h3
                style={{ fontSize: "20px", marginBottom: "20px" }}
                className="text-white sm:text-3xl font-bold tracking-wide mb-4 drop-shadow-lg"
              >
                {card.name}
              </h3>
              <button
                className="btn-next-section3"
                onClick={() => {
                  const today = new Date().toISOString().split("T")[0];
                  const query = new URLSearchParams({
                    destination: "Luxor",
                    category: card.name,
                    date: today,
                    duration: "5",
                    minPrice: "0",
                    maxPrice: "14000",
                  }).toString();

                  router.push(`/tours?${query}`);
                }}
              >
                View All →
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
});

export default SectionTow;
