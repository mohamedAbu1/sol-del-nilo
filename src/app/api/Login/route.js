// استيراد الأدوات اللازمة
import { NextResponse } from "next/server"; // لإنشاء ردود HTTP
import { UserLoginSchema } from "@/lib/utils/CheckSchema"; // مخطط التحقق من البيانات باستخدام Zod
import prisma from "@/lib/utils/db";
import bcrypt from "bcryptjs"; // للتحقق من كلمة المرور المشفرة
import { generateToken } from "@/lib/utils/JWToken";
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

//todo POST
//todo /api/Login
//todo Login 
//todo Public 

// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//todo دالة POST لمعالجة طلب تسجيل الدخول
export async function POST(req) {
  try {
    // todo قراءة البيانات القادمة من الطلب (email و password)
    const body = await req.json();

    // todo التحقق من صحة البيانات باستخدام Zod
    const parsed = UserLoginSchema.safeParse(body);

    //todo إذا كانت البيانات غير صالحة، نرجع خطأ 400
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    //todo استخراج البيانات بعد التحقق
    const { email, password } = parsed.data;
    // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

    //todo البحث عن المستخدم في قاعدة البيانات باستخدام البريد الإلكتروني
    const user = await prisma.user.findUnique({ where: { email } });

    //todo إذا لم يتم العثور على المستخدم، نرجع خطأ 404
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

    // todo التحقق من تطابق كلمة المرور المدخلة مع المشفرة في قاعدة البيانات
    const isPasswordValid = await bcrypt.compare(body.password, user.password);

    //todo إذا كانت كلمة المرور خاطئة، نرجع خطأ 401
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Incorrect password" },
        { status: 401 }
      );
    }
    // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

    //todo إنشاء بيانات التوكن
    const payload = {
      id: user.id,
      email: user.email,
      isActive: user.isActive,
      name: user.name,
      role: user.role,
    };

    //todo إنشاء توكن JWT يحتوي على بيانات المستخدم
    const token = generateToken(payload);
    // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

    //todo إرسال التوكن في الرد
    return NextResponse.json({ token }, { status: 200 });
    // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  } catch (error) {
    //todo في حالة حدوث خطأ غير متوقع، نرجع خطأ 500
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
