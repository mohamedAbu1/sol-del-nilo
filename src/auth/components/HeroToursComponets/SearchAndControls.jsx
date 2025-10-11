"use client";
import {
  Box,
  TextField,
  IconButton,
  MenuItem,
  Select,
  ToggleButton,
  ToggleButtonGroup,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewListIcon from "@mui/icons-material/ViewList";
import { FiFilter } from "react-icons/fi";

const SearchAndControls = ({
  onOpenFilters,
  viewMode,
  setViewMode,
  theme,
  sortBy,
  setSortBy,
}) => {
  return (
    <Box
      sx={{
        color: "#fff",
        px: 4,
        py: 2,
        borderRadius: "16px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 2,
        marginBottom: "15px",
      }}
      className="bg-white dark:bg-[#212121]"
    >
      {/* ✅ حقل البحث */}
      <Box sx={{ flex: 1, minWidth: 250 }}>
        <TextField
          placeholder="Search tours..."
          variant="outlined"
          fullWidth
          InputProps={{
            startAdornment: (
              <IconButton>
                <SearchIcon sx={{ color: "#ffb300" }} />
              </IconButton>
            ),
            sx: {
              color: theme === "dark" ? "#fff" : "#2c2c2c",
              backgroundColor: theme === "dark" ? "#2c2c2c" : "#fff",
              borderRadius: "12px",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ff9800",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ffb300",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ffb300",
              },
              "::placeholder": {
                color: "red",
              },
            },
          }}
        />
      </Box>

      {/* ✅ زر Sidebar Filters للموبايل فقط */}
      <Button
        variant="outlined"
        startIcon={<FiFilter />}
        sx={{
          display: { xs: "flex", xl: "none" },
          color: "#ffb300",
          borderColor: "#ffb300",
          fontWeight: "500",
          textTransform: "none",
          "&:hover": {
            backgroundColor: "#ffb300",
            color: "#212121",
          },
        }}
        onClick={onOpenFilters}
      >
        Sidebar Filters
      </Button>

      {/* ✅ خيارات الترتيب */}
      <Select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        size="small"
        sx={{
          color: theme === "dark" ? "#fff" : "#2c2c2c",
          borderRadius: "8px",
          fontWeight: "500",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ff9800",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ffb300",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ffb300",
          },
        }}
      >
        <MenuItem value="alphabetical">Alphabetical – A to Z</MenuItem>
        <MenuItem value="price">Price – Low to High</MenuItem>
        <MenuItem value="duration">Duration – Short to Long</MenuItem>
        <MenuItem value="popular">Most Popular</MenuItem>
      </Select>

      {/* ✅ عرض الشبكة أو القائمة */}
      <ToggleButtonGroup
        value={viewMode}
        exclusive
        onChange={(e, newMode) => {
          if (newMode !== null) setViewMode(newMode);
        }}
      >
        <ToggleButton value="grid">
          <ViewModuleIcon
            sx={{ color: viewMode === "grid" ? "#ff9800" : "#000" }}
          />
        </ToggleButton>
        <ToggleButton value="list">
          <ViewListIcon
            sx={{ color: viewMode === "list" ? "#ff9800" : "#000" }}
          />
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default SearchAndControls;
