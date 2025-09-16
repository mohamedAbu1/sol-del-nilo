// src/app/api/csrf/route.ts
import { generateCsrfToken } from "@/lib/utils/csrf";

export async function GET() {
  const secret = process.env.CSRF_SECRET;
  if (!secret) throw new Error("CSRF_SECRET is not defined");

  const token = generateCsrfToken(secret);

  return new Response(JSON.stringify({ csrfToken: token }), {
    headers: { "Content-Type": "application/json" },
  });
}
