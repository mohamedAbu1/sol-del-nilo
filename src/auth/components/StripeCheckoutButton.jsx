// components/StripeCheckoutButton.tsx
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "@mui/material";
import { toast } from "react-toastify";

// ✅ ضع المفتاح العام هنا
const stripePromise = loadStripe("pk_test_XXXXXXXXXXXXXXXXXXXXXXXX");

const StripeCheckoutButton = () => {
  const handleStripeCheckout = async () => {
    const stripe = await stripePromise;

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tourName: "Luxor Nile Tour",
          price: 5000, // السعر بالسنت (50 دولار)
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error("❌ فشل إنشاء جلسة الدفع");
      }
    } catch (error) {
      console.error("Stripe error:", error);
      toast.error("❌ حدث خطأ أثناء الاتصال بـ Stripe");
    }
  };

  return (
    <Button
      onClick={handleStripeCheckout}
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
