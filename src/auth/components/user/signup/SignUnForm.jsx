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

const SignUnForm = () => {
  // async function submit(formData) {
  //   const result = await handleContact(formData)
  //   console.log(result)
  // }

  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/register", {
        name,
        email,
        password,
      });

      console.log("📤 تم إرسال البيانات:", response.data);

      if (response.status === 201) {
        router.push("/login");
      } else {
        alert(`❌ خطأ: ${response.data.error || response.data.message}`);
      }
    } catch (error) {
      console.error("❌ خطأ أثناء الإرسال:", error);
      alert("حدث خطأ أثناء الاتصال بالخادم");
    }
  };

  const { width } = useScreenSize();
  const t = useTranslations("SignUnForm");

  //   const handleClickShowPassword = () => setShowPassword((show) => !show);
  //   const handleMouseDownPassword = (event) => event.preventDefault();
  //   const handleMouseUpPassword = (event) => event.preventDefault();

  return (
    <motion.section
      className="w-full h-full lg:w-1/2 flex items-center justify-center z-20"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        variants={itemVariants}
        style={{ borderRadius: "25px", position: "relative" ,height:"fit-contact"}}
        className="w-3/4 lg:h-3/4 formDiv"
      >
        <motion.div
          variants={containerVariants}
          className="w-full h-full flex flex-col items-center justify-center gap-5"
          style={{ borderRadius: "25px" }}
        >
          <motion.div variants={itemVariants}  style={{ zIndex: "9999" }}>
            <Image
              src={logo2}
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

          <motion.div
            variants={itemVariants}
            style={{ width:"100%" }}
          >
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
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              >
                <InputLabel>Your password</InputLabel>
                <OutlinedInput
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
    </motion.section>
  );
};

export default SignUnForm;
