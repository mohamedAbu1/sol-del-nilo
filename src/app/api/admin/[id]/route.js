// ✅ استيراد الأدوات اللازمة
import { NextResponse } from "next/server"; // لإنشاء ردود HTTP
import prisma from "@/lib/utils/db"; // الاتصال بقاعدة البيانات
import { verifyToken } from "@/lib/utils/JWToken"; // التحقق من JWT
import { verifyCsrfToken } from "@/lib/utils/csrf"; // التحقق من رمز CSRF

// ✅ دالة DELETE لمعالجة طلب حذف مستخدم
export async function DELETE(request, { params }) {
  try {
    // ✅ استخراج رمز CSRF من الهيدر
    const csrfToken = request.headers.get("x-csrf-token");
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

    // ✅ استخراج التوكن من الهيدر Authorization
    const authHeader = request.headers.get("authorization");

    // ✅ التحقق من وجود التوكن
    if (!authHeader) {
      return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
    }

    // ✅ إزالة كلمة "Bearer " من بداية التوكن
    const token = authHeader.replace("Bearer ", "");

    // ✅ فك التوكن والتحقق منه
    const session = await verifyToken(token);

    // ✅ التحقق من صلاحية المستخدم: يجب أن يكون مشرف (admin)
    if (!session || session.role?.toLowerCase() !== "admin") {
      return NextResponse.json({ error: "ممنوع الوصول" }, { status: 403 });
    }

    // ✅ التحقق من وجود معرف المستخدم في المسار
    if (!params?.id) {
      return NextResponse.json(
        { error: "معرف المستخدم مفقود" },
        { status: 400 }
      );
    }

    // ✅ البحث عن المستخدم في قاعدة البيانات
    const user = await prisma.user.findUnique({
      where: { id: params.id },
    });

    // ✅ إذا لم يتم العثور على المستخدم، نرجع خطأ 404
    if (!user) {
      return NextResponse.json(
        { error: "المستخدم غير موجود" },
        { status: 404 }
      );
    }

    // ✅ حذف المستخدم من قاعدة البيانات
    await prisma.user.delete({
      where: { id: params.id },
    });

    // ✅ إرجاع استجابة نجاح بعد الحذف
    return NextResponse.json(
      { message: "✅ تم حذف الحساب بنجاح" },
      { status: 200 }
    );
  } catch (error) {
    // ❌ في حالة حدوث خطأ غير متوقع
    console.error("❌ خطأ في DELETE:", error);
    return NextResponse.json(
      { error: "خطأ داخلي في السيرفر" },
      { status: 500 }
    );
  }
}
