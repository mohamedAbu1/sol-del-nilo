// استيراد أنواع الطلب والاستجابة من Next.js
import { NextRequest, NextResponse } from "next/server";

// استيراد اتصال Prisma بقاعدة البيانات
import prisma from "@/lib/utils/db";

// استيراد دالة التحقق من التوكن JWT
import { verifyToken } from "@/lib/utils/JWToken";

// تعريف دالة DELETE لمعالجة طلب حذف مستخدم
export async function DELETE(request, { params }) {
  try {
    // ✅ استخراج الهيدر Authorization من الطلب
    const authHeader = request.headers.get("authorization");

    // إذا لم يتم إرسال التوكن، نرجع خطأ 401 (غير مصرح)
    if (!authHeader) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ✅ طباعة التوكن في الكونسول (لأغراض التحقق أثناء التطوير)
    console.log(authHeader);

    // ✅ إزالة كلمة "Bearer " من بداية التوكن
    const token = authHeader.replace("Bearer ", "");

    // ✅ فك التوكن والتحقق منه باستخدام دالة verifyToken
    const session = await verifyToken(token);

    // ✅ التحقق من صلاحية المستخدم: يجب أن يكون مشرف (admin)
    if (!session || session.role?.toLowerCase() !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // ✅ التحقق من وجود معرف المستخدم في المسار
    if (!params?.id) {
      return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
    }

    // ✅ البحث عن المستخدم في قاعدة البيانات باستخدام Prisma
    const user = await prisma.user.findUnique({
      where: { id: params.id }, // لاحظ أن id هنا من نوع string
    });

    // إذا لم يتم العثور على المستخدم، نرجع خطأ 404
    if (!user) {
      return NextResponse.json({ msg: "User not found" }, { status: 404 });
    }

    // ✅ حذف المستخدم من قاعدة البيانات
    await prisma.user.delete({
      where: { id: params.id },
    });

    // ✅ إرجاع استجابة نجاح بعد الحذف
    return NextResponse.json({ msg: "Account deleted" }, { status: 200 });

  } catch (error) {
    // ❌ في حالة حدوث خطأ غير متوقع، نطبع الخطأ ونرجع استجابة 500
    console.error("DELETE error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
