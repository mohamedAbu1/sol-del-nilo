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
import { useTheme } from "@mui/material/styles"; // ✅ استدعاء الثيم

const MotionImageListItem = motion(ImageListItem);

const Page = () => {
  const { tours } = useTripContext();
  const params = useParams();
  const id = params?.id;
  const tour = tours.find((t) => t.id === id);
  const { width } = useScreenSize();
  const router = useRouter();
  const muiTheme = useTheme(); // ✅ يجيب الثيم الحالي

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [fullScreenOpen, setFullScreenOpen] = useState(false);
  const [shuffledImages, setShuffledImages] = useState([]);

  useEffect(() => {
    if (tour?.tourimage) {
      setShuffledImages(tour.tourimage);
    }
  }, [tour]);

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

  useEffect(() => {
    if (!fullScreenOpen || selectedIndex === null) return;
    const interval = setInterval(() => {
      setSelectedIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % shuffledImages.length;
        return nextIndex;
      });
    }, 2000);
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
          sx={{
            fontSize: width <= 1024 ? "14px" : "24px",
            color: muiTheme.palette.text.primary, // ✅ النصوص من الثيم
          }}
        >
          {tour?.title || "Pictures of the last trip"}
        </Typography>
        <Button
          onClick={() => router.push(`/tours/${tour?.id}`)}
          className="btn-next-section3"
          sx={{
            color: muiTheme.palette.text.primary, // ✅ النصوص من الثيم
            mb: 2,
            mt: 1,
          }}
        >
          Back
        </Button>
      </div>

      {/* ✅ عرض الصور */}
      <ImageList variant="masonry" cols={3} gap={12}>
        {shuffledImages.map((img, index) => (
          <MotionImageListItem
            key={`${img.url}-${index}`} // ✅ مفتاح فريد لتجنب مشكلة التكرار
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
                  boxShadow: muiTheme.shadows[3], // ✅ ظل من الثيم
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
                  backgroundColor: muiTheme.palette.action.selected, // ✅ خلفية من الثيم
                  color: muiTheme.palette.secondary.main, // ✅ النصوص من الثيم
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
              backgroundColor: muiTheme.palette.background.default, // ✅ خلفية من الثيم
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
              key={`${shuffledImages[selectedIndex].url}-${selectedIndex}`} // ✅ مفتاح فريد
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
                boxShadow: muiTheme.shadows[6], // ✅ ظل من الثيم
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default Page;
