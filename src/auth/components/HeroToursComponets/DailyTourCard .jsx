"use client";
import { Box, Typography, Button, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LocationPinIcon from "@mui/icons-material/LocationPin";
import CategoryIcon from "@mui/icons-material/Category";
import { useAppQueryContext } from "@/context/AppQueryContext";
const MotionBox = motion(Box);

const DailyTourCard = ({ tour, themee, viewMode }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isGrid = viewMode === "grid";
  const router = useRouter();

  // ✅ دالة التحويل لصفحة الرحلة حسب الـ id
  const handleViewTour = () => {
    router.push(`/tours/${tour.id}`);
  };
  console.log(tour);
  return (
    <MotionBox
      key={tour.id}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      sx={{
        width: {
          xs: "100%",
          sm: "48%",
          md: "31%",
          lg: "31%",
        },
        display: "flex",
        flexDirection: isGrid ? "column" : "row",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        transition: "all 0.4s ease",
        "&:hover": {
          transform: "scale(1.02)",
          border: "1px solid #ffb300",
        },
      }}
      className="bg-white dark:bg-[#030712]"
    >
      {/* ✅ صورة الرحلة */}
      <Box
        component="img"
        src={
          tour.image?.[0]?.name
            ? `/assets/${tour.image[0].name}`
            : "/assets/default.jpg" // ✅ صورة افتراضية لو مفيش صورة
        }
        alt={tour.title}
        sx={{
          width: isGrid ? "100%" : "40%",
          height: isGrid ? 220 : "100%",
          objectFit: "cover",
          transition: "all 0.4s ease",
        }}
      />

      {/* ✅ محتوى البطاقة */}
      <Box
        sx={{
          p: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          flex: 1,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "#ffb300",
            fontWeight: 700,
            fontSize: "1.2rem",
            mb: 1,
            lineHeight: 1.4,
          }}
        >
          {tour.title}
        </Typography>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: themee === "dark" ? "#ccc" : "gray",
              fontSize: "0.95rem",
              lineHeight: 1.6,
              mb: 2,
            }}
          >
            <AccessAlarmsIcon style={{ fontSize: "1.20rem" }} />{" "}
            {`${tour.TripDuration} D`}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: themee === "dark" ? "#ccc" : "gray",
              fontSize: "0.95rem",
              lineHeight: 1.6,
              mb: 2,
            }}
          >
            <LocationPinIcon />
            {tour.city.name}
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: themee === "dark" ? "#ccc" : "gray",
              fontSize: "0.95rem",
              lineHeight: 1.6,
              mb: 2,
            }}
          >
            <AttachMoneyIcon />
            {tour.price}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: themee === "dark" ? "#ccc" : "gray",
              fontSize: "0.95rem",
              lineHeight: 1.6,
              mb: 2,
            }}
          >
            <CategoryIcon style={{ paddingRight: "5px" }} />
            {tour.category.name}
          </Typography>
        </div>
        {/* ✅ زر التحويل */}
        <Button
          variant="contained"
          onClick={handleViewTour}
          sx={{
            mt: 2,
            backgroundColor: "#ffb300",
            color: "#fff",
            fontWeight: 600,
            borderRadius: "8px",
            "&:hover": {
              backgroundColor: "#ffc107",
            },
          }}
        >
          See the trip
        </Button>
      </Box>
    </MotionBox>
  );
};

export default DailyTourCard;
