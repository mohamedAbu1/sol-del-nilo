"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  ImageList,
  ImageListItem,
  Button,
} from "@mui/material";
import { useParams } from "next/navigation";
import { useScreenSize } from "../../../../../auth/hooks/screenSize";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Lodaing from "../../../lodaing";
import Image from "next/image";
import { useTripContext } from "@/context/TripContext";
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
const Page = () => {
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  const { tours } = useTripContext();
  const params = useParams();
  const id = params?.id;
  const tour = tours.find((t) => t.id === id);
  // const { id } = useParams();
  // const [tour, setTour] = useState(null);
  const { width } = useScreenSize();
  const router = useRouter();
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [fullScreenOpen, setFullScreenOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  console.log(id);
  console.log(tour);
  // useEffect(() => {
  //   if (!id) return;

  //   const fetchTourWithImages = async () => {
  //     try {
  //       const response = await fetch(`/api/tours/${id}`);
  //       const result = await response.json();

  //       if (!response.ok) {
  //         console.error("❌ API Error:", result.error);
  //         return;
  //       }

  //       setTour(result);
  //       setLoading(false); // ✅ تم التحميل
  //     } catch (error) {
  //       console.error("❌ Fetch Error:", error.message);
  //     }
  //   };

  //   fetchTourWithImages();
  // }, [id]);
  // console.log(tour)
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

  const handleImageClick = (index) => {
    setSelectedIndex(index);
    setFullScreenOpen(true);
  };
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

  // ✅ التغيير التلقائي كل 4 ثواني
  useEffect(() => {
    let interval;

    if (fullScreenOpen && tour?.tourimage?.length > 0) {
      interval = setInterval(() => {
        setSelectedIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;
          return nextIndex >= tour.tourimage.length ? 0 : nextIndex;
        });
      }, 4000);
    }

    return () => clearInterval(interval);
  }, [fullScreenOpen, tour]);
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  console.log(tour);

  if (!tour) {
    return <Lodaing />;
  }
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

  return (
    <Box
      sx={{
        padding: 4,
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
      }}
    >
      <div className="w-full flex flex-row items-center justify-between gap-1.5">
        <Typography
          variant="h4"
          style={{ fontSize: width <= 1024 ? "14px" : "24px" }}
        >
          {tour?.title || "Pictures of the last trip"}
        </Typography>
        <Button
          onClick={() => router.push(`/tours/${tour?.id}`)}
          className="btn-next-section3"
          style={{
            color: "#000",
            marginBottom: "20px",
            marginTop: "10px",
          }}
        >
          Back
        </Button>
      </div>

      {!id ? (
        <Typography color="error">❌ Tour ID not found</Typography>
      ) : (
        <ImageList variant="masonry" cols={3} gap={12}>
          {tour?.tourimage?.map((img, index) => (
            <ImageListItem key={index}>
              <Box sx={{ position: "relative" }}>
                <img
                  src={`/assets/${img.url}`}
                  alt={img.name}
                  onClick={() => handleImageClick(index)}
                  style={{
                    borderRadius: "30px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                    display: "block",
                    cursor: "pointer",
                    transition: "transform 0.3s ease",
                  }}
                />
                <Typography
                  variant="subtitle2"
                  sx={{
                    display: width <= 767 ? "none" : "flex",
                    position: "absolute",
                    bottom: 8,
                    left: 8,
                    backgroundColor: "rgba(44,44,44,0.6)",
                    color: "#ffa726",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    fontSize: "0.85rem",
                    textTransform: "capitalize",
                  }}
                >
                  {img.name}
                </Typography>
              </Box>
            </ImageListItem>
          ))}
        </ImageList>
      )}

      {/* ✅ نافذة عرض الصورة بالحجم الكامل مع التغيير التلقائي */}
      <AnimatePresence>
        {fullScreenOpen && selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0,0,0,0.9)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 9999,
              flexDirection: "column",
              cursor: "zoom-out",
            }}
            onClick={() => setFullScreenOpen(false)}
          >
            <motion.img
              key={tour.tourimage[selectedIndex].url}
              src={`/assets/${tour.tourimage[selectedIndex].url}`}
              alt={tour.tourimage[selectedIndex].name}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                width: width <= 600 ? "100%" : "60%",
                height: width <= 600 ? "95%" : "30%",
                maxWidth: "100%",
                maxHeight: "100%",
                borderRadius: "20px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default Page;
