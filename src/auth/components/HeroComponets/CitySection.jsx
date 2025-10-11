"use client";
import { useTranslations } from "next-intl";
import { FaHeart, FaMapMarkerAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // ✅ استيراد router

const CitySection = () => {
  const t = useTranslations("HomeHeroPage");
  const [cities, setCities] = useState([]);
  const router = useRouter(); // ✅ استخدام router

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await fetch("/api/city");
        const data = await res.json();

        if (res.ok) {
          setCities(data);
        } else {
          console.error("❌ خطأ في جلب المدن:", data.error);
        }
      } catch (err) {
        console.error("❌ فشل الاتصال:", err);
      }
    };

    fetchCities();
  }, []);

  return (
    <section
      id="section-three"
      className="w-full min-h-screen py-10 flex flex-col items-center justify-start text-white px-4 sm:py-10 md:py-12 lg:py-0"
    >
      {/* ✅ العنوان */}
      <div className="text-center mb-12 w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-white uppercase tracking-widest mb-2">
          {t("SCTitle")}
        </h2>
        <div className="h-1 bg-[#daa60b] dark:bg-yellow-700 rounded-full mb-4 w-full" />
        <h3 className="text-3xl sm:text-4xl font-bold text-[#daa60b] dark:text-yellow-700 uppercase">
          {t("SCTitle2")}
        </h3>
      </div>

      {/* ✅ شبكة الكروت المتجاوبة */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full max-w-screen-xl">
        {cities.map((city, index) => (
          <div
            key={city.id || index}
            style={{ cursor: "pointer" }}
            onClick={() => {
              const today = new Date().toISOString().split("T")[0];
              const query = new URLSearchParams({
                destination: city.name,
                category: "Wellness & Medical",
                date: today,
                duration: "6",
                minPrice: "10000",
                maxPrice: "14000",
              }).toString();

              router.push(`/tours?${query}`);
            }}
            className="group relative bg-[#fff] dark:bg-neutral-900 rounded-3xl overflow-hidden shadow-xl hover:shadow-yellow-500/40 transition duration-300"
          >
            {/* صورة المدينة */}
            <div className="relative">
              <Image
                width={400}
                height={100}
                src={city.img ? `/assets/${city.img}` : "/assets/default.png"}
                alt={city.name}
                className="w-full h-[350px] object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                style={{ paddingRight: "10px" }}
                className="absolute flex items-center justify-center gap-2.5 top-3 left-3 bg-yellow-500 text-black text-sm font-bold px-3 py-1 rounded-full shadow-md"
              >
                <FaMapMarkerAlt className="text-gray-500 dark:text-gray-800" />
                {city.name}
              </div>
              <button className="absolute top-3 right-3 bg-transparent text-yellow-600 text-xl rounded-full p-2 shadow-md hover:scale-110 transition">
                <FaHeart />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CitySection;
