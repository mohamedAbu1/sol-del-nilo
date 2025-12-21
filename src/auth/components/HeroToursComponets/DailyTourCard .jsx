"use client";
import { Box, Typography, Button, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CategoryIcon from "@mui/icons-material/Category";

const MotionBox = motion(Box);

const DailyTourCard = ({ tour, viewMode }) => {
  const muiTheme = useTheme(); // ✅ يجيب الثيم الحالي
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));
  const router = useRouter();

  const handleViewTour = () => {
    router.push(`/tours/${tour.id}`);
  };

  return (
    <MotionBox
      key={tour.id}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      sx={{
        width: { xs: "100%", sm: "48%", md: "31%", lg: "31%" },
        height: 400,
        borderRadius: "16px",
        overflow: "hidden",
        position: "relative",
        boxShadow: muiTheme.shadows[4], // ✅ ظل من الثيم
        cursor: "pointer",
        "&:hover": {
          transform: "scale(1.02)",
          border: `1px solid ${muiTheme.palette.primary.main}`, // ✅ الحدود من الثيم
        },
        backgroundImage: `url(${
          tour.image?.[0]?.name
            ? `/assets/${tour.image[0].name}`
            : "/assets/default.jpg"
        })`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      onClick={handleViewTour}
    >
      {/* ✅ طبقة شفافة فوق الصورة */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0.2) 100%)",
        }}
      />

      {/* ✅ المحتوى فوق الصورة */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          p: 2,
          color: muiTheme.palette.common.white, // ✅ النصوص من الثيم
          zIndex: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            fontSize: "1.2rem",
            mb: 1,
            lineHeight: 1.4,
            color: muiTheme.palette.primary.main, // ✅ العنوان بلون أساسي من الثيم
          }}
        >
          {tour.title}
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <AccessAlarmsIcon fontSize="small" /> {`${tour.TripDuration} D`}
          </Typography>
          <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <LocationOnIcon fontSize="small" /> {tour.city.name}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <AttachMoneyIcon fontSize="small" /> {tour.price}
          </Typography>
          <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <CategoryIcon fontSize="small" /> {tour.category.name}
          </Typography>
        </Box>

        <Button
          variant="contained"
          sx={{
            mt: 1,
            backgroundColor: muiTheme.palette.primary.main, // ✅ زر من الثيم
            color: muiTheme.palette.getContrastText(muiTheme.palette.primary.main), // ✅ نص متباين
            fontWeight: 600,
            borderRadius: "8px",
            "&:hover": { backgroundColor: muiTheme.palette.secondary.main }, // ✅ عند الـ hover يتحول للون الثانوي
          }}
        >
          See the trip
        </Button>
      </Box>
    </MotionBox>
  );
};

export default DailyTourCard;
