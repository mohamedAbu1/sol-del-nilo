import jwt from "jsonwebtoken"
export function vrefyTokenForPage(token) {
  try {
    const privatekey = process.env.JWT_SECRET || "your-secret-key";
    const userPlayload = jwt.verify(token, privatekey);
    if (!userPlayload) return null;

    return userPlayload;
  } catch (error) {
    return null;
  }
}
