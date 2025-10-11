import Image from "next/image";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { FaDollarSign } from "react-icons/fa";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import SmsIcon from "@mui/icons-material/Sms";

const cardVariants = {
  visible: (i) => ({
    opacity: 1,
    rotateY: 0,
    scale: 1,
    transition: {
      delay: i * 0.5,
      duration: 1.2,
      ease: "easeInOut",
    },
  }),
  hidden: {
    opacity: 0,
    rotateY: -90,
    scale: 0.9,
    transition: {
      duration: 0.8,
      ease: "easeInOut",
    },
  },
};

const CardDiv = React.forwardRef(function CardDiv(
  { toursData, hoverIndex, setHoverIndex, controls, WidthCard },
  ref
) {
  const [hasAnimatedOnce, setHasAnimatedOnce] = useState(false);

  useEffect(() => {
    if (!hasAnimatedOnce) {
      controls.start("visible");
      setHasAnimatedOnce(true);
    }
  }, [controls, hasAnimatedOnce]);

  useEffect(() => {
    controls.start("visible");
  }, [toursData.length]);

  return (
    <div
      ref={ref}
      style={{
        perspective: "1200px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
        flexWrap: "wrap",
        zIndex: "999",
        flexDirection: "row",
      }}
    >
      {toursData.map((i, index) => (
        <motion.div
          key={index}
          onMouseEnter={() => setHoverIndex(index)}
          onMouseLeave={() => setHoverIndex(null)}
          custom={index}
          animate={hasAnimatedOnce ? undefined : controls}
          initial={hasAnimatedOnce ? false : "hidden"}
          variants={cardVariants}
          className="relative overflow-hidden"
          style={{
            width: "clamp(280px, 90vw, 450px)",
            height: "clamp(400px, 60vh, 550px)",
            borderRadius: "22px",
            background: "#181a1b",
            boxShadow:
              "0 6px 12px rgba(255,255,255,0.08), 0 12px 32px rgba(0,0,0,0.7)",
          }}
        >
          <Image
            alt={i.title}
            src={i.image?.[0] ? `/assets/${i.image.name[0]}` : "/assets/default.jpg"}
            fill
            style={{ objectFit: "cover" }}
            className="object-cover"
          />

          <div
            className={`absolute inset-0 bg-black/50 z-10 origin-bottom transition-all duration-700 ease-in-out ${
              hoverIndex === index
                ? "scale-y-100 opacity-100"
                : "scale-y-0 opacity-0"
            }`}
            style={{ transformOrigin: "bottom" }}
          ></div>

          <h1
            className={`absolute bottom-10 left-6 z-50 text-white text-3xl font-bold transition-all duration-700 ease-in-out capitalize ${
              hoverIndex === index
                ? "translate-y-[-5px] scale-105 text-amber-400 bottom-43"
                : "translate-y-0 scale-100"
            }`}
            style={{ color: hoverIndex === index ? "#ff9800" : "#fff" }}
          >
            {i.title}
          </h1>

          <CardContent
            className={`w-full absolute bottom-9 z-50 text-white transition-opacity duration-700 ease-in-out capitalize ${
              hoverIndex === index
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <Typography
              variant="body2"
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: 4,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              className="text-gray-300"
            >
              {i.description}
            </Typography>
            <div className="flex w-full items-center justify-between">
              <Typography
                variant="body2"
                sx={{ marginTop: "18px", color: "#d4a85f", fontWeight: "700" }}
                className="text-gray-300"
              >
                {i.Destination}
              </Typography>
              <Typography
                variant="body2"
                sx={{ marginTop: "18px", color: "#d4a85f", fontWeight: "700" }}
                className="text-gray-300"
              >
                {i.category?.name}
              </Typography>
            </div>
          </CardContent>

          <CardActions
            className={`absolute bottom-0 z-50 text-white transition-opacity duration-700 ease-in-out ${
              hoverIndex === index
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
            }`}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Link href={`/tours/${i.id}`}>
              <Button variant="outlined" color="warning" endIcon={<SmsIcon />}>
                See More
              </Button>
            </Link>
            <Typography
              variant="body2"
              sx={{
                color: "#ff9800",
                fontSize: "16px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "4px",
              }}
            >
              {i.price} <FaDollarSign />
            </Typography>
          </CardActions>
        </motion.div>
      ))}
    </div>
  );
});

export default CardDiv;
