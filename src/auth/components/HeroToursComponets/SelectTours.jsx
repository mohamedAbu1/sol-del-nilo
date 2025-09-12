"use client";
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
import React from "react";
import { MdTravelExplore } from "react-icons/md";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { MdGroupAdd } from "react-icons/md";
import { GiDuration } from "react-icons/gi";
import { useScreenSize } from "../../hooks/screenSize";
import { useTranslations } from "next-intl";
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
const SelectTours = () => {
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  const { width, height } = useScreenSize();
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
    const t = useTranslations("ToursHeroPage");
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

  return (
    <div
      style={{
        width : width <= 1023 ? "90%" : width * 0.75 ,
        height:"40%",
        marginTop:"70px",
        borderRadius: "18px",
        marginLeft: "15px",
        padding: "15px",
        gap: "15px",
        boxShadow: "0 4px 12px rgba(8, 8, 8, 0.15)",
        fontFamily: "Geist_Mono, Arial, sans-serif",
        fontWeight: "700",
      }}
      className="lg:w-11/12 grid grid-cols-2 md:flex flex-col justify-start  border-2 border-gray-400 text-gray-400 mt-9"
    >
      <div>
        <h1 className="flex gap-3 items-center lg:text-2xl TextSelectH1">
          <MdTravelExplore style={{ fontSize: "20px" }} color="#FF9800" />
           {t("SelectTours1")}
        </h1>
        <FormGroup style={{ fontWeight: "700" }}>
          <FormControlLabel
            className="TextSelect"
            control={<Checkbox color="warning" />}
            label={t("SelectToursLabel1")}
          />
          <FormControlLabel
            className="TextSelect"
            control={<Checkbox color="warning" />}
            label={t("SelectToursLabel2")}
          />
          <FormControlLabel
            className="TextSelect"
            control={<Checkbox color="warning" />}
            label={t("SelectToursLabel3")}
          />
        </FormGroup>
      </div>
      <div>
        <h1 className="flex gap-3 items-center lg:text-2xl TextSelectH1">
          <GiDuration style={{ fontSize: "20px" }} color="#FF9800" />  {t("SelectTours2")}
        </h1>
        <FormGroup>
          <FormControlLabel
            className="TextSelect"
            control={<Checkbox color="warning" />}
            label={t("SelectToursLabel4")}
          />
          <FormControlLabel
            className="TextSelect"
            control={<Checkbox color="warning" />}
            label={t("SelectToursLabel5")}
          />
        </FormGroup>
      </div>
      <div>
        <h1 className="flex gap-3 items-center lg:text-2xl TextSelectH1">
          <FaRegArrowAltCircleRight
            style={{ fontSize: "20px" }}
            color="#FF9800"
          />{" "}
          {t("SelectTours3")}
        </h1>
        <FormGroup>
          <FormControlLabel
            className="TextSelect"
            control={<Checkbox color="warning" />}
            label={t("SelectToursLabel6")}
          />
        </FormGroup>
      </div>
      <div>
        <h1 className="flex gap-3 items-center  lg:text-2xl TextSelectH1">
          <MdGroupAdd style={{ fontSize: "20px" }} color="#FF9800" />  {t("SelectTours4")}
        </h1>
        <FormGroup>
          <FormControlLabel
            className="TextSelect"
            control={<Checkbox color="warning" />}
            label={t("SelectToursLabel7")}
          />
        </FormGroup>
      </div>
    </div>
  );
};

export default SelectTours;
