//todo POST
//todo /api/Login
//todo Login
//todo Public

// ✅ استيراد الأدوات اللازمة
import { NextResponse } from "next/server"; // لإنشاء ردود HTTP
import { UserLoginSchema } from "@/lib/utils/CheckSchema"; // للتحقق من صحة البيانات باستخدام Zod
import prisma from "@/lib/utils/db"; // الاتصال بقاعدة البيانات
import bcrypt from "bcryptjs"; // للتحقق من كلمة المرور المشفرة
import { generateToken } from "@/lib/utils/JWToken"; // لإنشاء JWT
import { verifyCsrfToken } from "@/lib/utils/csrf"; // التحقق من رمز CSRF

// ✅ دالة POST لمعالجة تسجيل الدخول
export async function POST(req) {
  try {
    // ✅ استخراج رمز CSRF من الهيدر
    const csrfToken = req.headers.get("x-csrf-token");
    const secret = process.env.CSRF_SECRET;
    console.log(secret);
    if (!secret) throw new Error("CSRF_SECRET is not defined");

    // ✅ التحقق من صحة رمز CSRF
    if (!csrfToken || !verifyCsrfToken(secret, csrfToken)) {
      return NextResponse.json(
        { error: "رمز CSRF غير صالح أو مفقود" },
        { status: 403 }
      );
    }

    // ✅ قراءة البيانات القادمة من الطلب (email و password)
    const body = await req.json();

    // ✅ التحقق من صحة البيانات باستخدام Zod
    const parsed = UserLoginSchema.safeParse(body);

    // ✅ إذا كانت البيانات غير صالحة، نرجع خطأ 400
    if (!parsed.success) {
      return NextResponse.json(
        { error: "البيانات غير صالحة" },
        { status: 400 }
      );
    }

    // ✅ استخراج البيانات بعد التحقق
    const { email, password } = parsed.data;

    // ✅ البحث عن المستخدم في قاعدة البيانات باستخدام البريد الإلكتروني
    const user = await prisma.user.findUnique({ where: { email } });

    // ✅ إذا لم يتم العثور على المستخدم، نرجع خطأ 404
    if (!user) {
      return NextResponse.json(
        { error: "المستخدم غير موجود" },
        { status: 404 }
      );
    }

    // ✅ التحقق من تطابق كلمة المرور المدخلة مع المشفرة في قاعدة البيانات
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // ✅ إذا كانت كلمة المرور خاطئة، نرجع خطأ 401
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "كلمة المرور غير صحيحة" },
        { status: 401 }
      );
    }

    // ✅ إنشاء بيانات التوكن
    const payload = {
      id: user.id,
      email: user.email,
      isActive: user.isActive,
      name: user.name,
      role: user.role,
    };

    // ✅ إنشاء توكن JWT يحتوي على بيانات المستخدم
    const token = generateToken(payload);

    // ✅ إرسال التوكن في الرد
    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    // ❌ في حالة حدوث خطأ غير متوقع، نرجع خطأ 500
    console.error("❌ خطأ في تسجيل الدخول:", error);
    return NextResponse.json(
      { error: "خطأ داخلي في السيرفر" },
      { status: 500 }
    );
  }
}
