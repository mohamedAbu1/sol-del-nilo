import { useState } from "react";
import { Button, Modal, Box, Typography, Divider } from "@mui/material";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";

const BookTourButton = ({
  tour,
  user,
  options,
  finalPriceAfterRival,
  selectedExtras,
  nan,
  setBookingData,
  bookingData,
}) => {
  const [bookingTime, setBookingTime] = useState(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const [open, setOpen] = useState(false);

  const resetBookingData = () => {
    setBookingData({
      people: "",
      childrenCount: "",
      childrenAges: [],
      hasChildren: "",
      hasPets: "",
      petType: "",
      guideLanguages: {
        English: false,
        Spanish: false,
        German: false,
        Italian: false,
        French: false,
      },
    });
    setNan(0);
  };
  const handleBooking = async () => {
    const bookingPayload = {
      amount_cents: Math.round(finalPriceAfterRival * 100),
      name: user.name,
      email: user.email,
      userId: user.id,
      tourId: tour.id,
      tourTitle: tour.title,
      tourDate: tour.theDate,
      bookingTime,
      adults:
        typeof nan === "number" && !isNaN(nan) ? nan : parseInt(tour.DayPeople),
      children: parseInt(bookingData.childrenCount || 0),
      hasChildren: bookingData.hasChildren,
      hasPets: bookingData.hasPets,
      petType: bookingData.petType || null,
      guideLanguages: selectedGuides,
      selectedExtras: selectedExtras.map((opt) => ({
        key: opt.key,
        label: opt.label,
        price: opt.price,
      })),
    };
    try {
      const saveResponse = await axios.post("/api/paymob", bookingPayload);

      if (saveResponse.status === 200) {
        toast.success("✅ تم حفظ الحجز في قاعدة البيانات!");
        setTimeout(() => {
          setOpen(false); // إغلاق النافذة بعد 5 ثواني
          setBookingConfirmed(false);
          resetBookingData(); // إعادة الحالة للاستعداد لحجز جديد
        }, 3000);
      } else {
        toast.error("❌ لم يتم حفظ الحجز.");
      }
    } catch (err) {
      console.error("❌ Save error:", err);
      toast.error("حدث خطأ أثناء حفظ الحجز.");
    }
  };
  const selectedGuides = Object.entries(bookingData.guideLanguages || {})
    .filter(([lang, isSelected]) => isSelected)
    .map(([lang]) => lang);
  return (
    <>
      <Button
        onClick={() => {
          setBookingTime(
            new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          );
          setOpen(true);
        }}
        variant="contained"
        sx={{
          backgroundColor: "#d4a85f",
          color: "#fff",
          fontWeight: "800",
          fontFamily: "Cairo, sans-serif",
          fontSize: "clamp(14px, 2vw, 18px)",
          px: 3,
          py: 1.5,
          borderRadius: "8px",
          "&:hover": { backgroundColor: "#1565c0" },
        }}
      >
        Book This Tour 🧭
      </Button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            backgroundColor: "#fff",
            borderRadius: "16px",
            boxShadow: 24,
            p: { xs: 2, sm: 3, md: 4 },
            maxWidth: { xs: "95vw", sm: "90vw", md: 720 },
            width: "100%",
            mx: "auto",
            my: { xs: "5vh", sm: "5vh", md: "2vh" },
            fontFamily: "Cairo, sans-serif",
            color: "#333",
            maxHeight: "91vh",
            overflowY: "scroll",
            display:"flex",
            flexDirection:"column",
            justifyContent:"center"
          }}
        >
          <Image
            src="/assets/Copilot_20250908_2314232.png"
            alt="SolDelNilo Logo"
            width={120}
            height={70}
            style={{
              borderRadius: "8px",
              // marginBottom: "20px",
              maxWidth: "100%",
              height: "auto",
              margin:"auto"
            }}
          />

          {bookingConfirmed ? (
            <>
              <Typography
                variant="h5"
                fontWeight="bold"
                sx={{ color: "#1565c0", mb: 2 }}
              >
                🎉 شكراً لحجز رحلتك معنا!
              </Typography>
              <Typography sx={{ fontSize: "18px", color: "#555" }}>
                نحن سعداء بانضمامك إلى SolDelNilo. سيتم التواصل معك قريبًا
                لتأكيد التفاصيل.
              </Typography>
            </>
          ) : (
            <>
              {/* ✅ عنوان النافذة */}
              {/* <Typography
                variant="h5"
                fontWeight="bold"
                textAlign="center"
                mb={2}
                sx={{ color: "#1565c0" }}
              >
                Booking Summary
              </Typography> */}

              <Divider sx={{ mb: 1 }} />

              {/* ✅ بيانات العميل */}
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                mb={1}
                className="text-gray-600"
              >
                👤 Customer Info
              </Typography>
              <Typography
                className="text-gray-500"
                style={{ display: "flex", gap: "15px", fontWeight: "800" }}
              >
                <strong className="text-gray-600">Name:</strong> {user.name}
              </Typography>
              <Typography
                className="text-gray-500"
                style={{ display: "flex", gap: "15px", fontWeight: "800" }}
              >
                <strong className="text-gray-600">Email:</strong> {user.email}
              </Typography>

              <Divider sx={{ my: 2 }} />

              {/* ✅ تفاصيل الرحلة */}
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                mb={1}
                className="text-gray-600"
              >
                🧭 Tour Details
              </Typography>
              <Typography
                className="text-gray-500"
                style={{ display: "flex", gap: "15px", fontWeight: "800" }}
              >
                <strong className="text-gray-600">Tour:</strong> {tour.title}
              </Typography>
              {selectedGuides.length > 0 ? (
                selectedGuides.map((lang, index) => (
                  <Typography
                    className="text-gray-500"
                    key={index}
                    style={{ display: "flex", gap: "15px", fontWeight: "800" }}
                  >
                    <strong className="text-gray-600">Tour Guide:</strong>{" "}
                    {lang}
                  </Typography>
                ))
              ) : (
                <Typography
                  className="text-gray-500"
                  style={{ display: "flex", gap: "15px", fontWeight: "800" }}
                >
                  <strong className="text-gray-600">Tour Guide:</strong> No Tour
                  Guide
                </Typography>
              )}

              <Typography
                className="text-gray-500"
                style={{ display: "flex", gap: "15px", fontWeight: "800" }}
              >
                <strong className="text-gray-600">Final Price:</strong>{" "}
                {parseFloat(finalPriceAfterRival).toFixed(2)} USA
              </Typography>
              {(selectedExtras || "No Option").map((i) => (
                <Typography
                  key={i.key}
                  className="text-gray-500"
                  style={{ display: "flex", gap: "15px", fontWeight: "800" }}
                >
                  <strong className="text-gray-600">Option:</strong>
                  {i.label}{" "}
                </Typography>
              ))}

              <Divider sx={{ my: 2 }} />

              {/* ✅ اختيارات العميل */}
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                mb={1}
                className="text-gray-600"
              >
                📋 Preferences
              </Typography>
              <Typography
                className="text-gray-500"
                style={{
                  textTransform: "capitalize",
                  display: "flex",
                  gap: "15px",
                  fontWeight: "800",
                }}
              >
                <strong className="text-gray-600">Pets:</strong>{" "}
                {bookingData.hasPets === "no" ? (
                  bookingData.hasPets
                ) : (
                  <>
                    {bookingData.hasPets}{" "}
                    <strong className="text-gray-600">petType:</strong>{" "}
                    <span className="text-gray-500">{bookingData.petType}</span>
                  </>
                )}
              </Typography>
              <Typography
                className="text-gray-500"
                style={{
                  textTransform: "capitalize",
                  display: "flex",
                  gap: "15px",
                  fontWeight: "800",
                }}
              >
                <strong className="text-gray-600">Adults:</strong>{" "}
                {typeof nan === "number" && !isNaN(nan)
                  ? nan
                  : parseInt(tour.DayPeople)}
              </Typography>
              <Typography
                className="text-gray-500"
                style={{
                  textTransform: "capitalize",
                  display: "flex",
                  gap: "15px",
                  fontWeight: "800",
                }}
              >
                <strong className="text-gray-600">Children:</strong>{" "}
                {bookingData.hasChildren === "no" ? (
                  bookingData.hasChildren
                ) : (
                  <>
                    {" "}
                    {bookingData.hasChildren}{" "}
                    <strong className="text-gray-600">childrenCount:</strong>
                    <span
                      className="text-gray-500"
                      style={{ fontWeight: "800" }}
                    >
                      {bookingData.childrenCount}
                    </span>
                  </>
                )}
              </Typography>

              <Divider sx={{ my: 2 }} />

              {/* ✅ توقيت الرحلة */}
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                mb={1}
                className="text-gray-600"
              >
                📅 Schedule
              </Typography>
              <Typography
                className="text-gray-500"
                style={{
                  textTransform: "capitalize",
                  display: "flex",
                  gap: "15px",
                  fontWeight: "800",
                }}
              >
                <strong className="text-gray-600">Date:</strong>{" "}
                {tour.theDate || "—"}
              </Typography>
              <Typography
                className="text-gray-500"
                style={{
                  textTransform: "capitalize",
                  display: "flex",
                  gap: "15px",
                  fontWeight: "800",
                }}
              >
                <strong className="text-gray-600">Time:</strong>{" "}
                {bookingTime || "—"}
              </Typography>

              {/* ✅ زر التأكيد */}
              <Button
                onClick={handleBooking}
                variant="contained"
                fullWidth
                sx={{
                  mt: 4,
                  backgroundColor: "#d4a85f",
                  color: "#fff",
                  fontWeight: "600",
                  fontSize: "16px",
                  py: 1.5,
                  borderRadius: "10px",
                  "&:hover": { backgroundColor: "#1565c0" },
                }}
              >
                Confirm Booking ✅
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default BookTourButton;
