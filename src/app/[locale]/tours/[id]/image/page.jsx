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

const MotionImageListItem = motion(ImageListItem);

const Page = () => {
  const { tours } = useTripContext();
  const params = useParams();
  const id = params?.id;
  const tour = tours.find((t) => t.id === id);
  const { width } = useScreenSize();
  const router = useRouter();

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [fullScreenOpen, setFullScreenOpen] = useState(false);
  const [shuffledImages, setShuffledImages] = useState([]);

  // ✅ تحميل الصور
  useEffect(() => {
    if (tour?.tourimage) {
      setShuffledImages(tour.tourimage);
    }
  }, [tour]);

  // ✅ Shuffle الصور كل 30 ثانية
  useEffect(() => {
    if (!tour?.tourimage) return;
    const interval = setInterval(() => {
      setShuffledImages((prev) => {
        const newArr = [...prev];
        for (let i = newArr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
        }
        return newArr;
      });
    }, 30000);

    return () => clearInterval(interval);
  }, [tour]);

  // ✅ سلايدر تلقائي عند فتح الصورة بالحجم الكامل
  useEffect(() => {
    if (!fullScreenOpen || selectedIndex === null) return;

    const interval = setInterval(() => {
      setSelectedIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % shuffledImages.length;
        return nextIndex;
      });
    }, 2000); // كل 3 ثواني تتغير الصورة

    return () => clearInterval(interval);
  }, [fullScreenOpen, selectedIndex, shuffledImages.length]);

  const handleImageClick = (index) => {
    setSelectedIndex(index);
    setFullScreenOpen(true);
  };

  if (!tour) {
    return <Lodaing />;
  }

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
          style={{ color: "#000", marginBottom: "20px", marginTop: "10px" }}
        >
          Back
        </Button>
      </div>

      {/* ✅ عرض الصور */}
      <ImageList variant="masonry" cols={3} gap={12}>
        {shuffledImages.map((img, index) => (
          <MotionImageListItem
            key={img.label}
            layout
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <Box sx={{ position: "relative" }}>
              <Image
                src={img.url}
                width={800}
                height={200}
                alt={img.name}
                onClick={() => handleImageClick(index)}
                style={{
                  borderRadius: "30px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                  display: "block",
                  cursor: "pointer",
                  transition: "transform 0.3s ease",
                }}
                loading="eager"
                priority
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
                {img.label}
              </Typography>
            </Box>
          </MotionImageListItem>
        ))}
      </ImageList>

      {/* ✅ نافذة عرض الصورة بالحجم الكامل مع السلايدر */}
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
              backgroundColor: "rgba(100,100,100,0.9)",
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
              key={shuffledImages[selectedIndex].name}
              src={shuffledImages[selectedIndex].url}
              alt={shuffledImages[selectedIndex].name}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{
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
