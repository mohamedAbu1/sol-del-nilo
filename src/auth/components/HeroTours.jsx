"use client";

import React, { useState } from "react";
import Card from "./HeroToursComponets/CardDiv";
import HeroSlider from "./HeroToursComponets/SliderDiv";
import { Box } from "@mui/material";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { ToursPathEn, ToursPathEs } from "@/lib/constants/FixedTexts";
import { useScreenSize } from "@/auth/hooks/screenSize";

const HeroTours = () => {
  const path = usePathname();
  const t = useTranslations("ToursHeroPage");
  const { width } = useScreenSize();
  const [hover, setHover] = useState(false);

  const cards = Array.from({ length: 9 }, (_, i) => ({ id: i + 1 }));

  return (
    <section
      style={{ width: width <= 1023 ? "100%" : width * 0.85 }}
      className="container flex flex-col items-start justify-center"
    >
      <h1
        className={`titleSection ${
          path === ToursPathEn || path === ToursPathEs ? "text-gray-400" : ""
        }`}
        style={{
          color: "#FF9800",
          fontFamily: "Geist_Mono, Arial, sans-serif",
          fontWeight: "700",
        }}
      >
        {t("titlePage")}
      </h1>

      <Box
        sx={{
          width: "100%",
          mx: "auto",
          display: "flex",
          flexDirection: "row",
        }}
        className="hidden lg:flex"
      >
        <HeroSlider />
      </Box>

      <Box
        sx={{ marginTop: "40px", marginBottom: "40px" }}
        className="w-full flex flex-wrap gap-6 items-center justify-center"
      >
        {cards.map((card, i) => (
          <Card key={card.id} index={i} />
        ))}
      </Box>
    </section>
  );
};

export default HeroTours;
