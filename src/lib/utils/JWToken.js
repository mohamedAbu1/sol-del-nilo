import jwt from "jsonwebtoken";
import { serialize } from "cookie";
const SECRET = process.env.JWT_SECRET || "your-secret-key";
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// ✅ لإنشاء التوكن
export function generateToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: "7d" });
}
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// ✅ للتحقق من التوكن
export async function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, SECRET);
    return decoded;
  } catch (error) {
    console.error("JWT verification error:", error.message);
    return null;
  }
}
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
export function setCookie(payload) {
  const token = generateToken(payload);

  const cookie = serialize("jwttoken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // يُرسل فقط عبر HTTPS في الإنتاج
    sameSite: "lax", // يُرسل في التنقلات العادية، يحمي من CSRF
    path: "/", // متاح في كل صفحات الموقع
    maxAge: 60 * 60 * 24 * 30,
  });
  return cookie;
}
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
