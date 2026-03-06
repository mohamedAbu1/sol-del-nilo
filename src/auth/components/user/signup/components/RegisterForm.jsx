"use client"
import { motion } from "framer-motion"
import {
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio
} from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { useTheme } from "@mui/material/styles"

export default function RegisterForm({
  formData,
  handleEnglishOnlyChange,
  handleEmailBlur,
  handleSubmit,
  showPassword,
  setShowPassword,
  itemVariants,
  handleGenderChange // ✅ دالة لتغيير الجنس
}) {
  const theme = useTheme()

  const textColor =
    theme.palette.mode === "dark"
      ? theme.palette.secondary.contrastText
      : theme.palette.text.primary

  return (
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
            width: "80%",
            zIndex: "9999",
            input: {
              color: textColor,
              fontSize: "18px",
              fontWeight: "bold",
              fontFamily: "Cairo, sans-serif",
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
            width: "80%",
            zIndex: "9999",
            input: {
              color: textColor,
              fontSize: "18px",
              fontWeight: "bold",
              fontFamily: "Cairo, sans-serif",
            },
          }}
        />

        {/* Password */}
        <FormControl
          variant="outlined"
          required
          sx={{
            width: "80%",
            zIndex: "9999",
            "& .MuiOutlinedInput-root input": {
              color: textColor,
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
                <IconButton onClick={() => setShowPassword(prev => !prev)} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="كلمة المرور"
          />
        </FormControl>

        {/* Gender */}
        <FormControl component="fieldset" sx={{ width: "80%", zIndex: "9999" }}>
          <InputLabel shrink>Gender</InputLabel>
          <RadioGroup
            row
            name="gender"
            value={formData.gender}
            onChange={handleGenderChange}
            sx={{ justifyContent: "space-around", color: textColor }}
          >
            <FormControlLabel
              value="male"
              control={<Radio />}
              label="Male"
              sx={{ color: textColor }}
            />
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
              sx={{ color: textColor }}
            />
          </RadioGroup>
        </FormControl>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          sx={{
            width: "80%",
            mt: "22px",
            zIndex:"999",
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.getContrastText(theme.palette.secondary.main),
          }}
        >
          Create account
        </Button>
      </form>
    </motion.div>
  )
}
