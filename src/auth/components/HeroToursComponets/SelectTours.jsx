"use client";
import React, { useState } from "react";
import { MdMenu, MdClose, MdTravelExplore, MdGroupAdd } from "react-icons/md";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { GiDuration } from "react-icons/gi";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useScreenSize } from "../../hooks/screenSize";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

const SelectToursWrapper = ({
  selectedCategories,
  setSelectedCategories,
  categoriesFromDB,
}) => {
  const [open, setOpen] = useState(false);
  const { width } = useScreenSize();
  const t = useTranslations("ToursHeroPage");

  const fontSize = width <= 768 ? "16px" : width <= 1024 ? "18px" : "20px";
  const titleSize = width <= 768 ? "18px" : width <= 1024 ? "22px" : "26px";

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    setSelectedCategories((prev) =>
      prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value]
    );
  };
console.log(selectedCategories[0])
  return (
    <div className="relative z-9999">
      {/* زر المنيو */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-6 right-1 lg:left-6  text-[#ff9800] p-3 rounded-full  hover:text-gray-700"
        style={{ zIndex: 1000, cursor: "pointer", width: "30px" }}
      >
        <MdMenu size={28} />
      </button>

      {/* المكون الجانبي */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              height: "100vh",
              width: width <= 768 ? "100%" : "350px",
              backgroundColor: "#181a1b",
              padding: "25px",
              overflowY: "auto",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              fontFamily: "Geist_Mono, Arial, sans-serif",
              fontWeight: "700",
              color: "#d4a85f",
              zIndex: 999,
            }}
          >
            {/* زر الإغلاق */}
            <button
              onClick={() => setOpen(false)}
              className={
                width <= 911
                  ? "absolute top-6 left-6 text-[#ff9800] hover:text-white"
                  : "absolute top-6 right-6 text-[#ff9800] hover:text-white"
              }
              style={{ cursor: "pointer" }}
            >
              <MdClose size={28} />
            </button>

            {/* الأقسام الأربعة */}
            <div
              style={{ marginTop: "90px" }}
              className="flex flex-col gap-6 mt-10"
            >
              {/* القسم الأول */}
              <div>
                <h1
                  style={{ fontSize: titleSize }}
                  className="flex gap-3 items-center"
                >
                  <MdTravelExplore size={20} color="#FF9800" />
                  {t("SelectTours1")}
                </h1>
                {categoriesFromDB.map((i, index) => (
                  <FormGroup key={i.id} style={{gap:"20px"}}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          color="warning"
                          value={i.name}
                          checked={selectedCategories.includes(i.name)}
                          onChange={handleCategoryChange}
                        />
                      }
                      label={i.name}
                    />
                  </FormGroup>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SelectToursWrapper;
