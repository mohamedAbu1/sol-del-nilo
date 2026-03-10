/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/purity */
"use client";
import React, { useState } from "react";
import TripsFilter from "@/auth/components/trips/TripsFilter";
import TripsSearch from "@/auth/components/trips/TripsSearch";
import TripsGrid from "@/auth/components/trips/TripsGrid";
import Header from "@/auth/components/header/Header";
import Footer from "@/components/layout/FooterSection";
import EgyptianBackground from "@/components/layout/EgyptianBackground";
// import LoginModal from "@/components/home/components/LoginModal";
// import SignUpButton from "@/components/home/components/SignUpButton";
import { motion } from "framer-motion";
import ChatWidget from "@/components/layout/ChatWidget";
import { useAuth } from "@/context/AuthContext";
import Head from "next/head";
import { useLanguage } from "@/context/LanguageContext";
import { tripsMetadata } from "@/lib/metadata/trips";
import MobileTripsFilter from "@/auth/components/trips/MobileTripsFilter";
import {trips} from "@/constants/api"
export default function TripsPage() {

  const { lang } = useLanguage();
  const meta = tripsMetadata[lang] || tripsMetadata.en;
  const { user } = useAuth();

  const [currentPage, setCurrentPage] = useState(1);
  const [cardStyle, setCardStyle] = useState("vertical");
  const tripsPerPage = 9; // ✅ ثابت: 9 رحلات في كل صفحة
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    city: "",
    category: "",
    price: "",
    popular: false,
  });

  // ✅ فلترة الرحلات
// ✅ فلترة الرحلات باستخدام IDs
const filteredTrips = trips.filter((trip) => {
    const lowerSearch = search.trim().toLowerCase();

    const matchesSearch =
      !lowerSearch ||
      (trip.title && trip.title.toLowerCase().includes(lowerSearch)) ||
      (trip.cityName && trip.cityName.toLowerCase().includes(lowerSearch)) ||
      (trip.categoryName && trip.categoryName.toLowerCase().includes(lowerSearch));

    const matchesCity = filters.city ? trip.cityId === filters.city : true;
    const matchesCategory = filters.category ? trip.categoryId === filters.category : true;
    const matchesPrice = filters.price ? trip.price <= parseInt(filters.price) : true;
    const matchesPopular = filters.popular ? trip.popular : true;

    return matchesSearch && matchesCity && matchesCategory && matchesPrice && matchesPopular;
  });

  // ✅ الباجينيشن
  const indexOfLastTrip = currentPage * tripsPerPage;
  const indexOfFirstTrip = indexOfLastTrip - tripsPerPage;
  const currentTrips = filteredTrips.slice(indexOfFirstTrip, indexOfLastTrip);
  const totalPages = Math.ceil(filteredTrips.length / tripsPerPage);
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.keywords} />
      </Head>
      <main className="relative flex flex-col min-h-screen justify-center items-center pt-9">
        <EgyptianBackground />
        <Header />

        {/* المحتوى الرئيسي */}
        <motion.section
          style={{ marginTop: "105px", paddingBottom: "20px" }}
          className="container flex flex-1 gap-6 px-6 relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          {/* الفلتر */}
          <motion.div variants={fadeUp} className=" hidden lg:flex w-1/4">
            <TripsFilter filters={filters} setFilters={setFilters} />
          </motion.div>

          {/* البحث + الرحلات */}
          <motion.div variants={fadeUp} className="flex-1 flex flex-col gap-6">
            <TripsSearch
              filters={filters}
              setFilters={setFilters}
              search={search}
              setSearch={setSearch}
              cardStyle={cardStyle}
              setCardStyle={setCardStyle}
            />
            <MobileTripsFilter filters={filters} setFilters={setFilters} />

            <TripsGrid
              trips={currentTrips}
              cardStyle={cardStyle}
              search={search}
            />

            {/* الباجينيشن */}
            {totalPages && (
              <motion.div
                variants={fadeUp}
                className="flex justify-center gap-2 mt-4"
              >
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1 rounded-lg font-bold transition ${
                      currentPage === i + 1
                        ? "bg-[#FF9800] text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </motion.div>
            )}
          </motion.div>
        </motion.section>

        <Footer />
        {/* <SignUpButton />
        <LoginModal /> */}
        {user && <ChatWidget />}
      </main>
    </>
  );
}
