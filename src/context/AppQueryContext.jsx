"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useTripContext } from "./TripContext";
import { useMemo } from "react";
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

const AppQueryContext = createContext();
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

export const AppQueryContextProvider = ({ children }) => {
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  const searchParams = useSearchParams();
  const router = useRouter();
  const { tours, setTours } = useTripContext();
  const pathname = usePathname();
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  const [openDrawer, setOpenDrawer] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [fadeKey, setFadeKey] = useState(0);
  const [sortBy, setSortBy] = useState("alphabetical");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDestinationId, setSelectedDestinationId] =
    useState("Sharm El Sheikh");
  const [duration, setDuration] = useState(5);
  // const [date, setDate] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  const itemsPerPageRaw = searchParams.get("itemsPerPage");
  const itemsPerPage = isNaN(parseInt(itemsPerPageRaw))
    ? viewMode === "grid"
      ? 9
      : 10
    : parseInt(itemsPerPageRaw); // ✅ استخراج القيم من الكويري

  const cityFromQuery = searchParams.get("destination") || "";
  const categoryFromQuery = searchParams.get("category") || "";

  const date = searchParams.get("date") || "";
  const minPrice = parseInt(searchParams.get("minPrice") || "0");
  const maxPrice = parseInt(searchParams.get("maxPrice") || "14000");
  const Nights = parseInt(searchParams.get("duration") || "0");
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  const [expanded, setExpanded] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState(true);
  const [selectedDestinations, setSelectedDestinations] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

  const cities = useMemo(() => {
    return Array.from(
      new Set(tours.map((t) => t.city?.name || t.city).filter(Boolean))
    );
  }, [tours]);
  const categories = useMemo(() => {
    return Array.from(
      new Set(tours.map((t) => t.category?.name || t.category).filter(Boolean))
    );
  }, [tours]);

  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

  // ✅ حالات الفلاتر
  useEffect(() => {
    if (tours.length === 0) return;

    const allCities = Array.from(
      new Set(tours.map((t) => t.city?.name || t.city).filter(Boolean))
    );
    const allCategories = Array.from(
      new Set(tours.map((t) => t.category?.name || t.category).filter(Boolean))
    );

    // ✅ المدينة
    if (!cityFromQuery || cityFromQuery.toLowerCase() === "all") {
      setSelectedDestinations(allCities);
    } else {
      const filteredCities = cityFromQuery
        .split(",")
        .filter((c) =>
          allCities.map((x) => x.toLowerCase()).includes(c.toLowerCase())
        );
      setSelectedDestinations(filteredCities);
    }

    // ✅ الفئة
    if (!categoryFromQuery || categoryFromQuery.toLowerCase() === "all") {
      setSelectedCategories(
        categories.map((c) => (typeof c === "string" ? c : c.name))
      );
    } else {
      const filteredCategories = categoryFromQuery
        .split(",")
        .filter((c) =>
          categories
            .map((x) => (typeof x === "string" ? x : x.name).toLowerCase())
            .includes(c.toLowerCase())
        );
      setSelectedCategories(filteredCategories);
    }
  }, [tours, cityFromQuery, categoryFromQuery]);

  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);
  const [durationRange, setDurationRange] = useState([0, Nights || 10]);

  const [anchorElPrice, setAnchorElPrice] = useState(null);
  const [anchorElDuration, setAnchorElDuration] = useState(null);
  const openPrice = Boolean(anchorElPrice);
  const openDuration = Boolean(anchorElDuration);
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  const [searchText, setSearchText] = useState("All");

  // ✅ تحديث الكويري
  const updateQueryParams = () => {
    const query = new URLSearchParams({
      destination: selectedDestinations.join(","),
      category: selectedCategories.join(","),
      date,
      duration: durationRange[1].toString(),
      minPrice: priceRange[0].toString(),
      maxPrice: priceRange[1].toString(),
      search: searchText,
    }).toString();

    router.push(`${pathname}?${query}`);
  };
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const query = new URLSearchParams({
          destination: cityFromQuery,
          category: categoryFromQuery,
          date,
          minPrice: minPrice.toString(),
          maxPrice: maxPrice.toString(),
          search: searchParams.get("search") || "All",
        }).toString();

        const fullURL = `/api/tours${query ? `?${query}` : ""}`;

        const res = await fetch(fullURL);
        const data = await res.json();

        if (res.ok && Array.isArray(data.tours)) {
          setTours(data.tours);
          setFadeKey((prev) => prev + 1);
        } else {
          console.warn("⚠️ لا توجد رحلات أو خطأ في الاستجابة");
          setTours([]); // تأكيد أن الحالة لا تبقى undefined
        }
      } catch (err) {
        console.error("❌ فشل الاتصال:", err);
        setTours([]); // في حالة الخطأ، اجعلها فارغة
      }
    };

    if (pathname === "/tours") {
      fetchTours();
    }
  }, [cityFromQuery, categoryFromQuery, date, minPrice, maxPrice, pathname]);

  useEffect(() => {
    if (
      pathname === "/tours" &&
      tours.length > 0 &&
      selectedDestinations.length > 0 &&
      selectedCategories.length > 0
    ) {
      updateQueryParams();
    }
  }, [
    selectedDestinations,
    selectedCategories,
    date,
    durationRange,
    priceRange,
    tours,
  ]);
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  // useEffect(() => {
  //   const params = new URLSearchParams(window.location.search);
  //   params.set("search", searchText);
  //   const newUrl = `${pathname}?${params.toString()}`;
  //   window.history.replaceState({}, "", newUrl);
  // }, [searchText]);
  const handlePageChange = (e, value) => {
    setCurrentPage(value);
    setFadeKey((prev) => prev + 1);
  };
  const filteredTours = useMemo(() => {
    if (tours.length === 0) return [];
    return tours.filter((tour) => {
      const tourCity = (tour.city?.name || tour.city || "").toLowerCase();
      const tourCategory = (
        tour.category?.name ||
        tour.category ||
        ""
      ).toLowerCase();
      const matchesSearch =
        searchText === "All" ||
        tour.title.toLowerCase().includes(searchText.toLowerCase());
      const matchesCity =
        selectedDestinations.length === 0 ||
        selectedDestinations.map((c) => c.toLowerCase()).includes(tourCity);

      const matchesCategory =
        Array.isArray(selectedCategories) &&
        selectedCategories.map((c) => c.toLowerCase()).includes(tourCategory);

      return matchesCity && matchesCategory && matchesSearch;
    });
  }, [tours, selectedDestinations, selectedCategories, searchText]);
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  // ترتيب النتائج
  const sortedTours = useMemo(() => {
    let sorted = [...filteredTours];
    if (sortBy === "alphabetical") {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "price") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortBy === "duration") {
      sorted.sort((a, b) => a.TripDuration - b.TripDuration);
    } else if (sortBy === "popular") {
      sorted.sort((a, b) => b.reviews.length - a.reviews.length);
    }
    return sorted;
  }, [filteredTours, sortBy]);

  const visibleTours = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedTours.slice(startIndex, endIndex);
  }, [sortedTours, currentPage, itemsPerPage]);

  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  // ✅ التعامل مع الفلاتر
  const handleToggle = (cityName) => {
    const cityHasTours = tours.some((t) => {
      const tourCity = (t.city?.name || t.city || "").toLowerCase();
      return tourCity === cityName.toLowerCase();
    });

    if (!cityHasTours) {
      return;
    }

    let updated;

    if (cityName === "ALL") {
      updated = cities;
    } else {
      updated = selectedDestinations.includes(cityName)
        ? selectedDestinations.filter((d) => d !== cityName)
        : [...selectedDestinations, cityName];
    }

    setSelectedDestinations(updated);

    const queryParams = new URLSearchParams();
    if (updated.length > 0) queryParams.set("destination", updated.join(","));
    if (selectedCategories.length > 0)
      queryParams.set("category", selectedCategories.join(","));
    if (date) queryParams.set("date", date);
    if (durationRange[1])
      queryParams.set("duration", durationRange[1].toString());
    queryParams.set("minPrice", priceRange[0].toString());
    queryParams.set("maxPrice", priceRange[1].toString());

    router.push(`/tours?${queryParams.toString()}`, { scroll: false });
  };

  const handleToggleCategories = (categoryName) => {
    let updated;

    if (categoryName === "ALL") {
      updated = categories.map((card) => card.name); // ✅ كل الفئات
    } else {
      updated = selectedCategories.includes(categoryName)
        ? selectedCategories.filter((c) => c !== categoryName)
        : [...selectedCategories, categoryName];
    }

    setSelectedCategories(updated);

    const query = new URLSearchParams({
      destination: selectedDestinations.join(","),
      category: updated.join(","),
      date,
      duration: durationRange[1].toString(),
      minPrice: priceRange[0].toString(),
      maxPrice: priceRange[1].toString(),
    }).toString();

    router.push(`/tours?${query}`);
  };

  const handlePriceClick = (e) => setAnchorElPrice(e.currentTarget);
  const handlePriceClose = () => {
    setAnchorElPrice(null);
    updateQueryParams();
  };

  const handleDurationClick = (e) => setAnchorElDuration(e.currentTarget);
  const handleDurationClose = () => {
    setAnchorElDuration(null);
    updateQueryParams();
  };

  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  const cityCounts = tours.reduce((acc, city) => {
    acc[city.city.name] = (acc[city.city.name] || 0) + 1;
    return acc;
  }, {});
  const categoryCounts = tours.reduce((acc, city) => {
    acc[city.category.name] = (acc[city.category.name] || 0) + 1;
    return acc;
  }, {});
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  const selectedCity = selectedDestinations[0] || cityFromQuery || "";

  const selectedType = selectedCategories[0] || categoryFromQuery || "";
  useEffect(() => {
    if (categories.length > 0 && !selectedCategories) {
      setSelectedCategories(categories[5].name);
    }
  }, [categories, selectedCategories]);
  return (
    <AppQueryContext.Provider
      value={{
        expanded,
        setExpanded,
        expandedCategories,
        setExpandedCategories,
        selectedDestinations,
        setSelectedDestinations,
        selectedCategories,
        setSelectedCategories,
        priceRange,
        setPriceRange,
        durationRange,
        setDurationRange,
        openPrice,
        openDuration,
        setAnchorElPrice,
        setAnchorElDuration,
        updateQueryParams,
        anchorElDuration,
        handleToggle,
        handleToggleCategories,
        handlePriceClick,
        handlePriceClose,
        handleDurationClick,
        anchorElPrice,
        setAnchorElPrice,
        handleDurationClose,
        cityCounts,
        categoryCounts,
        visibleTours,
        handlePageChange,
        setViewMode,
        viewMode,
        setOpenDrawer,
        openDrawer,
        setSortBy,
        sortBy,
        sortedTours,
        setCurrentPage,
        currentPage,
        setSearchText,
        itemsPerPage,
        searchText,
        setDuration,
        selectedCity,
        selectedType,
        duration,
        date,
        selectedDestinationId,
        selectedCategory,
        setSelectedCategory,
        setSelectedDestinationId,
        cityFromQuery,
        categoryFromQuery,
        minPrice,
        maxPrice,
        Nights,
      }}
    >
      {children}
    </AppQueryContext.Provider>
  );
};

export const useAppQueryContext = () => useContext(AppQueryContext);
