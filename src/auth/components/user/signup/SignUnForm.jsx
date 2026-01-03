"use client";
import {
  TextField,
  IconButton,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
  Typography,
  Button,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Image from "next/image";
import axios from "axios";
import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useTheme } from "@mui/material/styles"; // ✅ استدعاء الثيم
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
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
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
const containsArabic = (text) => /[\u0600-\u06FF]/.test(text);
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
const SignUnForm = () => {
  const allowedDomains = [
    "@gmail.com",
    "@outlook.com",
    "@hotmail.com",
    "@yahoo.com",
    "@icloud.com",
    "@live.com",
    "@mail.ru",
    "@gmx.com",
  ];
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const t = useTranslations("SignUnForm");
  const muiTheme = useTheme(); // ✅ يجيب الثيم الحالي
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  const handleEmailBlur = (e) => {
    const value = e.target.value;
    const domain = value.slice(value.indexOf("@"));

    if (value.includes("@") && !allowedDomains.includes(domain)) {
      toast.error(
        "The email must be from a well-known domain such as gmail or hotmail. ❌"
      );

      // حذف النطاق السيئ
      const localPart = value.slice(0, value.indexOf("@"));
      setFormData((prev) => ({ ...prev, email: localPart }));
    }
  };
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  const handleChange = (e) => {
    const { name, value } = e.target;

    // ✅ منع اللغة العربية في الحقول المحددة
    const textFields = ["name", "email", "password"];
    if (textFields.includes(name) && containsArabic(value)) {
      toast.error("Must be written in English only ❌");
      return;
    }

    // ✅ تحقق من الطول لحقل الاسم
    if (name === "name" && (value.length < 0 || value.length > 14)) {
      toast.error("The name must be between 3 and 14 characters long. ❌");
      return;
    }

    // ✅ تحديث الحالة
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  const handleEnglishOnlyChange = (e) => {
    const { name, value } = e.target;

    const textFields = ["name", "email", "password"];
    if (textFields.includes(name) && containsArabic(value)) {
      toast.error("Must be written in English only ❌");
      return;
    }

    handleChange(e); // تحديث الحالة الأصلية
  };
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/register", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status >= 200 && response.status < 300) {
        toast.success("Registration successful ✅");
        localStorage.setItem("user", "token");

        router.push("/");
      } else {
        toast.error(`❌ ${response.data.error || response.data.message}`);
      }
    } catch (error) {
      console.error("❌ خطأ أثناء الإرسال:", error);
      toast.error("An error occurred while connecting to the server. ❌");
    }
  };
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

  return (
    <motion.section
      className="w-full h-full lg:w-1/2 flex items-center justify-center z-20"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        variants={itemVariants}
        style={{
          borderRadius: "25px",
          position: "relative",
          height: "fit-contact",
          paddingBottom:"15px"
        }}
        className="w-3/4 lg:h-3/4 formDiv"
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
              style={{ zIndex: "9999" }}
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
            {t("title")}
          </motion.h1>

          {/* Subtitle */}
          <motion.h3
            variants={itemVariants}
            style={{ zIndex: "999" }}
            className="text-center"
          >
            <Typography
              variant="body1"
              sx={{ color: muiTheme.palette.text.secondary }} // ✅ من الثيم
            >
              {t("p")}
            </Typography>
          </motion.h3>

          {/* Form */}
          <motion.div variants={itemVariants} style={{ width: "100%" }}>
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "20px",
                margin: "auto",
                zIndex: "99999",
              }}
            >
              {/* Name */}
              <TextField
                label="Your Name"
                name="name"
                value={formData.name}
                onChange={handleEnglishOnlyChange}
                required
                inputProps={{ minLength: 3, maxLength: 14 }}
                sx={{
                  zIndex: "99999",
                  width: "80%",
                  input: {
                    color: muiTheme.palette.secondary.contrastText,
                    fontSize: "18px",
                    fontWeight: "bold",
                    fontFamily: "Cairo, sans-serif",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: muiTheme.palette.primary.light,
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

              {/* Email */}
              <TextField
                label="E-Mail"
                name="email"
                value={formData.email}
                onChange={handleEnglishOnlyChange}
                onBlur={handleEmailBlur}
                required
                sx={{
                  zIndex: "99999",
                  width: "80%",
                  input: {
                    color: muiTheme.palette.secondary.contrastText,
                    fontSize: "18px",
                    fontWeight: "bold",
                    fontFamily: "Cairo, sans-serif",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: muiTheme.palette.primary.light,
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
                required
                sx={{
                  width: "80%",
                  zIndex: "99999",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: muiTheme.palette.primary.light,
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
                <InputLabel>Your password</InputLabel>
                <OutlinedInput
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleEnglishOnlyChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((prev) => !prev)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="كلمة المرور"
                />
              </FormControl>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="contained"
                sx={{
                  width: "80%",
                  zIndex: "99999",
                  mt: "22px",
                  backgroundColor: muiTheme.palette.secondary.main,
                  color: muiTheme.palette.getContrastText(
                    muiTheme.palette.secondary.main
                  ),
                }}
              >
                Create account
              </Button>
            </form>
          </motion.div>

          {/* Footer Text */}
          <motion.h3
            variants={itemVariants}
            style={{ zIndex: "9999", fontSize: "22px" }}
          >
            <Typography sx={{ color: muiTheme.palette.text.secondary }}>
              {t("title2")}
            </Typography>
          </motion.h3>

          {/* Login Button */}
          <motion.div variants={itemVariants}>
            <Link href={"/login"}>
              <Button sx={{ zIndex: "9999" }} variant="contained">
                {t("btn2")}
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

export default SignUnForm;
