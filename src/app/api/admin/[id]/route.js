import { NextResponse } from "next/server";
import prisma from "@/lib/utils/db";
import { verifyToken } from "@/lib/utils/JWToken";
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
export async function DELETE(request, context) {
  try {
    const { id } = context.params;

    // ✅ التحقق من وجود المعرف
    if (!id || typeof id !== "string") {
      return NextResponse.json(
        { error: "معرف المستخدم غير صالح" },
        { status: 400 }
      );
    }
    // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
    // ✅ قراءة التوكن من الكوكيز
    const token = request.cookies.get("jwttoken")?.value;
    if (!token) {
      return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
    }
    // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
    // ✅ التحقق من التوكن
    const session = verifyToken(token);
    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "ممنوع الوصول" }, { status: 403 });
    }
    // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
    // ✅ البحث عن المستخدم
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return NextResponse.json(
        { error: "المستخدم غير موجود" },
        { status: 404 }
      );
    }
    // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
    // ✅ تنفيذ الحذف
    await prisma.user.delete({ where: { id } });

    return NextResponse.json(
      { message: "✅ تم حذف الحساب بنجاح" },
      { status: 200 }
    );
    // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  } catch (error) {
    console.error("❌ خطأ في DELETE:", error);
    return NextResponse.json(
      { error: "خطأ داخلي في السيرفر" },
      { status: 500 }
    );
  }
}
