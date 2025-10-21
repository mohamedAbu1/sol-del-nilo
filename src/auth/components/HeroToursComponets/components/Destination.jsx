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
import { useAppContext } from "@/context/AppContext";
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
const Destination = () => {
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  const {
    expanded,
    setExpanded,
    selectedDestinations,
    handleToggle,
    cityCounts,
  } = useAppQueryContext();
  const { cities } = useTripsContext();
  const { theme } = useAppContext();
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  return (
    <Accordion
      expanded={expanded}
      onChange={() => setExpanded((prev) => !prev)}
      sx={{
        backgroundColor: theme === "dark" ? "#030712" : "#fff",
        color: theme === "dark" ? "#fff" : "#030712",
        borderRadius: "12px",
        boxShadow: "none",
        mb: 2,
        "&::before": { display: "none" },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: "#ffb300" }} />}
        sx={{
          backgroundColor: theme === "dark" ? "#030712" : "#fff",
          borderBottom:
            !expanded && selectedDestinations.length === 0
              ? "1px solid #ff9800"
              : "none",
          "& .MuiAccordionSummary-content": { margin: 0 },
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{ color: "#ffb300", fontWeight: "bold" }}
        >
          Destination
        </Typography>
      </AccordionSummary>

      <AccordionDetails
        sx={{
          backgroundColor: theme === "dark" ? "#030712" : "#fff",
          borderBottom: "1px solid #ff9800",
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
              color: "#ff9800",
              "&.Mui-checked": { color: "#ff9800" },
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
                  color: "#ff9800",
                  "&.Mui-checked": { color: "#ff9800" },
                }}
              />
            }
            label={city.name}
          />
          <h4 className="text-gray-700 text-[16px]">
            {cityCounts[city.name] || 0}
          </h4>
        </div>
      ))}
    </FormGroup>
      </AccordionDetails>
    </Accordion>
  );
};

export default Destination;
