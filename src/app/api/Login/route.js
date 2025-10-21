
import { NextResponse } from "next/server";
import { UserLoginSchema } from "@/lib/utils/CheckSchema";
import { supabase } from "@/lib/supabaseClient";
import bcrypt from "bcryptjs";
import { setCookie } from "@/lib/utils/JWToken";

export async function POST(req) {
  try {
    const body = await req.json();
    const parsed = UserLoginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "البيانات غير صالحة" }, { status: 400 });
    }

    const { email, password } = parsed.data;

    const { data: user, error: findError } = await supabase
      .from("user")
      .select("id, name, email, password, role, isActive")
      .eq("email", email)
      .single();

    if (findError) {
      return NextResponse.json({ error: "The user does not exist" }, { status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "كلمة المرور غير صحيحة" }, { status: 401 });
    }

    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      isActive: user.isActive,
    };

    const cookie = setCookie(payload);
    const response = NextResponse.json({ token: cookie }, { status: 200 });
    response.headers.set("Set-Cookie", cookie);
    return response;
  } catch (error) {
    console.error("❌ خطأ في تسجيل الدخول:", error);
    return NextResponse.json({ error: "خطأ داخلي في السيرفر" }, { status: 500 });
  }
}
