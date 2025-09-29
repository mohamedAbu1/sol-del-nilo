// المسار: /app/api/users/route.ts

import { NextResponse } from "next/server"; // لإنشاء رد HTTP
import prisma from "@/lib/utils/db"; // الاتصال بقاعدة البيانات باستخدام Prisma

export async function GET() {
  try {
    // جلب جميع المستخدمين من قاعدة البيانات
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        role:true,
        isActive:true,
        comments:true,
      },
    });

    // إرسال البيانات كـ JSON
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error("خطأ أثناء جلب المستخدمين:", error);
    return NextResponse.json({ error: "فشل في جلب المستخدمين" }, { status: 500 });
  }
}
export async function DELETE(request) {
  try {
    const body = await request.json();
    const { userId, currentUserRole } = body;

    // تحقق من صلاحيات الأدمن
    if (currentUserRole !== "ADMIN") {
      return NextResponse.json({ error: "غير مصرح لك بالحذف" }, { status: 403 });
    }

    // تحقق من وجود المستخدم
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      return NextResponse.json({ error: "المستخدم غير موجود" }, { status: 404 });
    }

    // تنفيذ الحذف
    await prisma.user.delete({
      where: { id: userId },
    });

    return NextResponse.json({ message: "✅ تم حذف المستخدم بنجاح" }, { status: 200 });
  } catch (error) {
    console.error("❌ خطأ أثناء حذف المستخدم:", error);
    return NextResponse.json({ error: "فشل في حذف المستخدم" }, { status: 500 });
  }
}