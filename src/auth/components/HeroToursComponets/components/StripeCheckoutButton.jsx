import { useCart } from "@/context/CartContext"; // ✅ استدعاء الكونتكست
import { useTheme } from "@mui/material/styles";
import { Button } from "@mui/material";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
const BookTourButton = ({ tour, user, ...props }) => {
  const [bookingTime, setBookingTime] = useState(null);
  const { addToCart } = useCart(); // ✅ دالة إضافة للسلة
  const muiTheme = useTheme();

  return (
    <>
      <Button
        onClick={() => {
          setBookingTime(
            new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          );
          addToCart({
            id: tour.id,
            title: tour.title,
            price: props.TTfinalPriceAfterRival,
            date: tour.theDate,
            extras: props.selectedExtras,
            people: props.nan,
            image: tour.image[0] || tour.images[0] || [], // هنا نحفظ الصور كلها
          }); // ✅ إضافة الرحلة للسلة
          toast.success("🛒 Tour added to cart!");
        }}
        variant="contained"
        fullWidth
        sx={{
          width: "100%",
          backgroundColor: muiTheme.palette.secondary.main,
          color: muiTheme.palette.getContrastText(
            muiTheme.palette.secondary.main
          ),
          fontWeight: "800",
          fontFamily: "Cairo, sans-serif",
          fontSize: "clamp(14px, 2vw, 18px)",
          px: 3,
          py: 1.5,
          borderRadius: "8px",
          "&:hover": {
            backgroundColor: muiTheme.palette.primary.main,
            color: muiTheme.palette.getContrastText(
              muiTheme.palette.primary.main
            ),
          },
        }}
      >
        Book This Tour 🧭
      </Button>
    </>
  );
};
export default BookTourButton;
