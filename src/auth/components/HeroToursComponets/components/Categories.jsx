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
const Categories = () => {
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  const {
    expandedCategories,
    setExpandedCategories,
    selectedCategories,
    handleToggleCategories,
    categoryCounts,
  } = useAppQueryContext();
  const { categories } = useTripsContext();
  const { theme } = useAppContext();
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  return (
    <Accordion
      expanded={expandedCategories}
      onChange={() => setExpandedCategories((prev) => !prev)}
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
          borderBottom:
            !expandedCategories && selectedCategories.length === 0
              ? "1px solid #ff9800"
              : "none",
          "& .MuiAccordionSummary-content": { margin: 0 },
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{ color: "#ffb300", fontWeight: "bold" }}
        >
          Categories
        </Typography>
      </AccordionSummary>

      <AccordionDetails
        sx={{
          borderBottom: "1px solid #ff9800",
          "& .MuiAccordionSummary-content": { margin: 0 },
        }}
      >
        <FormGroup>
          {/* ✅ خيار All */}
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedCategories.length === categories.length}
                disabled
                onChange={() => handleToggleCategories("ALL")}
                sx={{
                  color: "#ff9800",
                  "&.Mui-checked": { color: "#ff9800" },
                }}
              />
            }
            label="All"
          />

          {/* ✅ الفئات الفردية */}
          {categories.map((card) => (
            <div
              key={card.id}
              className="flex flex-row items-center justify-between"
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedCategories.includes(card.name)}
                    onChange={() => handleToggleCategories(card.name)}
                    sx={{
                      color: "#ff9800",
                      "&.Mui-checked": { color: "#ff9800" },
                    }}
                  />
                }
                label={card.name}
              />
              <h4 className="text-gray-700 text-[16px]">
                {categoryCounts[card.name] || 0}
              </h4>
            </div>
          ))}
        </FormGroup>
      </AccordionDetails>
    </Accordion>
  );
};

export default Categories;
