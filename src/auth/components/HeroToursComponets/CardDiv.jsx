import Image from "next/image";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import img from "../../../../public/assets/Copilot_20250910_005440.png";
import { FaDollarSign } from "react-icons/fa";
import { Link } from "@/i18n/navigation";
import { useScreenSize } from "../../hooks/screenSize";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

const cardVariants = {
  visible: (i) => ({
    opacity: 1,
    rotateY: 0,
    scale: 1,
    transition: {
      delay: i * 0.5, // تأخير حسب ترتيب الكارد
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

const CardDiv = ({ index }) => {
  const { width } = useScreenSize();
  const WidthCard = width === 540 ? 300 : 360;
  const [hover, setHover] = useState(false);

  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.4 });

  useEffect(() => {
    if (inView) {
      controls.start("visible", index); // تمرير index للتأخير
    } else {
      controls.start("hidden");
    }
  }, [inView, controls, index]);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ perspective: "1200px" }}
    >
      <motion.div
        custom={index}
        animate={controls}
        initial="hidden"
        variants={cardVariants}
        className="relative overflow-hidden"
        style={{
          width: WidthCard,
          height: "550px",
          borderRadius: "22px",
          background: "#181a1b",
          boxShadow:
            "0 6px 12px rgba(255,255,255,0.08), 0 12px 32px rgba(0,0,0,0.7)",
        }}
      >
        <Image alt="Abu Simbel" src={img} fill className="object-cover" />

        <div
          className={`absolute inset-0 bg-black/50 z-10 origin-bottom transition-all duration-700 ease-in-out ${
            hover ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
          }`}
          style={{ transformOrigin: "bottom" }}
        ></div>

        <h1
          className={`absolute bottom-10 left-6 z-50 text-white text-3xl font-bold transition-all duration-700 ease-in-out capitalize ${
            hover
              ? "translate-y-[-5px] scale-105 text-amber-400 bottom-40"
              : "translate-y-0 scale-100"
          }`}
          style={{color : hover ? "#ff9800" :"#fff"}}
        >
          Abu Simbel Temple
        </h1>

        <CardContent
          className={`absolute bottom-9 z-50 text-white transition-opacity duration-700 ease-in-out capitalize ${
            hover ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <Typography variant="body2">
            Abu Simbel is a monumental temple complex built by Pharaoh Ramesses
            II in southern Egypt around 1264 BC...
          </Typography>
          <Typography variant="body2" sx={{ marginTop: "18px" }}>
            4 days / 2 people
          </Typography>
        </CardContent>

        <CardActions
          className={`absolute bottom-0 z-50 text-white transition-opacity duration-700 ease-in-out ${
            hover ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Link href={"/"}>
            <Button size="large">See More</Button>
          </Link>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              fontSize: "16px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "4px",
            }}
          >
            450 <FaDollarSign />
          </Typography>
        </CardActions>
      </motion.div>
    </div>
  );
};

export default CardDiv;
