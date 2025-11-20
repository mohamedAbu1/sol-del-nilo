"use client";
import { Box, Typography, Button, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

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

  return (
    <MotionBox
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
        src={`/assets/${tour.image[0].name}`}
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

        <Typography
          variant="body2"
          sx={{
            color: themee === "dark" ? "#ccc" : "gray",
            fontSize: "0.95rem",
            lineHeight: 1.6,
            mb: 2,
          }}
        >
          {tour.description}
        </Typography>

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
