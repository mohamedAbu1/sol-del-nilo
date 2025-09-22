"use client";
import React, { createContext, useContext, useState } from "react";

// إنشاء السياق
const DashboardContext = createContext();

// مزود السياق
export const DashboardProvider = ({ children }) => {
  const [activeSection, setActiveSection] = useState("home"); // بيانات المستخدم
  // const handleHomePage = () => {
    
  // };

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <DashboardContext.Provider
      value={{ activeSection, setActiveSection }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

// دالة مخصصة لاستخدام السياق بسهولة
export const useDashboard = () => useContext(DashboardContext);
