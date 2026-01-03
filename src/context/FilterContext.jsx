"use client";
import { createContext, useContext, useState, useMemo, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Filters state
  const [selectedDestinations, setSelectedDestinations] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([
    parseInt(searchParams.get("minPrice") || "0"),
    parseInt(searchParams.get("maxPrice") || "14000"),
  ]);
  const [durationRange, setDurationRange] = useState([0, parseInt(searchParams.get("duration") || "10")]);
  const [date, setDate] = useState(searchParams.get("date") || "");
  const [searchText, setSearchText] = useState(searchParams.get("search") || "");

  // Derived from URL for initial hydration
  const cityFromQuery = searchParams.get("destination") || "";
  const categoryFromQuery = searchParams.get("category") || "";

  // Normalize arrays from query
  useEffect(() => {
    if (!cityFromQuery || cityFromQuery.toLowerCase() === "all") {
      // leave as is (another context may set actual cities)
      setSelectedDestinations((prev) => prev.length ? prev : []);
    } else {
      setSelectedDestinations(
        cityFromQuery.split(",").filter(Boolean)
      );
    }

    if (!categoryFromQuery || categoryFromQuery.toLowerCase() === "all") {
      setSelectedCategories((prev) => prev.length ? prev : []);
    } else {
      setSelectedCategories(
        categoryFromQuery.split(",").filter(Boolean)
      );
    }
  }, [cityFromQuery, categoryFromQuery]);

  // Update URL query from current filters
  const updateQueryParams = () => {
    const query = new URLSearchParams({
      destination: selectedDestinations.join(","),
      category: selectedCategories.join(","),
      date,
      duration: durationRange[1].toString(),
      minPrice: priceRange[0].toString(),
      maxPrice: priceRange[1].toString(),
      search: searchText || "All",
    }).toString();

    router.push(`${pathname}?${query}`, { scroll: false });
  };

  // Handlers for toggles
  const handleToggleCity = (cityName, allCities = []) => {
    let updated;
    if (cityName === "ALL") {
      updated = allCities;
    } else {
      updated = selectedDestinations.includes(cityName)
        ? selectedDestinations.filter((d) => d !== cityName)
        : [...selectedDestinations, cityName];
    }
    setSelectedDestinations(updated);
    updateQueryParams();
  };

  const handleToggleCategory = (categoryName, allCategories = []) => {
    let updated;
    if (categoryName === "ALL") {
      updated = allCategories;
    } else {
      updated = selectedCategories.includes(categoryName)
        ? selectedCategories.filter((c) => c !== categoryName)
        : [...selectedCategories, categoryName];
    }
    setSelectedCategories(updated);
    updateQueryParams();
  };

  return (
    <FilterContext.Provider
      value={{
        // state
        selectedDestinations, setSelectedDestinations,
        selectedCategories, setSelectedCategories,
        priceRange, setPriceRange,
        durationRange, setDurationRange,
        date, setDate,
        searchText, setSearchText,
        // query helpers
        updateQueryParams,
        // toggle helpers
        handleToggleCity,
        handleToggleCategory,
        // raw URL inputs
        cityFromQuery,
        categoryFromQuery,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => useContext(FilterContext);
