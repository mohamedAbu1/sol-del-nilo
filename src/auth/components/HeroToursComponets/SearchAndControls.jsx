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
import { useAppQueryContext } from "@/context/AppQueryContext";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles"; // ✅ استدعاء الثيم

const SearchAndControls = () => {
  const muiTheme = useTheme(); // ✅ يجيب الثيم الحالي

  const {
    setOpenDrawer,
    viewMode,
    setViewMode,
    sortBy,
    setSortBy,
    searchText,
    setSearchText,
  } = useAppQueryContext();

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
          backgroundColor: muiTheme.palette.background.paper, // ✅ خلفية من الثيم
          color: muiTheme.palette.text.primary, // ✅ النصوص من الثيم
          boxShadow: muiTheme.shadows[3], // ✅ ظل من الثيم
        }}
      >
        {/* ✅ حقل البحث */}
        <Box sx={{ flex: 1, minWidth: 250 }}>
          <TextField
            placeholder="Search tours..."
            variant="outlined"
            fullWidth
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            InputProps={{
              startAdornment: (
                <IconButton>
                  <SearchIcon sx={{ color: muiTheme.palette.primary.main }} />
                </IconButton>
              ),
              sx: {
                color: muiTheme.palette.text.primary,
                backgroundColor: muiTheme.palette.background.paper,
                borderRadius: "12px",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: muiTheme.palette.primary.main,
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: muiTheme.palette.secondary.main,
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: muiTheme.palette.secondary.main,
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
            color: muiTheme.palette.primary.main,
            borderColor: muiTheme.palette.primary.main,
            fontWeight: "500",
            textTransform: "none",
            "&:hover": {
              backgroundColor: muiTheme.palette.primary.main,
              color: muiTheme.palette.getContrastText(
                muiTheme.palette.primary.main
              ),
            },
          }}
          onClick={() => setOpenDrawer(true)}
        >
          Sidebar Filters
        </Button>

        {/* ✅ خيارات الترتيب */}
        <Select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          size="small"
          sx={{
            color: muiTheme.palette.text.primary,
            borderRadius: "8px",
            fontWeight: "500",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: muiTheme.palette.primary.main,
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: muiTheme.palette.secondary.main,
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: muiTheme.palette.secondary.main,
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
              sx={{
                color:
                  viewMode === "grid"
                    ? muiTheme.palette.primary.main
                    : muiTheme.palette.text.secondary,
              }}
            />
          </ToggleButton>
          <ToggleButton value="list">
            <ViewListIcon
              sx={{
                color:
                  viewMode === "list"
                    ? muiTheme.palette.primary.main
                    : muiTheme.palette.text.secondary,
              }}
            />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </motion.div>
  );
};

export default SearchAndControls;
