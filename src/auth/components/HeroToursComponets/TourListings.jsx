"use client";
import { Drawer, Box, Pagination, Typography } from "@mui/material";
import SearchAndControls from "./SearchAndControls";
import DailyTourCard from "./DailyTourCard ";
import SidebarFiltersMB from "./SidebarFiltersMB";
import { useAppContext } from "@/context/AppContext";
import { useAppQueryContext } from "@/context/AppQueryContext";
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
const TourListings = () => {
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  const { theme } = useAppContext();
  const {
    openDrawer,
    setOpenDrawer,
    viewMode,
    fadeKey,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    sortedTours,
    visibleTours,
  } = useAppQueryContext();
  console.log(visibleTours);
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  return (
    <>
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        PaperProps={{
          sx: {
            backgroundColor: theme === "dark" ? "#030712" : "#fff",
            color: "#fff",
            width: "80%",
            padding: 2,
            borderRadius: "20px",
          },
        }}
      >
        <SidebarFiltersMB />
      </Drawer>

      <main
        className="w-full flex flex-col"
        style={{
          backgroundColor: theme === "dark" ? "#030712" : "#f9f9f9",
          minHeight: "100vh",
          transition: "background-color 0.4s ease",
          borderRadius: "20px",
        }}
      >
        <SearchAndControls />

        <Box
          key={fadeKey}
          sx={{
            px: { xs: 2, sm: 4 },
            pb: 4,
            width: "100%",
            display: "flex",
            flexDirection: viewMode === "list" ? "column" : "row",
            flexWrap: viewMode === "grid" ? "wrap" : "nowrap",
            gap: 3,
            justifyContent: viewMode === "grid" ? "center" : "flex-start",
            animation: "fadeIn 0.5s ease-in-out",
          }}
        >
          {visibleTours.length > 0 ? (
            visibleTours.map((tour) => (
              <DailyTourCard key={tour.id} tour={tour} viewMode={viewMode} />
            ))
          ) : (
            <div className="w-full text-center py-16 px-4 flex flex-col items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-yellow-500 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 9.75h.008v.008H9.75V9.75zm4.5 0h.008v.008h-.008V9.75zM12 15.75c1.5 0 2.25-1.5 2.25-1.5H9.75s.75 1.5 2.25 1.5z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                للأسف، لا توجد رحلات متوفرة حاليًا لهذه الفئة
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                حاول اختيار فئة أخرى أو تعديل الفلاتر للحصول على نتائج.
              </p>
            </div>
          )}
        </Box>

        <Pagination
          count={Math.ceil(sortedTours.length / itemsPerPage)}
          page={currentPage}
          onChange={(e, value) => setCurrentPage(value)}
          variant="outlined"
          shape="rounded"
          size="medium"
          sx={{
            alignSelf: "center",
            mb: 4,
            "& .MuiPaginationItem-root": {
              fontWeight: 600,
              borderRadius: "12px",
              border: `1px solid ${theme === "dark" ? "#444" : "#ccc"}`,
              color: theme === "dark" ? "#eee" : "#333",
              backgroundColor: theme === "dark" ? "#1e1e1e" : "#fff",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: theme === "dark" ? "#333" : "#f0f0f0",
              },
              "&.Mui-selected": {
                backgroundColor: theme === "dark" ? "#ffb300" : "#ffc107",
                color: theme === "dark" ? "#212121" : "#fff",
                borderColor: theme === "dark" ? "#ffb300" : "#ffc107",
                boxShadow:
                  theme === "dark"
                    ? "0 0 10px rgba(255,179,0,0.4)"
                    : "0 0 10px rgba(255,193,7,0.4)",
              },
            },
          }}
        />
      </main>
    </>
  );
};

export default TourListings;
