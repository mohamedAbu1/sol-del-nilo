// components/StripeCheckoutButton.tsx
import { Button } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

const StripeCheckoutButton = ({ tour, user }) => {
  const handleCheckout = async () => {
    try {
      const response = await axios.post("/api/paymob", {
        amount: 500000, // المبلغ بالقروش (مثلاً 5000 دولار = 500000)
        name: user.name,
        email: user.email,
        phone: "+201234567890",
        user_id: user.id,
        tour_id: tour.id,
      });

      if (response.data.url) {
        window.location.href = response.data.url; // ✅ إعادة التوجيه إلى صفحة الدفع
      } else {
        toast.error("لم يتم استلام رابط الدفع من الخادم.");
      }
    } catch (error) {
      console.error("❌ Paymob error:", {
        message: error.message,
        response: error.response?.data,
        stack: error.stack,
      });

      toast.error("حدث خطأ أثناء إنشاء جلسة الدفع. يرجى المحاولة لاحقًا.");
    }
  };

  return (
    <Button
      onClick={handleCheckout}
      variant="contained"
      sx={{
        backgroundColor: "#d4a85f",
        color: "#fff",
        fontWeight: "600",
        fontFamily: "Cairo, sans-serif",
        fontSize: "clamp(14px, 2vw, 18px)",
        px: 3,
        py: 1.5,
        borderRadius: "8px",
        "&:hover": { backgroundColor: "#1565c0" },
      }}
    >
      Pay with Visa / MasterCard 💳
    </Button>
  );
};

export default StripeCheckoutButton;
