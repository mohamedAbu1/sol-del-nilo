"use client";
import React from "react";
import {
  Typography,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useAppQueryContext } from "@/context/AppQueryContext";
import { useTripsContext } from "@/context/TripsContext";
import { useTheme } from "@mui/material/styles"; // ✅ استدعاء الثيم

const Destination = () => {
  const {
    expanded,
    setExpanded,
    selectedDestinations,
    handleToggle,
    cityCounts,
  } = useAppQueryContext();
  const { cities } = useTripsContext();
  const muiTheme = useTheme(); // ✅ يجيب الثيم الحالي

  return (
    <Accordion
      expanded={expanded}
      onChange={() => setExpanded((prev) => !prev)}
      sx={{
        backgroundColor: muiTheme.palette.background.paper, // ✅ خلفية من الثيم
        color: muiTheme.palette.text.primary, // ✅ النصوص الأساسية
        borderRadius: "12px",
        boxShadow: "none",
        mb: 2,
        "&::before": { display: "none" },
      }}
    >
      <AccordionSummary
        expandIcon={
          <ExpandMoreIcon sx={{ color: muiTheme.palette.primary.main }} /> // ✅ أيقونة برتقالية
        }
        sx={{
          backgroundColor: muiTheme.palette.background.paper,
          borderBottom:
            !expanded && selectedDestinations.length === 0
              ? `1px solid ${muiTheme.palette.primary.main}` // ✅ حدود برتقالية
              : "none",
          "& .MuiAccordionSummary-content": { margin: 0 },
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{ color: muiTheme.palette.primary.main, fontWeight: "bold" }} // ✅ العنوان برتقالي
        >
          Destination
        </Typography>
      </AccordionSummary>

      <AccordionDetails
        sx={{
          backgroundColor: muiTheme.palette.background.paper,
          borderBottom: `1px solid ${muiTheme.palette.divider}`, // ✅ حدود من الثيم
        }}
      >
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedDestinations.length === cities.length}
                onChange={() => handleToggle("ALL")}
                disabled
                sx={{
                  color: muiTheme.palette.primary.main, // ✅ برتقالي أساسي
                  "&.Mui-checked": { color: muiTheme.palette.primary.main },
                }}
              />
            }
            label="All"
          />

          {cities.map((city) => (
            <div
              key={city.id}
              className="flex flex-row items-center justify-between"
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedDestinations.includes(city.name)}
                    onChange={() => handleToggle(city.name)}
                    sx={{
                      color: muiTheme.palette.primary.main, // ✅ برتقالي أساسي
                      "&.Mui-checked": { color: muiTheme.palette.primary.main },
                    }}
                  />
                }
                label={city.name}
              />
              <Typography
                variant="body2"
                sx={{ color: muiTheme.palette.text.secondary }} // ✅ نص ثانوي رمادي/برتقالي فاتح
              >
                {cityCounts[city.name] || 0}
              </Typography>
            </div>
          ))}
        </FormGroup>
      </AccordionDetails>
    </Accordion>
  );
};

export default Destination;
