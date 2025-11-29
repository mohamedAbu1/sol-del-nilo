"use client";
import { Drawer, Box, Pagination } from "@mui/material";
import SearchAndControls from "./SearchAndControls";
import DailyTourCard from "./DailyTourCard ";
import SidebarFiltersMB from "./SidebarFiltersMB";
import { useAppContext } from "@/context/AppContext";
import { useAppQueryContext } from "@/context/AppQueryContext";
import { useTripsContext } from "@/context/TripsContext";
import { useTripContext } from "@/context/TripContext";

const TourListings = () => {
  const { theme } = useAppContext();
  const cityImages = {
    Luxor: "/assets/banner-luxor.webp",
    Cairo: "/assets/_17505_2.webp",
    Aswan: "/assets/_17610_1.webp",
    Alexandria: "/assets/mohanad-ayman-gpZExi4OrVg-unsplash.webp",
    "Sharm El Sheikh": "/assets/_16934_1.webp",
    "Marsa Alam": "/assets/_16601_1.webp",
    Hurghada: "/assets/_15990_1.webp",
    Giza: "/assets/_2182_1.webp",
  };

  const typeImages = {
    "Cultural & Historical": "/assets/_2182_1.webp",
    "Adventure Trips": "/assets/banner-adventure.webp",
    "Night Tours": "/assets/nathan-anderson-kujXUuh1X0o-unsplash.webp",
    "Luxury Tours": "/assets/_16332_Untitled-1.webp",
    "Boat & Nile Cruises": "/assets/_16106_Untitled-1.webp",
    "Family Friendly": "/assets/banner-Cruises-&-Sailing.webp",
    "One Day Trips": "/assets/_7583_banner-daytours.webp",
    "Eco & Nature Tours": "/assets/david-knieradl-dX6p6tGCWEo-unsplash.webp",
    "Wellness & Medical": "/assets/photo-1575923640658-37d9c2ad9f92.webp",
    "Shopping Tours": "/assets/_16668_2.webp",
    Spirituality: "/assets/bernd-dittrich-YFF5YC7HLo0-unsplash.webp",
    "Group Tours": "/assets/_8651_Untitled-1.webp",
  };

  const {
    openDrawer,
    setOpenDrawer,
    viewMode,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    sortedTours,
    visibleTours,
    selectedCity,
    setSelectedDestinations,
    setSelectedCategories,
    selectedType,
  } = useAppQueryContext();

  const { tours } = useTripContext();

  // ✅ لو مفيش نتائج
  let suggestedCities = [];
  let suggestedTypes = [];

  if (visibleTours.length === 0 && tours.length > 0) {
    if (selectedType) {
      suggestedCities = tours
        .filter((tour) => {
          const type = tour.category?.name || tour.category;
          return type?.toLowerCase() === selectedType.toLowerCase();
        })
        .map((tour) => tour.city?.name || tour.city);
    }

    if (selectedCity) {
      suggestedTypes = tours
        .filter((tour) => {
          const city = tour.city?.name || tour.city;
          return city?.toLowerCase() === selectedCity.toLowerCase();
        })
        .map((tour) => tour.category?.name || tour.category);
    }

    suggestedCities = [...new Set(suggestedCities)];
    suggestedTypes = [...new Set(suggestedTypes)];
  }

  return (
    <>
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        PaperProps={{
          sx: {
            backgroundColor: theme === "dark" ? "#030712" : "#fff",
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
          backgroundColor: theme === "dark" ? "#030712" : "#fff",
          minHeight: "100vh",
        }}
      >
        <SearchAndControls />

        <Box
          sx={{
            px: { xs: 2, sm: 4 },
            pb: 4,
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
            justifyContent: "center",
          }}
        >
          {visibleTours.length > 0 ? (
            visibleTours.map((tour) => (
              <DailyTourCard key={tour.id} tour={tour} viewMode={viewMode} />
            ))
          ) : (
            <div className="w-full text-center py-16 px-4 flex flex-col items-center justify-center">
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-6">
                No tours found for "{selectedType}" in "{selectedCity}"
              </h3>

              {/* ✅ اقتراح المدن */}
              {suggestedCities.length > 0 && (
                <div
                  style={{ marginTop: "10px" }}
                  className="mb-10 w-[400px] max-w-2xl"
                >
                  <p
                    style={{ paddingBottom: "10px" }}
                    className="text-sm text-gray-500 dark:text-gray-400 mb-4"
                  >
                    But you can find "{selectedType}" tours in:
                  </p>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-5"
                  >
                    {suggestedCities.map((city) => (
                      <div
                        key={city}
                        onClick={() => setSelectedDestinations([city])}
                        className="relative cursor-pointer group rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                      >
                        {/* ✅ الصورة */}
                        <img
                          src={cityImages[city] || "/images/default-city.jpg"}
                          alt={city}
                          className="h-40 w-full object-cover group-hover:scale-110 transition-all duration-500"
                        />

                        {/* ✅ طبقة التعتيم */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                        {/* ✅ الزر فوق الصورة */}
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
                          <button className="text-2xl lg:text-3xl font-serif tracking-widest capitalize text-white text-center"
                            style={{
                              textShadow: "2px 2px 6px rgba(0, 0, 0, 0.6)", // ظل ناعم
                              WebkitTextStroke: "1px #000", // حدود للحروف
                              fontWeight: "600",
                            }}>
                            {city}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ✅ اقتراح الأنواع */}
              {suggestedTypes.length > 0 && (
                <div
                  style={{
                    marginTop: "10px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  className="w-[400px] max-w-2xl"
                >
                  <p
                    style={{ paddingBottom: "10px" }}
                    className="text-sm text-gray-500 dark:text-gray-400 mb-4"
                  >
                    Or explore other types available in "{selectedCity}":
                  </p>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-5"
                  >
                    {suggestedTypes.map((type) => (
                      <div
                        key={type}
                        onClick={() => setSelectedCategories([type])}
                        className="relative cursor-pointer group rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                      >
                        {/* ✅ الصورة */}
                        <img
                          src={typeImages[type] || "/images/default-type.jpg"}
                          alt={type}
                          className="h-40 w-full object-cover group-hover:scale-110 transition-all duration-500"
                        />

                        {/* ✅ طبقة التعتيم */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                        {/* ✅ الزر فوق الصورة */}
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
                          <button
                            className="text-2xl lg:text-3xl font-serif tracking-widest capitalize text-white text-center"
                            style={{
                              textShadow: "2px 2px 6px rgba(0, 0, 0, 0.6)", // ظل ناعم
                              WebkitTextStroke: "1px #000", // حدود للحروف
                              fontWeight: "600",
                            }}
                          >
                            {type}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
