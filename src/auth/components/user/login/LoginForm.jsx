"use client";
import {
  Box,
  TextField,
  IconButton,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
  Button,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import SendIcon from "@mui/icons-material/Send";
import Image from "next/image";
import axios from "axios";
import { useState } from "react";
import { useScreenSize } from "@/auth/hooks/screenSize";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import { useTheme } from "@mui/material/styles"; // ✅ استدعاء الثيم
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};
const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
const containsArabic = (text) => /[\u0600-\u06FF]/.test(text);
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
const LoginForm = () => {
  const router = useRouter();
  const { width } = useScreenSize();
  const t = useTranslations("LoginForm");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [csrfToken, setCsrfToken] = useState("");
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  const handleChange = (e) => {
    const { name, value } = e.target;

    // ✅ منع اللغة العربية في الحقول المحددة
    const textFields = ["email", "password"];
    if (textFields.includes(name) && containsArabic(value)) {
      toast.error("Must be written in English only ❌");
      return;
    }

    // ✅ تحديث الحالة
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  const handleLogin = async () => {
    try {
      // ✅ إرسال البيانات مباشرة بدون تغليف داخل formData
      const response = await axios.post("/api/Login", formData, {
        headers: {
          "Content-Type": "application/json",
          "x-csrf-token": csrfToken,
        },
      });

      if (response.status === 200) {
        const token = response.data.token;

        // ✅ تخزين التوكن الحقيقي
        localStorage.setItem("user", "token");

        // ✅ إعادة التوجيه بعد تسجيل الدخول
        router.push("/");
      } else {
        toast.error(
          `error ❌: ${response.data.error || response.data.message}`
        );
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          `error ❌: ${error.response?.data?.error || "Unexpected error"}`
        );
      } else {
        toast.error("An error occurred while connecting to the server. ❌");
      }
      console.error("Axios error:", error);
    }
  };
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  const handleEnglishOnlyChange = (e) => {
    const { name, value } = e.target;

    const textFields = ["email", "password"];
    if (textFields.includes(name) && containsArabic(value)) {
      toast.error("Must be written in English only ❌");
      return;
    }

    handleChange(e); // تحديث الحالة الأصلية
  };
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const handleMouseUpPassword = (event) => event.preventDefault();
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  const muiTheme = useTheme(); // ✅ يجيب الثيم الحالي
  return (
    <motion.section
      className="w-full h-full lg:w-1/2 flex items-center justify-center z-20"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        variants={itemVariants}
        style={{ borderRadius: "25px", position: "relative" }}
        className="w-3/4 h-5/6 lg:h-3/4 formDiv"
      >
        <motion.div
          variants={containerVariants}
          className="w-full h-full flex flex-col items-center justify-center gap-5"
          style={{ borderRadius: "25px" }}
        >
          {/* Logo */}
          <motion.div variants={itemVariants} style={{ zIndex: "9999" }}>
            <Image
              src={
                muiTheme.palette.mode === "dark"
                  ? "/assets/Copilot_20251209_142706-removebg-preview.webp"
                  : "/assets/Copilot_20251209_142706-removebg-preview.webp"
              } // ✅ صورة حسب الثيم
              alt="Logo"
              width={110}
              height={110}
              loading="eager"
              priority
              placeholder="blur"
              blurDataURL="data:image/webp;base64,..."
              className="flex lg:hidden"
            />
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={itemVariants}
            style={{
              color: muiTheme.palette.secondary.main, // ✅ من الثيم
              zIndex: "999",
              fontSize: "28px",
            }}
          >
            {t("LoginTitle")}
          </motion.h1>

          {/* Subtitle */}
          <motion.h3
            variants={itemVariants}
            style={{ zIndex: "999" }}
            className="text-center"
          >
            <span style={{ color: muiTheme.palette.text.secondary }}>
              {t("LoginP")}
            </span>
          </motion.h3>

          {/* Form */}
          <motion.div variants={itemVariants}>
            <Box
              component="form"
              sx={{
                "& > :not(style)": {
                  m: 1,
                  width:
                    width <= 500
                      ? "30ch"
                      : width <= 1023
                      ? "40ch"
                      : width >= 1280
                      ? "50ch"
                      : "40ch",
                },
                display: "flex",
                flexDirection: "column",
                zIndex: "999",
              }}
              noValidate
              autoComplete="off"
            >
              {/* Email */}
              <TextField
                name="email"
                label="Your Email"
                variant="outlined"
                value={formData.email}
                onChange={handleEnglishOnlyChange}
                sx={{
                  zIndex: 9999,
                  input: {
                    color: muiTheme.palette.secondary.contrastText,
                    fontSize: "18px",
                    fontWeight: "bold",
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
                      borderColor: muiTheme.palette.primary.light,
                      borderWidth: "2px",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: muiTheme.palette.primary.light,
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: muiTheme.palette.primary.main,
                  },
                }}
              />

              {/* Password */}
              <FormControl
                variant="outlined"
                sx={{
                  m: 1,
                  zIndex: "9999",
                  width: "25ch",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: muiTheme.palette.secondary.main,
                    },
                    "&:hover fieldset": {
                      borderColor: muiTheme.palette.primary.main,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: muiTheme.palette.primary.light,
                      borderWidth: "2px",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: muiTheme.palette.primary.light,
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: muiTheme.palette.primary.main,
                  },
                  input: {
                    color: muiTheme.palette.secondary.contrastText,
                    fontSize: "18px",
                    fontWeight: "bold",
                    fontFamily: "Cairo, sans-serif",
                  },
                }}
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  Your Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleEnglishOnlyChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showPassword ? "hide password" : "show password"
                        }
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityOff
                            style={{ color: muiTheme.palette.secondary.main }}
                          />
                        ) : (
                          <Visibility
                            style={{ color: muiTheme.palette.secondary.main }}
                          />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
                {/* زر تسجيل الدخول مع تأثير ضغط */}
                <motion.div
                  variants={itemVariants}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Button
                    variant="contained"
                    endIcon={<SendIcon />}
                    sx={{
                      width: "100%",
                      mt: "22px",
                      backgroundColor: muiTheme.palette.secondary.main,
                      color: muiTheme.palette.getContrastText(
                        muiTheme.palette.secondary.main
                      ),
                    }}
                    onClick={handleLogin}
                  >
                    {t("LoginBtn")}
                  </Button>
                </motion.div>
              </FormControl>
            </Box>
          </motion.div>

          {/* Footer Text */}
          <motion.h3
            variants={itemVariants}
            style={{ zIndex: "9999", fontSize: "22px" }}
          >
            <span style={{ color: muiTheme.palette.text.secondary }}>
              {t("account")}
            </span>
          </motion.h3>

          {/* Register Button */}
          <motion.div variants={itemVariants}>
            <Link href={"/register"}>
              <Button sx={{ zIndex: "999" }} size="large" variant="contained">
                {t("Btn2")}
              </Button>
            </Link>
          </motion.div>

          {/* Home Link */}
        </motion.div>
      </motion.div>
      <ToastContainer />
    </motion.section>
  );
};

export default LoginForm;
