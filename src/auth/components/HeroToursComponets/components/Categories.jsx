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

const Categories = () => {
  const {
    expandedCategories,
    setExpandedCategories,
    selectedCategories,
    handleToggleCategories,
    categoryCounts,
  } = useAppQueryContext();
  const { categories } = useTripsContext();
  const muiTheme = useTheme(); // ✅ يجيب الثيم الحالي

  return (
    <Accordion
      expanded={expandedCategories}
      onChange={() => setExpandedCategories((prev) => !prev)}
      sx={{
        backgroundColor: muiTheme.palette.background.paper, // ✅ خلفية من الثيم
        color: muiTheme.palette.text.primary, // ✅ نص أساسي أبيض خفيف
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
          borderBottom:
            !expandedCategories && selectedCategories.length === 0
              ? `1px solid ${muiTheme.palette.primary.main}` // ✅ حدود برتقالية
              : "none",
          "& .MuiAccordionSummary-content": { margin: 0 },
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{ color: muiTheme.palette.primary.main, fontWeight: "bold" }} // ✅ العنوان برتقالي
        >
          Categories
        </Typography>
      </AccordionSummary>

      <AccordionDetails
        sx={{
          borderBottom: `1px solid ${muiTheme.palette.divider}`, // ✅ حدود من الثيم
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
                  color: muiTheme.palette.primary.main, // ✅ برتقالي أساسي
                  "&.Mui-checked": { color: muiTheme.palette.primary.main },
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
                      color: muiTheme.palette.primary.main, // ✅ برتقالي أساسي
                      "&.Mui-checked": { color: muiTheme.palette.primary.main },
                    }}
                  />
                }
                label={card.name}
              />
              <Typography
                variant="body2"
                sx={{ color: muiTheme.palette.text.secondary }} // ✅ نص ثانوي رمادي كاتم
              >
                {categoryCounts[card.name] || 0}
              </Typography>
            </div>
          ))}
        </FormGroup>
      </AccordionDetails>
    </Accordion>
  );
};

export default Categories;
