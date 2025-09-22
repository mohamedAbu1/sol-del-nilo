import { UserSchema } from "@/lib/utils/CheckSchema"; // التحقق من صحة البيانات باستخدام Zod
import prisma from "@/lib/utils/db"; // الاتصال بقاعدة البيانات
import { NextResponse } from "next/server"; // لإنشاء ردود HTTP
import bcrypt from "bcryptjs"; // لتشفير كلمة المرور
import { generateToken } from "@/lib/utils/JWToken"; // لإنشاء JWT
import { verifyCsrfToken } from "@/lib/utils/csrf"; // التحقق من رمز CSRF
import { setCookie } from "@/lib/utils/JWToken";

// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
export async function POST(request) {
  try {
    // // ✅ استخراج رمز CSRF من الهيدر
    // const csrfToken = request.headers.get("x-csrf-token");
    // const secret = process.env.CSRF_SECRET;
    // if (!secret) throw new Error("CSRF_SECRET is not defined");

    // // ✅ التحقق من صحة رمز CSRF
    // if (!csrfToken || !verifyCsrfToken(secret, csrfToken)) {
    //   return NextResponse.json(
    //     { error: "رمز CSRF غير صالح أو مفقود" },
    //     { status: 403 }
    //   );
    // }
    // // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
    // ✅ قراءة البيانات القادمة من المستخدم
    const body = await request.json();

    // ✅ التحقق من صحة البيانات باستخدام Zod
    const validation = UserSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: "البيانات غير صالحة" },
        { status: 400 }
      );
    }
    // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
    // ✅ التحقق من عدم وجود المستخدم مسبقًا
    const existingUser = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "المستخدم موجود بالفعل، يرجى استخدام بريد إلكتروني آخر" },
        { status: 409 }
      );
    }
    // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
    // ✅ تشفير كلمة المرور
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);
    // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
    // ✅ إنشاء مستخدم جديد في قاعدة البيانات
    const newUser = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
      },
    });
    // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
    // ✅ إنشاء JWT يحتوي على بيانات المستخدم
    const payload = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
      isActive: newUser.isActive,
    };

    const cookie = setCookie(payload);

    // ✅ تخزين JWT في الكوكيز بطريقة آمنة
    const response = NextResponse.json({ mag: "creadsd" }, { status: 201 });

    response.headers.set("Set-Cookie", cookie);
    console.log(response);
    return response;

    // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  } catch (error) {
    console.error("❌ خطأ في التسجيل:", error);
    return NextResponse.json(
      { error: "حدث خطأ داخلي في السيرفر" },
      { status: 500 }
    );
  }
}
