import { useTranslations } from "next-intl";
import React from "react";
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

const SectionFive = () => {
      const t = useTranslations("HomeHeroPage");
  
  const tours = [
    {
      location: "Luxor",
      title:
        "Intercity Transfers from Luxor to (Aswan, Hurghada, Cairo, Marsa Alam)",
      description:
        "Your Trusted Partner for Safe & Smooth Inter City Transfer.",
      duration: "1 Day",
      price: "$165",
      image: "/assets/Copilot_20251003_105620.png",
    },
    {
      location: "Luxor",
      title: "5 Days / 4 Nights Nile Cruise from Luxor to Aswan",
      description:
        "Sail the Nile in style from Luxor to Aswan aboard a 5* cruise.",
      duration: "5 Days",
      price: "$580",
      image: "/assets/Copilot_20251003_114530.png",
    },
    {
      location: "Aswan",
      title: "4 Days / 3 Nights Nile Cruise from Aswan to Luxor",
      description:
        "Enjoy an unforgettable 4-day Nile Cruise from Aswan to Luxor.",
      duration: "4 Days",
      price: "$480",
      image: "/assets/Abu_Simbel.jpg",
    },
  ];

  return (
    <section
      id="section-five"
      className="relative w-full min-h-screen px-4 sm:py-10 md:py-12 lg:py-0 overflow-hidden flex flex-col items-center"
    >
      {/* العنوان */}
      <div className="text-center mb-12">
        <span style={{marginBottom:"10px"}} className="inline-block text-3xl text-gray-400 dark:text-white  font-semibold px-3 py-1 rounded-full mb-3">
           {t("sc3P")}
        </span>
        <h2 style={{marginBottom:"15px"}} className="text-3xl lg:text-4xl font-bold text-[#daa60b] dark:text-yellow-700 uppercase">
         {t("sc3P")}
        </h2>
      </div>

      {/* ✅ شبكة الكروت المتجاوبة */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-screen-xl">
        {tours.map((tour, index) => (
          <div
            key={index}
            style={{height:"700px"}}
            className="bg-[#ffffff] dark:bg-neutral-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-yellow-500/40 transition duration-300 flex flex-col"
          >
            {/* الصورة */}
            <div className="relative h-full">
              <img
                src={tour.image}
                alt={tour.title}
                className="w-full h-[100%] object-cover"
              />
              <div style={{padding:"10px"}} className="absolute top-3 left-3 bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                <FaMapMarkerAlt className="text-black text-sm" />
                <span style={{fontSize:"14px"}}>{tour.location}</span>
              </div>
            </div>

            {/* التفاصيل */}
            <div style={{padding:"10px"}} className="h-1/2 p-5 flex flex-col justify-between flex-grow">
              <h3 className="text-lg font-bold text-gray-600 dark:text-gray-200 mb-2">
                {tour.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-300 mb-4">{tour.description}</p>
              <div className="flex items-center justify-between text-sm text-gray-200  mt-auto">
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="text-gray-400 dark:text-yellow-400" />
                  <span className="text-gray-400 dark:text-yellow-400">{tour.duration}</span>
                </div>
                <div className="font-bold text-gray-400 dark:text-white">{tour.price}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* زر اكتشف الكل
      <div className="text-center mt-12">
        <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition">
          DISCOVER ALL →
        </button>
      </div> */}

    </section>
  );
};

export default SectionFive;
