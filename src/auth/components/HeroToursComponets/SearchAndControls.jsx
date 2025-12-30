"use client";
import {
  Box,
  IconButton,
  MenuItem,
  Select,
  ToggleButton,
  ToggleButtonGroup,
  Button,
  TextField,
  Autocomplete,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewListIcon from "@mui/icons-material/ViewList";
import { FiFilter } from "react-icons/fi";
import { useAppQueryContext } from "@/context/AppQueryContext";
import { useSearchContext } from "@/context/SearchContext";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const SearchAndControls = () => {
  const muiTheme = useTheme();
  const isSmallScreen = useMediaQuery("(max-width:600px)"); // ✅ كشف الشاشات الصغيرة
  const { filterSuggestions } = useSearchContext();

  const {
    setOpenDrawer,
    viewMode,
    setViewMode,
    sortBy,
    setSortBy,
    searchText,
    setSearchText,
  } = useAppQueryContext();

  const options = filterSuggestions(searchText).map((opt) => opt.name);

  const cities = ["Luxor", "Aswan", "Cairo", "Giza", "Hurghada"];

  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Box
        sx={{
          px: 4,
          py: 2,
          borderRadius: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
          marginBottom: "15px",
          backgroundColor: muiTheme.palette.background.paper,
          color: muiTheme.palette.text.primary,
          boxShadow: muiTheme.shadows[3],
        }}
      >
        {/* ✅ في الشاشات الكبيرة يظهر البحث */}
        {!isSmallScreen && (
          <Box sx={{ flex: 1, minWidth: 250 }}>
            <Autocomplete
              freeSolo
              options={options}
              value={searchText}
              onInputChange={(event, newValue) => setSearchText(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Search by city or category..."
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <IconButton>
                        <SearchIcon
                          sx={{ color: muiTheme.palette.primary.main }}
                        />
                      </IconButton>
                    ),
                  }}
                />
              )}
            />
          </Box>
        )}

        {/* ✅ في الشاشات الصغيرة يظهر مربعات فلتر */}
        {isSmallScreen && (
          <Box sx={{ display: "flex", gap: 2, overflowX: "auto", py: 1 }}>
            {/* زر All */}
            <Card
              key="all"
              sx={{
                minWidth: 70,
                flexShrink: 0,
                textAlign: "center",
                borderRadius: "25px",
                background: `linear-gradient(135deg, ${muiTheme.palette.secondary.dark}, ${muiTheme.palette.secondary.main})`,
                color: muiTheme.palette.getContrastText(
                  muiTheme.palette.secondary.main
                ),
                cursor: "pointer",
                boxShadow: muiTheme.shadows[4],
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: muiTheme.shadows[8],
                },
              }}
              onClick={() => setSearchText("")}
            >
              <CardContent>
                <Typography variant="h6" fontWeight="700">
                  All
                </Typography>
              </CardContent>
            </Card>

            {/* مربعات المدن */}
            {cities.map((city) => (
              <Card
                key={city}
                sx={{
                  minWidth: 70,
                  flexShrink: 0,
                  textAlign: "center",
                  borderRadius: "25px",
                  background: `linear-gradient(135deg, ${muiTheme.palette.primary.light}, ${muiTheme.palette.primary.dark})`,
                  color: "#fff",
                  cursor: "pointer",
                  boxShadow: muiTheme.shadows[3],
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: muiTheme.shadows[6],
                  },
                }}
                onClick={() => setSearchText(city)}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight="700" style={{color:"#fff"}}> 
                    {city}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}

        {/* باقي العناصر (Filters, Sort, View Mode) */}
        <Button
          variant="outlined"
          startIcon={<FiFilter />}
          sx={{
            display: { xs: "flex", xl: "none" },
            color: muiTheme.palette.secondary.main,
            borderColor: muiTheme.palette.primary.main,
          }}
          onClick={() => setOpenDrawer(true)}
        >
          Sidebar Filters
        </Button>

        <Select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          size="small"
        >
          <MenuItem value="alphabetical">Alphabetical – A to Z</MenuItem>
          <MenuItem value="price">Price – Low to High</MenuItem>
          <MenuItem value="duration">Duration – Short to Long</MenuItem>
          <MenuItem value="popular">Most Popular</MenuItem>
        </Select>

        <ToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={(e, newMode) => {
            if (newMode !== null) setViewMode(newMode);
          }}
        >
          <ToggleButton value="grid">
            <ViewModuleIcon />
          </ToggleButton>
          <ToggleButton value="list">
            <ViewListIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </motion.div>
  );
};

export default SearchAndControls;
