"use client";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { FaHeart, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MdOutlineReviews } from "react-icons/md";
import { BiDollar } from "react-icons/bi";
import { useTripContext } from "@/context/TripContext";
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
export default function SectionThree() {
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  const { tours, setTours } = useTripContext();
  const t = useTranslations("HomeHeroPage");
  const router = useRouter();
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  useEffect(() => {
    // ✅ فلترة الرحلات التي تحتوي على reviews
    const toursWithReviews = tours.filter(
      (tour) => Array.isArray(tour.reviews) && tour.reviews.length > 0
    );

    // ✅ ترتيب الرحلات حسب عدد التقييمات وأخذ أول 8 فقط
    const sortedTours = toursWithReviews
      .sort((a, b) => b.reviews.length - a.reviews.length)
      .slice(0, 8); // ✅ عرض أول 8 فقط

    setTours(sortedTours);
  }, []);
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  return (
    <section
      id="section-three"
      className="w-full min-h-screen py-10 flex flex-col items-center justify-start text-white px-4 sm:py-10 md:py-12 lg:py-0"
    >
      {/* ✅ العنوان */}
      <div className="text-center mb-12 w-full max-w-4xl">
        <h2
          style={{ marginBottom: "10px", marginTop: "15px" }}
          className="text-2xl font-bold text-white uppercase tracking-widest mb-2"
        >
          {t("sc2P")}
        </h2>
        <div className="h-1 bg-[#daa60b] dark:bg-yellow-700 rounded-full mb-4 w-full" />
        <h3
          style={{ marginBottom: "15px" }}
          className="text-3xl sm:text-4xl font-bold text-[#daa60b] dark:text-yellow-700 uppercase"
        >
          {t("sc2Title")}
        </h3>
      </div>

      {/* ✅ شبكة الكروت المتجاوبة */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full max-w-screen-xl">
        {tours.map((tour, index) => (
          <div
            key={index}
            className="group relative bg-[#fff] dark:bg-neutral-900 rounded-3xl overflow-hidden shadow-xl hover:shadow-yellow-500/40 transition duration-300"
          >
            {/* صورة الجولة */}
            <div className="relative">
              <Image
                width={400}
                height={200}
                src={
                  tour.image?.[0]?.name
                    ? `/assets/${tour.image?.[0]?.name}`
                    : "/assets/default.jpg"
                }
                alt={tour.title}
                loading="eager"
                className="w-full h-[320px] object-cover transform group-hover:scale-110 transition duration-700 ease-in-out"
              />
              <div
                style={{ padding: "8px" }}
                className="absolute top-3 left-3 bg-yellow-500 text-gray-700 text-sm font-bold px-3 py-1 rounded-full shadow-md flex items-center justify-between"
              >
                <BiDollar
                  style={{ marginRight: "5px" }}
                  className="text-gray-500 dark:text-gray-700"
                />
                {tour.price}
              </div>
              <button
                style={{ padding: "5px" }}
                className="absolute top-3 right-3 bg-transparent text-yellow-600 text-xl rounded-full p-2 shadow-md hover:scale-110 transition"
              >
                <FaHeart />
              </button>
            </div>

            {/* تفاصيل الجولة */}
            <div className="p-5 flex flex-col justify-between h-[150px]">
              <div className="p-2 rounded-md h-9/12">
                <div className="flex w-ful items-center justify-between">
                  {" "}
                  <p
                    style={{ padding: "10px" }}
                    className="text-sm text-yellow-300 mb-1 flex items-center gap-2"
                  >
                    <FaMapMarkerAlt className="text-gray-500 dark:text-yellow-600" />
                    <span className="text-gray-500 dark:text-yellow-400">
                      {tour.city.name}
                    </span>
                  </p>
                  <p
                    style={{ padding: "10px" }}
                    className="text-md mb-1 flex items-center gap-2"
                  >
                    <MdOutlineReviews className="text-gray-500 dark:text-yellow-600" />
                    <span className="text-gray-500 dark:text-yellow-400">
                      Reviews {tour.reviews.length}
                    </span>
                  </p>
                </div>
                <h4
                  className="text-base lg:text-sm font-semibold text-gray-400 dark:text-white leading-snug mb-3 line-clamp-2"
                  style={{ padding: "10px", fontSize: "16px" }}
                >
                  {tour.title}
                </h4>
              </div>

              <div
                style={{
                  marginBottom: "10px",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                }}
                className="flex items-center justify-between text-sm text-yellow-200 px-3 py-2 rounded-md h-3/12"
              >
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="text-gray-500 dark:text-gray-500" />
                  <span className="text-gray-500 dark:text-gray-500">
                    {tour.theDate}
                  </span>
                </div>
                <button
                  style={{ padding: "5px", cursor:"pointer" }}
                  onClick={() => router.push(`/tours/${tour.id}`)}
                  className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-100 dark:text-gray-800 font-semibold rounded-full shadow hover:scale-105 transition text-sm lg:text-base"
                >
                  Details →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
