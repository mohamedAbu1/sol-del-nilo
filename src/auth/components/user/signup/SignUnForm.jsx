"use client";
import {
  TextField,
  IconButton,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
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
        }}
        className="w-3/4 lg:h-3/4 formDiv"
      >
        <motion.div
          variants={containerVariants}
          className="w-full h-full flex flex-col items-center justify-center gap-5"
          style={{ borderRadius: "25px" }}
        >
          <motion.div variants={itemVariants} style={{ zIndex: "9999" }}>
            <Image
              src={"/assets/Copilot_20250908_2314232.png"}
              alt="Logo"
              width={110}
              height={110}
              loading="eager"
              className="flex lg:hidden"
              style={{ zIndex: "9999" }}
            />
          </motion.div>

          <motion.h1
            variants={itemVariants}
            style={{ color: "#ff9800", zIndex: "999", fontSize: "28px" }}
          >
            {t("title")}
          </motion.h1>

          <motion.h3
            variants={itemVariants}
            style={{ zIndex: "999" }}
            className="text-gray-400 text-center"
          >
            {t("p")}
          </motion.h3>

          <motion.div variants={itemVariants} style={{ width: "100%" }}>
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "20px",
                // width: "400px",
                margin: "auto",
                zIndex: "99999",
              }}
            >
              <TextField
                label="Your Name"
                name="name"
                value={formData.name}
                onChange={handleEnglishOnlyChange}
                required
                inputProps={{
                  minLength: 3,
                  maxLength: 14,
                }}
                sx={{
                  zIndex: "9999",
                  width: "100%",
                  input: {
                    color: "#d4a85f",
                    fontSize: "18px",
                    fontWeight: "bold",
                    fontFamily: "Cairo, sans-serif",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#d4a85f" },
                    "&:hover fieldset": { borderColor: "#ff9800" },
                    "&.Mui-focused fieldset": {
                      borderColor: "#ff9800",
                      borderWidth: "2px",
                    },
                  },
                  "& .MuiInputLabel-root": { color: "#d4a85f" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#ff9800" },
                }}
              />
              <TextField
                label="E-Mail"
                name="email"
                value={formData.email}
                onChange={handleEnglishOnlyChange}
                onBlur={handleEmailBlur}
                required
                sx={{
                  width: "100%",
                  zIndex: "9999",
                  input: {
                    color: "#d4a85f",
                    fontSize: "18px",
                    fontWeight: "bold",
                    fontFamily: "Cairo, sans-serif",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#d4a85f" },
                    "&:hover fieldset": { borderColor: "#ff9800" },
                    "&.Mui-focused fieldset": {
                      borderColor: "#ff9800",
                      borderWidth: "2px",
                    },
                  },
                  "& .MuiInputLabel-root": { color: "#d4a85f" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#ff9800" },
                }}
              />
              <FormControl
                variant="outlined"
                required
                sx={{
                  zIndex: "9999",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#d4a85f" },
                    "&:hover fieldset": { borderColor: "#ff9800" },
                    "&.Mui-focused fieldset": {
                      borderColor: "#ff9800",
                      borderWidth: "2px",
                    },
                  },
                  "& .MuiInputLabel-root": { color: "#d4a85f" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#ff9800" },
                  input: {
                    color: "#d4a85f",
                    fontSize: "18px",
                    fontWeight: "bold",
                    fontFamily: "Cairo, sans-serif",
                  },
                }}
                fullWidth
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
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  width: "100%",
                  mt: "22px",
                  backgroundColor: "#d4a85f",
                  zIndex: "9999",
                }}
              >
                Create account
              </Button>
            </form>
          </motion.div>

          <motion.h3
            variants={itemVariants}
            style={{ zIndex: "9999", fontSize: "22px" }}
            className="text-gray-400"
          >
            {t("title2")}
          </motion.h3>

          <motion.div variants={itemVariants}>
            <Link href={"/login"}>
              <Button sx={{ zIndex: "9999" }} size="large">
                {t("btn2")}
              </Button>
            </Link>
          </motion.div>

          <motion.div variants={itemVariants} style={{ zIndex: "9999" }}>
            <Link
              href={"/"}
              style={{
                padding: "12px",
                borderRadius: "18px",
                backgroundColor: "#d4a85f",
                fontSize: "16px",
                zIndex: "9999",
                fontWeight: "600",
              }}
            >
              {t("btn3")}
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
      <ToastContainer />
    </motion.section>
  );
};

export default SignUnForm;
