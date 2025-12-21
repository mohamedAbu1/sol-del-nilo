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
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));
  const router = useRouter();

  const handleViewTour = () => {
    router.push(`/tours/${tour.id}`);
  };

  const isGrid = viewMode === "grid";

  return (
    <MotionBox
      key={tour.id}
      initial={{ opacity: 0, y: 50 }}
      animate={{
        opacity: 1,
        y: 0,
        flexDirection: isGrid ? "column" : "row",
        height: isGrid ? 400 : 220,
        width: isGrid ? "31%" : "100%",
      }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      sx={{
        borderRadius: "16px",
        overflow: "hidden",
        position: "relative",
        boxShadow: muiTheme.shadows[4],
        cursor: "pointer",
        "&:hover": {
          transform: "scale(1.02)",
          border: `1px solid ${muiTheme.palette.primary.main}`,
        },
        display: "flex",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      onClick={handleViewTour}
    >
      {isGrid ? (
        <>
          {/* ✅ طبقة شفافة فوق الصورة */}
          <MotionBox
            key={tour.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            sx={{
              width: "100%",
              height: isGrid ? 400 : 220,
              display: isGrid ? "block" : "flex",
              flexDirection: isGrid ? "column" : "row",
              borderRadius: "16px",
              overflow: "hidden",
              position: "relative",
              boxShadow: muiTheme.shadows[4],
              cursor: "pointer",
              "&:hover": {
                transform: "scale(1.02)",
                border: `1px solid ${muiTheme.palette.primary.main}`,
              },
              backgroundImage: `url(${
                tour.image?.[0]?.url
                  ? `${tour.image[0].url}`
                  : "/assets/default.jpg"
              })`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            onClick={handleViewTour}
          >
            {/* ✅ طبقة تدرج خفيف فوق الصورة */}
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.25), rgba(0,0,0,0.05))",
              }}
            />

            {/* ✅ المحتوى فوق الصورة */}
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                p: 2,
                color: muiTheme.palette.common.white,
                zIndex: 2,
                width: "100%",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  fontSize: "1.2rem",
                  mb: 1,
                  lineHeight: 1.4,
                  color: muiTheme.palette.secondary.main,
                }}
              >
                {tour.title}
              </Typography>

              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography
                  variant="body2"
                  sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                >
                  <AccessAlarmsIcon fontSize="small" />{" "}
                  {`${tour.TripDuration} D`}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                >
                  <LocationOnIcon fontSize="small" /> {tour.city.name}
                </Typography>
              </Box>

              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography
                  variant="body2"
                  sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                >
                  <AttachMoneyIcon fontSize="small" /> {tour.price}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                >
                  <CategoryIcon fontSize="small" /> {tour.category.name}
                </Typography>
              </Box>

              <Button
                variant="contained"
                sx={{
                  mt: 1,
                  backgroundColor: muiTheme.palette.primary.main,
                  color: muiTheme.palette.getContrastText(
                    muiTheme.palette.primary.main
                  ),
                  fontWeight: 600,
                  borderRadius: "8px",
                  "&:hover": {
                    backgroundColor: muiTheme.palette.secondary.main,
                  },
                }}
              >
                See the trip
              </Button>
            </Box>
          </MotionBox>
        </>
      ) : (
        <>
          {/* ✅ صورة على اليسار */}
          <Box
            sx={{
              width: "40%",
              backgroundImage: `url(${
                tour.image?.[0]?.name
                  ? `/assets/${tour.image[0].name}`
                  : "/assets/default.jpg"
              })`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          {/* ✅ المحتوى على اليمين */}
          <Box
            sx={{
              width: "60%",
              p: 3,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              color: muiTheme.palette.text.primary,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                fontSize: "1.4rem",
                mb: 1,
                lineHeight: 1.4,
                color: muiTheme.palette.secondary.main,
              }}
            >
              {tour.title}
            </Typography>

            <Box sx={{ display: "flex", gap: 3, mb: 1 }}>
              <Typography
                variant="body2"
                sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
              >
                <AccessAlarmsIcon fontSize="small" /> {`${tour.TripDuration} D`}
              </Typography>
              <Typography
                variant="body2"
                sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
              >
                <LocationOnIcon fontSize="small" /> {tour.city.name}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", gap: 3, mb: 1 }}>
              <Typography
                variant="body2"
                sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
              >
                <AttachMoneyIcon fontSize="small" /> {tour.price}
              </Typography>
              <Typography
                variant="body2"
                sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
              >
                <CategoryIcon fontSize="small" /> {tour.category.name}
              </Typography>
            </Box>

            <Button
              variant="contained"
              sx={{
                alignSelf: "flex-start",
                backgroundColor: muiTheme.palette.primary.main,
                color: muiTheme.palette.getContrastText(
                  muiTheme.palette.primary.main
                ),
                fontWeight: 600,
                borderRadius: "8px",
                "&:hover": { backgroundColor: muiTheme.palette.secondary.main },
              }}
            >
              See the trip
            </Button>
          </Box>
        </>
      )}
    </MotionBox>
  );
};

export default DailyTourCard;
