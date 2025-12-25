"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  ImageList,
  ImageListItem,
  Button,
  IconButton,
} from "@mui/material";
import { useParams } from "next/navigation";
import { useScreenSize } from "../../../../../auth/hooks/screenSize";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Lodaing from "../../../lodaing";
import Image from "next/image";
import { useTripContext } from "@/context/TripContext";
import { useTheme } from "@mui/material/styles";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const MotionImageListItem = motion(ImageListItem);

const Page = () => {
  const { tours } = useTripContext();
  const params = useParams();
  const id = params?.id;
  const tour = tours.find((t) => t.id === id);
  const { width } = useScreenSize();
  const router = useRouter();
  const muiTheme = useTheme();

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [fullScreenOpen, setFullScreenOpen] = useState(false);
  const [shuffledImages, setShuffledImages] = useState([]);

  useEffect(() => {
    if (tour?.tourimage) {
      setShuffledImages(tour.tourimage);
    }
  }, [tour]);

  // ✅ ألغينا التحويل التلقائي للصور (شيلنا useEffect اللي فيه setInterval)

  const handleImageClick = (index) => {
    setSelectedIndex(index);
    setFullScreenOpen(true);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setSelectedIndex((prevIndex) =>
      prevIndex === 0 ? shuffledImages.length - 1 : prevIndex - 1
    );
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setSelectedIndex((prevIndex) =>
      (prevIndex + 1) % shuffledImages.length
    );
  };

  if (!tour) {
    return <Lodaing />;
  }

  return (
    <Box sx={{ padding: 4, display: "flex", flexDirection: "column", flexWrap: "wrap" }}>
      <div className="w-full flex flex-row items-center justify-between gap-1.5">
        <Typography
          variant="h4"
          sx={{
            fontSize: width <= 1024 ? "14px" : "24px",
            color: muiTheme.palette.text.primary,
          }}
        >
          {tour?.title || "Pictures of the last trip"}
        </Typography>
        <Button
          onClick={() => router.push(`/tours/${tour?.id}`)}
          sx={{
            color: muiTheme.palette.text.primary,
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
          <MotionImageListItem key={`${img.url}-${index}`} layout transition={{ duration: 0.8, ease: "easeInOut" }}>
            <Box sx={{ position: "relative" }}>
              <Image
                src={img.url}
                width={800}
                height={200}
                alt={img.name}
                onClick={() => handleImageClick(index)}
                style={{
                  borderRadius: "30px",
                  boxShadow: muiTheme.shadows[3],
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
                  backgroundColor: muiTheme.palette.action.selected,
                  color: muiTheme.palette.secondary.main,
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

      {/* ✅ نافذة عرض الصورة بالحجم الكامل مع الأسهم */}
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
              backgroundColor: muiTheme.palette.background.default,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 9999,
              flexDirection: "column",
            }}
            onClick={() => setFullScreenOpen(false)}
          >
            <motion.img
              key={`${shuffledImages[selectedIndex].url}-${selectedIndex}`}
              src={shuffledImages[selectedIndex].url}
              alt={shuffledImages[selectedIndex].name}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                maxWidth: "90%",
                maxHeight: "80%",
                borderRadius: "20px",
                boxShadow: muiTheme.shadows[6],
              }}
            />

            {/* ✅ أزرار التنقل */}
            <Box sx={{ position: "absolute", width: "100%", display: "flex", justifyContent: "space-between", px: 2 }}>
              <IconButton onClick={handlePrev} sx={{ color: muiTheme.palette.primary.main }}>
                <ArrowBackIosNewIcon fontSize="large" />
              </IconButton>
              <IconButton onClick={handleNext} sx={{ color: muiTheme.palette.primary.main }}>
                <ArrowForwardIosIcon fontSize="large" />
              </IconButton>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default Page;
