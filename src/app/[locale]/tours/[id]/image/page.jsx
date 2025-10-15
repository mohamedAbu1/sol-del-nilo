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

const Page = () => {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const { width } = useScreenSize();
  const router = useRouter();

  const [selectedImage, setSelectedImage] = useState(null);
  const [fullScreenOpen, setFullScreenOpen] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchTourWithImages = async () => {
      try {
        const response = await fetch(`/api/tourimage?tourId=${id}`);
        const result = await response.json();

        if (!response.ok) {
          console.error("❌ API Error:", result.error);
          return;
        }

        setTour(result);
      } catch (error) {
        console.error("❌ Fetch Error:", error.message);
      }
    };

    fetchTourWithImages();
  }, [id]);

  const handleImageClick = (img) => {
    setSelectedImage(img);
    setFullScreenOpen(true);
  };

  return (
    <Box sx={{ padding: 4 }}>
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
                  loading="lazy"
                  onClick={() => handleImageClick(img)}
                  style={{
                    width: "100%",
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

      {/* ✅ نافذة عرض الصورة بالحجم الكامل */}
      <AnimatePresence>
        {fullScreenOpen && selectedImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
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
              cursor: "zoom-out",
            }}
            onClick={() => setFullScreenOpen(false)}
          >
            <motion.img
              src={`/assets/${selectedImage.url}`}
              alt={selectedImage.name}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                maxWidth: "90%",
                maxHeight: "90%",
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
