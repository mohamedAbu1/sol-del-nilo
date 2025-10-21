"use client";
import React from "react";
import {
  Box,
  Typography,
  Slider,
  TextField,
  Button,
  Popover,
} from "@mui/material";
import { useAppQueryContext } from "@/context/AppQueryContext";
import { useAppContext } from "@/context/AppContext";
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
const PriceRange = () => {
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  const {
    priceRange,
    setPriceRange,
    openPrice,
    anchorElPrice,
    handlePriceClick,
    handlePriceClose,
  } = useAppQueryContext();
  const { theme } = useAppContext();
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  return (
    <Box
      sx={{
        borderBottom: "1px solid #ff9800",
        "& .MuiAccordionSummary-content": {
          margin: 4,
        },
      }}
    >
      <TextField
        label="Price Range ($)"
        value={`$${priceRange[0]} - $${priceRange[1]}`}
        onClick={handlePriceClick}
        fullWidth
        readOnly
        variant="standard"
        InputLabelProps={{
          style: {
            color: "#ffb300",
            fontWeight: "600",
            fontSize: "0.95rem",
            letterSpacing: "0.5px",
          },
        }}
        InputProps={{
          style: {
            color: theme === "dark" ? "#fff" : "#030712",
            backgroundColor: theme === "dark" ? "#030712" : "#fff",
            fontSize: "1rem",
            fontWeight: "500",
            letterSpacing: "0.3px",
          },
          disableUnderline: true,
        }}
        sx={{
          cursor: "pointer",
          borderRadius: "14px",
          px: 2,
          py: 1.5,
          backgroundColor: theme === "dark" ? "#030712" : "#fff",
          transition: "box-shadow 0.3s ease",
          "& .MuiInputBase-input": {
            fontFamily: "'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif",
          },
        }}
      />

      <Popover
        open={openPrice}
        anchorEl={anchorElPrice}
        onClose={handlePriceClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        PaperProps={{
          sx: {
            backgroundColor: theme === "dark" ? "#030712" : "#fff",
            color: theme === "dark" ? "#fff" : "#030712",
            borderRadius: "20px",
            p: 2,
          },
        }}
      >
        <Box sx={{ width: 250 }}>
          <Typography
            gutterBottom
            sx={{
              color: theme === "dark" ? "#fff" : "#030712",
              backgroundColor: theme === "dark" ? "#030712" : "#fff",
              fontSize: "1rem",
              fontWeight: "500",
              letterSpacing: "0.3px",
            }}
          >
            Adjust Price Range
          </Typography>
          <Slider
            value={priceRange}
            onChange={(e, newValue) => setPriceRange(newValue)}
            valueLabelDisplay="auto"
            min={0}
            max={14000}
            sx={{
              color: "#ff9800",
              "& .MuiSlider-valueLabel": {
                color: "#fff",
                backgroundColor: "#ff9800",
                borderRadius: "4px",
                fontWeight: "bold",
              },
            }}
          />
          <Button
            variant="contained"
            size="small"
            sx={{
              mt: 2,
              backgroundColor: "#ff9800",
              color: "#000",
              "&:hover": { backgroundColor: "#ffa726" },
            }}
            onClick={handlePriceClose}
          >
            Done
          </Button>
        </Box>
      </Popover>
    </Box>
  );
};

export default PriceRange;
