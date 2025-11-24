"use client";
import React, { useState } from "react";
import {
  Typography,
  Divider,
  Box,
  Chip,
  Stack,
  Button,
  CircularProgress,
} from "@mui/material";
import {
  CalendarMonth as CalendarMonthIcon,
  AccessTime as AccessTimeIcon,
  AttachMoney as AttachMoneyIcon,
  Email as EmailIcon,
  Person as PersonIcon,
  Tour as TourIcon,
  Translate as TranslateIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const YourBookingDetails = ({ tour, user }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const router = useRouter();

  const userBooking = Array.isArray(tour?.payments)
    ? tour.payments.find((b) => b.userId === user?.id)
    : null;

  if (!userBooking || deleted) return null;

  const handleDelete = async () => {
    try {
      const response = await fetch("/api/paymob", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          bookingId: userBooking.id, // تأكد أن هذا هو id من جدول Supabase
        }),
      });
      console.log("🧾 Booking ID:", userBooking.id);
      const result = await response.json();

      if (response.ok) {
        toast.success("✅ Booking deleted successfully!");
        setDeleted(true);
        setIsDeleting(false);
      } else {
        toast.error(`❌ Failed to delete: ${result.error}`);
      }
    } catch (err) {
      console.error("❌ Delete error:", err);
      toast.error("❌ An error occurred while deleting.");
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        // maxWidth: 600,
        backgroundColor: "#0f172a",
        color: "#f1f5f9",
        borderRadius: 4,
        height: "500px",
        boxShadow: "0 0 20px rgba(0,0,0,0.3)",
        p: 4,
        marginTop: "60px",
        marginBottom:"10px",
        display:"flex",
        flexDirection:"column",
        // alignItems:"center",
        justifyContent:"center"
      }}
    >
      <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
        ✅ Your Booking Details
      </Typography>

      <Divider sx={{ mb: 3, backgroundColor: "#334155" }} />

      <Stack spacing={2}>
        <Typography>
          <TourIcon sx={{ mr: 1 }} />
          <strong>Tour:</strong> {tour.title}
        </Typography>

        <Typography>
          <PersonIcon sx={{ mr: 1 }} />
          <strong>Name:</strong> {userBooking.name}
        </Typography>

        <Typography>
          <EmailIcon sx={{ mr: 1 }} />
          <strong>Email:</strong> {userBooking.email}
        </Typography>

        <Typography>
          <CalendarMonthIcon sx={{ mr: 1 }} />
          <strong>Date:</strong> {userBooking.tourDate}
        </Typography>

        <Typography>
          <AccessTimeIcon sx={{ mr: 1 }} />
          <strong>Time:</strong> {userBooking.bookingTime}
        </Typography>

        <Typography>
          <AttachMoneyIcon sx={{ mr: 1 }} />
          <strong>Total Price:</strong> {userBooking.amount_cents} USD
        </Typography>

        <Stack direction="row" alignItems="center" flexWrap="wrap">
          <TranslateIcon sx={{ mr: 1 }} />
          <Typography sx={{ mr: 1 }}>
            <strong>Guide Languages:</strong>
          </Typography>
          {Array.isArray(userBooking?.guideLanguages) &&
          userBooking.guideLanguages.length > 0 ? (
            userBooking.guideLanguages.map((lang, i) => (
              <Chip
                key={i}
                label={lang}
                color="secondary"
                variant="outlined"
                sx={{ mx: 0.5, my: 0.5 }}
              />
            ))
          ) : (
            <Chip
              label="No guide requested"
              color="default"
              variant="outlined"
            />
          )}
        </Stack>

        <Divider sx={{ my: 3 }} />

        <Button
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={handleDelete}
          disabled={isDeleting}
          sx={{
            alignSelf: "flex-start",
            textTransform: "none",
            fontWeight: "bold",
            px: 3,
            py: 1.5,
            borderRadius: 2,
          }}
        >
          {isDeleting ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Delete Booking"
          )}
        </Button>
      </Stack>
    </Box>
  );
};

export default YourBookingDetails;
