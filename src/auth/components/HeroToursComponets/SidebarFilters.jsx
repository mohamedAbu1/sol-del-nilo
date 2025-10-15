"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Slider,
  TextField,
  Button,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Popover,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSearchParams, useRouter } from "next/navigation";

const SidebarFilters = ({ theme, tours }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // ✅ استخراج القيم من الكويري
  const cityFromQuery = searchParams.get("destination") || "";
  const categoryFromQuery = searchParams.get("category") || "";
  const date = searchParams.get("date") || "";
  const minPrice = parseInt(searchParams.get("minPrice") || "0");
  const maxPrice = parseInt(searchParams.get("maxPrice") || "14000");
  const Nights = parseInt(searchParams.get("duration") || "0");
  const [expanded, setExpanded] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState(true);
  // ✅ حالات الفلاتر
  const [selectedDestinations, setSelectedDestinations] = useState(
    cityFromQuery ? [cityFromQuery] : []
  );
  const [selectedCategories, setSelectedCategories] = useState(
    categoryFromQuery ? [categoryFromQuery] : []
  );
  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);
  const [durationRange, setDurationRange] = useState([0, Nights || 10]);

  const [anchorElPrice, setAnchorElPrice] = useState(null);
  const [anchorElDuration, setAnchorElDuration] = useState(null);
  const openPrice = Boolean(anchorElPrice);
  const openDuration = Boolean(anchorElDuration);

  const [cities, setCities] = useState([]);
  const [cards, setCards] = useState([]);

  // ✅ جلب المدن
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await fetch("/api/city");
        const data = await res.json();
        if (res.ok) setCities(data);
        else console.error("❌ خطأ في جلب المدن:", data.error);
      } catch (err) {
        console.error("❌ فشل الاتصال:", err);
      }
    };
    fetchCities();
  }, []);

  // ✅ جلب الفئات
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        if (res.ok) setCards(data);
        else console.error("❌ خطأ في جلب الفئات:", data.error);
      } catch (err) {
        console.error("❌ فشل الاتصال:", err);
      }
    };
    fetchCards();
  }, []);

  // ✅ تحديث الكويري
  const updateQueryParams = () => {
    const query = new URLSearchParams({
      destination: selectedDestinations.join(","),
      category: selectedCategories.join(","),
      date,
      duration: durationRange[1].toString(),
      minPrice: priceRange[0].toString(),
      maxPrice: priceRange[1].toString(),
    }).toString();

    router.push(`/tours?${query}`);
  };

  // ✅ التعامل مع الفلاتر
  const handleToggle = (cityName) => {
    let updated;

    // ✅ إذا تم اختيار "All"، نحدد كل المدن
    if (cityName === "ALL") {
      updated = cities.map((city) => city.name);
    } else {
      // ✅ إضافة أو إزالة المدينة من القائمة المختارة
      updated = selectedDestinations.includes(cityName)
        ? selectedDestinations.filter((d) => d !== cityName)
        : [...selectedDestinations, cityName];
    }

    // ✅ تحديث الحالة
    setSelectedDestinations(updated);

    // ✅ بناء الكويري بناءً على القيم الحالية
    const queryParams = new URLSearchParams();

    if (updated.length > 0) queryParams.set("destination", updated.join(","));
    if (selectedCategories.length > 0)
      queryParams.set("category", selectedCategories.join(","));
    if (date) queryParams.set("date", date);
    if (durationRange[1])
      queryParams.set("duration", durationRange[1].toString());
    queryParams.set("minPrice", priceRange[0].toString());
    queryParams.set("maxPrice", priceRange[1].toString());

    // ✅ تحديث عنوان الصفحة بدون إعادة تحميل
    router.push(`/tours?${queryParams.toString()}`, { scroll: false });
  };

  const handleToggleCategories = (categoryName) => {
    let updated;

    if (categoryName === "ALL") {
      updated = cards.map((card) => card.name); // ✅ كل الفئات
    } else {
      updated = selectedCategories.includes(categoryName)
        ? selectedCategories.filter((c) => c !== categoryName)
        : [...selectedCategories, categoryName];
    }

    setSelectedCategories(updated);

    const query = new URLSearchParams({
      destination: selectedDestinations.join(","),
      category: updated.join(","),
      date,
      duration: durationRange[1].toString(),
      minPrice: priceRange[0].toString(),
      maxPrice: priceRange[1].toString(),
    }).toString();

    router.push(`/tours?${query}`);
  };

  const handlePriceClick = (e) => setAnchorElPrice(e.currentTarget);
  const handlePriceClose = () => {
    setAnchorElPrice(null);
    updateQueryParams();
  };

  const handleDurationClick = (e) => setAnchorElDuration(e.currentTarget);
  const handleDurationClose = () => {
    setAnchorElDuration(null);
    updateQueryParams();
  };
  const cityCounts = tours.reduce((acc, city) => {
    acc[city.city.name] = (acc[city.city.name] || 0) + 1;
    return acc;
  }, {});
  const categoryCounts = tours.reduce((acc, city) => {
    acc[city.category.name] = (acc[city.category.name] || 0) + 1;
    return acc;
  }, {});
  return (
    <div
      className="hidden xl:block"
      style={{
        width: "25%",
        display: { xs: "none", xl: "flex" },
        minWidth: { lg: "25%" },
        borderTopRightRadius: "20px",
        borderBottomRightRadius: "20px",
        backgroundColor: theme === "dark" ? "#212121" : "#fff",
        p: 3,
        boxShadow: 4,
        color: "#fff",
      }}
    >
      <Box
        sx={{
          width: "100%",
          borderTopRightRadius: "20px",
          borderBottomRightRadius: "20px",
          p: 3,
          backgroundColor: theme === "dark" ? "#212121" : "#fff",
          boxShadow: 4,
          color: "#fff",
        }}
      >
        <Typography
          variant="h6"
          sx={{ color: "#ffb300", mb: 3, fontWeight: "bold" }}
        >
          Filter Tours
        </Typography>
        {/* Destination */}

        <Accordion
          expanded={expanded}
          onChange={() => setExpanded((prev) => !prev)}
          sx={{
            backgroundColor: theme === "dark" ? "#212121" : "#fff",
            color: theme === "dark" ? "#fff" : "#212121",
            borderRadius: "12px",
            boxShadow: "none",
            mb: 2,
            "&::before": { display: "none" },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "#ffb300" }} />}
            sx={{
              backgroundColor: theme === "dark" ? "#212121" : "#fff",
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
              backgroundColor: theme === "dark" ? "#212121" : "#fff",
              borderBottom: "1px solid #ff9800",
            }}
          >
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedDestinations.length === cities.length}
                    onChange={() => handleToggle("ALL")}
                    sx={{
                      color: "#ff9800",
                      "&.Mui-checked": { color: "#00e676" },
                    }}
                  />
                }
                label="All"
              />

              {cities.map((city) => (
                <div key={city.id} className="flex flex-row items-center justify-between">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedDestinations.includes(city.name)}
                        onChange={() => handleToggle(city.name)}
                        sx={{
                          color: "#ff9800",
                          "&.Mui-checked": { color: "#00e676" },
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

        {/* ✅ Price Range */}
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
                color: theme === "dark" ? "#fff" : "#212121",
                backgroundColor: theme === "dark" ? "#212121" : "#fff",
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
              backgroundColor: theme === "dark" ? "#212121" : "#fff",
              transition: "box-shadow 0.3s ease",
              "& .MuiInputBase-input": {
                fontFamily:
                  "'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif",
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
                backgroundColor: theme === "dark" ? "#212121" : "#fff",
                color: theme === "dark" ? "#fff" : "#212121",
                borderRadius: "20px",
                p: 2,
              },
            }}
          >
            <Box sx={{ width: 250 }}>
              <Typography
                gutterBottom
                sx={{
                  color: theme === "dark" ? "#fff" : "#212121",
                  backgroundColor: theme === "dark" ? "#212121" : "#fff",
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

        {/* ✅ Duration Range */}
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
                backgroundColor: theme === "dark" ? "#212121" : "#fff",
                color: theme === "dark" ? "#fff" : "#212121",
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
              backgroundColor: theme === "dark" ? "#212121" : "#fff",
              transition: "box-shadow 0.3s ease",
              "& .MuiInputBase-input": {
                fontFamily:
                  "'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif",
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
                backgroundColor: theme === "dark" ? "#212121" : "#fff",
                color: theme === "dark" ? "#fff" : "#212121",
                borderRadius: "20px",
                p: 2,
              },
            }}
          >
            <Box sx={{ width: 250 }}>
              <Typography
                gutterBottom
                sx={{
                  color: theme === "dark" ? "#fff" : "#212121",
                  backgroundColor: theme === "dark" ? "#212121" : "#fff",
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
                    color: theme === "dark" ? "#fff" : "#212121",
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

        {/* Trip Types */}

        {/* Categories */}

        <Accordion
          expanded={expandedCategories}
          onChange={() => setExpandedCategories((prev) => !prev)}
          sx={{
            backgroundColor: theme === "dark" ? "#212121" : "#fff",
            color: theme === "dark" ? "#fff" : "#212121",
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
                    checked={selectedCategories.length === cards.length}
                    onChange={() => handleToggleCategories("ALL")}
                    sx={{
                      color: "#ff9800",
                      "&.Mui-checked": { color: "#00e676" },
                    }}
                  />
                }
                label="All"
              />

              {/* ✅ الفئات الفردية */}
              {cards.map((card) => (
                <div key={card.id} className="flex flex-row items-center justify-between">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedCategories.includes(card.name)}
                        onChange={() => handleToggleCategories(card.name)}
                        sx={{
                          color: "#ff9800",
                          "&.Mui-checked": { color: "#00e676" },
                        }}
                      />
                    }
                    label={card.name}
                  />
                  <h4 className="text-gray-700 text-[16px]">{categoryCounts[card.name] || 0}</h4>
                </div>
              ))}
            </FormGroup>
          </AccordionDetails>
        </Accordion>
      </Box>
    </div>
  );
};

export default SidebarFilters;
