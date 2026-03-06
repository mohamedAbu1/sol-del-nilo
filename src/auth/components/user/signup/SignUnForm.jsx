"use client";
import axios from "axios";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import Logo from "./components/Logo";
import Title from "./components/Title";
import Subtitle from "./components/Subtitle";
import RegisterForm from "./components/RegisterForm";
import Footer from "./components/Footer";
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
    gender: "", // ✅ جديد
  });
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const {t} = useTranslation("");
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
  const handleGenderChange = (e) => {
    setFormData({ ...formData, gender: e.target.value });
  };
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
        style={{
          borderRadius: "25px",
          position: "relative",
          paddingBottom: "15px",
        }}
        className="w-3/4 lg:h-3/4 formDiv"
      >
        {" "}
        <motion.div
          variants={containerVariants}
          className="w-full h-full flex flex-col items-center justify-center gap-5"
          style={{ borderRadius: "25px" }}
        >
          {" "}
          <Logo muiTheme={muiTheme} itemVariants={itemVariants} />{" "}
          <Title muiTheme={muiTheme} t={t} itemVariants={itemVariants} />{" "}
          <Subtitle muiTheme={muiTheme} t={t} itemVariants={itemVariants} />{" "}
          <RegisterForm
            muiTheme={muiTheme}
            formData={formData}
            handleEnglishOnlyChange={handleEnglishOnlyChange}
            handleEmailBlur={handleEmailBlur}
            handleSubmit={handleSubmit}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            itemVariants={itemVariants}
            handleGenderChange={handleGenderChange}
          />{" "}
          <Footer muiTheme={muiTheme} t={t} itemVariants={itemVariants} />{" "}
        </motion.div>{" "}
      </motion.div>{" "}
      <ToastContainer />{" "}
    </motion.section>
  );
};

export default SignUnForm;
