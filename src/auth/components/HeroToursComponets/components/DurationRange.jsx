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
const DurationRange = () => {
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  const {
    durationRange,
    setDurationRange,
    openDuration,
    anchorElDuration,
    handleDurationClick,
    handleDurationClose,
  } = useAppQueryContext();
  const { theme } = useAppContext();
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  return (
    <Box
      sx={{
        borderBottom: "1px solid #ff9800",
        marginTop: "15px",
        "& .MuiAccordionSummary-content": {
          margin: 4,
        },
      }}
    >
      <TextField
        label="Duration (Nights)"
        value={`${durationRange[1]} Nights`}
        onClick={handleDurationClick}
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
            backgroundColor: theme === "dark" ? "#030712" : "#fff",
            color: theme === "dark" ? "#fff" : "#030712",
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
        open={openDuration}
        anchorEl={anchorElDuration}
        onClose={handleDurationClose}
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
            Adjust Duration
          </Typography>
          <Slider
            value={durationRange}
            onChange={(e, newValue) => setDurationRange(newValue)}
            valueLabelDisplay="auto"
            min={0}
            max={30}
            sx={{
              color: "#ff9800",
              "& .MuiSlider-valueLabel": {
                color: theme === "dark" ? "#fff" : "#030712",
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
            onClick={handleDurationClose}
          >
            Done
          </Button>
        </Box>
      </Popover>
    </Box>
  );
};

export default DurationRange;
