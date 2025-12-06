"use client";
import axios from "axios";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useTripContext } from "./TripContext";
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

const AppContext = createContext();
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

export const AppProvider = ({ children }) => {
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { tour, setTour } = useTripContext();
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  const [users, setUsers] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]); // المستخدمون الذين لديهم نشاطات
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
    const [open, setOpen] = useState(false);
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  useEffect(() => {
    if (theme) {
    }
  }, [theme]);
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

  const fetchUsersWithActivities = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/users");
      const result = await res.json();
      if (res.ok) {
        setUsers(result.users);

        // ✅ تصفية المستخدمين الذين لديهم نشاطات
        const filtered = result.users.filter(
          (user) =>
            (user.messages?.length || 0) > 0 ||
            (user.reviews?.length || 0) > 0 ||
            (user.payments?.length || 0) > 0
        );
        setActiveUsers(filtered);
      } else {
        console.error("❌ API Error:", result.error);
      }
    } catch (err) {
      console.error("❌ Fetch Error:", err.message);
    } finally {
      setLoading(false);
    }
  };
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

  const handleShowDetails = (user, type) => {
    setSelectedUser(user);
    setSelectedType(type);
  };
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

  const handleDelete = async (userId) => {
    try {
      const response = await axios.delete(`/api/users`, {
        data: {
          userId,
          currentUserRole: "ADMIN", // تأكد أنك ترسل الدور من الجلسة أو السياق
        },
      });

      if (response.status === 200) {
        // حذف المستخدم من القائمة بدون إعادة تحميل
        setUsers((prev) => prev.filter((user) => user.id !== userId));
      } else {
        console.error("فشل في حذف المستخدم:", response.data);
      }
    } catch (error) {
      console.error("❌ خطأ أثناء حذف المستخدم:", error);
    }
  };
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

  useEffect(() => {
    fetchUsersWithActivities();
  }, []);
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

  return (
    <AppContext.Provider
      value={{
        users, // كل المستخدمين
        activeUsers, // فقط من لديهم نشاطات
        loading,
        selectedUser,
        selectedType,
        handleShowDetails,
        fetchUsersWithActivities,
        handleDelete,
        theme,
        router,
        setOpen,
        open,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
