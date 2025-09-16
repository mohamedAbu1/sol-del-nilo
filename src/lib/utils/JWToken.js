import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "your-secret-key";

// ✅ لإنشاء التوكن
export function generateToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: "7d" });
}

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
