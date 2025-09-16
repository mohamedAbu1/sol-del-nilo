"use client";

// ✅ استيراد الأدوات والمكونات
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
import Image from "next/image";
import axios from "axios";
import { useState, useEffect } from "react";
import { useScreenSize } from "@/auth/hooks/screenSize";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

const logo2 = "/assets/Copilot_20250908_231423.png";

const LoginForm = () => {
  const router = useRouter(); // ✅ لإنشاء كائن التوجيه

  const { width } = useScreenSize();
  const t = useTranslations("LoginForm");

  // ✅ حالات الإدخال
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ حالة إظهار/إخفاء كلمة المرور
  const [showPassword, setShowPassword] = useState(false);

  // ✅ حالة رمز CSRF
  const [csrfToken, setCsrfToken] = useState("");

  // ✅ جلب رمز CSRF عند تحميل المكون
  useEffect(() => {
    axios.get("/api/csrf").then((res) => {
      setCsrfToken(res.data.csrfToken);
    });
  }, []);

  // ✅ إرسال بيانات تسجيل الدخول إلى الخادم
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

        // ✅ حفظ التوكن في localStorage (اختياري)
        localStorage.setItem("authToken", token);

        // يمكنك إعادة التوجيه هنا إذا أردت
        router.push("/"); // ✅ تحويل المستخدم إلى الصفحة الرئيسية
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
            {/* ✅ إدخال البريد الإلكتروني */}
            <TextField
              label="Your Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
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

            {/* ✅ إدخال كلمة المرور */}
            <FormControl
              variant="outlined"
              sx={{
                m: 1,
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
              {/* ✅ زر تسجيل الدخول */}
              <Button
                variant="contained"
                endIcon={<SendIcon />}
                sx={{ mt: "22px", backgroundColor: "#d4a85f" }}
                onClick={handleLogin}
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
