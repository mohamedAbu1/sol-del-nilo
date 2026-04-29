"use client";
import React, { useState, useEffect } from "react";
import TripsFilter from "@/auth/components/trips/TripsFilter";
import TripsSearch from "@/auth/components/trips/TripsSearch";
import TripsGrid from "@/auth/components/trips/TripsGrid";
import Header from "@/auth/components/header/Header";
import Footer from "@/components/layout/FooterSection";
import EgyptianBackground from "@/components/layout/EgyptianBackground";
import LoginModal from "@/auth/components/home/components/LoginModal";
import SignUpButton from "@/auth/components/home/components/SignUpButton";
import { motion } from "framer-motion";
import ChatWidget from "@/components/layout/ChatWidget";
import { useAuth } from "@/context/AuthContext";
import Head from "next/head";
import { useLanguage } from "@/context/LanguageContext";
import { tripsMetadata } from "@/lib/metadata/trips";
import { useTrip } from "@/context/TripContext";
import { useQueryFilters } from "@/context/QueryContext";
import { useCitiesCategories } from "@/context/CitiesCategoriesContext";
import { useSearchParams } from "next/navigation";

export default function TripsPage() {
  const { lang } = useLanguage();
  const meta = tripsMetadata[lang] || tripsMetadata.en;
  const { user } = useAuth();
  const { trips, fetchTrips } = useTrip();
  const { queryFilters } = useQueryFilters();

  // جلب المدن والفئات من الـ context
  const { cities: allCities = [], category: allCategories = [] } = useCitiesCategories();

  const searchParams = useSearchParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [cardStyle, setCardStyle] = useState("vertical");
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    city: "",
    category: "",
    price: "",
    popular: false,
  });

  // قراءة الكويري وتخزينه في الفلاتر
useEffect(() => {
  const dataParam = searchParams.get("data"); // خزن القيمة مرة واحدة
  if (!dataParam) return;

  try {
    const decoded = JSON.parse(atob(dataParam));

    let cityId = "";
    if (decoded.city?.[0]) {
      const cityObj = allCities.find(
        (c) =>
          c.name?.[lang]?.toLowerCase() === decoded.city[0].toLowerCase() ||
          c.name?.en?.toLowerCase() === decoded.city[0].toLowerCase()
      );
      cityId = cityObj?.id || decoded.city[0];
    }

    let categoryId = "";
    if (decoded.category?.[0]) {
      const catObj = allCategories.find(
        (c) =>
          c.name?.[lang]?.toLowerCase() === decoded.category[0].toLowerCase() ||
          c.name?.en?.toLowerCase() === decoded.category[0].toLowerCase()
      );
      categoryId = catObj?.id || decoded.category[0];
    }

    setFilters({
      city: cityId,
      category: categoryId,
      price: decoded.price || "",
      popular: decoded.popular || false,
    });
  } catch (err) {
    console.error("❌ Error decoding query:", err);
  }
}, [allCities, allCategories, lang]); // لاحظ إننا شلنا searchParams

  useEffect(() => {
    fetchTrips();
  }, []);



  const activeFilters = {
    ...filters,
    ...queryFilters,
  };

  // فلترة الرحلات
  const filteredTrips = trips.filter((trip) => {
    const matchesCity = activeFilters.city
      ? trip.trip_cities?.some((c) => {
          const cityName = c.cities?.name?.[lang] || c.cities?.name?.en || "";
          return (
            c.city_id === activeFilters.city ||
            cityName.toLowerCase() === activeFilters.city.toLowerCase()
          );
        })
      : true;

    const matchesCategory = activeFilters.category
      ? trip.trip_categories?.some((cat) => {
          const catObj = allCategories?.find((c) => c.id === cat.category_id);
          const catName = catObj?.name?.[lang] || catObj?.name?.en || "";
          return (
            cat.category_id === activeFilters.category ||
            catName.toLowerCase() === activeFilters.category.toLowerCase()
          );
        })
      : true;

    const matchesPrice = activeFilters.price
      ? trip.priceLevel?.toLowerCase() === activeFilters.price.toLowerCase()
      : true;

    const matchesPopular = activeFilters.popular ? trip.popular : true;

    return matchesCity && matchesCategory && matchesPrice && matchesPopular;
  });

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

        <motion.section
          style={{ marginTop: "105px", paddingBottom: "20px" }}
          className="container flex flex-1 gap-6 px-6 relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeUp} className="hidden lg:flex w-1/4">
            <TripsFilter filters={filters} setFilters={setFilters} />
          </motion.div>

          <motion.div variants={fadeUp} className="flex-1 flex flex-col gap-6">
            <TripsSearch
              filters={filters}
              setFilters={setFilters}
              search={search}
              setSearch={setSearch}
              cardStyle={cardStyle}
              setCardStyle={setCardStyle}
            />

            <TripsGrid
              trips={filteredTrips}
              cardStyle={cardStyle}
              search={search}
              filters={filters}
            />
          </motion.div>
        </motion.section>

        <Footer />
        <SignUpButton />
        <LoginModal />
        {user && <ChatWidget />}
      </main>
    </>
  );
}
