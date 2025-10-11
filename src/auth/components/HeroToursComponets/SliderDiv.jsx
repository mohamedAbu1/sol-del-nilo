"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlane } from "react-icons/fa6";
import { BiSearch } from "react-icons/bi";
import { toast } from "react-toastify";

const backgroundImagesRow = [
  "/assets/Temple_of_the_Elephants.png",
  "/assets/Copilot_20251003_113408.png",
  "/assets/Copilot_20251003_114530.png",
  "/assets/Copilot_20251003_102123.png",
  "/assets/Copilot_20251003_111802.png",
  "/assets/Copilot_20251003_110337.png",
];
const backgroundImagesCol = [
  "/assets/545371804_18083318650930067_5402798298470446398_n.jpg",
  "/assets/491433899_18069893710930067_3619158703201338962_n.jpg",
  "/assets/489886514_18069129334930067_56951173587226056_n.jpg",
  "/assets/489671803_18068665750930067_7121276910165743367_n.jpg",
  "/assets/482682747_18065431657930067_3567087536427897819_n.jpg",
  "/assets/548898267_18083849644930067_2023880468351303706_n.jpg",
];

export default function HeroStaticSearch({
  categoriesFromDB,
  setSelectedCategories,
  setSearch,
  search,
  width,
}) {
  const t = useTranslations("ToursHeroPage");
  const [focused, setFocused] = useState(false);
  const [bgIndex, setBgIndex] = useState(0);

  const handleSearch = () => {
    const trimmed = search.trim();

    if (trimmed === "") {
      setSelectedCategories([]);
      console.log("🔍 عرض جميع الرحلات");
      return;
    }

    const match = categoriesFromDB.find(
      (cat) => cat.name.toLowerCase() === trimmed.toLowerCase()
    );

    if (match) {
      setSelectedCategories([match.name]);
      console.log("🔍 البحث عن الكاتجري:", match.name);
    } else {
      toast.error("❌ الكاتجري غير موجود");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgroundImagesRow.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "clamp(60vh, 70vh, 100vh)",
        overflow: "hidden",
        borderRadius: "40px",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={width <= 1024 ? backgroundImagesCol[bgIndex]: backgroundImagesRow[bgIndex]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <Image
            src={width <= 1024 ? backgroundImagesCol[bgIndex]: backgroundImagesRow[bgIndex]}
            alt="Background"
            fill
            style={{ objectFit: "cover" }}
          />
        </motion.div>
      </AnimatePresence>

      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "1rem",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "640px",
            textAlign: "center",
            color: "white",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            alignItems: "center",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(1.5rem, 5vw, 3rem)",
              fontWeight: "bold",
            }}
          >
            {t("TitleDivPic") || "Find Your Adventure"}
          </h1>

          <div style={{ position: "relative", width: "100%" }}>
            <input
              type="text"
              value={search}
              onChange={(e) => {
                const value = e.target.value;
                const cleaned = value.replace(/[^a-zA-Z\s]/g, "");
                setSearch(cleaned);
              }}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="Search category..."
              style={{
                width: "100%",
                padding: "1rem clamp(80px, 20vw, 120px) 1rem 1rem",
                borderRadius: "999px",
                fontSize: "clamp(1rem, 2.5vw, 1.125rem)",
                color: "#ff9800",
                backgroundColor:"transparent",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                outline: "none",
                border:"1px solid #fff"
              }}
              className="placeholder:text-[grey]"
            />

            <button
              onClick={handleSearch}
              style={{
                position: "absolute",
                top: "50%",
                right: "0.5rem",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                transform: "translateY(-50%)",
                padding: "0.5rem clamp(0.75rem, 4vw, 1rem)",
                // backgroundColor: "#ff9800",
                color: "white",
                fontWeight: 600,
                borderRadius: "999px",
                cursor: "pointer",
                transition: "transform 0.3s ease",
                fontSize: "clamp(0.875rem, 2vw, 1rem)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform =
                  "translateY(-50%) scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(-50%)")
              }
            >
              <BiSearch style={{ fontSize: "18px" }} /> Search
            </button>
          </div>

          <AnimatePresence>
            {focused && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: "0.5rem",
                  marginTop: "1rem",
                  width: "100%",
                }}
              >
                {categoriesFromDB.map((cat, index) => (
                  <motion.div
                    key={cat.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.03 }}
                    onMouseDown={() => {
                      setSearch(cat.name);
                      setSelectedCategories([cat.name]);
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.5rem 0.75rem",
                      backgroundColor: "#ffffff",
                      color: "#333",
                      borderRadius: "16px",
                      fontSize: "clamp(0.75rem, 2vw, 0.875rem)",
                      fontWeight: 500,
                      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                      cursor: "pointer",
                      transition: "background-color 0.2s ease",
                      border: "1px solid #e0e0e0",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#ff9800")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "white")
                    }
                  >
                    <FaPlane className="text-amber-500 hover:text-[#fff] transition-colors duration-200" />
                    {cat.name}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
