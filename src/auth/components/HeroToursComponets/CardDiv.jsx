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
import { DOMAIN } from "@/lib/constants/FixedTexts";
import axios from "axios";
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
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

// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
const CardDiv = ({ index }) => {
  const { width } = useScreenSize();
  const WidthCard = width === 540 ? 300 : 360;
  const [hoverIndex, setHoverIndex] = useState(null);
  const [toursData, setToursData] = useState([]);
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.4 });
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  useEffect(() => {
    if (inView) {
      controls.start("visible", index); // تمرير index للتأخير
    } else {
      controls.start("hidden");
    }
  }, [inView, controls, index]);
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${DOMAIN}/api/tours`);
        console.log(response.data.tours);
        setToursData(response.data.tours);
      } catch (error) {
        return null;
      }
    };

    fetchUser();
  }, []);
  console.log("📦 البيانات المستلمة:", toursData);

  return (
    <div
      ref={ref}
      style={{
        perspective: "1200px",
        display: "flex",
        gap: "20px",
        flexWrap: "wrap",
        flexDirection: "row",
      }}
    >
      {toursData.map((i, index) => (
        <motion.div
          key={index}
          onMouseEnter={() => setHoverIndex(index)}
          onMouseLeave={() => setHoverIndex(null)}
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
          <Image
            alt="Abu Simbel"
            src={`/assets/${i.image[0]}`}
            fill
            style={{backgroundPosition:"center",backgroundSize:"cover"}}
            className="object-cover"
          />

          <div
            className={`absolute inset-0 bg-black/50 z-10 origin-bottom transition-all duration-700 ease-in-out ${
             hoverIndex === index ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
            }`}
            style={{ transformOrigin: "bottom" }}
          ></div>

          <h1
            className={`absolute bottom-10 left-6 z-50 text-white text-3xl font-bold transition-all duration-700 ease-in-out capitalize ${
              hoverIndex === index
                ? "translate-y-[-5px] scale-105 text-amber-400 bottom-40"
                : "translate-y-0 scale-100"
            }`}
            style={{ color: hoverIndex === index ? "#ff9800" : "#fff" }}
          >
            {i.title}
          </h1>

          <CardContent
            className={`absolute bottom-9 z-50 text-white transition-opacity duration-700 ease-in-out capitalize ${
              hoverIndex === index ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <Typography variant="body2">
            {i.description}
            </Typography>
            <Typography variant="body2" sx={{ marginTop: "18px" }}>
             {i.DayPeople}
            </Typography>
          </CardContent>

          <CardActions
            className={`absolute bottom-0 z-50 text-white transition-opacity duration-700 ease-in-out ${
              hoverIndex === index ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Link href={`/tours/${i.id}`} key={i.id}>
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
      ))}
      
    </div>
  );
};

export default CardDiv;
