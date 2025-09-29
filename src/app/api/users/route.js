// // المسار: /app/api/users/route.ts

// import { NextResponse } from "next/server"; // لإنشاء رد HTTP
// import prisma from "@/lib/utils/db"; // الاتصال بقاعدة البيانات باستخدام Prisma

// export async function GET() {
//   try {
//     // جلب جميع المستخدمين من قاعدة البيانات
//     const users = await prisma.user.findMany({
//       select: {
//         id: true,
//         name: true,
//         email: true,
//         createdAt: true,
//         role:true,
//         isActive:true,
//         comments:true,
//       },
//     });

//     // إرسال البيانات كـ JSON
//     return NextResponse.json({ users }, { status: 200 });
//   } catch (error) {
//     console.error("خطأ أثناء جلب المستخدمين:", error);
//     return NextResponse.json({ error: "فشل في جلب المستخدمين" }, { status: 500 });
//   }
// }
// export async function DELETE(request) {
//   try {
//     const body = await request.json();
//     const { userId, currentUserRole } = body;

//     // تحقق من صلاحيات الأدمن
//     if (currentUserRole !== "ADMIN") {
//       return NextResponse.json({ error: "غير مصرح لك بالحذف" }, { status: 403 });
//     }

//     // تحقق من وجود المستخدم
//     const existingUser = await prisma.user.findUnique({
//       where: { id: userId },
//     });

//     if (!existingUser) {
//       return NextResponse.json({ error: "المستخدم غير موجود" }, { status: 404 });
//     }

//     // تنفيذ الحذف
//     await prisma.user.delete({
//       where: { id: userId },
//     });

//     return NextResponse.json({ message: "✅ تم حذف المستخدم بنجاح" }, { status: 200 });
//   } catch (error) {
//     console.error("❌ خطأ أثناء حذف المستخدم:", error);
//     return NextResponse.json({ error: "فشل في حذف المستخدم" }, { status: 500 });
//   }
// }
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

// ✅ جلب جميع المستخدمين
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("user")
      .select("id, name, email, created_at, role, isActive");

    if (error) {
      console.error("❌ خطأ من Supabase:", error.message);
      return NextResponse.json({ error: "فشل في جلب المستخدمين" }, { status: 500 });
    }

    return NextResponse.json({ users: data }, { status: 200 });
  } catch (error) {
    console.error("❌ خطأ غير متوقع:", error);
    return NextResponse.json({ error: "فشل في جلب المستخدمين" }, { status: 500 });
  }
}

// ✅ حذف مستخدم حسب الصلاحيات
export async function DELETE(request) {
  try {
    const body = await request.json();
    const { userId, currentUserRole } = body;

    // تحقق من صلاحيات الأدمن
    if (currentUserRole?.toUpperCase() !== "ADMIN") {
      return NextResponse.json({ error: "❌ غير مصرح لك بالحذف" }, { status: 403 });
    }

    // تحقق من وجود المستخدم
    const { data: existingUser, error: findError } = await supabase
      .from("user")
      .select("id")
      .eq("id", userId)
      .single();

    if (findError || !existingUser) {
      return NextResponse.json({ error: "❌ المستخدم غير موجود" }, { status: 404 });
    }

    // تنفيذ الحذف
    const { error: deleteError } = await supabase
      .from("user")
      .delete()
      .eq("id", userId);

    if (deleteError) {
      console.error("❌ خطأ أثناء الحذف:", deleteError.message);
      return NextResponse.json({ error: "❌ فشل في حذف المستخدم" }, { status: 500 });
    }

    return NextResponse.json({ message: "✅ تم حذف المستخدم بنجاح" }, { status: 200 });
  } catch (error) {
    console.error("❌ خطأ غير متوقع:", error);
    return NextResponse.json({ error: "❌ فشل في حذف المستخدم" }, { status: 500 });
  }
}
