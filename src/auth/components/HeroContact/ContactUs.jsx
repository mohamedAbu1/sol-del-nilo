"use client";
import { Box, Grid, TextField, Button, Typography } from "@mui/material";
import Lottie from "lottie-react";
import emailAnimation from "../../../../public/animations/Email.json"; // ✅ مسار الأنيميشن
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css"; // ✅ ستايل متناسق مع MUI
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import axios from "axios";

const ContactUs = ({ user }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const { theme, setTheme } = useTheme();

  const [emailError, setEmailError] = useState("");
  const sanitizeInput = (value) => value.replace(/[^a-zA-Z0-9 ]/g, "");
  const handleNameChange = (e) => setName(sanitizeInput(e.target.value));
  const handleSubjectChange = (e) => setSubject(sanitizeInput(e.target.value));
  const handleMessageChange = (e) => setMessage(sanitizeInput(e.target.value));

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
    if (process.env.NODE_ENV === "development") {
    console.log("Current theme is:", theme);
  }
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
      <Box sx={{ flex: 1 }}>
        <Typography
          variant="h4" // ✅ حجم مناسب ومتجاوب
          sx={{
            mb: { xs: 2, md: 3 },
            color: "#ffb300",
            fontWeight: 700,
            fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.5rem" },
            textAlign: { xs: "center", md: "left" },
          }}
        >
          {t("title")}
        </Typography>

        <Typography
          variant="body1" // ✅ بديل احترافي لـ p
          sx={{
            mb: { xs: 3, md: 4 },
            color: "grey",
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
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              onChange={handleNameChange}
              value={name}
              sx={{
                borderRadius: "20px",
                input: {
                  borderRadius: "20px",
                  color: theme === "dark" ? "#fff" : "#2c2c2c",
                  backgroundColor: theme === "dark" ? "#2c2c2c" : "#fff",
                },
                label: {
                  color: "#ffb300",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#ffb300",
                    borderRadius: "20px",
                  },
                  "&:hover fieldset": {
                    borderColor: "#ffc107",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#ffb300",
                  },
                },
              }}
            />
          </Grid>
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
                borderRadius: "20px",
                input: {
                  color: theme === "dark" ? "#fff" : "#2c2c2c",
                  backgroundColor: theme === "dark" ? "#2c2c2c" : "#fff",
                  borderRadius: "20px",
                },
                label: {
                  color: "#ffb300",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#ffb300",
                    borderRadius: "20px",
                  },
                  "&:hover fieldset": {
                    borderColor: "#ffc107",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#ffb300",
                  },
                },
              }}
            />
          </Grid>
          <Grid container spacing={2}>
            <Box sx={{ width: "100%" }}>
              <PhoneInput
                country={"eg"}
                value={phone}
                onChange={setPhone}
                enableSearch={true} // ✅ بحث عن الدولة
                inputStyle={{
                  width: "100%",
                  color: theme === "dark" ? "#fff" : "#2c2c2c",
                  backgroundColor: theme === "dark" ? "#2c2c2c" : "#fff",
                  fontSize: "1rem",
                  fontWeight: 500,
                  borderRadius: "12px",
                  border: "1px solid #ffb300",
                  padding: "14px 59px",
                }}
                buttonStyle={{
                  backgroundColor: "#ffb300",
                  border: "none",
                  borderTopLeftRadius: "12px",
                  borderBottomLeftRadius: "12px",
                }}
                containerStyle={{
                  width: "100%",
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                }}
                dropdownStyle={{
                  backgroundColor: "#212121",
                  color: "#fff",
                  border: "1px solid #ffb300",
                }}
                searchStyle={{
                  backgroundColor: "#2c2c2c",
                  color: "#fff",
                  border: "1px solid #ffb300",
                }}
              />
            </Box>
          </Grid>

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
                  color: theme === "dark" ? "#fff" : "#2c2c2c",
                  backgroundColor: theme === "dark" ? "#2c2c2c" : "#fff",
                },
                label: {
                  color: "#ffb300",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#ffb300",
                    borderRadius: "20px",
                  },
                  "&:hover fieldset": {
                    borderColor: "#ffc107",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#ffb300",
                  },
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Message"
              variant="outlined"
              multiline
              minRows={4}
              maxRows={10} // ✅ مرونة في التمدد
              onChange={handleMessageChange}
              value={message}
              sx={{
                width: "100%",
                borderRadius: "20px",

                "& .MuiInputBase-root": {
                  color: theme === "dark" ? "#fff" : "#2c2c2c",
                  backgroundColor: theme === "dark" ? "#2c2c2c" : "#fff",
                  padding: "12px",
                  borderRadius: "20px",
                },
                "& .MuiInputLabel-root": {
                  color: "#ffb300", // ✅ لون عنوان الحقل
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#ffb300", // ✅ حدود صفراء
                    borderRadius: "20px",
                  },
                  "&:hover fieldset": {
                    borderColor: "#ffc107",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#ffb300",
                  },
                },
              }}
            />
          </Grid>

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
                backgroundColor: "#ffb300",
                color: "#fff",
                fontWeight: 600,
                borderRadius: "8px",
                px: 4,
                py: 1,
                "&:hover": {
                  backgroundColor: "#ffc107",
                },
              }}
            >
              SEND MESSAGE
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* ✅ الأنيميشن */}
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
      <ToastContainer />
    </Box>
  );
};

export default ContactUs;
