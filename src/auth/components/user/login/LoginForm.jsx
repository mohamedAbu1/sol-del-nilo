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
import { useState, useEffect } from "react";
import { useScreenSize } from "@/auth/hooks/screenSize";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const logo2 = "/assets/Copilot_20250908_231423.png";

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

const LoginForm = () => {
  const router = useRouter();
  const { width } = useScreenSize();
  const t = useTranslations("LoginForm");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [csrfToken, setCsrfToken] = useState("");

  useEffect(() => {
    axios.get("/api/csrf").then((res) => {
      setCsrfToken(res.data.csrfToken);
    });
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "/api/Login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
            "x-csrf-token": csrfToken,
          },
        }
      );

      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem("user", "token");
        router.push("/");
      } else {
        alert(`❌ خطأ: ${response.data.error || response.data.message}`);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(`❌ خطأ: ${error.response?.data?.error || "خطأ غير متوقع"}`);
      } else {
        alert("❌ حدث خطأ أثناء الاتصال بالخادم");
      }
      console.error("Axios error:", error);
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const handleMouseUpPassword = (event) => event.preventDefault();

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
          <motion.div variants={itemVariants}>
            <Image
              src={logo2}
              alt="Logo"
              width={150}
              height={150}
              loading="eager"
              className="flex lg:hidden"
              style={{ zIndex: "9999" }}
            />
          </motion.div>

          <motion.h1
            variants={itemVariants}
            style={{ color: "#ff9800", zIndex: "999", fontSize: "28px" }}
          >
            {t("LoginTitle")}
          </motion.h1>

          <motion.h3
            variants={itemVariants}
            style={{ zIndex: "999" }}
            className="text-gray-400 text-center"
          >
            {t("LoginP")}
          </motion.h3>

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
              <TextField
                label="Your Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
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
                sx={{
                  m: 1,
                  zIndex: "9999",

                  width: "25ch",
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
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  Your Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                          <VisibilityOff style={{ color: "#d4a85f" }} />
                        ) : (
                          <Visibility style={{ color: "#d4a85f" }} />
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
                      width:"100%",
                      mt: "22px",
                      backgroundColor: "#d4a85f",
                      zIndex: "9999",
                    }}
                    onClick={handleLogin}
                  >
                    {t("LoginBtn")}
                  </Button>
                </motion.div>
              </FormControl>
            </Box>
          </motion.div>

          <motion.h3
            variants={itemVariants}
            style={{ zIndex: "9999", fontSize: "22px" }}
            className="text-gray-400"
          >
            {t("account")}
          </motion.h3>

          <motion.div variants={itemVariants}>
            <Link href={"/register"}>
              <Button sx={{ zIndex: "999" }} size="large">
                {t("Btn2")}
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
              {t("Btn3")}
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default LoginForm;
