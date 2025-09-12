"use client";
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
const logo2 = "/assets/Copilot_20250908_231423.png";
import Image from "next/image";
import { useScreenSize } from "@/auth/hooks/screenSize";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
const LoginForm = () => {
  const { width, height } = useScreenSize();
  const t = useTranslations("LoginForm");

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };
  return (
    <section className="w-full h-full lg:w-1/2 flex items-center justify-center z-20">
      <div
        style={{ borderRadius: "25px", position: "relative" }}
        className="w-3/4 h-5/6 lg:h-3/4 formDiv"
      >
        <div
          style={{ borderRadius: "25px" }}
          className="w-full h-full flex flex-col items-center justify-center gap-5"
        >
          <Image
            src={logo2}
            alt="Logo"
            width={150}
            height={150}
            loading="eager"
            style={{ zIndex: "9999" }}
            className="flex lg:hidden"
          />

          <h1 style={{ color: "#ff9800", zIndex: "999", fontSize: "28px" }}>
           {t("LoginTitle")}
          </h1>
          <h3 style={{ zIndex: "999" }} className="text-gray-400 text-center">
             {t("LoginP")}
          </h3>
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
              id="filled-basic"
              label="Your Email"
              variant="outlined"
              className="text-white"
              sx={{
                input: {
                  color: "#d4a85f", // لون النص داخل الحقل
                  fontSize: "18px", // حجم الخط
                  fontWeight: "bold", // سماكة الخط
                  fontFamily: "Cairo, sans-serif", // نوع الخط
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#d4a85f", // لون الحدود العادي
                  },
                  "&:hover fieldset": {
                    borderColor: "#ff9800", // عند المرور بالماوس
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#ff9800", // أثناء التركيز (focus)
                    borderWidth: "2px",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#d4a85f",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#ff9800",
                },
              }}
            />
            <FormControl
              sx={{
                m: 1,
                width: "25ch",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#d4a85f", // لون الحدود العادي
                  },
                  "&:hover fieldset": {
                    borderColor: "#ff9800", // عند المرور بالماوس
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#ff9800", // أثناء التركيز (focus)
                    borderWidth: "2px",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#d4a85f",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#ff9800",
                },
                input: {
                  color: "#d4a85f", // لون النص داخل الحقل
                  fontSize: "18px", // حجم الخط
                  fontWeight: "bold", // سماكة الخط
                  fontFamily: "Cairo, sans-serif", // نوع الخط
                },
              }}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Your Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword
                          ? "hide the password"
                          : "display the password"
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
              <Button
                variant="contained"
                endIcon={<SendIcon />}
                sx={{ mt: "22px", backgroundColor: "#d4a85f" }}
              >
                 {t("LoginBtn")}
              </Button>
            </FormControl>
          </Box>
          <h3
            style={{ zIndex: "999", fontSize: "22px" }}
            className="text-gray-400"
          >
              {t("account")}
          </h3>
          <Link href={"/register"}>
            <Button sx={{ zIndex: "999" }} size="large">
              {t("Btn2")}
            </Button>
          </Link>
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
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
