"use client";
import { Box, Typography, Button, Grid, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { FaArrowCircleRight, FaDollarSign } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { GiDuration } from "react-icons/gi";
import { useRouter } from "next/navigation";
import { MdOutlineReviews } from "react-icons/md";

const DailyTourCard = ({ tour, themee, viewMode }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isGrid = viewMode === "grid";
  console.log(tour);
  const router = useRouter();

  return (
    <Box
      sx={{
        width: isGrid
          ? { xs: "100%", sm: "48%", md: "48%", lg: "32%" } // ✅ Grid: كروت متجاورة
          : "100%", // ✅ List: كارت بعرض كامل
        display: "flex",
        // height: isGrid ? "50%" : "25%",
        flexDirection: isGrid ? "column" : "row", // ✅ Grid: عمودي / List: أفقي
        // backgroundColor: "#212121",
        color: "#ffffff",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        transition: "all 0.4s ease", // ✅ أنيمشن ناعم
        "&:hover": {
          transform: "scale(1.02)",
        },
      }}
      className="bg-white dark:bg-[#212121]"
    >
      {/* ✅ صورة الرحلة */}
      <Box
        component="img"
        src={`/assets/${tour.image[0].name}`}
        alt="Abu Simbel"
        sx={{
          width: isGrid ? "100%" : "40%", // ✅ Grid: الصورة تأخذ العرض الكامل
          height: isGrid ? 220 : "100%", // ✅ Grid: ارتفاع ثابت / List: تلقائي
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
        {/* ✅ العنوان والوصف */}
        <Box>
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
        </Box>

        {/* ✅ التفاصيل */}
        <Grid
          container
          spacing={1}
          sx={{
            width: isGrid ? "45%" : "25%",
            mb: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            justifyContent: "space-between",
          }}
        >
          <Grid
            item
            xs={6}
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="caption"
              sx={{
                fontSize: "0.85rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "5px",
              }}
              className="text-black dark:text-[#ddd]"
            >
              reviews{" "}
              <MdOutlineReviews className="text-gray-500 dark:text-yellow-600" />
            </Typography>
            <strong style={{ color: themee === "dark" ? "#ccc" : "gray" }}>
              {tour.reviews.length}
            </strong>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="caption"
              sx={{
                fontSize: "0.85rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "5px",
              }}
              className="text-black dark:text-[#ddd]"
            >
              Destination{" "}
              <FaArrowCircleRight className="text-gray-500 dark:text-yellow-600" />{" "}
            </Typography>
            <strong style={{ color: themee === "dark" ? "#ccc" : "gray" }}>
              {tour.city.name}
            </strong>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="caption"
              sx={{
                fontSize: "0.85rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "5px",
              }}
              className="text-black dark:text-[#ddd]"
            >
              People{" "}
              <FaPeopleGroup className="text-gray-500 dark:text-yellow-600" />{" "}
            </Typography>
            <strong style={{ color: themee === "dark" ? "#ccc" : "gray" }}>
              {tour.DayPeople}
            </strong>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="caption"
              sx={{
                fontSize: "0.85rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "5px",
              }}
              className="text-black dark:text-[#ddd]"
            >
              Duration{" "}
              <GiDuration className="text-gray-500 dark:text-yellow-600" />{" "}
            </Typography>
            <strong style={{ color: themee === "dark" ? "#ccc" : "gray" }}>
              {tour.TripDuration}
            </strong>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="caption"
              sx={{
                fontSize: "0.85rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "5px",
              }}
              className="text-black dark:text-[#ddd]"
            >
              Price{" "}
              <FaDollarSign className="text-gray-500 dark:text-yellow-600" />{" "}
            </Typography>
            <strong style={{ color: themee === "dark" ? "#ccc" : "gray" }}>
              {tour.price}
            </strong>
          </Grid>
        </Grid>

        {/* ✅ زر التفاصيل */}
        <Button
          variant="contained"
          onClick={() => router.push(`/tours/${tour.id}`)}
          sx={{
            alignSelf: isGrid ? "center" : "flex-start",
            backgroundColor: "#ffb300",
            // color: "#212121",
            fontWeight: 600,
            fontSize: "0.9rem",
            borderRadius: "8px",
            textTransform: "none",
            px: 3,
            py: 1,
            "&:hover": {
              backgroundColor: "#ffc107",
            },
          }}
          className="text-[#fff] dark:text-[#212121]"
        >
          View Details →
        </Button>
      </Box>
    </Box>
  );
};

export default DailyTourCard;
