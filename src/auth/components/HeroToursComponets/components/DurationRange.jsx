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

const DurationRange = () => {
  const {
    durationRange,
    setDurationRange,
    openDuration,
    anchorElDuration,
    handleDurationClick,
    handleDurationClose,
  } = useAppQueryContext();

  const muiTheme = useTheme(); // ✅ يجيب الثيم الحالي

  return (
    <Box
      sx={{
        borderBottom: `1px solid ${muiTheme.palette.primary.main}`, // ✅ حدود برتقالية
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
            color: muiTheme.palette.text.secondary, // ✅ نص ثانوي رمادي/برتقالي فاتح
            fontWeight: "600",
            fontSize: "0.95rem",
            letterSpacing: "0.5px",
          },
        }}
        InputProps={{
          style: {
            backgroundColor: muiTheme.palette.background.paper, // ✅ خلفية من الثيم
            color: muiTheme.palette.text.primary, // ✅ نص أساسي أبيض خفيف
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
        open={openDuration}
        anchorEl={anchorElDuration}
        onClose={handleDurationClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        PaperProps={{
          sx: {
            backgroundColor: muiTheme.palette.background.paper, // ✅ خلفية من الثيم
            color: muiTheme.palette.text.primary, // ✅ نص أساسي
            borderRadius: "20px",
            p: 2,
          },
        }}
      >
        <Box sx={{ width: 250 }}>
          <Typography
            gutterBottom
            sx={{
              color: muiTheme.palette.text.primary, // ✅ نص أساسي أبيض خفيف
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
              color: muiTheme.palette.primary.main, // ✅ برتقالي أساسي
              "& .MuiSlider-valueLabel": {
                color: muiTheme.palette.getContrastText(
                  muiTheme.palette.primary.main
                ),
                backgroundColor: muiTheme.palette.primary.main,
                borderRadius: "4px",
                fontWeight: "bold",
              },
              "& .MuiSlider-markLabel": {
                color: muiTheme.palette.text.secondary, // ✅ نص ثانوي
              },
            }}
          />
          <Button
            variant="contained"
            size="small"
            sx={{
              mt: 2,
              backgroundColor: muiTheme.palette.primary.main, // ✅ زر برتقالي أساسي
              color: muiTheme.palette.getContrastText(muiTheme.palette.primary.main),
              "&:hover": { backgroundColor: muiTheme.palette.primary.light }, // ✅ درجة أخف عند الـ hover
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
