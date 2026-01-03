"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useFilterContext } from "./FilterContext";
import { useTripContext } from "./TripContext"; // keeps original tours store if you already have it

const ToursContext = createContext();

export const ToursProvider = ({ children }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { selectedDestinations, selectedCategories, date, priceRange, durationRange, searchText } = useFilterContext();

  // If you already have a global trip store:
  const { tours, setTours } = useTripContext?.() || { tours: [], setTours: () => {} };

  // UI state
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("alphabetical");
  const [currentPage, setCurrentPage] = useState(1);
  const [fadeKey, setFadeKey] = useState(0);

  const itemsPerPageRaw = searchParams.get("itemsPerPage");
  const itemsPerPage = isNaN(parseInt(itemsPerPageRaw))
    ? viewMode === "grid"
      ? 9
      : 10
    : parseInt(itemsPerPageRaw);

  // Fetch tours by query (authoritative source)
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const query = new URLSearchParams({
          destination: selectedDestinations.join(","),
          category: selectedCategories.join(","),
          date,
          minPrice: (priceRange[0] ?? 0).toString(),
          maxPrice: (priceRange[1] ?? 14000).toString(),
          duration: (durationRange[1] ?? 10).toString(),
          search: searchText || "All",
        }).toString();
        const fullURL = `/api/tours${query ? `?${query}` : ""}`;

        const res = await fetch(fullURL, { cache: "no-store" });
        const data = await res.json();

        if (res.ok && Array.isArray(data.tours)) {
          setTours(data.tours);
          setFadeKey((prev) => prev + 1);
        } else {
          setTours([]);
        }
      } catch (err) {
        console.error("Fetch tours failed:", err);
        setTours([]);
      }
    };

    if (pathname === "/tours") {
      fetchTours();
    }
  }, [selectedDestinations, selectedCategories, date, priceRange, durationRange, searchText, pathname]);

  // Filtering
  const filteredTours = useMemo(() => {
    if (!Array.isArray(tours) || tours.length === 0) return [];
    return tours.filter((tour) => {
      const tourCity = (tour.city?.name || tour.city || "").toLowerCase();
      const tourCategory = (tour.category?.name || tour.category || "").toLowerCase();

      const matchesSearch =
        (searchText || "All") === "All" ||
        tour.title?.toLowerCase().includes(searchText.toLowerCase());

      const matchesCity =
        selectedDestinations.length === 0 ||
        selectedDestinations.map((c) => c.toLowerCase()).includes(tourCity);

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.map((c) => c.toLowerCase()).includes(tourCategory);

      return matchesCity && matchesCategory && matchesSearch;
    });
  }, [tours, selectedDestinations, selectedCategories, searchText]);

  // Sorting
  const sortedTours = useMemo(() => {
    const sorted = [...filteredTours];
    if (sortBy === "alphabetical") sorted.sort((a, b) => a.title.localeCompare(b.title));
    else if (sortBy === "price") sorted.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
    else if (sortBy === "duration") sorted.sort((a, b) => (a.TripDuration ?? 0) - (b.TripDuration ?? 0));
    else if (sortBy === "popular") sorted.sort((a, b) => (b.reviews?.length ?? 0) - (a.reviews?.length ?? 0));
    return sorted;
  }, [filteredTours, sortBy]);

  // Pagination
  const visibleTours = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedTours.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedTours, currentPage, itemsPerPage]);

  const handlePageChange = (e, value) => {
    setCurrentPage(value);
    setFadeKey((prev) => prev + 1);
  };

  // Counts
  const cityCounts = useMemo(() => {
    if (!Array.isArray(tours)) return {};
    return tours.reduce((acc, t) => {
      const k = t.city?.name || t.city;
      if (!k) return acc;
      acc[k] = (acc[k] || 0) + 1;
      return acc;
    }, {});
  }, [tours]);

  const categoryCounts = useMemo(() => {
    if (!Array.isArray(tours)) return {};
    return tours.reduce((acc, t) => {
      const k = t.category?.name || t.category;
      if (!k) return acc;
      acc[k] = (acc[k] || 0) + 1;
      return acc;
    }, {});
  }, [tours]);

  return (
    <ToursContext.Provider
      value={{
        // data
        tours, setTours,
        filteredTours,
        sortedTours,
        visibleTours,
        cityCounts,
        categoryCounts,
        // ui
        viewMode, setViewMode,
        sortBy, setSortBy,
        currentPage, setCurrentPage,
        itemsPerPage,
        fadeKey,
        // handlers
        handlePageChange,
      }}
    >
      {children}
    </ToursContext.Provider>
  );
};

export const useToursContext = () => useContext(ToursContext);
