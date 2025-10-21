"use client";
import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";

// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

const TripContext = createContext();
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

export const TripContextProvider = ({ children }) => {
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  const [tours, setTours] = useState([]);

  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

  const getAllTours = async () => {
    try {
      const response = await axios.get("/api/tours");

      if (response.status !== 200) {
        toast.error("❌ فشل في تحميل الرحلات");
        return [];
      }
      setTours(response.data.tours);

      return response.data;
    } catch (error) {
      console.error("❌ خطأ في الاتصال بـ API:", error.message);
      toast.error("❌ حدث خطأ أثناء تحميل الرحلات");
      return [];
    }
  };
  useEffect(() => {
    getAllTours();
  }, []);

  useEffect(() => {
  }, [tours]);

  return (
    <TripContext.Provider
      value={{
        tours,
        setTours,
      }}
    >
      {children}
    </TripContext.Provider>
  );
};

export const useTripContext = () => useContext(TripContext);
