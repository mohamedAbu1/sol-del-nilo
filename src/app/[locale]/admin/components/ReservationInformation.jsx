"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  CircularProgress,
} from "@mui/material";
import { useAppContext } from "@/context/AppContext";
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
const ReservationInformation = () => {
  const {
    users,
    loading,
    selectedUser,
    selectedType,
    fetchUserActivities,
    handleShowDetails,
    activeUsers,
  } = useAppContext();
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

  const [visibleCount, setVisibleCount] = useState(6);
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

  useEffect(() => {
    setVisibleCount(6); // إعادة تعيين عند تغيير المستخدم أو النوع
  }, [selectedUser, selectedType]);
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

  useEffect(() => {
    if (users?.id) fetchUserActivities(users.id);
  }, [users]);
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

  return (
    <Box sx={{ p: 4, width: "100%" }}>
      <Typography
        variant="h5"
        fontWeight="bold"
        mb={3}
        sx={{ color: "#1565c0", fontFamily: "Cairo, sans-serif" }}
      >
        🧾 المستخدمون الذين لديهم نشاطات
      </Typography>

      {loading ? (
        <CircularProgress /> 
      ) : (
        <>
          <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
            <Table>
              <TableHead sx={{ backgroundColor: "#f5f5f5", width: "100%" }}>
                <TableRow>
                  <TableCell>👤 الاسم</TableCell>
                  <TableCell>📧 البريد</TableCell>
                  <TableCell>💬 الرسائل</TableCell>
                  <TableCell>⭐ الريفيوهات</TableCell>
                  <TableCell>💳 المدفوعات</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {activeUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Chip
                        label={`${user.messages?.length || 0} رسالة`}
                        color="primary"
                        size="small"
                        onClick={() => handleShowDetails(user, "messages")}
                        sx={{ cursor: "pointer" }}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={`${user.reviews?.length || 0} ريفيو`}
                        color="success"
                        size="small"
                        onClick={() => handleShowDetails(user, "reviews")}
                        sx={{ cursor: "pointer" }}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={`${user.payments?.length || 0} عملية`}
                        color="warning"
                        size="small"
                        onClick={() => handleShowDetails(user, "payments")}
                        sx={{ cursor: "pointer" }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {selectedUser && selectedType && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                تفاصيل{" "}
                {selectedType === "messages"
                  ? "الرسائل"
                  : selectedType === "reviews"
                  ? "الريفيوهات"
                  : "المدفوعات"}{" "}
                للمستخدم: {selectedUser.name}
              </Typography>

              {/* ✅ عرض العناصر المحددة مع تقسيم */}
              {selectedUser[selectedType]
                ?.slice(0, visibleCount)
                .map((item, index) => (
                  <Box
                    key={item.id || index}
                    sx={{
                      mb: 2,
                      p: 2,
                      border: "1px solid #ddd",
                      borderRadius: 2,
                      color: "#000",
                      backgroundColor: "#fafafa",
                    }}
                  >
                    {selectedType === "messages" && (
                      <>
                        <Typography>
                          <strong>📨 الموضوع:</strong> {item.subject}
                        </Typography>
                        <Typography>
                          <strong>📱 الهاتف: </strong>
                          {item.phone}
                        </Typography>
                        <Typography>
                          <strong>📝 الرسالة:</strong> {item.message}
                        </Typography>
                        <Typography>
                          <strong>📨 email:</strong> {item.email}
                        </Typography>
                        <Typography>
                          <strong>📱 name: </strong>
                          {item.name}
                        </Typography>
                        <Typography>
                          <strong>📝 created_at:</strong> {item.created_at}
                        </Typography>
                      </>
                    )}

                    {selectedType === "reviews" && (
                      <>
                        <Typography>
                          <strong>🏷 الرحلة:</strong> {item.tourTitle}
                        </Typography>
                        <Typography>
                          <strong>⭐ التقييم:</strong> {item.rating}
                        </Typography>
                        <Typography>
                          <strong>💬 التعليق:</strong> {item.comment}
                        </Typography>
                        <Typography>
                          <strong>🏷 created_at:</strong> {item.created_at}
                        </Typography>
                        <Typography>
                          <strong>⭐ name:</strong> {item.name}
                        </Typography>
                        <Typography>
                          <strong>💬 rating:</strong> {item.rating}
                        </Typography>
                      </>
                    )}

                    {selectedType === "payments" && (
                      <>
                        <Typography>💰 adults: {item.adults}</Typography>
                        <Typography>
                          💳 amount_cents : {item.amount_cents}
                        </Typography>
                        <Typography>
                          📍 bookingTime: {item.bookingTime || "null"}
                        </Typography>
                        <Typography>
                          💰 children: {item.children || "null"}
                        </Typography>
                        <Typography>
                          💳 created_at: {item.created_at || "null"}
                        </Typography>
                        <Typography>
                          📍 email: {item.email || "null"}
                        </Typography>
                        <Typography>
                          💰 guideLanguages: {item.guideLanguages || "null"}
                        </Typography>
                        <Typography>
                          💳 hasChildren: {item.hasChildren || "null"}
                        </Typography>
                        <Typography>
                          📍 hasPets: {item.hasPets || "null"}
                        </Typography>
                        <Typography>💰 name: {item.name || "null"}</Typography>
                        <Typography>
                          💳 petType: {item.petType || "null"}
                        </Typography>
                        <Typography>
                          💰 tourDate: {item.tourDate || "null"}
                        </Typography>
                        <Typography>
                          💳 tourTitle: {item.tourTitle || "null"}
                        </Typography>
                      </>
                    )}
                    <Typography sx={{ mt: 1, fontSize: "12px", color: "#888" }}>
                      📅 التاريخ:{" "}
                      {new Date(item.created_at).toLocaleDateString("ar-EG")}
                    </Typography>
                  </Box>
                ))}

              {/* ✅ زر عرض المزيد */}
              {selectedUser[selectedType]?.length > visibleCount && (
                <Box sx={{ mt: 2, textAlign: "center" }}>
                  <Chip
                    label={`عرض المزيد (${
                      selectedUser[selectedType].length - visibleCount
                    })`}
                    color="error"
                    onClick={() => setVisibleCount((prev) => prev + 6)}
                    sx={{ cursor: "pointer", fontWeight: "bold" }}
                  />
                </Box>
              )}
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default ReservationInformation;
