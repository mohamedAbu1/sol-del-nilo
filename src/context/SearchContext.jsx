// context/SearchContext.js
"use client";
import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  // ✅ بيانات المدن والكاتجري (ممكن تجيبها من DB مرة واحدة)
  const [cities] = useState([
    "Luxor",
    "Aswan",
    "Cairo",
    "Giza",
    "Hurghada",
    "Alexandria",
    "Sharm El Sheikh",
  ]);
  const [categories] = useState([
    "Adventure",
    "Luxury",
    "Options Tours",
    "Family",
    "Historical",
    "Safari",
  ]);

  // ✅ فلترة ذكية تعتمد على الأحرف
  const filterSuggestions = (query) => {
    if (!query) return [];
    const allOptions = [
      ...cities.map((c) => ({ type: "City", name: c })),
      ...categories.map((cat) => ({ type: "Category", name: cat })),
    ];
    return allOptions.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
  };

  return (
    <SearchContext.Provider value={{ filterSuggestions }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => useContext(SearchContext);
