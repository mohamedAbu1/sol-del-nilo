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
import { useTheme } from "@mui/material/styles"; // ✅ استدعاء الثيم

const PriceRange = () => {
  const {
    priceRange,
    setPriceRange,
    openPrice,
    anchorElPrice,
    handlePriceClick,
    handlePriceClose,
  } = useAppQueryContext();

  const muiTheme = useTheme(); // ✅ يجيب الثيم الحالي

  return (
    <Box
      sx={{
        borderBottom: `1px solid ${muiTheme.palette.primary.main}`, // ✅ الحدود من الثيم
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
            color: muiTheme.palette.secondary.main, // ✅ لون الليبل من الثيم
            fontWeight: "600",
            fontSize: "0.95rem",
            letterSpacing: "0.5px",
          },
        }}
        InputProps={{
          style: {
            color: muiTheme.palette.text.primary, // ✅ النصوص من الثيم
            backgroundColor: muiTheme.palette.background.paper, // ✅ الخلفية من الثيم
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
          backgroundColor: muiTheme.palette.background.paper,
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
            backgroundColor: muiTheme.palette.background.paper, // ✅ خلفية من الثيم
            color: muiTheme.palette.text.primary, // ✅ النصوص من الثيم
            borderRadius: "20px",
            p: 2,
          },
        }}
      >
        <Box sx={{ width: 250 }}>
          <Typography
            gutterBottom
            sx={{
              color: muiTheme.palette.text.primary,
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
              color: muiTheme.palette.primary.main, // ✅ اللون الأساسي من الثيم
              "& .MuiSlider-valueLabel": {
                color: muiTheme.palette.getContrastText(
                  muiTheme.palette.primary.main
                ),
                backgroundColor: muiTheme.palette.primary.main,
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
              backgroundColor: muiTheme.palette.primary.main, // ✅ زر من الثيم
              color: muiTheme.palette.getContrastText(
                muiTheme.palette.primary.main
              ),
              "&:hover": { backgroundColor: muiTheme.palette.secondary.main }, // ✅ عند الـ hover يتحول للون الثانوي
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
