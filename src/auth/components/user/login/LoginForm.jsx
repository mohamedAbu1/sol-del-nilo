"use client";
import Logo from "./components/Logo";
import Title from "./components/Title";
import Subtitle from "./components/Subtitle";
import LogInForm from "./components/LogInForm";
import Footer from "./components/Footer";
import axios from "axios";
import { useState } from "react";
import { useScreenSize } from "@/hooks/screenSize";
import { useTranslation } from "react-i18next";
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
  const {t} = useTranslation("");
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
      {" "}
      <motion.div
        variants={itemVariants}
        style={{ borderRadius: "25px", position: "relative" }}
        className="w-3/4 h-5/6 lg:h-3/4 formDiv"
      >
        {" "}
        <motion.div
          variants={containerVariants}
          className="w-full h-full flex flex-col items-center justify-center gap-5"
          style={{ borderRadius: "25px" }}
        >
          {" "}
          <Logo itemVariants={itemVariants} />{" "}
          <Title t={t} itemVariants={itemVariants} />{" "}
          <Subtitle t={t} itemVariants={itemVariants} />{" "}
          <LogInForm
            formData={formData}
            handleEnglishOnlyChange={handleEnglishOnlyChange}
            showPassword={showPassword}
            handleClickShowPassword={handleClickShowPassword}
            handleMouseDownPassword={handleMouseDownPassword}
            handleMouseUpPassword={handleMouseUpPassword}
            handleLogin={handleLogin}
            itemVariants={itemVariants}
            width={width}
            t={t}
          />{" "}
          <Footer t={t} itemVariants={itemVariants} />{" "}
        </motion.div>{" "}
      </motion.div>{" "}
      <ToastContainer />{" "}
    </motion.section>
  );
};

export default LoginForm;
