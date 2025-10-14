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

const Page = () => {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const { width } = useScreenSize();
  console.log(id);
    const router = useRouter();
  
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

  return (
    <Box sx={{ padding: 4 }}>
      <div className="w-full flex flex-row items-center justify-between">
        <Typography
          variant="h4"
          style={{ fontSize: width <= 1024 ? "18px" : "24px" }}
        >
          {tour?.title || "Pictures of the last trip"}
        </Typography>
        <Button
          onClick={() => router.push(`/tours/${tour.id}`)}
          className="btn-next-section3"
          style={{
            color: "#000",
            marginBottom: "20px",
            marginTop: "10px",
          }}
        >
          Back to book flight
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
                  style={{
                    width: "100%",
                    borderRadius: "30px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                    display: "block",
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
    </Box>
  );
};

export default Page;
