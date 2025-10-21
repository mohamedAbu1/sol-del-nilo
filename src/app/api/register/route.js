
import { supabase } from "@/lib/supabaseClient";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { UserSchema } from "@/lib/utils/CheckSchema"; // Zod للتحقق من صحة البيانات
import { setCookie, generateToken } from "@/lib/utils/JWToken"; // توليد وتخزين JWT

export async function POST(request) {
  try {
    // ✅ قراءة البيانات من الطلب
    const body = await request.json();

    // ✅ التحقق من صحة البيانات باستخدام Zod
    const parsed = UserSchema.safeParse(body);
    if (!parsed.success) {
      console.error("❌ فشل التحقق من البيانات:", parsed.error);
      return NextResponse.json(
        { error: "البيانات غير صالحة" },
        { status: 400 }
      );
    }

    const { name, email, password } = parsed.data;

    // ✅ التحقق من وجود المستخدم مسبقًا
    const { data: existingUser, error: findError } = await supabase
      .from("user")
      .select("id")
      .eq("email", email)
      .single();

    if (findError && findError.code !== "PGRST116") {
      console.error("❌ خطأ في البحث:", findError.message);
      return NextResponse.json(
        { error: "فشل التحقق من البريد الإلكتروني" },
        { status: 500 }
      );
    }

    if (existingUser) {
      return NextResponse.json(
        { error: "المستخدم موجود بالفعل، يرجى استخدام بريد إلكتروني آخر" },
        { status: 409 }
      );
    }

    // ✅ تشفير كلمة المرور
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ إدخال المستخدم الجديد
    const { data: newUser, error: insertError } = await supabase
      .from("user")
      .insert([
        {
          name,
          email,
          password: hashedPassword,
          role: "USER",
          isActive: true,
        },
      ])
      .select("id, name, email, role, isActive");

    if (insertError) {
      console.error("❌ خطأ في الإدخال:", insertError.message);
      return NextResponse.json(
        { error: "فشل إنشاء المستخدم: " + insertError.message },
        { status: 500 }
      );
    }

    // ✅ التحقق من وجود بيانات بعد الإدخال
    if (!newUser || !newUser[0]) {
      console.error("❌ لم يتم استرجاع بيانات المستخدم بعد الإدخال");
      return NextResponse.json(
        { error: "فشل في استرجاع بيانات المستخدم بعد الإدخال" },
        { status: 500 }
      );
    }

    // ✅ إنشاء JWT وتخزينه في الكوكيز
    const payload = {
      id: newUser[0].id,
      email: newUser[0].email,
      name: newUser[0].name,
      role: newUser[0].role,
      isActive: newUser[0].isActive,
    };

    // ✅ تخزين JWT في الكوكيز
    const cookie = setCookie(payload);

    const response = NextResponse.json(
      {
        message: "تم إنشاء المستخدم بنجاح",
        user: newUser[0],
      },
      { status: 200 }
    );

    // ✅ التحقق من الكوكي قبل إضافته
    if (cookie) {
      response.headers.set("Set-Cookie", cookie);
    } else {
      console.warn("⚠️ لم يتم إنشاء الكوكيز بشكل صحيح");
    }

    return response;
  } catch (error) {
    console.error("❌ خطأ عام:", error);
    return NextResponse.json(
      { error: "حدث خطأ داخلي في السيرفر" },
      { status: 500 }
    );
  }
}
