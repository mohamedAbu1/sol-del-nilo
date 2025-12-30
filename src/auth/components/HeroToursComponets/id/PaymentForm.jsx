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
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import Dividering from "./Divider/Divider";
import StripeCheckoutButton from "../components/StripeCheckoutButton";
import { useTheme } from "@mui/material/styles";
const PaymentForm = ({
  tour,
  user,
  setNan,
  tourGuidePrice,
  setGuideLanguages,
  setGuidePriceTotal,
  setHasBooked,
  bookingData,
  setBookingData,
  TTfinalPriceAfterRival,
  selectedExtras,
  nan,
}) => {
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
    setBookingData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    toast.success("Reservation sent: ✅");
  };
  const muiTheme = useTheme(); // ✅ يجيب الثيم الحالي
  useEffect(() => {
    const adults = parseInt(bookingData.people) || 0;
    const children = parseInt(bookingData.childrenCount) || 0;
    const baseCount = adults + children;

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
        // maxWidth: "900px",
        height: "fit-content",
        mt: 4,
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
          sx={{
            color: muiTheme.palette.secondary.main, // ✅ اللون من الثيم
            fontSize: "clamp(24px, 5vw, 42px)",
            fontWeight: "700",
            textAlign: "center",
            fontFamily: "Cairo, sans-serif",
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
          <Stack
            spacing={2}
            style={{
              display: "felx",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* عدد الأفراد */}
            <div className="w-full flex items-center justify-center">
              <TextField
                label="Number of people"
                type="text"
                name="people"
                value={bookingData.people || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d{0,3}$/.test(value)) {
                    handleBookingChange(e);
                  }
                }}
                required
                inputMode="numeric"
                InputProps={{
                  style: {
                    fontWeight: "600",
                    fontFamily: "Cairo, sans-serif",
                    fontSize: "clamp(14px, 2vw, 18px)",
                    color: muiTheme.palette.text.primary, // ✅ النصوص من الثيم
                  },
                }}
                sx={{
                  width: "100%",
                  maxWidth: "800px",
                  "& input": {
                    color: muiTheme.palette.secondary.main, // ✅ النصوص داخل الحقل من الثيم
                    fontWeight: "600",
                    fontFamily: "Cairo, sans-serif",
                    fontSize: "clamp(14px, 2vw, 18px)",
                  },
                  "& label": {
                    color: muiTheme.palette.secondary.main, // ✅ لون الليبل من الثيم
                    fontSize: "clamp(14px, 2vw, 18px)",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: muiTheme.palette.secondary.main,
                    }, // ✅ الحدود من الثيم
                    "&:hover fieldset": {
                      borderColor: muiTheme.palette.primary.main,
                    }, // ✅ عند الـ hover
                    "&.Mui-focused fieldset": {
                      borderColor: muiTheme.palette.primary.main, // ✅ عند التركيز
                      borderWidth: "2px",
                    },
                  },
                }}
              />
            </div>
            {/* هل لديك أطفال */}
            <div className="w-[70%] flex items-center justify-between">
              <div className="flex flex-col">
                <FormControlLabel
                  label={
                    <Typography
                      sx={{
                        fontWeight: "600",
                        fontSize: "clamp(14px, 2vw, 18px)",
                        color: muiTheme.palette.text.primary, // ✅ النصوص من الثيم
                      }}
                    >
                      Children
                    </Typography>
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
                        color: muiTheme.palette.secondary.main, // ✅ اللون الافتراضي
                        "&.Mui-checked": {
                          color: muiTheme.palette.primary.main, // ✅ عند التحديد
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
                        background: muiTheme.palette.background.paper, // ✅ الخلفية من الثيم
                        borderRadius: "12px",
                        padding: "20px",
                        boxShadow: muiTheme.shadows[3], // ✅ ظل من الثيم
                        border: `1px solid ${muiTheme.palette.secondary.main}`, // ✅ الحدود من الثيم
                        marginTop: "12px",
                      }}
                    >
                      <Stack spacing={3} sx={{ pl: { xs: 1, sm: 2, md: 3 } }}>
                        <TextField
                          label="How many children?"
                          type="text"
                          inputMode="numeric"
                          value={bookingData.childrenCount || ""}
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
                              color: muiTheme.palette.secondary.main, // ✅ الليبل من الثيم
                              fontWeight: "600",
                              fontSize: "clamp(14px, 2vw, 18px)",
                            },
                            "& input": {
                              color: muiTheme.palette.secondary.main, // ✅ النصوص داخل الحقل
                              fontSize: "clamp(14px, 2vw, 18px)",
                              fontWeight: "600",
                              fontFamily: "Cairo, sans-serif",
                            },
                            "& .MuiOutlinedInput-root": {
                              "& fieldset": {
                                borderColor: muiTheme.palette.secondary.main,
                              },
                              "&:hover fieldset": {
                                borderColor: muiTheme.palette.primary.main,
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: muiTheme.palette.primary.main,
                              },
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
                                value={age || ""}
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
                                    color: muiTheme.palette.secondary.main,
                                    fontWeight: "600",
                                    fontSize: "clamp(14px, 2vw, 18px)",
                                  },
                                  "& input": {
                                    color: muiTheme.palette.secondary.main,
                                    fontWeight: "600",
                                    fontFamily: "Cairo, sans-serif",
                                    fontSize: "clamp(14px, 2vw, 18px)",
                                  },
                                  "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                      borderColor:
                                        muiTheme.palette.secondary.main,
                                    },
                                    "&:hover fieldset": {
                                      borderColor:
                                        muiTheme.palette.primary.main,
                                    },
                                    "&.Mui-focused fieldset": {
                                      borderColor:
                                        muiTheme.palette.primary.main,
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
              </div>

              <div>
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
                        color: muiTheme.palette.secondary.main, // ✅ اللون الافتراضي
                        "&.Mui-checked": {
                          color: muiTheme.palette.primary.main, // ✅ عند التحديد
                        },
                      }}
                    />
                  }
                  label={
                    <Typography
                      sx={{
                        fontWeight: "600",
                        fontSize: "clamp(14px, 2vw, 18px)",
                        color: muiTheme.palette.text.primary, // ✅ النصوص من الثيم
                      }}
                    >
                      Pets
                    </Typography>
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
                        background: muiTheme.palette.background.paper, // ✅ الخلفية من الثيم
                        borderRadius: "12px",
                        padding: "20px",
                        boxShadow: muiTheme.shadows[3], // ✅ ظل من الثيم
                        border: `1px solid ${muiTheme.palette.secondary.main}`, // ✅ الحدود من الثيم
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
                                    color: muiTheme.palette.secondary.main,
                                    "&.Mui-checked": {
                                      color: muiTheme.palette.primary.main,
                                    },
                                  }}
                                />
                              }
                              label={
                                <Typography
                                  sx={{
                                    fontWeight: "600",
                                    fontSize: "clamp(14px, 2vw, 16px)",
                                    color: muiTheme.palette.text.primary,
                                  }}
                                >
                                  {type}
                                </Typography>
                              }
                            />
                          ))}
                        </Box>

                        {bookingData.petType === "other" && (
                          <TextField
                            label="Animal type"
                            value={bookingData.customPetType || ""}
                            onChange={(e) => {
                              const value = e.target.value;
                              const containsArabic = /[\u0600-\u06FF]/.test(
                                value
                              );
                              const containsSymbolsOrNumbers =
                                /[^a-zA-Z\s]/.test(value);

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
                                fontSize: "clamp(14px, 2vw, 18px)",
                                color: muiTheme.palette.text.primary, // ✅ النصوص من الثيم
                                backgroundColor:
                                  muiTheme.palette.background.default, // ✅ الخلفية من الثيم
                              },
                            }}
                            sx={{
                              width: "100%",
                              maxWidth: "400px",
                              "& label": {
                                color: muiTheme.palette.secondary.main,
                                fontWeight: "600",
                                fontSize: "clamp(14px, 2vw, 18px)",
                              },
                              "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                  borderColor: muiTheme.palette.secondary.main,
                                },
                                "&:hover fieldset": {
                                  borderColor: muiTheme.palette.primary.main,
                                },
                                "&.Mui-focused fieldset": {
                                  borderColor: muiTheme.palette.primary.main,
                                },
                              },
                            }}
                          />
                        )}
                      </Stack>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div>
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
                        color: muiTheme.palette.secondary.main, // ✅ اللون الافتراضي
                        "&.Mui-checked": {
                          color: muiTheme.palette.primary.main, // ✅ عند التحديد
                        },
                      }}
                    />
                  }
                  label={
                    <Typography
                      sx={{
                        fontWeight: "600",
                        fontSize: "clamp(14px, 2vw, 18px)",
                        color: muiTheme.palette.text.primary, // ✅ النصوص من الثيم
                      }}
                    >
                      Tour Guide
                    </Typography>
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
                        background: muiTheme.palette.background.paper, // ✅ الخلفية من الثيم
                        borderRadius: "12px",
                        padding: "20px",
                        boxShadow: muiTheme.shadows[3], // ✅ ظل من الثيم
                        border: `1px solid ${muiTheme.palette.secondary.main}`, // ✅ الحدود من الثيم
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
                                  onChange={() =>
                                    handleGuideLanguageChange(lang)
                                  }
                                  sx={{
                                    color: muiTheme.palette.secondary.main,
                                    "&.Mui-checked": {
                                      color: muiTheme.palette.primary.main,
                                    },
                                  }}
                                />
                              }
                              label={
                                <Typography
                                  sx={{
                                    fontWeight: "600",
                                    fontSize: "clamp(14px, 2vw, 16px)",
                                    color: muiTheme.palette.text.primary,
                                  }}
                                >
                                  {lang}
                                </Typography>
                              }
                            />
                          ))}
                        </Box>
                      </Stack>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                style={{
                  width: "70%",
                  borderRadius: "12px",
                  padding: "20px",
                  marginBottom: "12px",
                  boxShadow: muiTheme.shadows[4], // ✅ ظل من الثيم
                  backgroundColor: muiTheme.palette.background.paper, // ✅ الخلفية من الثيم
                  border: `1px solid ${muiTheme.palette.secondary.main}`, // ✅ الحدود من الثيم
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
                      color: muiTheme.palette.text.primary, // ✅ النصوص من الثيم
                      fontFamily: "Cairo, sans-serif",
                    }}
                  >
                    Payment Optionsw
                  </Typography>

                  <StripeCheckoutButton
                    tour={tour}
                    user={user}
                    setNan={setNan}
                    TTfinalPriceAfterRival={TTfinalPriceAfterRival}
                    selectedExtras={selectedExtras}
                    nan={nan}
                    setHasBooked={setHasBooked}
                    bookingData={bookingData}
                    setBookingData={setBookingData}
                  />
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
