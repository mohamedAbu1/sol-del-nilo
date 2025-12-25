"use client";
import { Box, Grid, TextField, Button, Typography } from "@mui/material";
import Lottie from "lottie-react";
import emailAnimation from "../../../../public/animations/Email.json"; // ✅ مسار الأنيميشن
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css"; // ✅ ستايل متناسق مع MUI
// import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import axios from "axios";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";
const ContactUs = ({ user }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const { theme, setTheme } = useTheme();
  const muiTheme = useTheme(); // ✅ يجيب الثيم الحالي
  const [emailError, setEmailError] = useState("");
  const sanitizeInput = (value) => value.replace(/[^a-zA-Z0-9 ]/g, "");
  const handleNameChange = (e) => setName(sanitizeInput(e.target.value));
  const handleSubjectChange = (e) => setSubject(sanitizeInput(e.target.value));
  const handleMessageChange = (e) => setMessage(sanitizeInput(e.target.value));
const inputVariants = {
  hidden: { opacity: 0, x: -100 },   // يبدأ خارج الشاشة من الشمال
  visible: { opacity: 1, x: 0 },     // يدخل لمكانه الطبيعي
};
const emailVariants = {
  hidden: { opacity: 0, x: 100 },    // يبدأ خارج الشاشة من اليمين
  visible: { opacity: 1, x: 0 },     // يدخل لمكانه الطبيعي
};
  const handleEmailBlur = () => {
    if (!email.endsWith("@gmail.com")) {
      toast.error("Email must end with @gmail.com");
    } else {
      setEmailError("");
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z0-9@._-]/g, "");
    setEmail(value);
  };
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {    }
  }, [theme]);

  const handleSubmit = async () => {
    if (!user) {
      toast.error("You must log in first.");
      return;
    }

    try {
      const { data } = await axios.post("/api/sendEmail", {
        name,
        email,
        subject,
        message,
        phone,
        user_id: user.id, // ✅ أرسل معرف المستخدم
      });

      if (data.success) {
        toast.success("Message sent successfully!");
        setName("");
        setEmail("");
        setPhone("");
        setSubject("");
        setMessage("");
      } else {
        toast.error("Failed to send message.");
      }
    } catch (err) {
      console.error("Axios error:", err.response?.data || err.message);
      toast.error("حدث خطأ أثناء إرسال البريد.");
    }
  };

  const isFormValid = () => {
    return (
      name.trim() !== "" &&
      email.trim().endsWith("@gmail.com") &&
      subject.trim() !== "" &&
      message.trim() !== "" &&
      phone.trim() !== ""
    );
  };
  const t = useTranslations("ContactPage");

  return (
    <Box
      sx={{
        color: "#fff",
        height: "100%",
        p: 4,
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 4,
      }}
    >
      {/* ✅ النموذج */}
    <motion.div
      variants={inputVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Box sx={{ flex: 1 }}>
        <Typography
          variant="h4"
          sx={{
            mb: { xs: 2, md: 3 },
            color: muiTheme.palette.secondary.main, // ✅ من الثيم
            fontWeight: 700,
            fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.5rem" },
            textAlign: { xs: "center", md: "left" },
          }}
        >
          {t("title")}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            mb: { xs: 3, md: 4 },
            color: muiTheme.palette.text.secondary, // ✅ من الثيم
            fontSize: { xs: "0.95rem", sm: "1rem", md: "1.1rem" },
            textAlign: { xs: "center", md: "left" },
            lineHeight: 1.6,
          }}
        >
          {t("p")}
        </Typography>

        <Grid
          container
          spacing={2}
          sx={{ display: "flex", flexDirection: "column", gap: "40px" }}
        >
          {/* Name */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              onChange={handleNameChange}
              value={name}
              sx={{
                input: {
                  borderRadius: "20px",
                  color: muiTheme.palette.text.primary,
                  backgroundColor: muiTheme.palette.background.paper,
                },
                "& .MuiInputLabel-root": {
                  color: muiTheme.palette.secondary.main,
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: muiTheme.palette.secondary.main,
                    borderRadius: "20px",
                  },
                  "&:hover fieldset": {
                    borderColor: muiTheme.palette.primary.light,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: muiTheme.palette.secondary.main,
                  },
                },
              }}
            />
          </Grid>

          {/* Email */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              value={email}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
              error={!!emailError}
              helperText={emailError}
              sx={{
                input: {
                  borderRadius: "20px",
                  color: muiTheme.palette.text.primary,
                  backgroundColor: muiTheme.palette.background.paper,
                },
                "& .MuiInputLabel-root": {
                  color: muiTheme.palette.secondary.main,
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: muiTheme.palette.secondary.main,
                    borderRadius: "20px",
                  },
                  "&:hover fieldset": {
                    borderColor: muiTheme.palette.primary.light,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: muiTheme.palette.secondary.main,
                  },
                },
              }}
            />
          </Grid>

          {/* PhoneInput (مكتبة خارجية) */}
          <Grid container spacing={2}>
            <Box sx={{ width: "100%" }}>
              <PhoneInput
                country={"eg"}
                value={phone}
                onChange={setPhone}
                enableSearch={true}
                inputStyle={{
                  width: "100%",
                  color: muiTheme.palette.text.primary,
                  backgroundColor: muiTheme.palette.background.paper,
                  fontSize: "1rem",
                  fontWeight: 500,
                  borderRadius: "12px",
                  border: `1px solid ${muiTheme.palette.secondary.main}`,
                  padding: "14px 59px",
                }}
                buttonStyle={{
                  backgroundColor: muiTheme.palette.secondary.main,
                  border: "none",
                  borderTopLeftRadius: "12px",
                  borderBottomLeftRadius: "12px",
                }}
                containerStyle={{
                  width: "100%",
                  borderRadius: "12px",
                  boxShadow: muiTheme.shadows[4],
                }}
                dropdownStyle={{
                  backgroundColor: muiTheme.palette.background.default,
                  color: muiTheme.palette.text.primary,
                  border: `1px solid ${muiTheme.palette.secondary.main}`,
                }}
                searchStyle={{
                  backgroundColor: muiTheme.palette.background.paper,
                  color: muiTheme.palette.text.primary,
                  border: `1px solid ${muiTheme.palette.secondary.main}`,
                }}
              />
            </Box>
          </Grid>

          {/* Subject */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Subject"
              variant="outlined"
              onChange={handleSubjectChange}
              value={subject}
              sx={{
                input: {
                  borderRadius: "20px",
                  color: muiTheme.palette.text.primary,
                  backgroundColor: muiTheme.palette.background.paper,
                },
                "& .MuiInputLabel-root": {
                  color: muiTheme.palette.secondary.main,
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: muiTheme.palette.secondary.main,
                    borderRadius: "20px",
                  },
                  "&:hover fieldset": {
                    borderColor: muiTheme.palette.primary.light,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: muiTheme.palette.secondary.main,
                  },
                },
              }}
            />
          </Grid>

          {/* Message */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Message"
              variant="outlined"
              multiline
              minRows={4}
              maxRows={10}
              onChange={handleMessageChange}
              value={message}
              sx={{
                "& .MuiInputBase-root": {
                  color: muiTheme.palette.text.primary,
                  backgroundColor: muiTheme.palette.background.paper,
                  padding: "12px",
                  borderRadius: "20px",
                },
                "& .MuiInputLabel-root": {
                  color: muiTheme.palette.secondary.main,
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: muiTheme.palette.secondary.main,
                    borderRadius: "20px",
                  },
                  "&:hover fieldset": {
                    borderColor: muiTheme.palette.primary.light,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: muiTheme.palette.secondary.main,
                  },
                },
              }}
            />
          </Grid>

          {/* Submit Button */}
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <Button
              onClick={handleSubmit}
              disabled={!isFormValid()}
              variant="contained"
              sx={{
                backgroundColor: muiTheme.palette.secondary.main,
                color: muiTheme.palette.getContrastText(
                  muiTheme.palette.secondary.main
                ),
                fontWeight: 600,
                borderRadius: "8px",
                px: 4,
                py: 1,
                "&:hover": {
                  backgroundColor: muiTheme.palette.primary.main,
                },
              }}
            >
              SEND MESSAGE
            </Button>
          </Grid>
        </Grid>
      </Box>
    </motion.div>

      {/* ✅ الأنيميشن */}
       <motion.div
          variants={emailVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ width: "100%", maxWidth: 600 }}
        >
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
       
          <Lottie
            animationData={emailAnimation}
            loop={true}
            style={{ width: "100%", maxWidth: 600 }}
          />
      </Box>
              </motion.div>

      <ToastContainer />
    </Box>
  );
};

export default ContactUs;
