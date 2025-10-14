"use client";
import { useEffect, useState } from "react";
import { Drawer, Box, Pagination, Typography } from "@mui/material";
import SearchAndControls from "./SearchAndControls";
import DailyTourCard from "./DailyTourCard ";
import SidebarFiltersMB from "./SidebarFiltersMB";
import { useSearchParams, usePathname } from "next/navigation";
const TourListings = ({ theme }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [viewMode, setViewMode] = useState("list");
  const [currentPage, setCurrentPage] = useState(1);
  const [fadeKey, setFadeKey] = useState(0);
  const [allTours, setAllTours] = useState([]);
  const [sortBy, setSortBy] = useState("alphabetical");
  const itemsPerPage = 6;
const pathname = usePathname();
  const searchParams = useSearchParams();
  const destination = searchParams.get("destination")?.split(",") || [];
  const category = searchParams.get("category")?.split(",") || [];
  const date = searchParams.get("date") || "";
  const minPrice = searchParams.get("minPrice") || "0";
  const maxPrice = searchParams.get("maxPrice") || "14000";
  const duration = searchParams.get("duration") || "";
  const search = searchParams.get("search") || "All";
    const [searchText, setSearchText] = useState(search);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set("search", searchText);
    const newUrl = `${pathname}?${params.toString()}`;
    window.history.replaceState({}, "", newUrl);
  }, [searchText]);
  const handlePageChange = (e, value) => {
    setCurrentPage(value);
    setFadeKey((prev) => prev + 1);
  };

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const query = new URLSearchParams({
          destination: params.get("destination") || "",
          category: params.get("category") || "",
          date: params.get("date") || "",
          minPrice: params.get("minPrice") || "0",
          maxPrice: params.get("maxPrice") || "14000",
          // search: params.get("search") || "All",
        }).toString();

        const res = await fetch(`/api/tours${query ? `?${query}` : ""}`);
        const data = await res.json();

        if (res.ok) {
          setAllTours(data.tours || []);
          setFadeKey((prev) => prev + 1);
        } else {
          console.error("❌ خطأ في جلب الرحلات:", data.error);
        }
      } catch (err) {
        console.error("❌ فشل الاتصال:", err);
      }
    };

    fetchTours();
  }, [searchParams.toString()]);

  // console.log("📦 allTours:", allTours);

  const filteredTours = allTours.filter((tour, index) => {
    const tourCategory = (tour.category?.name || tour.category || "")
      .trim()
      .toLowerCase();
    const tourCity = (tour.city?.name || tour.city || "").trim().toLowerCase();
    const tourPrice = parseFloat(tour.price);
    const tourDuration = parseInt(tour.TripDuration);

    // فلترة متعددة التصنيفات
    const matchesCategory =
      category.length === 0 ||
      category.some((cat) => tourCategory === cat.trim().toLowerCase());

    // فلترة متعددة الوجهات
    const matchesDestination =
      destination.length === 0 ||
      destination.some((d) => tourCity === d.trim().toLowerCase());

    // فلترة السعر بين minPrice و maxPrice
    const matchesPrice =
      !isNaN(tourPrice) &&
      tourPrice >= parseFloat(minPrice) &&
      tourPrice <= parseFloat(maxPrice);

    // فلترة التاريخ (مرنة)
    const matchesDate =
      date === "" || (tour.date ? tour.date.startsWith(date) : true);

    // فلترة المدة بين minDuration و maxDuration
    const minDuration = parseInt(searchParams.get("minDuration") || "0");
    const maxDuration = parseInt(searchParams.get("maxDuration") || "60"); // قيمة افتراضية كبيرة

    const matchesDuration =
      !isNaN(tourDuration) &&
      tourDuration >= minDuration &&
      tourDuration <= maxDuration;

const matchesSearch =
  searchText === "All" ||
  tour.title.toLowerCase().includes(searchText.toLowerCase()) ||
  tour.description?.toLowerCase().includes(searchText.toLowerCase());
    // طباعة للتتبع
    console.log(`🎯 Tour ${index + 1}:`, {
      title: tour.title,
      category: tourCategory,
      city: tourCity,
      price: tour.price,
      date: tour.date,
      TripDuration: tour.TripDuration,
      matchesCategory,
      matchesDestination,
      matchesPrice,
      matchesDate,
      matchesDuration,
    });

    return (
      matchesCategory &&
      matchesDestination &&
      matchesPrice &&
      matchesDate &&
      matchesDuration &&
      matchesSearch
    );
  });

  // console.log("✅ filteredTours:", filteredTours);

  let sortedTours = [...filteredTours];
  if (sortBy === "alphabetical") {
    sortedTours.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortBy === "price") {
    sortedTours.sort((a, b) => a.price - b.price);
  } else if (sortBy === "duration") {
    sortedTours.sort((a, b) => a.TripDuration - b.TripDuration);
  } else if (sortBy === "popular") {
    sortedTours.sort((a, b) => b.reviews.length - a.reviews.length);
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleTours = sortedTours.slice(startIndex, endIndex);
  return (
    <>
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        PaperProps={{
          sx: {
            backgroundColor: theme === "dark" ? "#212121" : "#fff",
            color: "#fff",
            width: "80%",
            padding: 2,
          },
        }}
      >
        <SidebarFiltersMB theme={theme} />
      </Drawer>

      <main
        className="w-full flex flex-col"
        style={{
          backgroundColor: theme === "dark" ? "#121212" : "#f9f9f9",
          minHeight: "100vh",
          transition: "background-color 0.4s ease",
        }}
      >
        <SearchAndControls
          onOpenFilters={() => setOpenDrawer(true)}
          viewMode={viewMode}
          setViewMode={setViewMode}
          theme={theme}
          sortBy={sortBy}
          setSortBy={setSortBy}
          searchText={searchText}
          setSearchText={setSearchText}
        />

        <Box
          key={fadeKey}
          sx={{
            px: { xs: 2, sm: 4 },
            pb: 4,
            width: "100%",
            display: "flex",
            flexDirection: viewMode === "list" ? "column" : "row",
            flexWrap: viewMode === "grid" ? "wrap" : "nowrap",
            gap: 3,
            justifyContent: viewMode === "grid" ? "center" : "flex-start",
            animation: "fadeIn 0.5s ease-in-out",
          }}
        >
          {visibleTours.length > 0 ? (
            visibleTours.map((tour) => (
              <DailyTourCard
                key={tour.id}
                tour={tour}
                themee={theme}
                viewMode={viewMode}
              />
            ))
          ) : (
            <Typography sx={{ px: 4, py: 2, color: "#999" }}>
              There are no flights matching the current filters.
            </Typography>
          )}
        </Box>

        <Pagination
          count={Math.ceil(sortedTours.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
          size="medium"
          sx={{
            alignSelf: "center",
            mb: 4,
            "& .MuiPaginationItem-root": {
              fontWeight: 600,
              borderRadius: "12px",
              border: `1px solid ${theme === "dark" ? "#444" : "#ccc"}`,
              color: theme === "dark" ? "#eee" : "#333",
              backgroundColor: theme === "dark" ? "#1e1e1e" : "#fff",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: theme === "dark" ? "#333" : "#f0f0f0",
              },
              "&.Mui-selected": {
                backgroundColor: theme === "dark" ? "#ffb300" : "#ffc107",
                color: theme === "dark" ? "#212121" : "#fff",
                borderColor: theme === "dark" ? "#ffb300" : "#ffc107",
                boxShadow:
                  theme === "dark"
                    ? "0 0 10px rgba(255,179,0,0.4)"
                    : "0 0 10px rgba(255,193,7,0.4)",
              },
            },
          }}
        />
      </main>
    </>
  );
};

export default TourListings;
