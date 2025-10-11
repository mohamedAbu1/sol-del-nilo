"use client";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import { FaTaxi, FaShuttleVan, FaBusAlt } from "react-icons/fa";
import Dividering from "./Divider/Divider";
import StripeCheckoutButton from "../../StripeCheckoutButton";

const PaymentForm = ({ tour, setNan, tourGuidePrice, setGuideLanguages ,setGuidePriceTotal}) => {
  const [bookingData, setBookingData] = useState({
    people: "2",
    hasChildren: "no",
    childrenCount: "",
    childrenAges: [],
    hasPets: "no",
    petType: "",
    needsTaxi: "no",
    vehicleType: "",
    guideRequired: false,
    guideLanguages: [],
  });
  const handleChildrenCountChange = (value) => {
    setBookingData((prev) => {
      const updated = { ...prev, childrenCount: value };

      if (value === "") {
        updated.childrenAges = [];
        return updated;
      }

      const count = parseInt(value);
      if (!isNaN(count)) {
        if (count >= 1 && count <= 12) {
          updated.childrenAges = Array(count)
            .fill("")
            .map((_, i) => prev.childrenAges[i] || "");
        } else {
          updated.childrenAges = [];
        }
      }

      return updated;
    });
  };

  // ✅ دالة تعديل عمر طفل معين
  const handleChildAgeChange = (index, value) => {
    if (/^\d{0,2}$/.test(value)) {
      const updatedAges = [...bookingData.childrenAges];
      updatedAges[index] = value;
      setBookingData((prev) => ({
        ...prev,
        childrenAges: updatedAges,
      }));
    }
  };

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    // // ✅ تحديث قيمة nan كرقم
    // if (name === "people") {
    //   setNan(parseInt(value) || 0);
    // }
    setBookingData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    toast.success("Reservation sent: ✅");
  };

  const handleStripeCheckout = async () => {
    const response = await axios.post("/api/create-checkout-session", {
      price: 5.0,
      tourId: "example-id",
      bookingData,
    });

    if (response.data.url) {
      window.location.href = response.data.url;
    } else {
      toast.error("Failed to create payment session ❌");
    }
  };

  const handlePetTypeChange = (e) => {
    const value = e.target.value;
    const containsArabic = /[\u0600-\u06FF]/.test(value);
    if (containsArabic) {
      toast.error("Please enter the animal type in English only. ❌");
      return;
    }

    setBookingData((prev) => ({
      ...prev,
      petType: value,
    }));
  };
useEffect(() => {
  const adults = parseInt(bookingData.people) || 0;
  const children = parseInt(bookingData.childrenCount) || 0;
  const baseCount = adults + children / 2;

  // ✅ حساب سعر اللغات المختارة
  const selectedLanguages = Object.entries(bookingData.guideLanguages)
    .filter(([_, isSelected]) => isSelected)
    .map(([lang]) => lang);

  const guideTotal = selectedLanguages.reduce(
    (sum, lang) => sum + (tourGuidePrice[lang] || 0),
    0
  );

  setNan(baseCount); // عدد الأشخاص فقط
  setGuideLanguages(bookingData.guideLanguages); // تحديث اللغات المختارة
  setGuidePriceTotal(guideTotal); // ✅ السعر الإضافي للمرشد السياحي
}, [
  bookingData.people,
  bookingData.childrenCount,
  bookingData.guideLanguages,
]);


  const updateVehicleType = () => {
    const adults = parseInt(bookingData.people) || 0;
    const children = parseInt(bookingData.childrenCount) || 0;
    const price = parseFloat(children / 2);
    const total = adults + price;
    let type = "";
    if (total <= 4) type = "تاكسي";
    else if (total <= 15) type = "عربية 16 راكب";
    else type = "أتوبيس سياحي";

    setBookingData((prev) => ({
      ...prev,
      vehicleType: type,
    }));
  };

  const getVehicleInfo = (type) => {
    switch (type) {
      case "تاكسي":
        return { label: "Taxi", icon: <FaTaxi color="#ff9800" size={32} /> };
      case "عربية 16 راكب":
        return {
          label: "16-Seater Van",
          icon: <FaShuttleVan color="#ff9800" size={32} />,
        };
      case "أتوبيس سياحي":
        return {
          label: "Tourist Bus",
          icon: <FaBusAlt color="#ff9800" size={32} />,
        };
      default:
        return { label: type, icon: null };
    }
  };

  const handleGuideLanguageChange = (language) => {
    setBookingData((prev) => {
      const current = prev.guideLanguages;
      const selectedCount = Object.values(current).filter(Boolean).length;

      // إذا تم إلغاء التحديد
      if (current[language]) {
        return {
          ...prev,
          guideLanguages: {
            ...current,
            [language]: false,
          },
        };
      }

      // إذا تم التحديد
      if (selectedCount < 2) {
        return {
          ...prev,
          guideLanguages: {
            ...current,
            [language]: true,
          },
        };
      }

      toast.error("You can choose only one or two languages. ❌");
      return prev;
    });
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "900px",
        height: "fit-content",
        mt: 19,
        px: { xs: 2, sm: 4, md: 6 },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{ padding: "18px", borderRadius: "30px" }}
        className="w-full flex items-center justify-start flex-col border-2 border-gray-400"
      >
        <Typography
          style={{
            color: "#d4a85f",
            fontSize: "clamp(24px, 5vw, 42px)",
            fontWeight: "700",
            textAlign: "center",
          }}
        >
          Booking Details
        </Typography>

        <Dividering />
        <Dividering />

        <form
          onSubmit={handleBookingSubmit}
          style={{ width: "100%", marginTop: "15px" }}
        >
          <Stack spacing={2}>
            {/* عدد الأفراد */}
            <TextField
              label="Number of people"
              type="text"
              name="people"
              value={bookingData.people}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d{0,3}$/.test(value)) {
                  handleBookingChange(e);
                }
              }}
              required
              inputMode="numeric"
              InputProps={{
                color: "red",

                style: {
                  fontWeight: "600",
                  fontFamily: "Cairo, sans-serif",
                  fontSize: "clamp(14px, 2vw, 18px)",
                },
              }}
              sx={{
                width: "100%",
                maxWidth: "300px",
                "& input": {
                  color: "#d4a85f", // ✅ لون النص داخل الحقل
                  fontWeight: "600",
                  fontFamily: "Cairo, sans-serif",
                  fontSize: "clamp(14px, 2vw, 18px)",
                },
                "& label": {
                  color: "#d4a85f",
                  fontSize: "clamp(14px, 2vw, 18px)",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#d4a85f" },
                  "&:hover fieldset": { borderColor: "#ff9800" },
                  "&.Mui-focused fieldset": { borderColor: "#ff9800" },
                },
              }}
              className=" dark:text-gray-200"
            />

            {/* هل لديك أطفال */}
            <FormControlLabel
              label={
                <span
                  style={{
                    fontWeight: "600",
                    fontSize: "clamp(14px, 2vw, 18px)",
                  }}
                  className="text-[#152947] dark:text-[#d4a85f]"
                >
                  Children
                </span>
              }
              control={
                <Checkbox
                  checked={bookingData.hasChildren === "yes"}
                  onChange={(e) =>
                    setBookingData((prev) => ({
                      ...prev,
                      hasChildren: e.target.checked ? "yes" : "no",
                      childrenCount: "",
                      childrenAges: [],
                    }))
                  }
                  sx={{
                    color: "#d4a85f",
                    "&.Mui-checked": {
                      color: "#ff9800",
                    },
                  }}
                />
              }
            />

            <AnimatePresence>
              {bookingData.hasChildren === "yes" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  style={{
                    background: "#fdf8f3",
                    borderRadius: "12px",
                    padding: "20px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    border: "1px solid #d4a85f",
                    marginTop: "12px",
                  }}
                >
                  <Stack spacing={3} sx={{ pl: { xs: 1, sm: 2, md: 3 } }}>
                    <TextField
                      label="How many children?"
                      type="text"
                      inputMode="numeric"
                      value={bookingData.childrenCount}
                      onChange={(e) =>
                        handleChildrenCountChange(e.target.value)
                      }
                      placeholder="Enter number (1–12)"
                      inputProps={{
                        inputMode: "numeric",
                        pattern: "[0-9]*",
                        maxLength: 2,
                        onKeyDown: (e) => {
                          const allowedKeys = [
                            "Backspace",
                            "Delete",
                            "ArrowLeft",
                            "ArrowRight",
                            "Tab",
                          ];
                          if (
                            !/[0-9]/.test(e.key) &&
                            !allowedKeys.includes(e.key)
                          ) {
                            e.preventDefault();
                          }
                        },
                      }}
                      sx={{
                        width: "100%",
                        maxWidth: "400px",
                        "& label": {
                          color: "#d4a85f",
                          fontWeight: "600",
                          fontSize: "clamp(14px, 2vw, 18px)",
                        },
                        "& input": {
                          color: "#d4a85f",
                          fontSize: "clamp(14px, 2vw, 18px)",
                          fontWeight: "600",
                          fontFamily: "Cairo, sans-serif",
                        },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": { borderColor: "#d4a85f" },
                          "&:hover fieldset": { borderColor: "#ff9800" },
                          "&.Mui-focused fieldset": { borderColor: "#ff9800" },
                        },
                      }}
                    />

                    {bookingData.childrenAges.length > 0 && (
                      <Box
                        sx={{
                          display: "grid",
                          gridTemplateColumns:
                            "repeat(auto-fit, minmax(160px, 1fr))",
                          gap: 2,
                          pt: 2,
                        }}
                      >
                        {bookingData.childrenAges.map((age, index) => (
                          <TextField
                            key={index}
                            label={`Child Age ${index + 1}`}
                            type="text"
                            inputMode="numeric"
                            value={age}
                            onChange={(e) =>
                              handleChildAgeChange(index, e.target.value)
                            }
                            required
                            inputProps={{
                              inputMode: "numeric",
                              pattern: "[0-9]*",
                              maxLength: 2,
                              onKeyDown: (e) => {
                                const allowedKeys = [
                                  "Backspace",
                                  "Delete",
                                  "ArrowLeft",
                                  "ArrowRight",
                                  "Tab",
                                ];
                                if (
                                  !/[0-9]/.test(e.key) &&
                                  !allowedKeys.includes(e.key)
                                ) {
                                  e.preventDefault();
                                }
                              },
                            }}
                            sx={{
                              "& label": {
                                color: "#d4a85f",
                                fontWeight: "600",
                                fontSize: "clamp(14px, 2vw, 18px)",
                              },
                              "& input": {
                                color: "#d4a85f", // ✅ لون النص داخل الحقل
                                fontWeight: "600",
                                fontFamily: "Cairo, sans-serif",
                                fontSize: "clamp(14px, 2vw, 18px)",
                              },
                              "& .MuiOutlinedInput-root": {
                                "& fieldset": { borderColor: "#d4a85f" },
                                "&:hover fieldset": { borderColor: "#ff9800" },
                                "&.Mui-focused fieldset": {
                                  borderColor: "#ff9800",
                                },
                              },
                            }}
                          />
                        ))}
                      </Box>
                    )}
                  </Stack>
                </motion.div>
              )}
            </AnimatePresence>

            <FormControlLabel
              control={
                <Checkbox
                  checked={bookingData.hasPets === "yes"}
                  onChange={(e) =>
                    setBookingData((prev) => ({
                      ...prev,
                      hasPets: e.target.checked ? "yes" : "no",
                      petType: "",
                    }))
                  }
                  sx={{
                    color: "#d4a85f",
                    "&.Mui-checked": {
                      color: "#ff9800",
                    },
                  }}
                />
              }
              label={
                <span
                  style={{
                    fontWeight: "600",
                    fontSize: "clamp(14px, 2vw, 18px)",
                  }}
                  className="text-[#152947] dark:text-[#d4a85f]"
                >
                  Pets
                </span>
              }
            />

            <AnimatePresence>
              {bookingData.hasPets === "yes" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  style={{
                    background: "#fdf8f3",
                    borderRadius: "12px",
                    padding: "20px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    border: "1px solid #d4a85f",
                    marginTop: "12px",
                  }}
                >
                  <Stack spacing={3} sx={{ pl: { xs: 1, sm: 2, md: 3 } }}>
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns:
                          "repeat(auto-fit, minmax(140px, 1fr))",
                        gap: 2,
                      }}
                    >
                      {["dog", "cat", "other"].map((type) => (
                        <FormControlLabel
                          key={type}
                          control={
                            <Checkbox
                              checked={bookingData.petType === type}
                              onChange={(e) =>
                                setBookingData((prev) => ({
                                  ...prev,
                                  petType: e.target.checked ? type : "",
                                  customPetType: "",
                                }))
                              }
                              sx={{
                                color: "#d4a85f",
                                "&.Mui-checked": {
                                  color: "#ff9800",
                                },
                              }}
                            />
                          }
                          label={
                            <span
                              style={{
                                fontWeight: "600",
                                fontSize: "clamp(14px, 2vw, 16px)",
                              }}
                              className="text-[#152947] dark:text-[#d4a85f]"
                            >
                              {type}
                            </span>
                          }
                        />
                      ))}
                    </Box>

                    {bookingData.petType === "other" && (
                      <TextField
                        label="Animal type"
                        value={bookingData.customPetType}
                        onChange={(e) => {
                          const value = e.target.value;

                          // ✅ تحقق من وجود حروف عربية أو رموز أو أرقام
                          const containsArabic = /[\u0600-\u06FF]/.test(value);
                          const containsSymbolsOrNumbers = /[^a-zA-Z\s]/.test(
                            value
                          ); // أي شيء غير حروف إنجليزية ومسافات

                          if (containsArabic || containsSymbolsOrNumbers) {
                            toast.error(
                              "Please enter English letters only. ❌"
                            );
                            return;
                          }

                          setBookingData((prev) => ({
                            ...prev,
                            customPetType: value,
                          }));
                        }}
                        placeholder="Enter the animal type"
                        InputProps={{
                          style: {
                            fontWeight: "600",
                            fontFamily: "Cairo, sans-serif",
                            backgroundColor: "#fff",
                            fontSize: "clamp(14px, 2vw, 18px)",
                          },
                        }}
                        sx={{
                          width: "100%",
                          maxWidth: "400px",
                          "& label": {
                            color: "#d4a85f",
                            fontWeight: "600",
                            fontSize: "clamp(14px, 2vw, 18px)",
                          },
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": { borderColor: "#d4a85f" },
                            "&:hover fieldset": { borderColor: "#ff9800" },
                            "&.Mui-focused fieldset": {
                              borderColor: "#ff9800",
                            },
                          },
                        }}
                      />
                    )}
                  </Stack>
                </motion.div>
              )}
            </AnimatePresence>

            <FormControlLabel
              control={
                <Checkbox
                  checked={bookingData.guideRequired}
                  onChange={(e) =>
                    setBookingData((prev) => ({
                      ...prev,
                      guideRequired: e.target.checked,
                      guideLanguages: [],
                    }))
                  }
                  sx={{
                    color: "#d4a85f",
                    "&.Mui-checked": {
                      color: "#ff9800",
                    },
                  }}
                />
              }
              label={
                <span
                  style={{
                    fontWeight: "600",
                    fontSize: "clamp(14px, 2vw, 18px)",
                  }}
                  className="text-[#152947] dark:text-[#d4a85f]"
                >
                  Tour Guide
                </span>
              }
            />

            <AnimatePresence>
              {bookingData.guideRequired && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  style={{
                    background: "#fdf8f3",
                    borderRadius: "12px",
                    padding: "20px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    border: "1px solid #d4a85f",
                    marginTop: "12px",
                  }}
                >
                  <Stack spacing={3} sx={{ pl: { xs: 1, sm: 2, md: 3 } }}>
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns:
                          "repeat(auto-fit, minmax(140px, 1fr))",
                        gap: 2,
                      }}
                    >
                      {[
                        "Spanish",
                        "English",
                        "German",
                        "Italian",
                        "French",
                      ].map((lang) => (
                        <FormControlLabel
                          key={lang}
                          control={
                            <Checkbox
                              checked={
                                bookingData.guideLanguages[lang] || false
                              }
                              onChange={() => handleGuideLanguageChange(lang)}
                              sx={{
                                color: "#d4a85f",
                                "&.Mui-checked": {
                                  color: "#ff9800",
                                },
                              }}
                            />
                          }
                          label={
                            <span
                              style={{
                                fontWeight: "600",
                                fontSize: "clamp(14px, 2vw, 16px)",
                              }}
                              className="text-[#152947] dark:text-[#d4a85f]"
                            >
                              {lang}
                            </span>
                          }
                        />
                      ))}
                    </Box>
                  </Stack>
                </motion.div>
              )}
            </AnimatePresence>

            <FormControlLabel
              control={
                <Checkbox
                  checked={bookingData.needsTaxi === "yes"}
                  onChange={(e) => {
                    const value = e.target.checked ? "yes" : "no";
                    handleBookingChange({
                      target: {
                        name: "needsTaxi",
                        value,
                      },
                    });

                    if (value === "yes") {
                      updateVehicleType(); // ✅ احسب نوع السيارة عند التفعيل
                    } else {
                      setBookingData((prev) => ({
                        ...prev,
                        vehicleType: "",
                      }));
                    }
                  }}
                  sx={{
                    color: "#d4a85f",
                    "&.Mui-checked": {
                      color: "#ff9800",
                    },
                  }}
                />
              }
              label={
                <span
                  style={{
                    fontWeight: "600",
                    fontSize: "clamp(14px, 2vw, 18px)",
                  }}
                  className="text-[#152947] dark:text-[#d4a85f]"
                >
                  Transportation service
                </span>
              }
            />

            <AnimatePresence>
              {bookingData.needsTaxi === "yes" && bookingData.vehicleType && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  style={{
                    background: "#fdf8f3",
                    borderRadius: "12px",
                    padding: "20px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    border: "1px solid #d4a85f",
                    marginTop: "12px",
                  }}
                >
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={2}
                    alignItems="center"
                    sx={{
                      pl: { xs: 1, sm: 2, md: 3 },
                      textAlign: { xs: "center", sm: "start" },
                    }}
                  >
                    <Box sx={{ fontSize: "clamp(24px, 5vw, 32px)" }}>
                      {getVehicleInfo(bookingData.vehicleType).icon}
                    </Box>
                    <Typography
                      sx={{
                        fontWeight: "600",
                        fontSize: "clamp(14px, 2vw, 18px)",
                        color: "#152947",
                        fontFamily: "Cairo, sans-serif",
                      }}
                    >
                      Vehicle Type:{" "}
                      <span style={{ color: "#d4a85f", fontWeight: "bold" }}>
                        {getVehicleInfo(bookingData.vehicleType).label}
                      </span>
                    </Typography>
                  </Stack>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                style={{
                  background: "#fdf8f3",
                  borderRadius: "12px",
                  padding: "20px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  border: "1px solid #d4a85f",
                  marginTop: "12px",
                }}
              >
                <Stack
                  spacing={3}
                  sx={{
                    pl: { xs: 1, sm: 2, md: 3 },
                    alignItems: { xs: "center", sm: "flex-start" },
                    textAlign: { xs: "center", sm: "start" },
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: "600",
                      fontSize: "clamp(16px, 2vw, 18px)",
                      color: "#152947",
                      fontFamily: "Cairo, sans-serif",
                    }}
                  >
                    Payment Options
                  </Typography>

                  <Box sx={{ width: "100%", maxWidth: 400 }}>
                    <PayPalScriptProvider
                      options={{
                        "client-id":
                          "ASpH7rWCv_P-4SgXxj_aSpjo_j4WqVn3_ekqPAf-ODCjcqBsE2bE9VjxAIhrf2lf8Px437Zhg7PWwkne",
                      }}
                    >
                      <PayPalButtons
                        createOrder={(data, actions) => {
                          return actions.order.create({
                            purchase_units: [
                              {
                                amount: {
                                  value: "100.00", // قيمة الرحلة
                                },
                              },
                            ],
                          });
                        }}
                        onApprove={async (data, actions) => {
                          const details = await actions.order.capture();
                          // ✅ إرسال بيانات الدفع إلى السيرفر
                          await fetch("/api/paypal-confirm", {
                            method: "POST",
                            body: JSON.stringify({
                              payerName: details.payer.name.given_name,
                              payerEmail: details.payer.email_address,
                              amount: details.purchase_units[0].amount.value,
                              currency:
                                details.purchase_units[0].amount.currency_code,
                              status: details.status,
                              orderId: details.id,
                            }),
                          });
                        }}
                      />
                    </PayPalScriptProvider>
                  </Box>

                  <StripeCheckoutButton />
                </Stack>
              </motion.div>
            </AnimatePresence>
          </Stack>
        </form>
      </div>
      <ToastContainer />
    </Box>
  );
};

export default PaymentForm;
