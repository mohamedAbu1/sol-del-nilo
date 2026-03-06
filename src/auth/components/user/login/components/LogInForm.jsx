"use client"
import { motion } from "framer-motion"
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button
} from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import SendIcon from "@mui/icons-material/Send"
import { useTheme } from "@mui/material/styles"

export default function LogInForm({
  formData,
  handleEnglishOnlyChange,
  showPassword,
  handleClickShowPassword,
  handleMouseDownPassword,
  handleMouseUpPassword,
  handleLogin,
  itemVariants,
  width,
  t
}) {
  const muiTheme = useTheme()

  // ✅ تحديد لون النصوص حسب المود
  const textColor =
    muiTheme.palette.mode === "dark"
      ? muiTheme.palette.secondary.contrastText
      : muiTheme.palette.text.primary

  const labelColor =
    muiTheme.palette.mode === "dark"
      ? muiTheme.palette.primary.light
      : muiTheme.palette.primary.main

  return (
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
            width: "100%",
            zIndex: "9999",
            input: {
              color: textColor, // ✅ لون النص حسب المود
              fontSize: "18px",
              fontWeight: "bold",
              fontFamily: "Cairo, sans-serif",
            },
            "& .MuiInputLabel-root": {
              color: labelColor, // ✅ لون الليبل حسب المود
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
            "& .MuiOutlinedInput-root input": {
              color: textColor, // ✅ لون النص حسب المود
              fontSize: "18px",
              fontWeight: "bold",
              fontFamily: "Cairo, sans-serif",
            },
            "& .MuiInputLabel-root": {
              color: labelColor, // ✅ لون الليبل حسب المود
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: muiTheme.palette.primary.main,
            },
          }}
        >
          <InputLabel htmlFor="outlined-adornment-password">Your Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleEnglishOnlyChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={showPassword ? "hide password" : "show password"}
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? (
                    <VisibilityOff style={{ color: muiTheme.palette.secondary.main }} />
                  ) : (
                    <Visibility style={{ color: muiTheme.palette.secondary.main }} />
                  )}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
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
                color: muiTheme.palette.getContrastText(muiTheme.palette.secondary.main),
              }}
              onClick={handleLogin}
            >
              {t("LoginForm.LoginBtn")}
            </Button>
          </motion.div>
        </FormControl>
      </Box>
    </motion.div>
  )
}
