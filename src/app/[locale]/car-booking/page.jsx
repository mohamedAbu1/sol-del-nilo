"use client"
import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LocalAirportIcon from "@mui/icons-material/LocalAirport";
import HotelIcon from "@mui/icons-material/Hotel";
import SectionSix from "@/auth/components/HeroComponets/SectionSix";
import FacePage from "@/auth/components/HeroToursComponets/FacePage";
import Header from "@/auth/components/HeaderComponets/Header";
// import { cookies } from "next/headers";
// import { vrefyTokenForPage } from "@/lib/utils/veryfyToken";
// import SectionSix from "@/auth/components/HeroComponets/SectionSix";

const airports = [
  "Cairo International Airport",
  "Luxor International Airport",
  "Aswan International Airport",
  "Hurghada International Airport",
  "Sharm El-Sheikh International Airport",
  "Borg El Arab Airport (Alexandria)",
  "Marsa Alam International Airport",
  "Port Said Airport",
];

export async function CarBookingPage() {
  const muiTheme = useTheme();
  const [airport, setAirport] = useState("");
  const [hotel, setHotel] = useState("");
  const [km, setKm] = useState("");
  const pricePerKm = 25;
  const totalCost = km ? km * pricePerKm : 0;
//  const cookieStore = await cookies();
//   const token = cookieStore.get("jwttoken")?.value;
//   const user = vrefyTokenForPage(token);
  return (
    <Box
      sx={{
        p: 6,
        backgroundColor: muiTheme.palette.background.default,
        minHeight: "100vh",
      }}
    >
      <FacePage user={user} />
      {/* ✅ Hero Section */}
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            mb: 2,
            color: muiTheme.palette.primary.main,
            textShadow: `2px 2px 6px ${muiTheme.palette.grey[900]}90`,
          }}
        >
          Luxury Airport Transfers Across Egypt
        </Typography>
        <Box
          sx={{
            width: "100px",
            height: "4px",
            background: `linear-gradient(90deg, ${muiTheme.palette.primary.main}, ${muiTheme.palette.secondary.main})`,
            borderRadius: "2px",
            mx: "auto",
            mb: 3,
          }}
        />
        <Typography
          variant="body1"
          sx={{
            mb: 3,
            color: muiTheme.palette.text.secondary,
            maxWidth: "700px",
            mx: "auto",
          }}
        >
          Book your premium car transfer from any airport in Egypt to your
          hotel, or vice versa. Enjoy comfort, safety, and punctuality with our
          professional drivers and modern vehicles.
        </Typography>
      </Box>

      {/* ✅ Booking Form Section */}
      <Card
        sx={{
          maxWidth: 900,
          mx: "auto",
          boxShadow: muiTheme.shadows[6],
          borderRadius: "16px",
        }}
      >
        <CardContent>
          <Grid container spacing={3}>
            {/* Airport Selection */}
            <Grid item xs={12}>
              <TextField
                select
                label="Select Airport"
                value={airport}
                onChange={(e) => setAirport(e.target.value)}
                fullWidth
                InputProps={{
                  startAdornment: <LocalAirportIcon sx={{ mr: 1 }} />,
                }}
              >
                {airports.map((a) => (
                  <MenuItem key={a} value={a}>
                    {a}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Hotel Selection */}
            <Grid item xs={12}>
              <TextField
                label="Hotel / Destination"
                value={hotel}
                onChange={(e) => setHotel(e.target.value)}
                fullWidth
                InputProps={{ startAdornment: <HotelIcon sx={{ mr: 1 }} /> }}
                placeholder="Type or select hotel name"
              />
            </Grid>

            {/* Distance */}
            <Grid item xs={12}>
              <TextField
                type="number"
                label="Distance (km)"
                value={km}
                onChange={(e) => setKm(e.target.value)}
                fullWidth
                InputProps={{
                  startAdornment: <DirectionsCarIcon sx={{ mr: 1 }} />,
                }}
              />
            </Grid>

            {/* Cost */}
            <Grid item xs={12}>
              <Typography
                variant="h6"
                sx={{ color: muiTheme.palette.primary.main, fontWeight: 700 }}
              >
                Total Cost: {totalCost} USD
              </Typography>
            </Grid>

            {/* Confirm Button */}
            <Grid item xs={12}>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: muiTheme.palette.primary.main,
                  color: muiTheme.palette.getContrastText(
                    muiTheme.palette.primary.main
                  ),
                  fontWeight: 600,
                  py: 1.5,
                  borderRadius: "12px",
                  "&:hover": {
                    backgroundColor: muiTheme.palette.secondary.main,
                  },
                }}
              >
                Confirm Booking
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* ✅ Info Section */}
      <Grid container spacing={4} sx={{ mt: 6 }}>
        {[
          {
            icon: <DirectionsCarIcon fontSize="large" />,
            title: "Comfort",
            desc: "Modern, spacious vehicles for a relaxing journey.",
          },
          {
            icon: <LocalAirportIcon fontSize="large" />,
            title: "Efficiency",
            desc: "Fast transfers from and to any airport.",
          },
          {
            icon: <HotelIcon fontSize="large" />,
            title: "Safety",
            desc: "Professional drivers ensuring secure travel.",
          },
        ].map((item, i) => (
          <Grid item xs={12} md={4} key={i}>
            <Card
              sx={{
                textAlign: "center",
                p: 3,
                borderRadius: "12px",
                boxShadow: muiTheme.shadows[3],
              }}
            >
              {item.icon}
              <Typography variant="h6" sx={{ mt: 2, fontWeight: 700 }}>
                {item.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{ mt: 1, color: muiTheme.palette.text.secondary }}
              >
                {item.desc}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
      <SectionSix />
    </Box>
  );
}
