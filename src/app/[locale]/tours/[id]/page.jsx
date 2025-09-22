"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Box, Typography, TextField, Button, Stack } from "@mui/material";

const CardID = () => {
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const [bookingData, setBookingData] = useState({
    people: 1,
    hasChildren: "no",
    hasPets: "no",
    needsTaxi: "no",
  });

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    console.log("✅ تم إرسال الحجز:", bookingData);
    alert("تم إرسال طلب الحجز بنجاح!");
  };

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const response = await axios.get(`/api/tours/${id}`);
        setTour(response.data.tour);
      } catch (error) {
        console.error("❌ فشل في جلب بيانات الرحلة:", error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchTour();
  }, [id]);

  if (loading) return <p>جاري التحميل...</p>;
  if (!tour) return <p>الرحلة غير موجودة</p>;

  const galleryImages = tour.image.map((img) => ({
    original: `/assets/${img}`,
    thumbnail: `/assets/${img}`,
  }));

  const handleStripeCheckout = async () => {
    const response = await axios.post("/api/create-checkout-session", {
      price: tour.price,
      tourId: tour.id,
      bookingData: {
        people: 2,
        hasChildren: "yes",
        hasPets: "no",
        needsTaxi: "yes",
      },
    });

    if (response.data.url) {
      window.location.href = response.data.url; // توجيه المستخدم إلى صفحة الدفع
    } else {
      alert("❌ فشل في إنشاء جلسة الدفع");
    }
  };

  return (
    <main className="w-full flex flex-col items-center justify-center">
      <div
        style={{ marginTop: "30px", borderRadius: "20px" }}
        className="w-full max-w-screen-xl mx-auto p-0"
      >
        <ImageGallery
          items={galleryImages}
          showPlayButton={false}
          showFullscreenButton={true}
          thumbnailPosition="bottom"
          autoPlay={true}
          slideInterval={3000}
        />
      </div>

      <Box sx={{ mt: 6, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          {tour.title}
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          {tour.description}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          السعر: {tour.price} $
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          عدد الأيام / الأشخاص: {tour.DayPeople}
        </Typography>
      </Box>

      {/* نموذج الحجز */}
      <Box
        sx={{
          width: "100%",
          maxWidth: "600px",
          mt: 6,
          p: 3,
          boxShadow: 2,
          borderRadius: 2,
          backgroundColor: "#f9f9f9",
        }}
      >
        <Typography variant="h6" gutterBottom>
          تفاصيل الحجز
        </Typography>

        <form onSubmit={handleBookingSubmit}>
          <Stack spacing={2}>
            <TextField
              label="عدد الأفراد"
              type="number"
              name="people"
              value={bookingData.people}
              onChange={handleBookingChange}
              required
            />

            <TextField
              label="هل يوجد أطفال؟"
              select
              SelectProps={{ native: true }}
              name="hasChildren"
              value={bookingData.hasChildren}
              onChange={handleBookingChange}
            >
              <option value="no">لا</option>
              <option value="yes">نعم</option>
            </TextField>

            <TextField
              label="هل يوجد حيوانات أليفة؟"
              select
              SelectProps={{ native: true }}
              name="hasPets"
              value={bookingData.hasPets}
              onChange={handleBookingChange}
            >
              <option value="no">لا</option>
              <option value="yes">نعم</option>
            </TextField>

            <TextField
              label="هل ترغب في خدمة التاكسي؟"
              select
              SelectProps={{ native: true }}
              name="needsTaxi"
              value={bookingData.needsTaxi}
              onChange={handleBookingChange}
            >
              <option value="no">لا</option>
              <option value="yes">نعم</option>
            </TextField>

            <PayPalScriptProvider
              options={{
                "client-id":
                  "ASpH7rWCv_P-4SgXxj_aSpjo_j4WqVn3_ekqPAf-ODCjcqBsE2bE9VjxAIhrf2lf8Px437Zhg7PWwkne",
              }}
            >
              <PayPalButtons
                style={{
                  layout: "vertical",
                  color: "blue",
                  shape: "rect",
                  label: "paypal",
                }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: "5.00", // السعر بالدولار
                        },
                      },
                    ],
                  });
                }}
                onApprove={(data, actions) => {
                  return actions.order.capture().then((details) => {
                    alert(
                      `✅ تم الدفع بواسطة ${details.payer.name.given_name}`
                    );
                  });
                }}
                onError={(err) => {
                  console.error("❌ خطأ في الدفع:", err);
                  alert("حدث خطأ أثناء الدفع.");
                }}
              />
            </PayPalScriptProvider>
            <button
              onClick={handleStripeCheckout}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              ادفع الآن عبر Stripe 💳
            </button>
          </Stack>
        </form>
      </Box>
    </main>
  );
};

export default CardID;
